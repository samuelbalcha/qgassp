/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'building-energy-use',
	templateUrl: './building-energy-use.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyUseComponent implements OnInit {
	@Input() componentType = '';
	@Input() title = '';
	@Input() emissionValue = '';
	@Input() emissionUnit = '';
	@Input() isEnergyUse = false;
	@Input() isEnergyEmmission = false;
	@Input() tableData: any;

	public displayedColumns: string[] = [
		'EnergyUse',
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

	public dataSource: any;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	ngOnInit(): void {
		this.dataSource = this.tableData;
	}

	getTotalElectricity(): number {
		return 5;
	}
	getTotalGas(): number {
		return 5;
	}
	getTotalOil(): number {
		return 5;
	}
	getTotalCoal(): number {
		return 5;
	}
	getTotalPeat(): number {
		return 5;
	}
	getTotalWood(): number {
		return 5;
	}
	getTotalHeat(): number {
		return 5;
	}
	getTotalTotal(index: number): number {
		return 5 * index;
	}
	getTotalAll(): number {
		return 5;
	}

	/*
	getTotalElectricity(): number {
		return this.dataSource
			.map((t) => t.Electricity)
			.reduce((acc, value) => acc + value, 0);
	}
	getTotalGas(): number {
		return this.dataSource
			.map((t) => t.Gas)
			.reduce((acc, value) => acc + value, 0);
	}
	getTotalOil(): number {
		return this.dataSource
			.map((t) => t.Oil)
			.reduce((acc, value) => acc + value, 0);
	}
	getTotalCoal(): number {
		return this.dataSource
			.map((t) => t.Coal)
			.reduce((acc, value) => acc + value, 0);
	}
	getTotalPeat(): number {
		return this.dataSource
			.map((t) => t.Peat)
			.reduce((acc, value) => acc + value, 0);
	}
	getTotalWood(): number {
		return this.dataSource
			.map((t) => t.Wood)
			.reduce((acc, value) => acc + value, 0);
	}
	getTotalHeat(): number {
		return this.dataSource
			.map((t) => t.Heat)
			.reduce((acc, value) => acc + value, 0);
	}

	getTotalAll(): number {
		return this.dataSource
			.map((t) => t.Total)
			.reduce((acc, value) => acc + value, 0);
	}
	getTotalTotal(i: any): number {
		let sum = 0;
		sum =
			sum +
			this.dataSource[i].Electricity +
			this.dataSource[i].Gas +
			this.dataSource[i].Oil +
			this.dataSource[i].Coal +
			this.dataSource[i].Peat +
			this.dataSource[i].Wood +
			this.dataSource[i].Heat;

		return sum;
	}
	*/
}
