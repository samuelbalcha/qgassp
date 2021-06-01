/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-set-password',
	templateUrl: './set-password.page.html',
	styleUrls: ['./../authentication.scss'],
})
export class SetPasswordPageComponent {
	public setPasswordForm = new FormGroup({
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
		confirmPassword: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
	});

	public submitted = false;
	public loading = false;

	userId: string;

	constructor(
		private router: Router,
		private toastSvc: ToastrService,
		private authSvc: AuthService
	) {
		this.userId = '';
	}

	async onSubmit() {
		this.submitted = true;
		this.loading = true;

		const { password } = this.setPasswordForm.value;

		this.authSvc.setPassword(password).subscribe(
			(_data: any) => {
				this.loading = false;
				this.toastSvc.success('Password created', 'Success');
				this.router.navigateByUrl('/auth/login');
			},
			(_err: Error) => {
				this.loading = false;
				this.submitted = false;
				this.toastSvc.error('Password creation failed', 'Error');
			}
		);
	}
}
