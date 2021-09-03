import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts/public_api';

@Component({
	selector: 'co2-emission-chart',
	templateUrl: './co2-emission-chart.component.html',
	styleUrls: ['./co2-emission-chart.component.scss'],
})
export class Co2EmissionChartComponent implements OnInit {
	@Input() chartTitle = 'bar';
	@Input() chartType: ChartType = 'bar';
	@Input() chartLegend = true;
	@Input() chartDataSet = [];

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

	ngOnInit(): void {
		console.log('chart component');
	}
}
