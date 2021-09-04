import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import _ from 'lodash';

import { ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { IProject } from '../../../../../commons/types/IProject';
import { ProjectService } from '../../../core/services/project.service';

@Component({
	selector: 'result-and-version',
	templateUrl: './result-and-version.component.html',
	styleUrls: ['./result-and-version.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ResultAndVersionComponent {
	@Input() backgroundColor: ThemePalette;

	public myProject: IProject;
	public selectedModules: string[] = [];

	landuse = true;
	trafic = false;
	buildings = true;
	consumption = true;

	constructor(
		private router: Router,
		private projectService: ProjectService
	) {
		const currentProject = this.projectService.getDraftProject();
		if (!currentProject || !currentProject.name) {
			this.router.navigateByUrl('setup-project');
		}

		this.myProject = currentProject as IProject;
		this.selectedModules = _.keys(this.myProject.territorial);
		if (this.myProject.consumption) {
			this.selectedModules.push('consumption');
		}
	}

	getSelected(newItem: any) {
		if (newItem.name == 'landuse') {
			this.landuse = newItem.value;
		}
		if (newItem.name == 'trafic') {
			this.trafic = newItem.value;
		}
		if (newItem.name == 'buildings') {
			this.buildings = newItem.value;
		}
		if (newItem.name == 'consumption') {
			this.consumption = newItem.value;
		}
	}

	barChartOptions: any = {
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
	barChartLabels: Label[] = [
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
	barChartType: ChartType = 'bar';
	barChartLegend = true;
	barChartPlugins = [];

	barChartData: ChartDataSets[] = [
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

	getTotal() {
		return this.tableData
			.map((t) => t.col2)
			.reduce((acc, value) => acc + value, 0);
	}
}
