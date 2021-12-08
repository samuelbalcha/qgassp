/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'commercial-buildings',
	templateUrl: './commercial-buildings.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class CommercialBuildingsComponent implements OnInit {
	@Input() isBaseLine = false;
	@Input() showTotalFloorArea = false;
	@Input() showEnergyRating = false;
	@Input() showCarbonHeatAndElectricity = false;
	@Input() commercialBuildingTypes: any;

	@Output() onCommercialBuildingsChange: EventEmitter<any> = new EventEmitter<
		any
	>();

	totalFloorArea = 0;

	public energyRatings = [
		{ name: 'A', value: '' },
		{ name: 'B', value: '' },
		{ name: 'C', value: '' },
		{ name: 'D', value: '' },
		{ name: 'E', value: '' },
		{ name: 'F', value: '' },
		{ name: 'G', value: '' },
	];

	ngOnInit(): void {
		this.addTotal();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onModelChange(_event: any): void {
		this.addTotal();
		this.onCommercialBuildingsChange.emit(this.commercialBuildingTypes);
	}

	addTotal(): void {
		this.totalFloorArea = _.sumBy(
			this.commercialBuildingTypes,
			'totalFloorArea'
		);
	}
}
