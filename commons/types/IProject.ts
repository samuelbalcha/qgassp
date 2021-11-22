/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectStatuses } from '../enums/projectStatuses';
import { ProjectTypes } from '../enums/projectTypes';
import { IConsumption } from './IConsumptionModule';
import { IUser } from './IUser';

export interface ICalModules {
	landuse?: boolean;
	transport?: boolean;
	buildings?: boolean;
	consumption?: boolean;
}

export interface IProjectModule {
	dataSet: {
		default: [];
		custom: [];
	};
}
export interface IBuildingsModule {
	dataSet: {
		default: [];
		custom: [];
	};
	baseline: {
		residentialBuildings: any;
		commercialBuildings: any;
		endUseOfEnergy: any[];
	};
	baselineResult: {
		residentialBuildings: any;
		commercialBuildings: any;
		endUseOfEnergy: any[];
		totalEmissions: any;
	};
	versions: [];
}

export interface IProject {
	name: string;
	population: number;
	location: {
		country: string;
		region?: string;
	};
	status: ProjectStatuses;
	startYear: number;
	projectType?: ProjectTypes;
	localId?: string;
	_id?: string;
	createdBy?: IUser;
	createdAt?: string;
	territorial?: {
		landuse?: IProjectModule;
		transport?: IProjectModule;
		buildings?: IBuildingsModule;
	};
	consumption?: IConsumption;
}
