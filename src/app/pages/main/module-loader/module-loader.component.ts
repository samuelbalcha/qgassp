/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';

import { IProject } from '../../../../../commons/types/IProject';
import { ProjectService } from '../../../core/services/project.service';
import { UtilService } from '../../../core/services/util.service';

@Component({
	selector: 'module-loader',
	templateUrl: './module-loader.component.html',
	styleUrls: ['./module-loader.component.scss'],
})
export class ModuleLoaderComponent implements OnInit {
	public myProject: IProject;

	public projectModules: string[] = [];

	constructor(
		private router: Router,
		private projectService: ProjectService,
		public utilService: UtilService
	) {
		const currentProject = this.projectService.getDraftProject();
		if (!currentProject || !currentProject.name) {
			this.router.navigateByUrl('setup-project');
		}

		this.myProject = currentProject as IProject;
	}

	init() {
		this.projectModules = _.keys(this.myProject.territorial);
		if (this.myProject.consumption) {
			this.projectModules.push('consumption');
		}
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

	calculate(tabName: string) {
		this.router.navigateByUrl(`result-version/${tabName}`);
	}
}
