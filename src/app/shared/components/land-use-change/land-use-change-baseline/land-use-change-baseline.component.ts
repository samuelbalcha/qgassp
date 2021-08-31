/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { LandTypes } from '../../../../../enums/LandTypes';

@Component({
	selector: 'land-use-change-baseline',
	templateUrl: './land-use-change-baseline.component.html',
	styleUrls: ['./../land-use-change.component.scss'],
})
export class LandUseChangeBaselineComponent implements OnInit {
	panelOpenState = false;
	public landTypes: LandTypes[];

	public fromLandType = '';
	public fromSelectedLandType = '';
	public toLandType = '';
	public toSelectedLandType = '';

	constructor() {
		this.landTypes = Object.values(LandTypes);
	}

	ngOnInit(): void {}

	onFromLandTypeSelected(): void {
		this.fromLandType = this.fromSelectedLandType;
	}

	onToLandTypeSelected(): void {
		this.toLandType = this.toSelectedLandType;
	}
}
