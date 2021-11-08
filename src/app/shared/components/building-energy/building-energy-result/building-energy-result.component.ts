/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'building-energy-result',
	templateUrl: './building-energy-result.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyResultComponent implements OnInit {
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
		['Gas'],
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

	public residentialData = [
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

	public commercialData = [
		{
			EnergyUse: 'Retal',
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
			EnergyUse: 'Health',
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
			EnergyUse: 'Hospitality',
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
			EnergyUse: 'Offices',
			Electricity: 1,
			Gas: 1,
			Oil: 1,
			Coal: 1,
			Peat: 1,
			Wood: 1,
			Renewable: 1,
			Heat: 1,
		},
		{
			EnergyUse: 'Industrial',
			Electricity: 1,
			Gas: 1,
			Oil: 1,
			Coal: 1,
			Peat: 1,
			Wood: 1,
			Renewable: 1,
			Heat: 1,
		},
		{
			EnergyUse: 'Warehouses',
			Electricity: 1,
			Gas: 1,
			Oil: 1,
			Coal: 1,
			Peat: 1,
			Wood: 1,
			Renewable: 1,
			Heat: 1,
		},
		{
			EnergyUse: 'Other',
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

	ngOnInit(): void {
		console.log('residentialData', this.residentialData);
	}
}
