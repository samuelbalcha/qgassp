import { Router } from 'express';
import projectController from './project.controller';

const router = Router();

router.post('/', projectController.create);
router.get('/:id', projectController.get);
router.get('/', projectController.getAll);

export default router;
