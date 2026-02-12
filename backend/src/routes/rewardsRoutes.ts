import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getRewardsSummary,
  getAvailableCards,
  scratchCard,
  createDummyCard,
  getTransactionHistory,
  redeemPoints,
  getRedemptionHistory,
} from '../controllers/rewardsController';

const router = Router();

router.get('/summary', authenticate, getRewardsSummary);
router.get('/cards', authenticate, getAvailableCards);
router.post('/cards/:cardId/scratch', authenticate, scratchCard);
router.post('/cards/create-dummy', authenticate, createDummyCard);
router.get('/transactions', authenticate, getTransactionHistory);
router.post('/redeem', authenticate, redeemPoints);
router.get('/redemptions', authenticate, getRedemptionHistory);

export default router;
