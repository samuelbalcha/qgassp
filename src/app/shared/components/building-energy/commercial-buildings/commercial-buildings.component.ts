/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'commercial-buildings',
	templateUrl: './commercial-buildings.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class CommercialBuildingsComponent {
	@Input() isBaseLine = false;
	@Input() showTotalFloorArea = false;
	@Input() showEnergyRating = false;
	@Input() showNumberOfUnits = false;
	@Input() showCarbonHeatAndElectricity = false;

	commercialBuildingTypes = [
		{
			name: 'Retal',
			totalFloorArea: 10000,
			numberOfUnits: 100,
			previousEnergyRating: 'RE',
			plannedEnergyRating: '160/E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Health',
			totalFloorArea: 200,
			numberOfUnits: 40,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'P',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Hospitality',
			totalFloorArea: 80000,
			numberOfUnits: 60,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Offices',
			totalFloorArea: 900,
			numberOfUnits: 10,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Industrial',
			totalFloorArea: 900,
			numberOfUnits: 10,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Warehouses',
			totalFloorArea: 900,
			numberOfUnits: 10,
			previousEnergyRating: '160/E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
	];

	@Output() onCommercialBuildingsChange: EventEmitter<any>;

	constructor() {
		this.onCommercialBuildingsChange = new EventEmitter<any>();
	}

	onModelChange(): void {
		this.onCommercialBuildingsChange.emit(this.commercialBuildingTypes);
	}
}
