/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { IProject } from '../../../../commons/types/IProject';

@Injectable()
export class UtilService {
	getName(selectedModule: string): string {
		const tabNames: any = {
			landuse: 'Land use change',
			buildings: 'Building energy use',
			transport: 'Transport',
			consumption: 'Consumption based',
		};

		return tabNames[`${selectedModule}`] as string;
	}

	getColumns(tableData: any): any[] {
		const columns = tableData
			.reduce((columns: any, row: {}) => {
				return [...columns, ...Object.keys(row)];
			}, [])
			.reduce((columns: string | any[], column: any) => {
				return columns.includes(column)
					? columns
					: [...columns, column];
			}, []);

		return columns.map((column: string | number) => {
			return {
				columnDef: column,
				header: column,
				cell: (element: any): any =>
					`${element[column] ? element[column] : ``}`,
			};
		});
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
			//	this.getTotalEnergyUsePerBuilding(commercialBuilding);
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
}
