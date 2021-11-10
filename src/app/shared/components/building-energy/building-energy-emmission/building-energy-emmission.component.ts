/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import _ from 'lodash';
@Component({
	selector: 'building-energy-emmission',
	templateUrl: './building-energy-emmission.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyEmmissionComponent {
	@Input() componentType = '';
	@Input() title = '';
	@Input() emissionUnit = '';
	@Input() showTotal = false;
	@Input() tableData: any;

	public displayedColumns: string[] = [
		'name',
		'Electricity',
		'Gas',
		'Oil',
		'Coal',
		'Peat',
		'Wood',
		'Renewable',
		'Heat',
		'Total',
	];

	public totalEmissions = 0;
	public dataSource: any;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	ngOnInit(): void {
		this.dataSource = this.tableData;
		this.totalEmissions = _.sumBy(this.tableData, 'totalEnergyEmission');
	}

	getTotalEnergyEmissionPerBuilding(buildingType: any): number {
		return buildingType.totalEnergyEmission;
	}
}
