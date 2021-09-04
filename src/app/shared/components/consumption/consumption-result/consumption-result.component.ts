/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { ProjectService } from '../../../../core/services/project.service';

@Component({
	selector: 'consumption-result',
	templateUrl: './consumption-result.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class ConsumptionResultComponent {
	public isLinear = false;
	public totalNewBuildArea = 700;

	public tableData = [
		{
			col1: 'Food: Plant-based',
			indirect: 2191,
			direct: 55.545,
			'use phase': '',
			total: '',
		},
		{
			col1: 'Food: Animal-based',
			indirect: 634,
			direct: 50.6,
			'use phase': '',
			total: '',
		},
		{
			col1: 'Food nec',
			indirect: 54,
			direct: 31.5,
			'use phase': '',
			total: '',
		},
		{
			col1: 'Clothing',
			indirect: 825,
			direct: 25.415,
			'use phase': '',
			total: '',
		},
		{
			col1: 'Vehicle purchases',
			indirect: 13,
			direct: 41.54,
			'use phase': '',
			total: '',
		},
		{
			col1: 'Transport fuels',
			indirect: 156,
			direct: 75.415,
			'use phase': 22.0,
			total: '',
		},
		{
			col1: 'Air travel',
			indirect: 156,
			direct: 99.99,
			'use phase': '',
			total: '',
		},
		{
			col1: 'Other transport services',
			indirect: 156,
			direct: 85.825,
			'use phase': 0.0,
			total: '',
		},
		{
			col1: 'Services',
			indirect: 156,
			direct: '',
			'use phase': 34.89,
			total: '',
		},
		{
			col1: 'Appliances',
			indirect: 156,
			direct: '',
			'use phase': 67.78,
			total: '',
		},
		{
			col1: 'Furniture, household commoties and misc',
			indirect: 156,
			direct: '',
			'use phase': '',
			total: '',
		},
		{
			col1: 'Shelter: Actual and imputed rent',
			indirect: 156,
			direct: '',
			'use phase': '',
			total: '',
		},
		{
			col1: 'Shelter: Electricity, heating and fuels',
			indirect: 156,
			direct: '',
			'use phase': '',
			total: '',
		},
		{
			col1: 'Shelter: Construction',
			indirect: 156,
			direct: '',
			'use phase': '',
			total: '',
		},
		{
			col1: 'Shelter: Waste treatment, water supply and misc',
			indirect: 156,
			direct: '',
			'use phase': '',
			total: '',
		},
		{ col1: 'NEC', indirect: 156, direct: '', 'use phase': '', total: '' },
	];

	public tableDataTotal = this.getTotal();

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

	constructor(
		private router: Router,
		private projectService: ProjectService
	) {
		console.log('projectService', projectService.getDraftProject());
	}

	createBaseline(): void {
		console.log(this.projectService.project);
		this.router.navigateByUrl('result-version');
	}

	getTotal(): number {
		return this.tableData
			.map((t: { total: any }) => t.total)
			.reduce((acc: any, value: any) => acc + value, 0);
	}
}
