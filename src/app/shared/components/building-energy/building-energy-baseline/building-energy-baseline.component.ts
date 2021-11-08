import { Component } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
@Component({
	selector: 'building-energy-baseline',
	templateUrl: './building-energy-baseline.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyBaselineComponent {
	public resindetialTotalNumberOfHousingUnits = 0;
	public commercialTotalFloorArea = 0;

	public residentialBuildingTypes = [
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

	constructor(private router: Router) {
		this.addTotal();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onModelChange(_event: any): void {
		this.addTotal();
	}

	addTotal(): void {
		this.resindetialTotalNumberOfHousingUnits = _.sumBy(
			this.residentialBuildingTypes,
			'numberOfUnits'
		);

		this.commercialTotalFloorArea = _.sumBy(
			this.commercialBuildingTypes,
			'totalFloorArea'
		);
	}

	createBaseline(): void {
		this.router.navigateByUrl('result-version');
	}
}
