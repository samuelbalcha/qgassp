/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { LandTypes } from '../../../../../enums/LandTypes';

@Component({
	selector: 'land-use-change-result',
	templateUrl: './land-use-change-result.component.html',
	styleUrls: ['./../land-use-change.component.scss'],
})
export class LandUseChangeResultComponent {
	public landTypes: LandTypes[];

	public fromLandType = '';
	public fromSelectedLandType = '';
	public toLandType = '';
	public toSelectedLandType = '';

	public barChartOptions: any = {
		responsive: false,
		aspectRatio: 1,
		scales: {
			xAxes: [
				{
					gridLines: {
						display: false,
					},
				},
			],
			yAxes: [
				{
					gridLines: {
						display: false,
					},
				},
			],
		},
	};

	public barChartLabels: Label[] = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
	];

	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartPlugins = [];

	public barChartData: ChartDataSets[] = [
		{
			data: [2, -1, -5, -3, 1, 3, 4, 2, 3, 2.5, 2.4, 2, 1, 1.8],
			label: '1.Version',
			barThickness: 8,
			backgroundColor: '#214E9C',
		},
		{
			data: [1, -2, 3, -1, -2, -3, 4, 2, 3, 2.5, 2.4, 2, 1, 1.8],
			label: '2.Version',
			barThickness: 8,
			backgroundColor: '#6BAD2B',
		},
	];

	public displayedColumns = ['col1', 'col2'];

	tableData = [
		{ col1: 'Aboveground Biomas', col2: 2191 },
		{ col1: 'Belowground Biomas', col2: 634 },
		{ col1: 'Deadwood', col2: 54 },
		{ col1: 'Litter', col2: 825 },
		{ col1: 'Mineral soil', col2: 13 },
		{ col1: 'Organic soin', col2: 156 },
	];

	toFromdata = [
		{ to: 'grassLand', from: 'Settelment' },
		{ to: 'Settelment', from: 'grassLand' },
		{ to: 'grassLand', from: 'grassLand' },
		{ to: 'Settelment', from: 'grassLand' },
		{ to: 'grassLand', from: 'Settelment' },
		{ to: 'Settelment', from: 'Settelment' },
	];

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
