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
	@Input() commercialBuildingTypes: any;
	@Output() onCommercialBuildingsChange: EventEmitter<any> = new EventEmitter<
		any
	>();

	public energyRatings = [
		{ name: 'A', value: '' },
		{ name: 'B', value: '' },
		{ name: 'C', value: '' },
		{ name: 'D', value: '' },
		{ name: 'E', value: '' },
		{ name: 'F', value: '' },
		{ name: 'G', value: '' },
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onModelChange(_event: any): void {
		this.onCommercialBuildingsChange.emit(this.commercialBuildingTypes);
	}
}
