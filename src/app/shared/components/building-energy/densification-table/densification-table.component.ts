/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

import { BuildingEnergyCalculatorService } from '../../../../core/services/building-energy-calculator.service';

@Component({
	selector: 'densification-table',
	templateUrl: './densification-table.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class DensificationTableComponent implements OnInit {
	public totalNumberOfUnits = 0;
	public totalFloorArea = 0;
	public currentDensity = 0;
	public shareOfResidentialUnits = 0;
	public shareOfCommercialUnits = 0;
	public increaseInDensity = 0;
	public shareOfNewResidentialUnits = 0;
	public shareOfNewCommercialUnits = 0;

	public residentialBuildingsShare: any;
	public commercialBuildingsShare: any;

	constructor(
		private buildingEnergyCalculatorService: BuildingEnergyCalculatorService
	) {}

	ngOnInit(): void {
		this.residentialBuildingsShare = _.map(
			this.buildingEnergyCalculatorService.getResidentialBuildingTypes(),
			(building) => {
				return { name: building, value: 20 };
			}
		);

		this.commercialBuildingsShare = _.map(
			this.buildingEnergyCalculatorService.getCommercialBuildingTypes(),
			(building) => {
				return { name: building, value: 10 };
			}
		);
	}

	onShareOfUnitsChanged(changed: string): void {
		if (changed === 'residential') {
			this.shareOfCommercialUnits = 100 - this.shareOfResidentialUnits;
		}
		if (changed === 'commercial') {
			this.shareOfResidentialUnits = 100 - this.shareOfCommercialUnits;
		}
	}

	onTotalChanged(): void {
		this.currentDensity = Math.round(
			(this.totalFloorArea / this.totalNumberOfUnits) * 100
		);
	}
}
