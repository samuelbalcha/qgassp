/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
	{
		path: '',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./pages/main/main.module').then((m) => m.MainModule),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./pages/authentication/authentication.module').then(
				(m) => m.AuthenticationPageModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
