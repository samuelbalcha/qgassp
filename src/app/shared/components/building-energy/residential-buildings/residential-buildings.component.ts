/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'residential-buildings',
	templateUrl: './residential-buildings.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class ResidentialBuildingsComponent implements OnInit {
	@Input() isBaseLine = false;
	@Input() showNumberOfUnits = false;
	@Input() showEnergyRating = false;
	@Input() showCarbonHeatAndElectricity = false;
	@Input() residentialBuildingTypes: any;
	@Output() onResidentialBuildingsChange: EventEmitter<
		any
	> = new EventEmitter<any>();

	totalNumberOfHousingUnits = 0;

	ngOnInit(): void {
		this.addTotal();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onModelChange(_event: any): void {
		this.addTotal();
		this.onResidentialBuildingsChange.emit(this.residentialBuildingTypes);
	}

	addTotal(): void {
		this.totalNumberOfHousingUnits = _.sumBy(
			this.residentialBuildingTypes,
			'numberOfUnits'
		);
	}
}
