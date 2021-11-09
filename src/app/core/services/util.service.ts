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

		for (const residentialBuilding of baseline?.residentialBuildings) {
			this.getAverageEnergyUsePerBuilding(residentialBuilding);
			this.getTotalEnergyUsePerBuilding(residentialBuilding);
		}

		for (const commercialBuilding of baseline?.commercialBuildings) {
			this.getAverageEnergyUsePerBuilding(commercialBuilding);
			this.getTotalEnergyUsePerBuilding(commercialBuilding);
		}

		return project;
	}

	getAverageEnergyUsePerBuilding(buildingType: any): number {
		const values = Object.values(buildingType.energyUse);
		const averageEnergyUse = _.sum(values);
		buildingType.averageEnergyUse = averageEnergyUse;

		if (buildingType.numberOfUnits) {
			this.calculateResidentialWeightedAverageEnergyUse(buildingType);
		}

		return averageEnergyUse;
	}

	getTotalEnergyUsePerBuilding(buildingType: any): number {
		const values = Object.values(buildingType.energyUseResult);
		const totalEnergyUsePerBuildingType = _.sum(values);
		buildingType.totalEnergyUse = totalEnergyUsePerBuildingType;

		return totalEnergyUsePerBuildingType;
	}

	calculateResidentialWeightedAverageEnergyUse(buildingType: any): void {
		const shareOfUnits = buildingType.numberOfUnits / 1000;
		const averageEnergyUse = buildingType.averageEnergyUse;

		buildingType.energyUseResult = {
			Electricity:
				(averageEnergyUse *
					shareOfUnits *
					buildingType.energyUse.Electricity) /
				averageEnergyUse,
			Gas:
				(averageEnergyUse * shareOfUnits * buildingType.energyUse.Gas) /
				averageEnergyUse,
			Oil:
				(averageEnergyUse * shareOfUnits * buildingType.energyUse.Oil) /
				averageEnergyUse,
			Coal:
				(averageEnergyUse *
					shareOfUnits *
					buildingType.energyUse.Coal) /
				averageEnergyUse,
			Peat:
				(averageEnergyUse *
					shareOfUnits *
					buildingType.energyUse.Peat) /
				averageEnergyUse,
			Wood:
				(averageEnergyUse *
					shareOfUnits *
					buildingType.energyUse.Wood) /
				averageEnergyUse,
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
}
