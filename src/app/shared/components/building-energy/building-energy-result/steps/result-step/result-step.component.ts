import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'result-step',
	templateUrl: './result-step.component.html',
	styleUrls: ['./../../../building-energy.component.scss'],
})
export class ResultStepComponent {
	@Input() chartTitle = '';

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
		['Retrofit'],
		['Densification'],
		['Building change'],
	];
	public chartData: SingleDataSet = [50, -200, 150];
}
