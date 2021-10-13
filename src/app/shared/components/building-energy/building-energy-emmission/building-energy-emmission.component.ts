/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'building-energy-emmission',
	templateUrl: './building-energy-emmission.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyEmmissionComponent {
	@Input() componentType = '';
	@Input() title = '';
	@Input() emissionValue = '';
	@Input() emissionUnit = '';
	@Input() isEnergyUse = false;
	@Input() isEnergyEmmission = false;
	@Input() pieChartTitle = '';

	// change it as in
	ELEMENT_DATA = [
		{
			EnergyUse: 'Apartments',
			Electricity: 124578933,
			Gas: 1,
			Oil: 2,
			Coal: 12345,
			Peat: 1234,
			Wood: 123455,
			Renewable: 1234,
			Heat: 1232344,
		},
		{
			EnergyUse: 'Terrace',
			Electricity: 124578933,
			Gas: 1,
			Oil: 2,
			Coal: 12345,
			Peat: 1234,
			Wood: 123455,
			Renewable: 1234,
			Heat: 1232344,
		},
		{
			EnergyUse: 'Semi-detached',
			Electricity: 124578933,
			Gas: 2,
			Oil: 2,
			Coal: 12345,
			Peat: 1234,
			Wood: 123455,
			Renewable: 1234,
			Heat: 1232344,
		},
		{
			EnergyUse: 'Detached',
			Electricity: 1,
			Gas: 1,
			Oil: 1,
			Coal: 1,
			Peat: 1,
			Wood: 1,
			Renewable: 1,
			Heat: 1,
		},
	];

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

	public dataSource;

	public pieChartOptions: ChartOptions = {
		responsive: false,
		title: {
			text: '',
			display: true,
		},
	};
	public pieChartLabels: Label[] = [
		['Coal'],
		['Peat'],
		['Wood'],
		['Electricity'],
		['gas'],
		['Oil'],
	];
	public pieChartData: SingleDataSet = [0.33, 0.09, 3, 26, 25, 46];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];

	constructor() {
		this.dataSource = this.constactTableData();
	}

	constactTableData(): any[] {
		const tableData = [];

		for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
			let sum = 0;
			const obj: { [k: string]: any } = this.ELEMENT_DATA[i];
			sum =
				sum +
				this.ELEMENT_DATA[i].Electricity +
				this.ELEMENT_DATA[i].Gas +
				this.ELEMENT_DATA[i].Oil +
				this.ELEMENT_DATA[i].Coal +
				this.ELEMENT_DATA[i].Peat +
				this.ELEMENT_DATA[i].Wood +
				this.ELEMENT_DATA[i].Heat;

			obj.Total = sum;
			tableData.push(obj);
		}

		return tableData;
	}

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
}
