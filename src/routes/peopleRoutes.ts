import { Router } from 'express';
import { getPeople, getPersonById } from '../controllers/peopleController';

const router = Router();

router.get('/', getPeople);
router.get('/:id', getPersonById);

export default router;
