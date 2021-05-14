import { Request, Response, NextFunction } from 'express';

const logRequestStart = (
	req: Request,
	_res: Response,
	next: NextFunction
): void => {
	console.log(`${req.method} ${req.originalUrl}`);
	next();
};

export default logRequestStart;
