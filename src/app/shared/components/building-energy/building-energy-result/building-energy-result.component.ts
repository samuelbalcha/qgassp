/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'building-energy-result',
	templateUrl: './building-energy-result.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyResultComponent {
	constructor() {}

	public pieChartOptions: ChartOptions = {
		responsive: false,
		title: {
			text: 'Emission from policy changes',
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
	public horiChartOptions: ChartOptions = {
		responsive: false,
		title: {
			text: 'Emission from policy changes',
			display: true,
		},
		legend: {
			display: false,
		},
	};
	public horiChartLabels: Label[] = [
		['Retrofit'],
		['Demotion'],
		['Construction'],
	];
	public horiChartData: SingleDataSet = [50, -200, 150];
	public horiChartType: ChartType = 'horizontalBar';
}
