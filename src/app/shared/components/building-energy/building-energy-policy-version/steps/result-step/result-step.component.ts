import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'result-step',
	templateUrl: './result-step.component.html',
	styleUrls: ['./../../../building-energy.component.scss'],
})
export class ResultStepComponent implements OnInit {
	@Input() chartTitle = '';
	@Input() residentialBuildingTypes: any;
	@Input() commercialBuildingTypes: any;

	constructor() {}

	public chartOptions: ChartOptions = {
		responsive: false,
		title: {
			text: this.chartTitle,
			display: true,
		},
		legend: {
			display: false,
		},
	};

	public chartLabels: Label[] = [
		['Emission from retrofit'],
		['Emission from demolition'],
		['Emission from  construction'],
	];

	public chartData: SingleDataSet = [50, -200, 150];

	ngOnInit(): void {}
}
