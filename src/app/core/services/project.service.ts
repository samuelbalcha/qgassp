/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IProject } from '../../../../commons/types/IProject';
import { CONFIG } from '../../../config';

const PROJECT_DETAIL = '/project-detail';

@Injectable()
export class ProjectService {
	private projectUrl = `${CONFIG.BASE_URL}/api/project`;

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private toastSvc: ToastrService
	) {}

	create(project: IProject) {
		return this.httpClient
			.post<IProject>(`${this.projectUrl}`, {
				project,
			})
			.subscribe(
				(newProject: any) => {
					return this.router.navigateByUrl(
						`${PROJECT_DETAIL}/${newProject._id}`
					);
				},
				(err: Error) => {
					this.toastSvc.error(
						'Project error',
						`Could not create project: ${err.message}`
					);
					console.log('error', err);
				}
			);
	}

	get(id: string) {
		return this.httpClient
			.get<IProject>(`${this.projectUrl}/${id}`)
			.subscribe(
				(project: any) => {
					return project;
				},
				(err: Error) => {
					this.toastSvc.error(
						'Project error',
						`Could not fetch project: ${err.message}`
					);
					console.log('error', err);
				}
			);
	}

	getAll() {
		return this.httpClient.get<IProject[]>(`${this.projectUrl}`);
	}
}
