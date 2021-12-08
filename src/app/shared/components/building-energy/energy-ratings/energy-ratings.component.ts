/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'energy-ratings',
	templateUrl: './energy-ratings.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class EnergyRatingsComponent implements OnInit {
	@Input() selectedRating: any;
	@Output() selectedRatingChange: EventEmitter<number> = new EventEmitter<
		number
	>();

	public energyRatings = [
		{ name: 'A', value: 'A' },
		{ name: 'B', value: 'B' },
		{ name: 'C', value: 'C' },
		{ name: 'D', value: 'D' },
		{ name: 'E', value: 'E' },
		{ name: 'F', value: 'F' },
		{ name: 'G', value: 'G' },
	];

	ngOnInit(): void {}

	onChange(_event: any): void {
		this.selectedRatingChange.emit(this.selectedRating);
	}
}
