/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { LandTypes } from '../../../../enums/LandTypes';

@Component({
	selector: 'location-use-change',
	templateUrl: './land-use-change.component.html',
	styleUrls: ['./land-use-change.component.scss'],
})
export class LandUseChangeComponent {
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
	}
}
