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
export class Projectervice {
	private projectUrl = `${CONFIG.BASE_URL}/api/project`;

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private toastSvc: ToastrService
	) {}

	create(project: IProject) {
		return this.httpClient
			.post(`${this.projectUrl}`, {
				project,
			})
			.subscribe(
				(data: any) => {
					return this.router.navigateByUrl(
						`${PROJECT_DETAIL}/${data._id}`
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
}
