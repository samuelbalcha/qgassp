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

	public commercialHousingLabel: Label[] = [
		['Retal'],
		['Health'],
		['Hospitality'],
		['Offices'],
		['Industrial'],
		['Warehouses'],
	];

	public fuelTypesLabel: Label[] = [
		['Electricity'],
		['Gas'],
		['Oil'],
		['Coal'],
		['Peat'],
		['Wood'],
		['Renewable'],
		['Heat'],
	];

	public shareOfResidentialHousingData: SingleDataSet = [];
	public shareOfCommercialHousingData: SingleDataSet = [];
	public shareOfResidentialEmissionByFuelTypeData: SingleDataSet = [];
	public shareOfCommercialEmissionByFuelTypeData: SingleDataSet = [];
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
	) {}

	ngOnInit(): void {
		this.project = this.projectService.getDraftProject() as IProject;
		this.project = this.utilService.getBuildingEnergyBaselineResult(
			this.project
		);
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

		const totalCommercialFloors = _.sumBy(
			this.project.territorial.buildings.baseline.commercialBuildings,
			'totalFloorArea'
		);

		this.shareOfCommercialHousingData = _.map(
			this.project.territorial.buildings.baseline.commercialBuildings,
			(item) => {
				const share =
					(item.totalFloorArea / totalCommercialFloors) * 100;
				return Math.round(share);
			}
		);

		this.shareOfResidentialEmissionByFuelTypeData = _.map(
			this.calculateResidentialEnergyEmissionShare(
				this.project.territorial.buildings.baseline.residentialBuildings
			),
			(item) => {
				return item * 100;
			}
		);

		this.shareOfCommercialEmissionByFuelTypeData = _.map(
			this.calculateResidentialEnergyEmissionShare(
				this.project.territorial.buildings.baseline.commercialBuildings
			),
			(item) => {
				return item * 100;
			}
		);
	}

	calculateResidentialEnergyEmissionShare(buildingType: any): number[] {
		const totalEnergyEmission = _.sumBy(
			buildingType,
			'totalEnergyEmission'
		);

		const electricityShare = _.sumBy(
			buildingType,
			'emissionResult.Electricity'
		);

		const gasShare = _.sumBy(buildingType, 'emissionResult.Gas');
		const oilShare = _.sumBy(buildingType, 'emissionResult.Oil');
		const coalShare = _.sumBy(buildingType, 'emissionResult.Coal');
		const peatShare = _.sumBy(buildingType, 'emissionResult.Peat');
		const woodShare = _.sumBy(buildingType, 'emissionResult.Wood');
		const renewableShare = _.sumBy(
			buildingType,
			'emissionResult.Renewable'
		);
		const heatShare = _.sumBy(buildingType, 'emissionResult.Heat');

		return [
			Math.round((electricityShare / totalEnergyEmission) * 100) / 100,
			Math.round((gasShare / totalEnergyEmission) * 100) / 100,
			Math.round((oilShare / totalEnergyEmission) * 100) / 100,
			Math.round((coalShare / totalEnergyEmission) * 100) / 100,
			Math.round((peatShare / totalEnergyEmission) * 100) / 100,
			Math.round((woodShare / totalEnergyEmission) * 100) / 100,
			Math.round((renewableShare / totalEnergyEmission) * 100) / 100,
			Math.round((heatShare / totalEnergyEmission) * 100) / 100,
		];
	}
}
