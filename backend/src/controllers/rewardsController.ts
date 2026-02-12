import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/database';

// Get user rewards summary
export const getRewardsSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        rewardPoints: true,
        cashbackBalance: true,
        totalEarned: true,
        currentStreak: true,
        lastActivityDate: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get available cards count
    const availableCards = await prisma.rewardCard.count({
      where: {
        userId,
        status: 'AVAILABLE',
        expiresAt: { gt: new Date() },
      },
    });

    // Get recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    res.status(200).json({
      ...user,
      availableCards,
      recentTransactions,
    });
  } catch (error) {
    console.error('Get rewards summary error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get available scratch cards
export const getAvailableCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const cards = await prisma.rewardCard.findMany({
      where: {
        userId,
        status: 'AVAILABLE',
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ cards });
  } catch (error) {
    console.error('Get available cards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a dummy scratch card (for testing/demo)
export const createDummyCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    // Random reward type and value
    const rewardType = Math.random() < 0.5 ? 'CASHBACK' : 'POINTS';
    const rewardValue =
      rewardType === 'CASHBACK'
        ? Math.floor(Math.random() * 451) + 50 // ₹50-500
        : Math.floor(Math.random() * 901) + 100; // 100-1000 points

    const card = await prisma.rewardCard.create({
      data: {
        userId,
        rewardType,
        rewardValue,
        status: 'AVAILABLE',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        reason: 'Pickup scheduled reward',
      },
    });

    res.status(201).json({
      message: 'Scratch card created successfully',
      card: {
        id: card.id,
        rewardType: card.rewardType,
      },
    });
  } catch (error) {
    console.error('Create dummy card error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Scratch a card
export const scratchCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { cardId } = req.params;

    const card = await prisma.rewardCard.findFirst({
      where: {
        id: cardId as string,
        userId,
        status: 'AVAILABLE',
      },
    });

    if (!card) {
      res.status(404).json({ error: 'Card not found or already scratched' });
      return;
    }

    if (card.expiresAt < new Date()) {
      await prisma.rewardCard.update({
        where: { id: cardId as string },
        data: { status: 'EXPIRED' },
      });
      res.status(400).json({ error: 'Card has expired' });
      return;
    }

    // Update card status
    const scratchedCard = await prisma.rewardCard.update({
      where: { id: cardId as string },
      data: {
        status: 'SCRATCHED',
        scratchedAt: new Date(),
      },
    });

    // Update user balance
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        rewardPoints:
          card.rewardType === 'POINTS'
            ? { increment: Math.floor(card.rewardValue) }
            : undefined,
        cashbackBalance:
          card.rewardType === 'CASHBACK' ? { increment: card.rewardValue } : undefined,
        totalEarned: { increment: card.rewardValue },
      },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId,
        type: card.rewardType === 'CASHBACK' ? 'CASHBACK_RECEIVED' : 'EARNED_PICKUP',
        amount: card.rewardType === 'CASHBACK' ? card.rewardValue : 0,
        pointsAmount: card.rewardType === 'POINTS' ? Math.floor(card.rewardValue) : 0,
        description: `Scratch card reward: ${card.rewardType === 'CASHBACK' ? '₹' + card.rewardValue : card.rewardValue + ' points'}`,
        referenceId: cardId as string,
        balanceAfter: updatedUser.cashbackBalance,
        pointsBalanceAfter: updatedUser.rewardPoints,
      },
    });

    res.status(200).json({
      message: 'Card scratched successfully',
      reward: {
        type: card.rewardType,
        value: card.rewardValue,
      },
      newBalance: {
        points: updatedUser.rewardPoints,
        cashback: updatedUser.cashbackBalance,
      },
    });
  } catch (error) {
    console.error('Scratch card error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get transaction history
export const getTransactionHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { page = '1', limit = '20' } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.transaction.count({ where: { userId } }),
    ]);

    res.status(200).json({
      transactions,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Get transaction history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const redeemPointsSchema = z.object({
  pointsToRedeem: z.number().min(100),
  voucherType: z.enum(['AMAZON', 'FLIPKART', 'MYNTRA', 'SWIGGY', 'ZOMATO']),
});

// Redeem points for voucher
export const redeemPoints = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const data = redeemPointsSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (user.rewardPoints < data.pointsToRedeem) {
      res.status(400).json({ error: 'Insufficient points' });
      return;
    }

    // Calculate voucher value (1 point = ₹0.1)
    const voucherValue = data.pointsToRedeem * 0.1;

    // Create redemption request
    const redemption = await prisma.redemption.create({
      data: {
        userId,
        pointsUsed: data.pointsToRedeem,
        voucherType: data.voucherType,
        voucherValue,
        status: 'PENDING',
      },
    });

    // Deduct points
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        rewardPoints: { decrement: data.pointsToRedeem },
      },
    });

    // Create transaction
    await prisma.transaction.create({
      data: {
        userId,
        type: 'SPENT_REDEMPTION',
        amount: 0,
        pointsAmount: -data.pointsToRedeem,
        description: `Redeemed ${data.pointsToRedeem} points for ${data.voucherType} voucher`,
        referenceId: redemption.id,
        balanceAfter: updatedUser.cashbackBalance,
        pointsBalanceAfter: updatedUser.rewardPoints,
      },
    });

    res.status(200).json({
      message: 'Redemption request created successfully',
      redemption: {
        id: redemption.id,
        voucherType: data.voucherType,
        voucherValue,
        status: 'PENDING',
      },
      newPointsBalance: updatedUser.rewardPoints,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Redeem points error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get redemption history
export const getRedemptionHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const redemptions = await prisma.redemption.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ redemptions });
  } catch (error) {
    console.error('Get redemption history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Award points for pickup completion (called internally)
export const awardPickupReward = async (userId: string, weightKg: number): Promise<void> => {
  try {
    // Calculate reward based on weight (10 points per kg)
    const pointsEarned = Math.floor(weightKg * 10);

    // Always award a scratch card (100% chance)
    const shouldAwardCard = true;

    if (shouldAwardCard) {
      // Random reward type and value
      const rewardType = Math.random() < 0.5 ? 'CASHBACK' : 'POINTS';
      const rewardValue =
        rewardType === 'CASHBACK'
          ? Math.floor(Math.random() * 451) + 50 // ₹50-500
          : Math.floor(Math.random() * 901) + 100; // 100-1000 points

      await prisma.rewardCard.create({
        data: {
          userId,
          rewardType,
          rewardValue,
          status: 'AVAILABLE',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          reason: 'Pickup completion reward',
        },
      });
    }

    // Award base points
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        rewardPoints: { increment: pointsEarned },
        totalEarned: { increment: pointsEarned * 0.1 },
        lastActivityDate: new Date(),
      },
    });

    await prisma.transaction.create({
      data: {
        userId,
        type: 'EARNED_PICKUP',
        amount: 0,
        pointsAmount: pointsEarned,
        description: `Earned ${pointsEarned} points for recycling ${weightKg}kg e-waste`,
        balanceAfter: updatedUser.cashbackBalance,
        pointsBalanceAfter: updatedUser.rewardPoints,
      },
    });
  } catch (error) {
    console.error('Award pickup reward error:', error);
  }
};
