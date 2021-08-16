/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectStatuses } from '../enums/projectStatuses';
import { ProjectTypes } from '../enums/projectTypes';
import { IUser } from './IUser';

export interface ICalModules {
	landuse?: boolean;
	traffic?: boolean;
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
	location: {
		country: string;
		region: string;
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
		traffic?: IProjectModule;
		buildings?: IProjectModule;
	};
	consumption?: IProjectModule;
}
