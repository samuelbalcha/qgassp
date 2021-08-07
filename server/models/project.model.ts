import { Schema, model } from 'mongoose';
import { ProjectStatuses } from '../../commons/enums/projectStatuses';
import { ProjectTypes } from '../../commons/enums/projectTypes';

export const ProjectSchema = new Schema({
	projectType: {
		type: String,
		required: true,
		enum: [ProjectTypes.TERRITORIAL, ProjectTypes.CONSUMPTION],
		default: ProjectTypes.TERRITORIAL,
	},
	status: {
		type: String,
		required: true,
		enum: [
			ProjectStatuses.DRAFT,
			ProjectStatuses.ACTIVE,
			ProjectStatuses.ARCHIVED,
		],
		default: ProjectStatuses.DRAFT,
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
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	dataSet: {
		default: [],
		custom: [],
	},
	modules: [],
	result: {},
});

export const Project = model('Project', ProjectSchema);
