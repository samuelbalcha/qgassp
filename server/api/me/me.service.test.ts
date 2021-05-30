import mongoose from 'mongoose';
import { IInternalUser, IUpdatePassword } from '../../auth/IInternalUser';

import { User } from '../../models/user.model';
import { create } from '../../seed';
import meService from './me.service';

let c: any;

const cleanUp = async () => {
	User.deleteMany({});
	mongoose.connection.close();
};

beforeAll(async () => {
	c = await create({
		user: ['adminA'],
	});
});

afterAll(cleanUp);

describe('login', () => {
	it(`should throw "Invalid email or password" 
  when incorrect email or password is given`, async () => {
		expect(async () => {
			await meService.login({
				email: c.user.adminA.email,
				password: '134-admin',
			});
		}).rejects.toThrowError('Invalid email or password');
	});

	it('should fetch user when correct email and password is given', async () => {
		const result = await meService.login({
			email: c.user.adminA.email,
			password: '234-admin',
		});

		expect(result).toHaveProperty('user');
		expect(result).toHaveProperty('token');
		expect(result.user).toHaveProperty('name', 'John Doe');
	});
});

describe('update', () => {
	it('should throw "user.required" when user is missing', async () => {
		expect(async () => {
			await meService.update(undefined, {});
		}).rejects.toThrowError('user.required');
	});

	it('should throw "user._id.required" when user.id is missing', async () => {
		expect(async () => {
			await meService.update({} as IInternalUser, {});
		}).rejects.toThrowError('user._id.required');
	});

	it('should throw "data.required" when data is missing', async () => {
		expect(async () => {
			await meService.update(c.user.adminA, null);
		}).rejects.toThrowError('data.required');
	});

	it('should return updated name', async () => {
		const result = await meService.update(c.user.adminA, {
			name: 'new name',
		});

		expect(result).toHaveProperty('name', 'new name');
	});
});

describe('changePassword', () => {
	it(`should throw "data.oldPassword.required" when oldPassword is missing`, async () => {
		expect(async () => {
			await meService.changePassword(
				c.user.adminA,
				{} as IUpdatePassword
			);
		}).rejects.toThrowError('data.oldPassword.required');
	});

	it(`should throw "data.password.required" when password is missing`, async () => {
		expect(async () => {
			await meService.changePassword(c.user.adminA, {
				oldPassword: '1234',
			} as IUpdatePassword);
		}).rejects.toThrowError('data.password.required');
	});

	it('should update password', async () => {
		const result = await meService.changePassword(c.user.adminA, {
			oldPassword: '234-admin',
			password: '1234-admin',
		});

		expect(result).toHaveProperty('salt');
		expect(result).toHaveProperty('hashedPassword');

		const newLogin = await meService.login({
			email: c.user.adminA.email,
			password: '1234-admin',
		});

		expect(newLogin).toHaveProperty('user');
		expect(newLogin).toHaveProperty('token');
	});
});
