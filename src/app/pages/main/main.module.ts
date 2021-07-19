/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { MainPageComponent } from './main.page';
import { DashboardPageComponent } from './dashboard/dashboard.page';

const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardPageComponent,
	},
	{
		path: 'land-use',
		component: MainPageComponent,
	},
];

@NgModule({
	declarations: [MainPageComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPageModule {}
