/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { MainPageComponent } from './main.page';
import { DashboardPageComponent } from './dashboard/dashboard.page';
import { DatasetComponent } from './dataset/dataset.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { SetupComponent } from './setup/setup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/material.module';

const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardPageComponent,
	},
	{
		path: 'land-use',
		component: MainPageComponent,
	},
	{
		path: 'dataset',
		component: DatasetComponent,
	},
	{
		path: 'how-it-works',
		component: HowitworksComponent,
	},
	{
		path: 'setup-project',
		component: SetupComponent,
	},
];

@NgModule({
	declarations: [
		MainPageComponent,
		DatasetComponent,
		HowitworksComponent,
		DashboardPageComponent,
		SetupComponent,
	],
	imports: [
		FlexLayoutModule,
		MaterialModule,
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}
