import mongoose from 'mongoose';
import { ProjectTypes } from '../../../commons/enums/projectTypes';
import { ProjectStatuses } from '../../../commons/enums/projectStatuses';
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
		project: ['consumptionA'],
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
			status: ProjectStatuses.ACTIVE,
		};

		const result = await projectService.create(c.user.adminA, data);

		expect(result).toHaveProperty('_id');
		expect(result).toHaveProperty('createdBy');
	});
});

describe('get', () => {
	it('should return existing project by id', async () => {
		const consumptionA = await projectService.get(
			c.user.adminA,
			c.project.consumptionA._id
		);

		expect(consumptionA).toHaveProperty('dataSet', {
			default: [],
			custom: [],
		});
		expect(consumptionA).toHaveProperty('projectType', 'Consumption');
		expect(consumptionA).toHaveProperty('status', 'Draft');
		expect(consumptionA).toHaveProperty('modules', []);
		expect(consumptionA).toHaveProperty('name', 'Project Consumption');
		expect(consumptionA).toHaveProperty('location', {
			countryCode: 'FI',
			region: 'Helsinki',
		});
	});
});
