import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getUserImpact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get all completed pickups for the user
    const completedPickups = await prisma.pickupRequest.findMany({
      where: {
        userId: req.user.userId,
        status: 'COMPLETED',
      },
    });

    // Calculate total impact
    const totalEWasteKg = completedPickups.reduce(
      (sum, pickup) => sum + (pickup.actualWeightKg || 0),
      0
    );

    const totalCO2SavedKg = completedPickups.reduce(
      (sum, pickup) => sum + (pickup.impactCO2SavedKg || 0),
      0
    );

    // Aggregate materials recovered
    const materialsRecovered: any = {
      goldGrams: 0,
      silverGrams: 0,
      copperKg: 0,
      aluminumKg: 0,
      plasticKg: 0,
    };

    completedPickups.forEach((pickup) => {
      if (pickup.impactMaterialsRecovered) {
        const materials = pickup.impactMaterialsRecovered as any;
        Object.keys(materialsRecovered).forEach((key) => {
          materialsRecovered[key] += materials[key] || 0;
        });
      }
    });

    res.status(200).json({
      impact: {
        totalEWasteKg,
        totalCO2SavedKg,
        materialsRecovered,
        totalPickups: completedPickups.length,
      },
    });
  } catch (error) {
    console.error('Get user impact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGlobalImpact = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get all completed pickups
    const completedPickups = await prisma.pickupRequest.findMany({
      where: {
        status: 'COMPLETED',
      },
    });

    // Calculate total impact
    const totalEWasteKg = completedPickups.reduce(
      (sum, pickup) => sum + (pickup.actualWeightKg || 0),
      0
    );

    const totalCO2SavedKg = completedPickups.reduce(
      (sum, pickup) => sum + (pickup.impactCO2SavedKg || 0),
      0
    );

    // Aggregate materials recovered
    const materialsRecovered: any = {
      goldGrams: 0,
      silverGrams: 0,
      copperKg: 0,
      aluminumKg: 0,
      plasticKg: 0,
    };

    completedPickups.forEach((pickup) => {
      if (pickup.impactMaterialsRecovered) {
        const materials = pickup.impactMaterialsRecovered as any;
        Object.keys(materialsRecovered).forEach((key) => {
          materialsRecovered[key] += materials[key] || 0;
        });
      }
    });

    // Get total users and recyclers
    const totalUsers = await prisma.user.count();
    const totalRecyclers = await prisma.recycler.count({
      where: { verificationStatus: 'VERIFIED' },
    });

    res.status(200).json({
      impact: {
        totalEWasteKg,
        totalCO2SavedKg,
        materialsRecovered,
        totalPickups: completedPickups.length,
        totalUsers,
        totalRecyclers,
      },
    });
  } catch (error) {
    console.error('Get global impact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
