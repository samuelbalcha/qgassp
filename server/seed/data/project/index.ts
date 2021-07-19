import _ from 'lodash';

import Ref from './../../ref';
import { Project } from '../../../models/project.model';

export type type = 'project';
export const model = Project;

const items = {
	// Territorial
	territorialA: {
		name: 'Project Territorial',
		projectType: 'Territorial',
		createdBy: Ref('user.adminA._id'),
		location: {
			countryCode: 'FI',
			region: 'Helsinki',
		},
		dataSet: {
			default: [],
			custom: [],
		},
		modules: [],
	},

	// Consumption
	consumptionA: {
		name: 'Project Consumption',
		projectType: 'Consumption',
		createdBy: Ref('user.adminA._id'),
		location: {
			countryCode: 'FI',
			region: 'Helsinki',
		},
		dataSet: {
			default: [],
			custom: [],
		},
		modules: [],
	},
};

export const documents = items;
