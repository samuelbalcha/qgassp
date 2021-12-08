/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import _ from 'lodash';

import { IProject } from '../../../../../../commons/types/IProject';
import { ProjectService } from '../../../../core/services/project.service';
import { BuildingEnergyCalculatorService } from '../../../../core/services/building-energy-calculator.service';

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
		['Retail'],
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

	public totalEmissions: any;

	constructor(
		private projectService: ProjectService,
		private buildingEnergyCalculatorService: BuildingEnergyCalculatorService
	) {}

	ngOnInit(): void {
		this.project = this.projectService.getDraftProject() as IProject;

		this.project = this.buildingEnergyCalculatorService.getBuildingEnergyBaselineResult(
			this.project
		);

		const version = this.buildingEnergyCalculatorService.initPolicyVersion();
		console.log('version', version);

		this.project.territorial.buildings.versions = [version];
		this.projectService.updateDraftProject(this.project);

		this.initPieCharts();

		this.totalEmissions = [
			{
				name: 'Residential',
				energyUseResult: {
					Electricity: 4158,
					Gas: 5147.4,
					Oil: 375,
					Coal: 3.6,
					Peat: 1.4,
					Wood: 15.8,
					Renewable: 0,
					Heat: 0,
				},
			},
			{
				name: 'Commercial',
				energyUseResult: {
					Electricity: 4158,
					Gas: 5147.4,
					Oil: 375,
					Coal: 3.6,
					Peat: 1.4,
					Wood: 15.8,
					Renewable: 0,
					Heat: 0,
				},
			},
		];
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
			this.buildingEnergyCalculatorService.calculateResidentialEnergyEmissionShare(
				this.project.territorial.buildings.baseline.residentialBuildings
			),
			(item) => {
				return item * 100;
			}
		);

		this.shareOfCommercialEmissionByFuelTypeData = _.map(
			this.buildingEnergyCalculatorService.calculateResidentialEnergyEmissionShare(
				this.project.territorial.buildings.baseline.commercialBuildings
			),
			(item) => {
				return item * 100;
			}
		);
	}
}
