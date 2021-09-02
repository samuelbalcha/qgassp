/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

import { MainPageComponent } from './main.page';
import { DashboardPageComponent } from './dashboard/dashboard.page';
import { DatasetComponent } from './dataset/dataset.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { SetupComponent } from './setup/setup.component';
import { ModuleLoaderComponent } from './module-loader/module-loader.component';
import { ResultAndVersionComponent } from './result-and-version/result-and-version.component';
import { SelectorsComponent } from '../../shared/components/selectors/selectors.component';
import { LandUseChangeFormComponent } from '../../shared/components/land-use-change-form/land-use-change-form.component';
import { BuldingEnergyUseComponent } from './building/bulding-energy-use/bulding-energy-use.component';
import { BuildingEnergyResultComponent } from './building/building-energy-result/building-energy-result.component';
import { BuildingComponent } from './building/building.component';

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
	{
		path: 'module-loader',
		component: ModuleLoaderComponent,
	},
	{
		path: 'result-version',
		component: ResultAndVersionComponent,
	},
	{
		path: 'buildEnergyTest',
		component: BuldingEnergyUseComponent,
	},
	{
		path: 'buildEnergyResultTest',
		component: BuildingEnergyResultComponent,
	}
];

@NgModule({
	declarations: [
		MainPageComponent,
		DatasetComponent,
		HowitworksComponent,
		DashboardPageComponent,
		SetupComponent,
		ModuleLoaderComponent,
		SelectorsComponent,
		ResultAndVersionComponent,
		LandUseChangeFormComponent,
		BuildingComponent,
		BuldingEnergyUseComponent,
		BuildingEnergyResultComponent
	],
	imports: [
		FlexLayoutModule,
		MaterialModule,
		ChartsModule,
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule { }
