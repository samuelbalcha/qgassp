/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { IProject } from '../../../commons/types/IProject';
import { Project } from '../../models/project.model';
import { IInternalUser } from '../../auth/IInternalUser';
import { ProjectStatuses } from '../../../commons/enums/projectStatuses';

const projectSelect =
	'name projectType status location createdAt createdBy dataSet modules result';

const create = async (
	user: IInternalUser | undefined,
	data: IProject
): Promise<IProject> => {
	if (!user) {
		throw new Error('user.required');
	}
	if (!data) {
		throw new Error('project.required');
	}
	if (!data.name) {
		throw new Error('project.name.required');
	}
	if (!data.projectType) {
		throw new Error('project.projectType.required');
	}

	// do project check based on project type
	const query: any = {
		...data,
		createdAt: Date.now(),
		createdBy: user._id,
		status: ProjectStatuses.ACTIVE,
	};

	const project = await Project.create(query);
	return {
		...project.toObject(),
		createdBy: {
			...user,
		},
	};
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

	return Project.findOne(query)
		.select(projectSelect)
		.populate([
			{
				path: 'createdBy',
				select: 'name',
			},
		])
		.lean();
};

const getAll = async (user: IInternalUser | undefined): Promise<IProject[]> => {
	if (!user) {
		throw new Error('user.required');
	}

	return Project.find()
		.select(projectSelect)
		.populate([
			{
				path: 'createdBy',
				select: 'name',
			},
		])
		.sort({ createdAt: -1 })
		.lean();
};

const projectService = {
	create,
	get,
	getAll,
};

export default projectService;
