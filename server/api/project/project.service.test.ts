import mongoose from 'mongoose';
import { ProjectTypes } from '../../../commons/enums/projectTypes';
import { IProject } from '../../../commons/types/IProject';
import { Project } from '../../models/project.model';
import { create } from '../../seed';
import projectService from './project.service';

let c: any;

const cleanUp = async () => {
	Project.deleteMany({});
	mongoose.connection.close();
};

beforeAll(async () => {
	c = await create({
		user: ['adminA'],
	});
});

afterAll(cleanUp);

describe('create', () => {
	it('should create a project', async () => {
		const data: IProject = {
			projectType: ProjectTypes.TERRITORIAL,
			name: 'My Project',
			location: {
				countryCode: 'FI',
				region: 'Helsinki',
			},
			dataSet: {
				default: [],
				custom: [],
			},
			modules: [],
		};

		const result = await projectService.create(c.user.adminA, data);

		expect(result).toHaveProperty('_id');
		expect(result).toHaveProperty('createdBy');
	});
});

describe('get', () => {
	it('should return existing project by id', () => {
		
	});
});
