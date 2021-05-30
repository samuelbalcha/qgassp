/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import meService from './me.service';

const login = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	meService
		.login(req.body)
		.then((data) => res.json(data))
		.catch((err) => next(err));
};

const update = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const body = req.body;

	meService
		.update(req.user, body)
		.then((data) => res.json(data))
		.catch((err) => next(err));
};

const changePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	meService
		.changePassword(req.user, req.body)
		.then((data) => res.json(data))
		.catch((err) => next(err));
};

const setPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	meService
		.setPassword(req.user, req.body)
		.then((data) => res.json(data))
		.catch((err) => next(err));
};

const verifyUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const userId = req.params.id;
	const token = req.params.token;

	meService
		.verifyUser(userId, token)
		.then((data) => res.send(data))
		.catch((err) => next(err));
};

const meController = {
	login,
	update,
	changePassword,
	setPassword,
	verifyUser,
};

export default meController;
