import { Schema, model } from 'mongoose';
import { ProjectTypes } from '../enums/projectTypes';

export const ProjectSchema = new Schema({
	projectType: {
		type: String,
		required: true,
		enum: [ProjectTypes.TERRITORIAL, ProjectTypes.CONSUMPTION],
		default: ProjectTypes.TERRITORIAL,
	},
	name: {
		type: String,
	},
	location: {
		countryCode: String,
		region: String,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dataSet: {
		default: [],
		custom: [],
	},
	modules: [],
	result: {},
});

export const Project = model('Project', ProjectSchema);
