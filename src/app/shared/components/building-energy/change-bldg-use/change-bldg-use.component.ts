/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

import { BuildingEnergyCalculatorService } from '../../../../core/services/building-energy-calculator.service';

@Component({
	selector: 'change-in-building-use',
	templateUrl: './change-bldg-use.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class ChangeBldgUseComponent implements OnInit {
	public residetial: any;
	public commercial: any;

	constructor(
		private buildingEnergyCalculatorService: BuildingEnergyCalculatorService
	) {}

	ngOnInit(): void {
		this.residetial = _.map(
			this.buildingEnergyCalculatorService.getResidentialBuildingTypes(),
			(building, index) => {
				return { name: building, value: index };
			}
		);

		this.commercial = _.map(
			this.buildingEnergyCalculatorService.getCommercialBuildingTypes(),
			(building, index) => {
				return { name: building, value: index };
			}
		);
	}
}
