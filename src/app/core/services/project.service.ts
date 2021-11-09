/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectStatuses } from '../../../../commons/enums/projectStatuses';

import { IProject } from '../../../../commons/types/IProject';
import { CONFIG } from '../../../config';
import { StorageService } from './storage.service';

const PROJECT_DETAIL = '/project-detail';
const DRAFT_PROJECT = 'draft-project';
@Injectable()
export class ProjectService {
	private projectUrl = `${CONFIG.BASE_URL}/api/project`;
	project: IProject | null;

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private toastSvc: ToastrService,
		private storage: StorageService
	) {
		this.project = {
			status: ProjectStatuses.DRAFT,
			name: '',
			population: 0,
			location: {
				country: '',
				region: '',
			},
			startYear: 2021,
			localId: '',
			territorial: {},
		};
	}

	getDraftProject(): IProject | null {
		const localProject = this.storage.get(DRAFT_PROJECT);

		if (localProject) {
			this.project = localProject;
		}

		return this.project;
	}

	updateDraftProject(updatedProject: IProject): void {
		const localProject = this.storage.get(DRAFT_PROJECT);

		if (localProject) {
			this.project = updatedProject;
			this.storage.set(DRAFT_PROJECT, this.project);
		}
	}

	initializeProject(draftProject: IProject): void {
		this.project = draftProject;
		this.storage.set(DRAFT_PROJECT, this.project);
	}

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
