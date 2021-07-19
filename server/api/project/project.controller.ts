/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import projectService from './project.service';

const create = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const body = req.body;
	const user = req.user;

	projectService
		.create(user, body)
		.then((data) => res.json(data))
		.catch((err) => next(err));
};

const get = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const id = req.params.id;
	const user = req.user;

	projectService
		.get(user, id)
		.then((data) => res.json(data))
		.catch((err) => next(err));
};

const projectController = {
	create,
	get,
};

export default projectController;
