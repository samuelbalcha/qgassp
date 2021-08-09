/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { UserRoles } from '../../../../../commons/enums/userRoles';
import { AuthService } from '../../../core/services/auth.service';
import { ProjectService } from '../../../core/services/project.service';
import { IProject } from '../../../../../commons/types/IProject';

@Component({
	selector: 'dashboard-page',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPageComponent implements OnInit {
	public userRoles = UserRoles;
	public show = 4;
	public i = 0;

	public loading = false;
	public notFound = false;
	public more = false;

	public allProjects: IProject[] = [];
	public myProjects: IProject[] = [];
	currentUser = this.authSvc.getCurrentUser();

	constructor(
		private authSvc: AuthService,
		private projectService: ProjectService
	) {}

	ngOnInit() {
		this.loadProjects();
	}

	loadProjects() {
		this.loading = true;
		this.projectService.getAll().subscribe((projects: IProject[]) => {
			this.allProjects = projects.filter((project: IProject) => {
				return (
					_.get(project, 'createdBy._id') !==
					_.get(this.currentUser, '_id')
				);
			});

			this.myProjects = projects.filter((project: IProject) => {
				return (
					_.get(project, 'createdBy._id') ===
					_.get(this.currentUser, '_id')
				);
			});

			this.loading = false;
		});
	}
}
