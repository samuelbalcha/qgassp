/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Router } from 'express';

import { IInternalUser } from './auth/IInternalUser';
import meRouter from './api/me';
import { setUser } from './auth';

declare module 'express' {
	export interface Request {
		user?: IInternalUser;
	}
}

const router = Router();
router.use(setUser);

router.use('/me', meRouter);

export default router;
