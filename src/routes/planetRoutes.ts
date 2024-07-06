import { Router } from 'express';
import { getPlanets, getPlanetById } from '../controllers/planetController';

const router = Router();

router.get('/', getPlanets);
router.get('/:id', getPlanetById);

export default router;
