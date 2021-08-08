/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { IProject } from '../../../commons/types/IProject';
import { Project } from '../../models/project.model';
import { IInternalUser } from '../../auth/IInternalUser';

const create = async (
	user: IInternalUser | undefined,
	data: IProject
): Promise<IProject> => {
	if (!user) {
		throw new Error('user.required');
	}
	if (!data) {
		throw new Error('data.required');
	}
	if (!data.name) {
		throw new Error('data.name.required');
	}
	if (!data.projectType) {
		throw new Error('data.projectType.required');
	}

	// do project check based on project type
	const query: any = {
		...data,
		createdAt: Date.now(),
		createdBy: user._id,
	};

	// populate createdBy
	return Project.create(query);
};

const get = async (
	user: IInternalUser | undefined,
	id: string
): Promise<IProject> => {
	if (!user) {
		throw new Error('user.required');
	}
	if (!id) {
		throw new Error('id.required');
	}
	const query = {
		_id: id,
		createdBy: user._id,
	};

	return Project.findOne(query).lean();
};

const projectService = {
	create,
	get,
};

export default projectService;
