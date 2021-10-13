import { Component } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'heating-consumption',
	templateUrl: './heating-consumption.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class HeatingConsumptionComponent {
	public electricityMix = [
		{ name: 'Coal', value: 0.2 },
		{ name: 'Gas', value: 0.2 },
		{ name: 'Nuclear', value: 0.2 },
		{ name: 'Hydro', value: 0.2 },
		{ name: 'Wind', value: 0.2 },
		{ name: 'Oil derivatives', value: 0.2 },
		{ name: 'Biomass', value: 0.2 },
		{ name: 'Solar PV', value: 0.2 },
		{ name: 'Solar thermal', value: 0.2 },
		{ name: 'Geothermal', value: 0.2 },
	]; // total sum is 1

	public householdHeatings = [
		{ name: 'District heating', value: 0.3 },
		{ name: 'Electricity', value: 0.3 },
		{ name: 'Household fuel combustion', value: 0.4 },
	]; // total sum is 1

	public combustionTypes = [
		{ name: 'Solid', value: 0.4 },
		{ name: 'Liquid', value: 0.2 },
		{ name: 'Gas', value: 0.4 },
	];
	public directDistrictHeatingEmission = 56;
}
