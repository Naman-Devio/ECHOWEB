import { Router } from 'express';
import {
  searchRecyclers,
  getRecyclerById,
  getRecyclerReviews,
} from '../controllers/recyclerController';

const router = Router();

router.get('/search', searchRecyclers);
router.get('/:id', getRecyclerById);
router.get('/:id/reviews', getRecyclerReviews);

export default router;
