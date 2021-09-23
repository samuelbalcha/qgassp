import { Component } from '@angular/core';
import { LandTypes } from '../../../../../enums/LandTypes';

@Component({
	selector: 'result-step',
	templateUrl: './result-step.component.html',
	styleUrls: ['./../steps.scss'],
})
export class ResultStepComponent {
	public landTypes = Object.values(LandTypes);

	public dataSource = [
		{
			landUseChange: {
				fromLandType: this.landTypes[0],
				toLandType: this.landTypes[1],
			},
			area: {
				organic: 345,
				mineral: 100,
			},

			aboveGround: 52.91,
			belowGround: 11.67,
			deadWood: 0.8,
			litter: 11,
			mineral: 1.07,
			organic: -7.9,
		},
		{
			landUseChange: {
				fromLandType: this.landTypes[1],
				toLandType: this.landTypes[2],
			},
			area: {
				organic: 345,
				mineral: 100,
			},

			aboveGround: 52.91,
			belowGround: 11.67,
			deadWood: 0.8,
			litter: 11,
			mineral: 1.07,
			organic: -7.9,
		},
	];

	public mainColumns = [
		'Land use change',
		'Area size, ha',
		'Biomass',
		'Dead organic matter',
		'Soil',
	];

	public displayedColumns = [
		'From',
		'To',
		'Organic soil',
		'Mineral soil',
		'Total',
		'Aboveground',
		'Belowground',
		'Deadwood',
		'Litter',
		'Mineral',
		'Organic',
	];

	public fromLandType = '';
	public fromSelectedLandType = '';
	public toLandType = '';
	public toSelectedLandType = '';

	constructor() {
		//
	}
}