import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';

import { LoginPageComponent } from './login/login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyAccountPageComponent } from './verify-account/verify-account.page';
import { SetPasswordPageComponent } from './set-password/set-password.page';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: 'verify/account/:userId/:token',
		component: VerifyAccountPageComponent,
	},
	{
		path: 'set-password',
		component: SetPasswordPageComponent,
	},
];

@NgModule({
	declarations: [
		LoginPageComponent,
		VerifyAccountPageComponent,
		SetPasswordPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		NgxLoadingModule,
		SharedModule,
	],
})
export class AuthenticationPageModule {}
