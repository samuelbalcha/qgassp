/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import _ from 'lodash';

import { IProject } from '../../../../commons/types/IProject';

@Injectable()
export class BuildingEnergyCalculatorService {
	constructor() {}

	initProperties(buildingType: string): object {
		return {
			name: buildingType,
			numberOfUnits: 0,
			totalFloorArea: 0,
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

	initPolicyVersion(): object {
		const version = {
			residentialBuildings: {
				newConstruction: _.map(
					this.getResidentialBuildingTypes(),
					(building) => {
						return this.initProperties(building);
					}
				),
				retrofit: _.map(
					this.getResidentialBuildingTypes(),
					(building) => {
						return this.initProperties(building);
					}
				),
			},
			commercialBuildings: {
				newConstruction: _.map(
					this.getCommercialBuildingTypes(),
					(building) => {
						return this.initProperties(building);
					}
				),
				retrofit: _.map(
					this.getCommercialBuildingTypes(),
					(building) => {
						return this.initProperties(building);
					}
				),
			},
			densification: {
				changeInBuildings: {
					residentialToCommecial: [],
					commercialToResidential: [],
				},
				changeInDensity: {
					totalNumberOfBuildings: 0,
					totalFloorArea: 0,
					currentDensity: 0,
					currentShareOfResidentialUnits: 0,
					currentShareOfCommercialUnits: 0,
					increaseDensityTo: 0,
					shareOfUnitsByType: {
						residential: 50,
						commercial: 50,
					},
				},
			},
		};

		return version;
	}

	getResidentialBuildingTypes(): string[] {
		return ['Apartment', 'Terraced', 'Semi-detached', 'Detached'];
	}

	getCommercialBuildingTypes(): string[] {
		return [
			'Retail',
			'Health',
			'Hospitality',
			'Offices',
			'Industrial',
			'Warehouses',
		];
	}

	getBuildingEnergyBaselineResult(project: IProject): IProject {
		const baseline = project.territorial?.buildings?.baseline;
		const emissionFactor = this.getBuildingEnergyEmissionFactor(
			project.location.country
		);

		for (const residentialBuilding of baseline?.residentialBuildings) {
			this.getAverageEnergyUsePerBuilding(residentialBuilding);
			this.getTotalEnergyUsePerBuilding(residentialBuilding);
			this.calculateResidentialEnergyEmission(
				residentialBuilding,
				emissionFactor
			);
			this.getTotalEnergyEmissionPerBuilding(residentialBuilding);
		}

		for (const commercialBuilding of baseline?.commercialBuildings) {
			this.getAverageEnergyUsePerBuilding(commercialBuilding);
			this.getTotalEnergyUsePerBuilding(commercialBuilding);
			this.calculateResidentialEnergyEmission(
				commercialBuilding,
				emissionFactor
			);
			this.getTotalEnergyEmissionPerBuilding(commercialBuilding);
		}

		return project;
	}

	getAverageEnergyUsePerBuilding(buildingType: any): number {
		const values = Object.values(buildingType.energyUse);
		const averageEnergyUse = _.sum(values);
		buildingType.averageEnergyUse = averageEnergyUse;

		if (buildingType.numberOfUnits) {
			this.calculateResidentialAverageEnergyUse(buildingType);
		}
		if (buildingType.totalFloorArea) {
			this.calculateCommercialAverageEnergyUse(buildingType);
		}

		return averageEnergyUse;
	}

	getTotalEnergyUsePerBuilding(buildingType: any): number {
		const values = Object.values(buildingType.energyUseResult);
		const totalEnergyUsePerBuildingType = _.sum(values);
		buildingType.totalEnergyUse = totalEnergyUsePerBuildingType;

		return totalEnergyUsePerBuildingType;
	}

	calculateResidentialAverageEnergyUse(buildingType: any): void {
		const shareOfUnits = buildingType.numberOfUnits / 1000;
		const averageEnergyUse = buildingType.averageEnergyUse;

		buildingType.energyUseResult = {
			Electricity:
				Math.round(
					((averageEnergyUse *
						shareOfUnits *
						buildingType.energyUse.Electricity) /
						averageEnergyUse) *
						100
				) / 100,
			Gas:
				Math.round(
					((averageEnergyUse *
						shareOfUnits *
						buildingType.energyUse.Gas) /
						averageEnergyUse) *
						100
				) / 100,
			Oil:
				Math.round(
					((averageEnergyUse *
						shareOfUnits *
						buildingType.energyUse.Oil) /
						averageEnergyUse) *
						100
				) / 100,
			Coal:
				Math.round(
					((averageEnergyUse *
						shareOfUnits *
						buildingType.energyUse.Coal) /
						averageEnergyUse) *
						100
				) / 100,
			Peat:
				Math.round(
					((averageEnergyUse *
						shareOfUnits *
						buildingType.energyUse.Peat) /
						averageEnergyUse) *
						100
				) / 100,
			Wood:
				Math.round(
					((averageEnergyUse *
						shareOfUnits *
						buildingType.energyUse.Wood) /
						averageEnergyUse) *
						100
				) / 100,
			Renewable:
				(averageEnergyUse *
					shareOfUnits *
					buildingType.energyUse.Renewable) /
				averageEnergyUse,
			Heat:
				(averageEnergyUse *
					shareOfUnits *
					buildingType.energyUse.Heat) /
				averageEnergyUse,
		};
	}

	getBuildingEnergyEmissionFactor(country: string): number {
		const data = {
			Austria: 0.17,
			Belgium: 0.198,
			Bulgaria: 0.791,
			Croatia: 0.204,
			Cyprus: 0.707,
			'Czech Republic': 0.783,
			Denmark: 0.331,
			Estonia: 1.977,
			Finland: 0.155,
			France: 0.082,
			Germany: 0.587,
			Greece: 0.757,
			Hungary: 0.254,
			Ireland: 0.464,
			Italy: 0.343,
			Latvia: 0.121,
			Lithuania: 0.096,
			Luxembourg: 0.091,
			Malta: 0.871,
			Netherlands: 0.429,
			Poland: 1.013,
			Portugal: 0.314,
			Romania: 0.502,
			'Slovak Republic': 0.199,
			Slovenia: 0.399,
			Spain: 0.297,
			Sweden: 0.015,
			'United-Kingdom': 0.515,
		};

		return _.get(data, `${country}`);
	}

	calculateResidentialEnergyEmission(
		buildingType: any,
		emissionFactor: number
	): void {
		buildingType.emissionResult = {
			Electricity:
				Math.round(
					emissionFactor *
						buildingType.energyUseResult.Electricity *
						100
				) / 100,
			Gas:
				Math.round(0.202 * buildingType.energyUseResult.Gas * 100) /
				100,
			Oil:
				Math.round(0.267 * buildingType.energyUseResult.Oil * 100) /
				100,
			Coal:
				Math.round(0.354 * buildingType.energyUseResult.Coal * 100) /
				100,
			Peat:
				Math.round(0.382 * buildingType.energyUseResult.Peat * 100) /
				100,
			Wood:
				Math.round(0.403 * buildingType.energyUseResult.Wood * 100) /
				100,
			Renewable: emissionFactor * buildingType.energyUseResult.Renewable,
			Heat: emissionFactor * buildingType.energyUseResult.Heat,
		};
	}

	getTotalEnergyEmissionPerBuilding(buildingType: any): number {
		const values = Object.values(buildingType.emissionResult);
		const totalEnergyEmissionPerBuildingType = _.sum(values);
		buildingType.totalEnergyEmission = totalEnergyEmissionPerBuildingType;

		return totalEnergyEmissionPerBuildingType;
	}

	calculateCommercialAverageEnergyUse(buildingType: any): void {
		const floorArea = buildingType.totalFloorArea;
		buildingType.energyUseResult = {
			Electricity:
				Math.round(
					(buildingType.energyUse.Electricity / 1000) *
						floorArea *
						100
				) / 100,
			Gas:
				Math.round(
					(buildingType.energyUse.Gas / 1000) * floorArea * 100
				) / 100,
			Oil:
				Math.round(
					(buildingType.energyUse.Oil / 1000) * floorArea * 100
				) / 100,
			Coal:
				Math.round(
					(buildingType.energyUse.Coal / 1000) * floorArea * 100
				) / 100,
			Peat:
				Math.round(
					(buildingType.energyUse.Peat / 1000) * floorArea * 100
				) / 100,
			Wood:
				Math.round(
					(buildingType.energyUse.Wood / 1000) * floorArea * 100
				) / 100,
			Renewable:
				Math.round(
					(buildingType.energyUse.Renewable / 1000) * floorArea * 100
				) / 100,
			Heat:
				Math.round(
					(buildingType.energyUse.Heat / 1000) * floorArea * 100
				) / 100,
		};
	}

	calculateCommercialEnergyEmission(
		buildingType: any,
		emissionFactor: number
	): void {
		buildingType.emissionResult = {
			Electricity:
				Math.round(
					emissionFactor *
						buildingType.energyUseResult.Electricity *
						100
				) / 100,
			Gas:
				Math.round(0.202 * buildingType.energyUseResult.Gas * 100) /
				100,
			Oil:
				Math.round(0.267 * buildingType.energyUseResult.Oil * 100) /
				100,
			Coal:
				Math.round(0.354 * buildingType.energyUseResult.Coal * 100) /
				100,
			Peat:
				Math.round(0.382 * buildingType.energyUseResult.Peat * 100) /
				100,
			Wood:
				Math.round(0.403 * buildingType.energyUseResult.Wood * 100) /
				100,
			Renewable: emissionFactor * buildingType.energyUseResult.Renewable,
			Heat: emissionFactor * buildingType.energyUseResult.Heat,
		};
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
