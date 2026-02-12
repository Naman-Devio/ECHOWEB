import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { sendPickupConfirmation } from '../services/emailService';

const createPickupSchema = z.object({
  recyclerId: z.string().uuid(),
  devices: z.array(
    z.object({
      type: z.string(),
      quantity: z.number().positive(),
      estimatedWeightKg: z.number().positive().optional(),
    })
  ),
  pickupAddressStreet: z.string(),
  pickupAddressCity: z.string(),
  pickupAddressState: z.string(),
  pickupAddressPincode: z.string(),
  pickupLatitude: z.number(),
  pickupLongitude: z.number(),
  pickupLandmark: z.string().optional(),
  contactPersonName: z.string(),
  contactPersonPhone: z.string(),
  preferredDate: z.string(),
  preferredStartTime: z.string(),
  preferredEndTime: z.string(),
});

export const createPickupRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const data = createPickupSchema.parse(req.body);

    // Verify recycler exists and is verified
    const recycler = await prisma.recycler.findUnique({
      where: { id: data.recyclerId },
    });

    if (!recycler || recycler.verificationStatus !== 'VERIFIED') {
      res.status(400).json({ error: 'Invalid or unverified recycler' });
      return;
    }

    // Generate tracking ID
    const trackingId = `EWL${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create pickup request
    const pickupRequest = await prisma.pickupRequest.create({
      data: {
        trackingId,
        userId: req.user.userId,
        recyclerId: data.recyclerId,
        devices: data.devices,
        pickupAddressStreet: data.pickupAddressStreet,
        pickupAddressCity: data.pickupAddressCity,
        pickupAddressState: data.pickupAddressState,
        pickupAddressPincode: data.pickupAddressPincode,
        pickupLatitude: data.pickupLatitude,
        pickupLongitude: data.pickupLongitude,
        pickupLandmark: data.pickupLandmark,
        contactPersonName: data.contactPersonName,
        contactPersonPhone: data.contactPersonPhone,
        preferredDate: new Date(data.preferredDate),
        preferredStartTime: data.preferredStartTime,
        preferredEndTime: data.preferredEndTime,
        status: 'PENDING',
        statusHistory: [
          {
            status: 'PENDING',
            timestamp: new Date().toISOString(),
            note: 'Pickup request created',
          },
        ],
      },
    });

    // Send confirmation email
    await sendPickupConfirmation(req.user.email, trackingId);

    res.status(201).json({
      message: 'Pickup request created successfully',
      pickupRequest: {
        id: pickupRequest.id,
        trackingId: pickupRequest.trackingId,
        status: pickupRequest.status,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Create pickup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserPickups = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const pickups = await prisma.pickupRequest.findMany({
      where: { userId: req.user.userId },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        recycler: {
          select: {
            businessName: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    const total = await prisma.pickupRequest.count({
      where: { userId: req.user.userId },
    });

    res.status(200).json({ pickups, total });
  } catch (error) {
    console.error('Get user pickups error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPickupByTrackingId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { trackingId } = req.params;

    const pickup = await prisma.pickupRequest.findUnique({
      where: { trackingId: trackingId as string },
      include: {
        recycler: {
          select: {
            businessName: true,
            phone: true,
            email: true,
            addressStreet: true,
            addressCity: true,
            addressState: true,
          },
        },
      },
    });

    if (!pickup) {
      res.status(404).json({ error: 'Pickup request not found' });
      return;
    }

    res.status(200).json({ pickup });
  } catch (error) {
    console.error('Get pickup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelPickup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const pickup = await prisma.pickupRequest.findUnique({
      where: { id: id as string },
    });

    if (!pickup) {
      res.status(404).json({ error: 'Pickup request not found' });
      return;
    }

    if (pickup.userId !== req.user.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    if (['COMPLETED', 'CANCELLED'].includes(pickup.status)) {
      res.status(400).json({ error: 'Cannot cancel this pickup request' });
      return;
    }

    const updatedPickup = await prisma.pickupRequest.update({
      where: { id: id as string },
      data: {
        status: 'CANCELLED',
        statusHistory: [
          ...(pickup.statusHistory as any[]),
          {
            status: 'CANCELLED',
            timestamp: new Date().toISOString(),
            note: 'Cancelled by user',
          },
        ],
      },
    });

    res.status(200).json({
      message: 'Pickup request cancelled successfully',
      pickup: updatedPickup,
    });
  } catch (error) {
    console.error('Cancel pickup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
