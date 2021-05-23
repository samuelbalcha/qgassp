import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { EmissionFactorsComponent } from './components/emission-factors-table/emission-factors.component';
import { ResultStepComponent } from './components/steps/result-step/result-step.component';
import { LocationStepComponent } from './components/steps/location-step/location-step.component';
import { LandUseStepComponent } from './components/steps/land-use-step/land-use-step.component';
import { LandUseChangeComponent } from './components/land-use-change/land-use-change.component';

const shared = [
	HeaderComponent,
	SideNavComponent,
	FooterComponent,
	EmissionFactorsComponent,
	LocationStepComponent,
	LandUseStepComponent,
	ResultStepComponent,
	LandUseChangeComponent,
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	declarations: [...shared],
	exports: [...shared, FormsModule, ReactiveFormsModule, MaterialModule],
	providers: [],
	schemas: [],
})
export class SharedModule {}
