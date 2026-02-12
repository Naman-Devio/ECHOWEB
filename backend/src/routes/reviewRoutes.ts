import { Router } from 'express';
import { createReview, updateReview, deleteReview } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createReview);
router.patch('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

export default router;
