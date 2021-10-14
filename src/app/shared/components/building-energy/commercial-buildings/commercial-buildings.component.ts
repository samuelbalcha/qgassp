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
	@Input() showCarbonHeatAndElectricity = false;

	commercialBuildingTypes = [
		{
			name: 'Retal',
			totalFloorArea: 10000,
			previousEnergyRating: 'E',
			plannedEnergyRating: '160/E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Health',
			totalFloorArea: 200,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'P',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Hospitality',
			totalFloorArea: 80000,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Offices',
			totalFloorArea: 900,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Industrial',
			totalFloorArea: 900,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Warehouses',
			totalFloorArea: 900,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
		{
			name: 'Other',
			totalFloorArea: 900,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
		},
	];

	public energyRatings = [
		{ name: 'A', value: '' },
		{ name: 'B', value: '' },
		{ name: 'C', value: '' },
		{ name: 'D', value: '' },
		{ name: 'E', value: '' },
		{ name: 'F', value: '' },
		{ name: 'G', value: '' },
	];

	@Output() onCommercialBuildingsChange: EventEmitter<any>;

	constructor() {
		this.onCommercialBuildingsChange = new EventEmitter<any>();
	}

	onModelChange(): void {
		this.onCommercialBuildingsChange.emit(this.commercialBuildingTypes);
	}
}
