/* eslint-disable @typescript-eslint/no-use-before-define */
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../models/user.model';
import config from '../config';
import { UserRoles } from '../../commons/enums/userRoles';
import { IInternalUser } from './IInternalUser';
import { IToken } from './IAuthData';

const tokenRegex = /^Bearer (.+)$/;

export function setUser(
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> {
	return setUserPromise(req)
		.then(() => next())
		.catch(next);
}

async function setUserPromise(req: Request): Promise<void> {
	const authHeader = _.get(req, 'headers.authorization');

	if (!authHeader) {
		return;
	}

	const match = tokenRegex.exec(authHeader);
	if (!match || match.length !== 2) {
		throw new Error('Invalid token');
	}

	const token = match[1];

	const decoded: IToken = await verifyToken(token);

	if (!decoded.userId) {
		throw new Error('Invalid token');
	}

	try {
		req.user = await getUser(decoded.userId);
		req.user.role = decoded.role as UserRoles;
	} catch (err) {
		if (err.key !== 'dbUser:notFound') {
			throw err;
		}
	}

	if (!req.user) {
		throw new Error('Invalid token');
	}
}

export async function verifyToken(token: string): Promise<IToken> {
	let decoded: IToken;
	try {
		decoded = verify(token, config.JWT_SECRET) as IToken;
	} catch (err) {
		switch (err.name) {
			case 'TokenExpiredError':
				throw new Error('Token expired');
			default:
				throw new Error('Invalid token');
		}
	}

	return decoded;
}

async function getUser(userId: string): Promise<IInternalUser> {
	if (!userId) {
		throw new Error('userId.required');
	}

	const dbUser = await User.findOne({
		_id: userId,
	})
		.select('name role')
		.lean();

	if (!dbUser) {
		throw new Error('user.notFound');
	}

	const userString = JSON.stringify(dbUser);

	return JSON.parse(userString) as IInternalUser;
}

export async function signToken(userId: string, role: string): Promise<string> {
	if (!userId) {
		throw new Error('userId.required');
	}

	const payload: IToken = {
		userId: userId,
		role: role,
	};

	const expiry = {
		expiresIn: '30d',
	};

	const token = await new Promise((resolve, reject) => {
		sign(payload, config.JWT_SECRET, expiry, (err, signedToken) => {
			if (err) {
				return reject(err);
			}
			resolve(signedToken);
		});
	});

	return token as string;
}
