import { Router } from 'express';
import { getUserImpact, getGlobalImpact } from '../controllers/impactController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/user', authenticate, getUserImpact);
router.get('/global', getGlobalImpact);

export default router;
