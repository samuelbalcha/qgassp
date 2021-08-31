/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
import { LandTypes } from '../../../../../enums/LandTypes';

@Component({
	selector: 'co2-emission-summary',
	templateUrl: './co2-emission-summary.component.html',
	styleUrls: ['./../land-use-change.component.scss'],
})
export class Co2EmissionSummaryComponent {
	@Input() isBaseLine = false;
	@Input() tableData: any;
	@Input() toFromdata: any;

	public landTypes: LandTypes[];

	public fromLandType = '';
	public fromSelectedLandType = '';
	public toLandType = '';
	public toSelectedLandType = '';

	public displayedColumns = ['col1', 'col2'];

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	getTotal() {
		return this.tableData
			.map((t: { col2: any }) => t.col2)
			.reduce((acc: any, value: any) => acc + value, 0);
	}

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
