/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';
@Component({
	selector: 'building-energy-use',
	templateUrl: './building-energy-use.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyUseComponent implements OnInit {
	@Input() componentType = '';
	@Input() title = '';
	@Input() emissionUnit = '';
	@Input() isEnergyUse = false;
	@Input() showTotal = false;
	@Input() isResult = false;
	@Input() isEnergyEmmission = false;
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
	public totalResidentialEnergyDemand = 0;
	public dataSource: any;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	ngOnInit(): void {
		this.dataSource = this.tableData;
		this.totalResidentialEnergyDemand = _.sumBy(
			this.tableData,
			'totalEnergyUse'
		);
	}

	getAverageEnergyUsePerBuilding(buildingType: any): number {
		return buildingType.averageEnergyUse;
	}

	getTotalEnergyUsePerBuilding(buildingType: any): number {
		return buildingType.totalEnergyUse;
	}
}
