import _ from 'lodash';

import Ref from './../../ref';
import { Project } from '../../../models/project.model';
import { ProjectStatuses } from '../../../../commons/enums/projectStatuses';

export type type = 'project';
export const model = Project;

const items = {
	// Territorial
	territorialA: {
		name: 'Project Territorial',
		projectType: 'Territorial',
		createdBy: Ref('user.adminA._id'),
		startYear: '2022',
		location: {
			country: 'Finland',
			region: 'Helsinki',
		},
		territorial: {
			landuse: {
				dataSet: {
					default: [],
					custom: [],
				},
				baseline: {},
				versions: [],
			},
		},
		status: ProjectStatuses.ACTIVE,
	},

	// Consumption
	consumptionA: {
		name: 'Project Consumption',
		projectType: 'Consumption',
		createdBy: Ref('user.adminA._id'),
		startYear: '2024',
		location: {
			country: 'Finland',
			region: 'Helsinki',
		},
		consumption: {
			dataSet: {
				default: [],
				custom: [],
			},
			baseline: {},
			versions: [],
		},
		status: ProjectStatuses.DRAFT,
	},
};

export const documents = items;
