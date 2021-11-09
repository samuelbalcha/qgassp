/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import _ from 'lodash';

import { IProject } from '../../../../../../commons/types/IProject';
import { ProjectService } from '../../../../core/services/project.service';
import { UtilService } from '../../../../core/services/util.service';

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

	public residentialHousingLabel: Label[] = [
		['Apartment'],
		['Terraced'],
		['Semi-detached'],
		['Detached'],
	];

	public shareOfResidentialHousingData: SingleDataSet = [];
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

	public project: any;

	constructor(
		private projectService: ProjectService,
		private utilService: UtilService
	) {
		this.project = this.projectService.getDraftProject() as IProject;
	}

	ngOnInit(): void {
		this.project = this.utilService.getBuildingEnergyBaselineResult(
			this.project
		);

		console.log('result', this.project);
		this.projectService.updateDraftProject(this.project);

		this.initPieCharts();
	}

	initPieCharts(): void {
		const totalResidentialUnits = _.sumBy(
			this.project.territorial.buildings.baseline.residentialBuildings,
			'numberOfUnits'
		);

		this.shareOfResidentialHousingData = _.map(
			this.project.territorial.buildings.baseline.residentialBuildings,
			(item) => {
				const share =
					(item.numberOfUnits / totalResidentialUnits) * 100;
				return Math.round(share);
			}
		);
	}
}
