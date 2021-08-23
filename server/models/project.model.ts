import { Schema, model } from 'mongoose';
import { ProjectStatuses } from '../../commons/enums/projectStatuses';
import { ProjectTypes } from '../../commons/enums/projectTypes';

export const ProjectSchema = new Schema({
	projectType: {
		type: String,
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
	startYear: {
		type: Number,
	},
	localId: {
		type: String,
	},
	location: {
		country: String,
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
	territorial: {},
	consumption: {},
});

export const Project = model('Project', ProjectSchema);
