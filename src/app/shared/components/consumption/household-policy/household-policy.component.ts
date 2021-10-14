/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'household-policy',
	templateUrl: './household-policy.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class HouseholdPolicyComponent {
	@Output() onCommercialBuildingsChange: EventEmitter<any>;

	public energyEfficiency = 80;
	public selectedSourceOfEnergy;

	public sourceOfEnergy = [
		{ name: 'PV', id: 1 },
		{ name: 'Wind', id: 2 },
		{ name: 'Biomass', id: 3 },
		{ name: 'Other', id: 4 },
	];

	public heatingSources = [
		{ name: 'District heating', value: 0.1 },
		{ name: 'Electricity', value: 0.2 },
		{ name: 'Household fuel combustion', value: 0.7 },
	];
	public combustionSources = [
		{ name: 'Solids', value: 0.1 },
		{ name: 'Liquids', value: 0.2 },
		{ name: 'Gases', value: 0.7 },
	];

	public sourceOfEnergyShare = 80;

	public mixOfEnergySource = 80;
	public directEmissionFromDistrictHeating = 80;

	constructor() {
		this.onCommercialBuildingsChange = new EventEmitter<any>();
		this.selectedSourceOfEnergy = this.sourceOfEnergy[0];
	}

	onSourceOfEnergySelected(): void {
		//	this.onCommercialBuildingsChange.emit(this.commercialBuildingTypes);
	}
}
