/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';
@Component({
	selector: 'total-building-energy-emission',
	templateUrl: './total-building-energy-emission.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class TotalBuildingEnergyEmissionComponent implements OnInit {
	@Input() title = '';
	@Input() emissionUnit = '';
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

	public totalEnergyDemand = 0;
	public dataSource: any;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	ngOnInit(): void {
		this.dataSource = this.tableData;
		this.totalEnergyDemand = _.sumBy(this.tableData, 'totalEnergyUse');
	}
	/*
	getAverageEnergyUsePerBuilding(buildingType: any): number {
		return buildingType.averageEnergyUse;
	}

	getTotalEnergyUsePerBuilding(buildingType: any): number {
		return buildingType.totalEnergyUse;
	}
	*/
}
