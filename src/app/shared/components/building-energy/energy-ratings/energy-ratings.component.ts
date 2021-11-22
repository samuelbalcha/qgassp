/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'energy-ratings',
	templateUrl: './energy-ratings.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class EnergyRatingsComponent implements OnInit {
	@Input() selectedRating: any;
	//	@Input() previousEnergyRating: any;

	//selectedRating = { name: 'A', value: 'A' };

	public energyRatings = [
		{ name: 'A', value: 'A' },
		{ name: 'B', value: 'B' },
		{ name: 'C', value: 'C' },
		{ name: 'D', value: 'D' },
		{ name: 'E', value: 'E' },
		{ name: 'F', value: 'F' },
		{ name: 'G', value: 'G' },
	];

	ngOnInit(): void {
		console.log('selectedRating', this.selectedRating);
	}

	onChange(_event: any): void {
		console.log('selectedRating-change', this.selectedRating);
	}
}
