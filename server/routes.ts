import { Router } from 'express';

//import { setUser } from './auth';
//import meRouter from './api/me';
//import userRouter from './api/user';
/*
declare module 'express' {
	export interface Request {
		user?: any;
	}
}
*/
const router = Router();

// Set user to req.user for all API calls
/*
router.use(setUser);

router.use('/me', meRouter);
router.use('/user', userRouter);
*/
export default router;
