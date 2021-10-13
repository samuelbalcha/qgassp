/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'consumption-policy',
	templateUrl: './consumption-policy.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class ConsumptionPolicyComponent {
	@Output() onCommercialBuildingsChange: EventEmitter<any>;

	public energyEfficiency = 80;
	public selectedSourceOfEnergy;

	public sourceOfEnergy = [
		{ name: 'PV', id: 1 },
		{ name: 'Wind', id: 2 },
		{ name: 'Biomass', id: 3 },
		{ name: 'Other', id: 4 },
	];

	public sourceOfEnergyShare = 80;
	public mixOfEnergySource = 80;
	public directEmissionFromDistrictHeating = 80;
	public biofuelShare = 80;
	public electricVehiclesShare = 80;
	public privateTransport = 80;
	public publicTransport = 20;

	constructor() {
		this.onCommercialBuildingsChange = new EventEmitter<any>();
		this.selectedSourceOfEnergy = this.sourceOfEnergy[0];
	}

	onSourceOfEnergySelected(): void {
		//	this.onCommercialBuildingsChange.emit(this.commercialBuildingTypes);
	}
}
