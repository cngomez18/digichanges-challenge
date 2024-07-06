import { Router } from 'express';
import { getStarships, getStarshipById } from '../controllers/starshipController';

const router = Router();

router.get('/', getStarships);
router.get('/:id', getStarshipById);

export default router;
