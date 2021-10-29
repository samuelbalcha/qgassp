import mongoose from 'mongoose';
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
			startYear: 2022,
			population: 1000,
			name: 'My Project',
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
				},
			},
			status: ProjectStatuses.ACTIVE,
		};

		const result = await projectService.create(c.user.adminA, data);

		expect(result).toHaveProperty('_id');
		expect(result).toHaveProperty('createdBy');
		expect(result).toHaveProperty('territorial', {
			landuse: {
				dataSet: {
					default: [],
					custom: [],
				},
				versions: [],
			},
		});
	});
});

describe('get', () => {
	it('should return existing project by id', async () => {
		const consumptionA = await projectService.get(
			c.user.adminA,
			c.project.consumptionA._id
		);

		expect(consumptionA).toHaveProperty('consumption', {
			dataSet: {
				default: [],
				custom: [],
			},
			baseline: {},
			baselineResult: {},
			policyVersions: [],
		});
		expect(consumptionA).toHaveProperty('projectType', 'Consumption');
		expect(consumptionA).toHaveProperty('status', 'Draft');
		expect(consumptionA).toHaveProperty('name', 'Project Consumption');
		expect(consumptionA).toHaveProperty('location', {
			country: 'Finland',
			region: 'Helsinki',
		});
		expect(consumptionA.createdBy).toHaveProperty('name', 'John Doe');
	});
});

describe('getAll', () => {
	it('should return all projects', async () => {
		const projects = await projectService.getAll(c.user.adminA);
		expect(projects).toHaveProperty('length');
	});
});
