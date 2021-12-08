/* eslint-disable @typescript-eslint/no-explicit-any */
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
				'model changed-baseline',
				this.project.territorial.buildings.baseline
			);
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

	initBaseline(): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const residentialBuildings = _.map(
			this.buildingEnergyCalculatorService.getResidentialBuildingTypes(),
			(building) => {
				return this.buildingEnergyCalculatorService.initProperties(
					building
				);
			}
		);

		const commercialBuildings = _.map(
			this.buildingEnergyCalculatorService.getCommercialBuildingTypes(),
			(building) => {
				return this.buildingEnergyCalculatorService.initProperties(
					building
				);
			}
		);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
