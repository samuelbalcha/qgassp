/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login.page.html',
	styleUrls: ['./../authentication.scss'],
})
export class LoginPageComponent {
	public loginForm = new FormGroup({
		email: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});

	public submitted = false;
	public loading = false;

	constructor(private authSvc: AuthService) {}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}

	async onSubmit() {
		if (
			(!this.loginForm.value.email && !this.loginForm.value.password) ||
			!this.loginForm.valid
		) {
			return;
		}

		this.authSvc.login(
			this.loginForm.value.email,
			this.loginForm.value.password
		);
	}
}
