import { Router } from 'express';
import {
  createPickupRequest,
  getUserPickups,
  getPickupByTrackingId,
  cancelPickup,
  completePickup,
} from '../controllers/pickupController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createPickupRequest);
router.get('/my-pickups', authenticate, getUserPickups);
router.get('/track/:trackingId', getPickupByTrackingId);
router.patch('/:id/cancel', authenticate, cancelPickup);
router.patch('/:id/complete', authenticate, completePickup);

export default router;
