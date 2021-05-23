import { Component } from '@angular/core';

import { LandTypes } from '../../../../../enums/LandTypes';

@Component({
	selector: 'land-use-step',
	templateUrl: './land-use-step.component.html',
	styleUrls: ['./../steps.scss'],
})
export class LandUseStepComponent {
	public landTypes: LandTypes[];

	public fromLandType = '';
	public fromSelectedLandType = '';
	public toLandType = '';
	public toSelectedLandType = '';

	constructor() {
		this.landTypes = Object.values(LandTypes);
	}

	onFromLandTypeSelected(): void {
		this.fromLandType = this.fromSelectedLandType;
	}

	onToLandTypeSelected(): void {
		this.toLandType = this.toSelectedLandType;
		// this.dataSource[0].transformation = `${this.fromSelectedLandType} to ${this.toSelectedLandType}`;
	}
}
