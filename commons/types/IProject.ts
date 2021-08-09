/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectStatuses } from '../enums/projectStatuses';
import { ProjectTypes } from '../enums/projectTypes';
import { IUser } from './IUser';

export interface IProject {
	projectType: ProjectTypes;
	name: string;
	location: {
		countryCode: string;
		region: string;
	};
	dataSet: {
		default: any[];
		custom: any[];
	};
	modules: any[];
	status: ProjectStatuses;
	_id?: string;
	createdBy?: IUser;
	createdAt?: string;
}
