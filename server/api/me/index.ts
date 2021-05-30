import { Router } from 'express';
import meController from './me.controller';

const router = Router();

router.post('/login', meController.login);
router.post('/change-password', meController.changePassword);
router.post('/set-password', meController.setPassword);
router.put('/profile', meController.update);
router.get('/verify/account/:id/:token', meController.verifyUser);

export default router;
