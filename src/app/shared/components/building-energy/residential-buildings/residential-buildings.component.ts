/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'residential-buildings',
	templateUrl: './residential-buildings.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class ResidentialBuildingsComponent {
	@Input() isBaseLine = false;
	@Input() showTotalFloorArea = false;
	@Input() showEnergyRating = false;
	@Input() showNumberOfUnits = false;
	@Input() showCarbonHeatAndElectricity = false;

	residentialBuildingTypes = [
		{
			name: 'Apartment',
			totalFloorArea: 10000,
			numberOfUnits: 100,
			previousEnergyRating: 'RE',
			plannedEnergyRating: 'E',
			carbonHeat: '78',
			electricity: '-',
		},
		{
			name: 'Terraced',
			totalFloorArea: 200,
			numberOfUnits: 40,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'P',
			carbonHeat: '78',
			electricity: '-',
		},
		{
			name: 'Semi-detached',
			totalFloorArea: 80000,
			numberOfUnits: 60,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '78',
			electricity: '-',
		},
		{
			name: 'Detached',
			totalFloorArea: 900,
			numberOfUnits: 10,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '78',
			electricity: '-',
		},
	];

	@Output() onResidentialBuildingsChange: EventEmitter<any>;

	constructor() {
		this.onResidentialBuildingsChange = new EventEmitter<any>();
	}

	onModelChange(): void {
		this.onResidentialBuildingsChange.emit(this.residentialBuildingTypes);
	}
}
