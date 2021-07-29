/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';

import { UserRoles } from '../../../../../commons/enums/userRoles';

import { AuthService } from '../../../core/services/auth.service';
// import { IProject } from '../../../../../commons/types/IProject';

export interface Project {
	name: string;
	location: number;
}

@Component({
	selector: 'dashboard-page',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPageComponent implements OnInit {
	public currentUser = this.authSvc.getCurrentUser();
	public userRoles = UserRoles;
	show = 4;
	i = 0;
	public loading = false;
	public notFound = false;
	public more = false;
	public projects: Project[] = [
		{ name: 'new', location: 3, },
		{ name: 'Project Name', location: 1, },
		{ name: 'Project Name', location: 1, },
		{ name: 'Project Name', location: 1 },
		{ name: 'Project Name', location: 2 },
		{ name: 'Project Name', location: 2 },
		{ name: 'Project Name', location: 2 },
		{ name: 'Project Name', location: 2 },
		{ name: 'Project Name', location: 2 },
	];
	constructor(private authSvc: AuthService) { }

	ngOnInit() {
		console.log('dashboard');
	}

	onCreateProject(projectType: string) {
		console.log('type', projectType);
		console.log(this.currentUser);
	}
}
