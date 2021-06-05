/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-verify-account-page',
	templateUrl: './verify-account.page.html',
	styleUrls: ['./../authentication.scss'],
})
export class VerifyAccountPageComponent implements OnInit {
	public loading = true;

	constructor(
		private authSvc: AuthService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		const userId =
			this.activatedRoute.snapshot.paramMap.get('userId') || '';
		const token = this.activatedRoute.snapshot.paramMap.get('token') || '';
		setTimeout(() => {
			this.authSvc.verifyUser(userId, token);
		}, 2000);
	}
}
