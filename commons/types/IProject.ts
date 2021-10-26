/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectStatuses } from '../enums/projectStatuses';
import { ProjectTypes } from '../enums/projectTypes';
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
	baseline: {};
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
		buildings?: IProjectModule;
	};
	consumption?: IProjectModule;
}
