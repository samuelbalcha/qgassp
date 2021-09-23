/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

//import { MainPageComponent } from './main.page';
import { DashboardPageComponent } from './dashboard/dashboard.page';
import { DatasetComponent } from './dataset/dataset.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { SetupComponent } from './setup/setup.component';
import { ModuleLoaderComponent } from './module-loader/module-loader.component';
import { ResultAndVersionComponent } from './result-and-version/result-and-version.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficResultComponent } from './traffic/traffic-result/traffic-result.component';
import { ChartsModule } from 'ng2-charts';
const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardPageComponent,
	},
	/*
	{
		path: 'land-use',
		component: MainPageComponent,
	},
	*/
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
	{
		path: 'module-loader',
		component: ModuleLoaderComponent,
	},
	{
		path: 'result-version',
		component: ResultAndVersionComponent,
	},
	{
		path: 'traffic-result',
		component: TrafficResultComponent,
	},
];

@NgModule({
	declarations: [
		DatasetComponent,
		HowitworksComponent,
		DashboardPageComponent,
		SetupComponent,
		ModuleLoaderComponent,
		ResultAndVersionComponent,
		TrafficComponent,
		TrafficResultComponent
	],
	imports: [
		ChartsModule,
		FlexLayoutModule,
		MaterialModule,
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule { }
