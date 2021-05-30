/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { User } from '../../models/user.model';

import { signToken } from '../../auth';
import { encryptPassword } from '../../util';
import { IAuthData } from '../../auth/IAuthData';
import { IInternalUser, IUpdatePassword } from '../../auth/IInternalUser';

const userSelect = 'name email role';

interface ILoggedInUser {
	user: any;
	token: string;
}

const login = async (data: IAuthData): Promise<ILoggedInUser> => {
	if (!data) {
		throw new Error('data.required');
	}
	if (!data.password) {
		throw new Error('data.password.required');
	}
	if (!data.email) {
		throw new Error('data.email.required');
	}

	const user: any = await User.findOne({ email: data.email })
		.select('hashedPassword salt ' + userSelect)
		.lean();

	if (
		!user ||
		!user.salt ||
		!user.hashedPassword ||
		encryptPassword(data.password, user.salt) !== user.hashedPassword
	) {
		throw new Error('Invalid email or password');
	}

	const token = await signToken(user._id.toString(), user.role);

	delete user.salt;
	delete user.hashedPassword;

	return {
		user: user,
		token,
	};
};

const update = async (
	user: IInternalUser | undefined,
	data: any
): Promise<any> => {
	if (!user) {
		throw new Error('user.required');
	}
	if (!user._id) {
		throw new Error('user._id.required');
	}
	if (!data) {
		throw new Error('data.required');
	}

	const set: any = {};

	if (data.name) {
		set.name = data.name;
	}
	if (data.email) {
		set.email = data.email;
	}

	const result: any = await User.updateOne(
		{
			_id: user._id,
		},
		{
			$set: set,
		},
		{
			new: true,
		}
	);

	if (result.nModified === 1) {
		return User.findOne({ _id: user._id })
			.select(userSelect)
			.lean();
	}

	throw new Error('user.updateFailed');
};

const changePassword = async (
	user: IInternalUser | undefined,
	data: IUpdatePassword
): Promise<any> => {
	if (!user) {
		throw new Error('user.required');
	}
	if (!user._id) {
		throw new Error('user._id.required');
	}
	if (!data) {
		throw new Error('data.required');
	}
	if (!data.oldPassword) {
		throw new Error('data.oldPassword.required');
	}
	if (!data.password) {
		throw new Error('data.password.required');
	}

	const userToUpdate: any = await User.findById({ _id: user._id }).select(
		'hashedPassword salt'
	);

	if (
		!userToUpdate ||
		!userToUpdate.salt ||
		!userToUpdate.hashedPassword ||
		encryptPassword(data.oldPassword, userToUpdate.salt) !==
			userToUpdate.hashedPassword
	) {
		throw new Error('Invalid password');
	}

	userToUpdate.password = data.password;
	const result: any = await userToUpdate.save();

	return result;
};

const setPassword = async (
	user: IInternalUser | undefined,
	data: any
): Promise<any> => {
	if (!user) {
		throw new Error('user.required');
	}
	if (!user._id) {
		throw new Error('user._id.required');
	}
	if (!data) {
		throw new Error('data.required');
	}

	if (!data.password) {
		throw new Error('data.password.required');
	}

	const userToUpdate: any = await User.findOne({ _id: user._id }).select(
		'hashedPassword salt'
	);

	userToUpdate.password = data.password;
	const result: any = await userToUpdate.save();

	return result;
};

const verifyUser = async (
	userId: string,
	activationToken: string
): Promise<ILoggedInUser> => {
	if (!userId) {
		throw new Error('userId.required');
	}
	if (!activationToken) {
		throw new Error('activationToken.required');
	}

	const userToValidate: any = await User.findOne({
		_id: userId,
		'verification.token': activationToken,
	}).select(userSelect + ' verification');

	if (!userToValidate) {
		throw new Error('Invalid token');
	}
	if (!userToValidate.role) {
		throw new Error('Invalid role');
	}

	userToValidate.verification.token = null;
	userToValidate.save();

	const token = await signToken(userId, userToValidate.role);

	return {
		user: userToValidate,
		token,
	};
};

const meService = {
	login,
	update,
	changePassword,
	setPassword,
	verifyUser,
};

export default meService;
