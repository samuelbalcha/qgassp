import { CommonModule } from '@angular/common';
import {
	CUSTOM_ELEMENTS_SCHEMA,
	NgModule,
	NO_ERRORS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmissionFactorsComponent } from './components/emission-factors-table/emission-factors.component';
import { Co2EmissionSummaryComponent } from './components/co2-emission-summary/co2-emission-summary.component';
import { SelectorsComponent } from './components/selectors/selectors.component';
import { Co2EmissionChartComponent } from './components/co2-emission-chart/co2-emission-chart.component';

import { ResultStepComponent } from './components/steps/result-step/result-step.component';
import { LocationStepComponent } from './components/steps/location-step/location-step.component';
import { LandUseStepComponent } from './components/steps/land-use-step/land-use-step.component';

import { LandUseChangeResultComponent } from './components/land-use-change/land-use-change-result/land-use-change-result.component';
import { LandUseChangeBaselineComponent } from './components/land-use-change/land-use-change-baseline/land-use-change-baseline.component';
import { CarbonStockChangeComponent } from './components/land-use-change/carbon-stock-change/carbon-stock-change.component';

import { ConsumptionBaselineComponent } from './components/consumption/consumption-baseline/consumption-baseline.component';
import { ConsumptionResultComponent } from './components/consumption/consumption-result/consumption-result.component';

const shared = [
	HeaderComponent,
	SideNavComponent,
	FooterComponent,
	EmissionFactorsComponent,
	LocationStepComponent,
	LandUseStepComponent,
	ResultStepComponent,
	SelectorsComponent,
	LandUseChangeBaselineComponent,
	Co2EmissionSummaryComponent,
	Co2EmissionChartComponent,
	CarbonStockChangeComponent,
	LandUseChangeResultComponent,
	ConsumptionBaselineComponent,
	ConsumptionResultComponent,
];

@NgModule({
	imports: [
		FlexLayoutModule,
		MaterialModule,
		ChartsModule,
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [...shared],
	exports: [...shared, FormsModule, ReactiveFormsModule, MaterialModule],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
