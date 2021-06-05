import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CONFIG } from '../../../config/default';
import { StorageService } from '../services/storage.service';

const LOGIN_PAGE = '/auth/login';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private storage: StorageService, private router: Router) {}

	async canActivate(): Promise<boolean> {
		if (!this.storage.get(CONFIG.TOKEN)) {
			this.router.navigateByUrl(LOGIN_PAGE);
			return false;
		}
		return true;
	}
}
