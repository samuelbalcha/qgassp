/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';

import { UserRoles } from '../../../../../commons/enums/userRoles';

import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'dashboard-page',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPageComponent implements OnInit {
	public currentUser = this.authSvc.getCurrentUser();
	public userRoles = UserRoles;

	public loading = false;
	public notFound = false;

	constructor(private authSvc: AuthService) { }

	ngOnInit() {
		console.log('dashboard');
	}

	onCreateProject(projectType: string) {
		console.log('type', projectType);
		console.log(this.currentUser);
	}
}
