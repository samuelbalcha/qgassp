/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { UserRoles } from '../enums/userRoles';
import { encryptPassword, createSalt, isValidPassword } from '../util';

export const UserSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	verification: {
		token: String,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	role: {
		type: String,
		required: true,
		enum: [UserRoles.ADMIN, UserRoles.RESEARCHER],
		default: UserRoles.RESEARCHER,
	},
	hashedPassword: {
		type: String,
	},
	salt: { type: String },
});

UserSchema.virtual('password')
	.set(function(this: any, password: string) {
		this._password = password;

		if (!isValidPassword(password)) {
			return this.invalidate('password', 'WEAK_PASSWORD');
		}

		this.salt = createSalt();
		this.hashedPassword = encryptPassword(password, this.salt);
	})
	.get(function(this: any) {
		return this._password;
	});

export const User = model('User', UserSchema);
