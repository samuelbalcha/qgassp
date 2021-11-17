/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import _ from 'lodash';

import { ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { IProject } from '../../../../../commons/types/IProject';
import { ProjectService } from '../../../core/services/project.service';
import { UtilService } from '../../../core/services/util.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'result-and-version',
	templateUrl: './result-and-version.component.html',
	styleUrls: ['./result-and-version.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ResultAndVersionComponent implements OnInit {
	@Input() backgroundColor: ThemePalette;

	selectedTab = new FormControl(0);

	tabs: any = {
		landuse: 0,
		transport: 1,
		buildings: 2,
		consumption: 3,
	};

	public myProject: IProject;
	public selectedModules: string[] = [];

	landuse = true;
	trafic = false;
	buildings = true;
	consumption = true;

	constructor(
		private router: Router,
		private projectService: ProjectService,
		public utilService: UtilService,
		private route: ActivatedRoute
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

	getSelected(newItem: any): void {
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

	tabName: any = {};

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.tabName = params;
		});

		const tabIndex = this.tabs[this.tabName.tabName];
		this.selectedTab.setValue(tabIndex);
	}
}
