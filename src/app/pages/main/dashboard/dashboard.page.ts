/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';

import { UserRoles } from '../../../../../commons/enums/userRoles';

import { AuthService } from '../../../core/services/auth.service';
// import { IProject } from '../../../../../commons/types/IProject';

export interface Project {
	name: string;
	location: number;
	status: string;
	owner: string;
}

@Component({
	selector: 'dashboard-page',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPageComponent implements OnInit {
	public currentUser = this.authSvc.getCurrentUser();
	public userRoles = UserRoles;
	public show = 4;
	public i = 0;
	public loading = false;
	public notFound = false;
	public more = false;
	public Allprojects: Project[] = [
		{ name: 'new', location: 0, status: 'active', owner: 'thisUser' },
		{ name: 'Project Name', location: 1, status: 'draft', owner: 'thisUser' },
		{ name: 'Project Name', location: 1, status: 'active', owner: 'thisUser' },
		{ name: 'Project Name', location: 1, status: 'active', owner: 'thisUser' },
		{ name: 'Project Name', location: 2, status: 'active', owner: 'thisUser' },
		{ name: 'Project Name', location: 2, status: 'active', owner: 'thisUser' },
		{ name: 'Project Name', location: 2, status: 'active', owner: 'thisUser' },
		{ name: 'Project Name', location: 2, status: 'active', owner: 'notThisUser' },
		{ name: 'Project Name', location: 2, status: 'archived', owner: 'notThisUser' },
	];

	public projects: Project[] = this.Allprojects.filter(o => o.status === 'active' && o.owner === 'thisUser');

	constructor(private authSvc: AuthService) { }

	ngOnInit() {

		console.log('dashboard');
	}

	// onCreateProject(projectType: string) {
	// 	console.log('type', projectType);
	// 	console.log(this.currentUser);
	// }

}
