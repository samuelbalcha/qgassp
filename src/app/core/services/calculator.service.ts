import { Injectable } from '@angular/core';
import { IResult } from '../../../types/IResult';

@Injectable()
export class CalculatorService {
	result: IResult;

	constructor() {
		this.result = {
			annualEmissions: {
				totalEmissions: 0,
				biomass: 0,
				deadOrganicMatter: 0,
				soil: 0,
			},
		};
	}

	calculateLandUseChange(): IResult {
		const input = {
			area: {
				mineral: 10,
				organic: 8,
			},
			biomass: {
				aboveGround: 1,
				belowGround: 3,
			},
			deadOrganicMatter: {
				deadWood: 7,
				litter: 3,
			},
			soil: {
				mineral: 4,
				organic: 5,
			},
		};

		console.log('input', input);

		return this.result;
	}
}
