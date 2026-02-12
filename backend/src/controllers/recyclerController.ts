import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/database';

const searchRecyclersSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  deviceType: z.string().optional(),
  radius: z.number().default(50), // km
  limit: z.number().default(20),
  offset: z.number().default(0),
});

export const searchRecyclers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = searchRecyclersSchema.parse({
      latitude: req.query.latitude ? parseFloat(req.query.latitude as string) : undefined,
      longitude: req.query.longitude ? parseFloat(req.query.longitude as string) : undefined,
      city: req.query.city,
      state: req.query.state,
      deviceType: req.query.deviceType,
      radius: req.query.radius ? parseFloat(req.query.radius as string) : 50,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
    });

    const where: any = {
      verificationStatus: 'VERIFIED',
    };

    if (data.city) {
      where.addressCity = { contains: data.city, mode: 'insensitive' };
    }

    if (data.state) {
      where.addressState = { contains: data.state, mode: 'insensitive' };
    }

    if (data.deviceType) {
      where.acceptedDeviceTypes = { has: data.deviceType };
    }

    const recyclers = await prisma.recycler.findMany({
      where,
      take: data.limit,
      skip: data.offset,
      orderBy: { averageRating: 'desc' },
    });

    // Calculate distance if coordinates provided
    let recyclersWithDistance = recyclers;
    if (data.latitude && data.longitude) {
      recyclersWithDistance = recyclers
        .map((recycler) => {
          const distance = calculateDistance(
            data.latitude!,
            data.longitude!,
            recycler.latitude,
            recycler.longitude
          );
          return { ...recycler, distance };
        })
        .filter((r) => r.distance <= data.radius)
        .sort((a, b) => a.distance - b.distance);
    }

    res.status(200).json({
      recyclers: recyclersWithDistance,
      total: recyclersWithDistance.length,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Search recyclers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecyclerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const recycler = await prisma.recycler.findUnique({
      where: { id: id as string },
      include: {
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!recycler) {
      res.status(404).json({ error: 'Recycler not found' });
      return;
    }

    res.status(200).json({ recycler });
  } catch (error) {
    console.error('Get recycler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecyclerReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const reviews = await prisma.review.findMany({
      where: { recyclerId: id as string },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    const total = await prisma.review.count({
      where: { recyclerId: id as string },
    });

    res.status(200).json({ reviews, total });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
