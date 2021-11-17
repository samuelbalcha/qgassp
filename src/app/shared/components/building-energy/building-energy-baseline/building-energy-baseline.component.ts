import { Component } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import { IProject } from '../../../../../../commons/types/IProject';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
	selector: 'building-energy-baseline',
	templateUrl: './building-energy-baseline.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyBaselineComponent {
	public resindetialTotalNumberOfHousingUnits = 0;
	public commercialTotalFloorArea = 0;

	public residentialBuildingTypes = [
		{
			name: 'Apartment',
			numberOfUnits: 0,
			previousEnergyRating: 'RE',
			plannedEnergyRating: 'E',
			carbonHeat: '78',
			electricity: '-',
			energyUse: {
				Electricity: 4158,
				Gas: 5147.4,
				Oil: 375,
				Coal: 3.6,
				Peat: 1.4,
				Wood: 15.8,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Terraced',
			numberOfUnits: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'P',
			carbonHeat: '78',
			electricity: '-',
			energyUse: {
				Electricity: 2216,
				Gas: 9980,
				Oil: 4183.6,
				Coal: 37.7,
				Peat: 10,
				Wood: 28,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Semi-detached',
			numberOfUnits: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '78',
			electricity: '-',
			energyUse: {
				Electricity: 2223,
				Gas: 9469.8,
				Oil: 3862.8,
				Coal: 69.3,
				Peat: 7.7,
				Wood: 335,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Detached',
			numberOfUnits: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '78',
			electricity: '-',
			energyUse: {
				Electricity: 4261,
				Gas: 6776.5,
				Oil: 17358.3,
				Coal: 65.3,
				Peat: 21,
				Wood: 776.6,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
	];

	public commercialBuildingTypes = [
		{
			name: 'Retal',
			totalFloorArea: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: '160/E',
			carbonHeat: '90',
			electricity: '-',
			energyUse: {
				Electricity: 165,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Health',
			totalFloorArea: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'P',
			carbonHeat: '90',
			electricity: '-',
			energyUse: {
				Electricity: 420,
				Gas: 32.41,
				Oil: 27.01,
				Coal: 0,
				Peat: 2.52,
				Wood: 3.06,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Hospitality',
			totalFloorArea: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
			energyUse: {
				Electricity: 350,
				Gas: 64.82,
				Oil: 54.02,
				Coal: 0,
				Peat: 5.04,
				Wood: 6.12,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Offices',
			totalFloorArea: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
			energyUse: {
				Electricity: 120,
				Gas: 47.37,
				Oil: 39.47,
				Coal: 0,
				Peat: 3.68,
				Wood: 4.48,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Industrial',
			totalFloorArea: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
			energyUse: {
				Electricity: 129.6,
				Gas: 96.93,
				Oil: 80.78,
				Coal: 0,
				Peat: 7.54,
				Wood: 9.15,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		{
			name: 'Warehouses',
			totalFloorArea: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
			energyUse: {
				Electricity: 160,
				Gas: 17.45,
				Oil: 14.54,
				Coal: 0,
				Peat: 1.36,
				Wood: 1.65,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},
		/*
		{
			name: 'Other',
			totalFloorArea: 0,
			previousEnergyRating: 'E',
			plannedEnergyRating: 'E',
			carbonHeat: '90',
			electricity: '-',
			energyUse: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			energyUseResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			emissionResult: {
				Electricity: 0,
				Gas: 0,
				Oil: 0,
				Coal: 0,
				Peat: 0,
				Wood: 0,
				Renewable: 0,
				Heat: 0,
			},
			averageEnergyUse: 0,
			totalEnergyUse: 0,
			totalEnergyEmission: 0,
			weightedAverageEnergyUse: 0,
		},*/
	];

	project: IProject;

	baseline = {
		residentialBuildings: this.residentialBuildingTypes,
		commercialBuildings: this.commercialBuildingTypes,
		endUseOfEnergy: [
			{
				useType: 'Space Heating',
				amount: 76,
			},
			{
				useType: 'Water Heating',
				amount: 19,
			},
			{
				useType: 'Light & Appliance',
				amount: 4,
			},
			{
				useType: 'Pumps & Fans',
				amount: 1,
			},
		],
	};

	constructor(
		private router: Router,
		private projectService: ProjectService
	) {
		this.project = this.projectService.getDraftProject() as IProject;
		this.addTotal();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onModelChange(_event: any): void {
		this.addTotal();
	}

	addTotal(): void {
		this.resindetialTotalNumberOfHousingUnits = _.sumBy(
			this.residentialBuildingTypes,
			'numberOfUnits'
		);

		this.commercialTotalFloorArea = _.sumBy(
			this.commercialBuildingTypes,
			'totalFloorArea'
		);

		if (
			this.project &&
			this.project.territorial &&
			this.project.territorial.buildings
		) {
			this.project.territorial.buildings.baseline = this.baseline;
			this.projectService.updateDraftProject(this.project);
		}
	}

	createBaseline(): void {
		if (
			this.project &&
			this.project.territorial &&
			this.project.territorial.buildings
		) {
			this.project.territorial.buildings.baseline = this.baseline;
			this.projectService.updateDraftProject(this.project);
		}

		this.router.navigateByUrl('result-version/buildings');
	}
}
