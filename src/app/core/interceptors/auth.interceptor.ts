/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { Observable, throwError } from 'rxjs/';
import { CONFIG } from '../../../config';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private storage: StorageService,
		private toastSvc: ToastrService
	) {}

	public intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this.storage.get(CONFIG.TOKEN);

		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		}

		if (!request.headers.has('Content-Type')) {
			request = request.clone({
				headers: request.headers.set(
					'Content-Type',
					'application/json'
				),
			});
		}

		request = request.clone({
			headers: request.headers.set('Accept', 'application/json'),
		});

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				let data: any = {};
				data = {
					reason:
						error && error.error.reason ? error.error.reason : '',
					status: error.status,
				};

				if (data.status === 500) {
					this.toastSvc.error(
						'Could not complete request',
						data.reason
					);
				} else {
					this.toastSvc.error('Could not complete request', 'Error');
				}

				// TODO: show error modal?
				console.log('intercpetor error', data, error);

				return throwError(error);
			})
		);
	}
}
