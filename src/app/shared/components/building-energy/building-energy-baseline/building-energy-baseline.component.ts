import { Component } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import { IProject } from '../../../../../../commons/types/IProject';
import { BuildingEnergyCalculatorService } from '../../../../core/services/building-energy-calculator.service';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
	selector: 'building-energy-baseline',
	templateUrl: './building-energy-baseline.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyBaselineComponent {
	project: IProject;

	baseline: any;

	constructor(
		private router: Router,
		private projectService: ProjectService,
		private buildingEnergyCalculatorService: BuildingEnergyCalculatorService
	) {
		this.project = this.projectService.getDraftProject() as IProject;

		if (
			this.project &&
			this.project.territorial &&
			this.project.territorial.buildings &&
			this.project.territorial.buildings.versions.length
		) {
			this.baseline = this.project.territorial.buildings.baseline;
		} else {
			this.initBaseline();
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onModelChange(_event: any): void {
		if (
			this.project &&
			this.project.territorial &&
			this.project.territorial.buildings
		) {
			console.log(
				'model changed',
				this.project.territorial.buildings.baseline
			);

			//	this.project.territorial.buildings.baseline = this.baseline;
			//	this.projectService.updateDraftProject(this.project);
		}
	}

	createBaseline(): void {
		if (
			this.project &&
			this.project.territorial &&
			this.project.territorial.buildings
		) {
			console.log('baseline created', this.baseline);
			this.project.territorial.buildings.baseline = this.baseline;
			this.projectService.updateDraftProject(this.project);
		}

		this.router.navigateByUrl('result-version/buildings');
	}

	initProperties(buildingType: string): object {
		return {
			name: buildingType,
			numberOfUnits: 0,
			previousEnergyRating: 'G',
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
		};
	}

	initBaseline(): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const residentialBuildings = _.map(
			this.buildingEnergyCalculatorService.getResidentialBuildingTypes(),
			(building) => {
				return this.initProperties(building);
			}
		);

		const commercialBuildings = _.map(
			this.buildingEnergyCalculatorService.getCommercialBuildingTypes(),
			(building) => {
				return this.initProperties(building);
			}
		);

		this.project!.territorial!.buildings!.baseline = {
			residentialBuildings: residentialBuildings,
			commercialBuildings: commercialBuildings,
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

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.baseline = this.project!.territorial!.buildings!.baseline;
	}
}
