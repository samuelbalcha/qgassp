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
import { FooterComponent } from './components/footer/footer.component';
import { EmissionFactorsComponent } from './components/emission-factors-table/emission-factors.component';
import { Co2EmissionSummaryComponent } from './components/co2-emission-summary/co2-emission-summary.component';
import { SelectorsComponent } from './components/selectors/selectors.component';
import { Co2EmissionChartComponent } from './components/co2-emission-chart/co2-emission-chart.component';

import { LandUseChangeResultComponent } from './components/land-use-change/land-use-change-result/land-use-change-result.component';
import { LandUseChangeBaselineComponent } from './components/land-use-change/land-use-change-baseline/land-use-change-baseline.component';
import { CarbonStockChangeComponent } from './components/land-use-change/carbon-stock-change/carbon-stock-change.component';

import { AreaPopulationComponent } from './components/consumption/area-and-population/area-and-population.component';
import { TransportationTypesComponent } from './components/consumption/transportation-types/transportation-types.component';
import { HeatingConsumptionComponent } from './components/consumption/heating-consumption/heating-consumption.component';
import { ConsumptionBaselineComponent } from './components/consumption/consumption-baseline/consumption-baseline.component';
import { ConsumptionResultComponent } from './components/consumption/consumption-result/consumption-result.component';
import { BuildingEnergyBaselineComponent } from './components/building-energy/building-energy-baseline/building-energy-baseline.component';
import { ResidentialBuildingsComponent } from './components/building-energy/residential-buildings/residential-buildings.component';
import { CommercialBuildingsComponent } from './components/building-energy/commercial-buildings/commercial-buildings.component';
import { BuildingEnergyResultComponent } from './components/building-energy/building-energy-result/building-energy-result.component';
import { BuildingEnergyEmmissionComponent } from './components/building-energy/building-energy-emmission/building-energy-emmission.component';
import { ResidentialStepComponent } from './components/building-energy/building-energy-result/steps/residential-step/residential-step.component';
import { CommercialStepComponent } from './components/building-energy/building-energy-result/steps/commercial-step/commercial-step.component';
import { ResultStepComponent } from './components/building-energy/building-energy-result/steps/result-step/result-step.component';
import { TransportBaselineComponent } from './components/transport/transport-baseline/transport-baseline.component';
import { TransportResultComponent } from './components/transport/transport-result/transport-result.component';

import { EndUseOfEnergyComponent } from './components/building-energy/end-use-of-energy/end-use-of-energy.component';
import { HouseholdPolicyComponent } from './components/consumption/household-policy/household-policy.component';
import { TransportPolicyComponent } from './components/consumption/transport-policy/transport-policy.component';
import { ChangeBldgUseComponent } from './components/building-energy/change-bldg-use/change-bldg-use.component';
import { DensificationTableComponent } from './components/building-energy/densification-table/densification-table.component';
import { TransportBaselineV2Component } from './components/transport/transport-baseline-v2/transport-baseline-v2.component';
import { BuildingEnergyUseComponent } from './components/building-energy/building-energy-use/building-energy-use.component';
import { DetailedBuildingStockStepComponent } from './components/building-energy/building-energy-result/steps/detailed-building-stock/detailed-building-stock-step.component';

const shared = [
	HeaderComponent,
	FooterComponent,
	EmissionFactorsComponent,
	SelectorsComponent,
	LandUseChangeBaselineComponent,
	Co2EmissionSummaryComponent,
	Co2EmissionChartComponent,
	CarbonStockChangeComponent,
	LandUseChangeResultComponent,
	AreaPopulationComponent,
	TransportationTypesComponent,
	HeatingConsumptionComponent,
	HouseholdPolicyComponent,
	TransportPolicyComponent,
	ConsumptionBaselineComponent,
	ConsumptionResultComponent,
	ResidentialBuildingsComponent,
	CommercialBuildingsComponent,
	BuildingEnergyBaselineComponent,
	BuildingEnergyEmmissionComponent,
	ResidentialStepComponent,
	ResultStepComponent,
	CommercialStepComponent,
	BuildingEnergyUseComponent,
	BuildingEnergyResultComponent,
	TransportBaselineComponent,
	TransportBaselineV2Component,
	TransportResultComponent,
	EndUseOfEnergyComponent,
	ChangeBldgUseComponent,
	DensificationTableComponent,
	DetailedBuildingStockStepComponent,
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
