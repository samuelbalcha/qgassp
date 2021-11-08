/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'residential-buildings',
	templateUrl: './residential-buildings.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class ResidentialBuildingsComponent {
	@Input() isBaseLine = false;
	@Input() showTotalFloorArea = false;
	@Input() showEnergyRating = false;
	@Input() showNumberOfUnits = false;
	@Input() showCarbonHeatAndElectricity = false;
	@Input() residentialBuildingTypes: any;
	@Output() onResidentialBuildingsChange: EventEmitter<
		any
	> = new EventEmitter<any>();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onModelChange(_event: any): void {
		this.onResidentialBuildingsChange.emit(this.residentialBuildingTypes);
	}
}
