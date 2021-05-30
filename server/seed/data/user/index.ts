import _ from 'lodash';

import { User } from '../../../models/user.model';
import { generateSlug } from '../../../util';
import { UserRoles } from '../../../enums/userRoles';

export type type = 'user';
export const model = User;

const password = '234-admin';

const items = {
	// Admin
	adminA: {
		name: 'John Doe',
		email: 'john@doe.com',
		role: UserRoles.ADMIN,
		password: password,
		slug: generateSlug(`John Doe-1234`),
	},

	// Researcher
	doctorMedhanet: {
		name: 'Alexia Amazon',
		email: 'alexia@amazon.com',
		role: UserRoles.RESEARCHER,
		password: password,
		slug: generateSlug(`Alexia Amazon-1235`),
	},
};

export const documents = items;
