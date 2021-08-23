/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';

import { IProject } from '../../../../../commons/types/IProject';
import { ProjectService } from '../../../core/services/project.service';

@Component({
	selector: 'module-loader',
	templateUrl: './module-loader.component.html',
	styleUrls: ['./module-loader.component.scss'],
})
export class ModuleLoaderComponent implements OnInit {
	public myProject: IProject;
	public territorialModules: string[] = [];

	constructor(
		private router: Router,
		private projectService: ProjectService
	) {
		const currentProject = this.projectService.getDraftProject();
		if (!currentProject || !currentProject.name) {
			this.router.navigateByUrl('dashboard');
		}

		this.myProject = currentProject as IProject;
	}

	init() {
		//	this.selectedModules = _.keys(_.pickBy(this.myProject.modules));
		this.territorialModules = _.keys(this.myProject.territorial);
	}

	ngOnInit(): void {
		this.init();
	}

	getSelected(project: IProject) {
		console.log('updated selections', project);
		//	this.myProject.modules = calModules;
		this.init();
	}

	onAddLandUseChange() {
		console.log('onAddLandUseChange');
	}

	calculate() {
		console.log('calculate');
	}
}
