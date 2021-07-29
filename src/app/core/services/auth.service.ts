/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StorageService } from './storage.service';
import { CONFIG } from '../../../config';
import { UserRoles } from '../../../../commons/enums/userRoles';
import { IUser } from '../../../../commons/types/IUser';

const LOGIN_PAGE = '/auth/login';
const SET_PASSWORD = '/auth/set-password';

const PROFILE_PAGE = '/profile';
const DASHBOARD = '/dashboard';

@Injectable()
export class AuthService {
	private authUrl = `${CONFIG.BASE_URL}/api/me`;
	public currentUser: IUser | null;
	currentUserChange: EventEmitter<number> = new EventEmitter();

	constructor(
		private httpClient: HttpClient,
		private storage: StorageService,
		private router: Router,
		private toastSvc: ToastrService
	) {
		this.currentUser = {
			name: '',
		};
	}

	getCurrentUser() {
		if (!this.currentUser) {
			this.currentUser = this.storage.get(CONFIG.LOCAL_USER);
		}

		return this.currentUser;
	}

	getCurrentUserChangeEmitter() {
		return this.currentUserChange;
	}

	login(email: string, password: string) {
		return this.httpClient
			.post(`${this.authUrl}/login`, {
				email,
				password,
			})
			.subscribe(
				(data: any) => {
					this.setCurrentUser(data);

					switch (data.user.role) {
						case UserRoles.ADMIN:
						case UserRoles.RESEARCHER:

							return this.router.navigateByUrl(DASHBOARD);
						default:
							return this.router.navigateByUrl(LOGIN_PAGE);
					}
				},
				(_err: Error) => {
					this.toastSvc.error(
						'Invalid user or password',
						'Could not login'
					);
					setTimeout(() => {
						this.router.navigateByUrl(LOGIN_PAGE);
					}, 2000);
				}
			);
	}

	logout() {
		this.storage.remove(CONFIG.TOKEN);
		this.storage.remove(CONFIG.LOCAL_USER);
		this.currentUser = null;

		this.router.navigateByUrl(LOGIN_PAGE);
	}

	updateMe(data: any) {
		return this.httpClient.put(`${this.authUrl}/profile`, data).subscribe(
			(result: any) => {
				this.storage.remove(CONFIG.LOCAL_USER);
				this.storage.set(CONFIG.LOCAL_USER, result);
				this.currentUser = result;

				this.toastSvc.success('Updated your profile', 'Success');
				this.router.navigateByUrl(PROFILE_PAGE);
				this.currentUserChange.emit();
			},
			(err) => {
				this.toastSvc.error(err.message, 'Updated failed');
			}
		);
	}

	changePassword(data: any) {
		return this.httpClient.post(`${this.authUrl}/change-password`, data);
	}

	verifyUser(userId: string, token: string) {
		return this.httpClient
			.get(`${this.authUrl}/verify/account/${userId}/${token}`)
			.subscribe(
				(data: any) => {
					this.setCurrentUser(data);
					this.router.navigateByUrl(SET_PASSWORD);
				},
				(_err: Error) => {
					this.toastSvc.error(
						'Invalid user or token',
						'Could not login'
					);
					setTimeout(() => {
						this.router.navigateByUrl(LOGIN_PAGE);
					}, 2000);
				}
			);
	}

	setPassword(password: string) {
		return this.httpClient.post(`${this.authUrl}/set-password`, {
			password,
		});
	}

	private setCurrentUser(data: any) {
		this.storage.set(CONFIG.TOKEN, data.token);
		this.storage.set(CONFIG.LOCAL_USER, data.user);
		this.currentUser = data.user;
	}
}
