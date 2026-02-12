import { Response } from 'express';
import { z } from 'zod';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

const createReviewSchema = z.object({
  pickupRequestId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const data = createReviewSchema.parse(req.body);

    // Verify pickup request exists and belongs to user
    const pickupRequest = await prisma.pickupRequest.findUnique({
      where: { id: data.pickupRequestId },
    });

    if (!pickupRequest) {
      res.status(404).json({ error: 'Pickup request not found' });
      return;
    }

    if (pickupRequest.userId !== req.user.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    if (pickupRequest.status !== 'COMPLETED') {
      res.status(400).json({ error: 'Can only review completed pickups' });
      return;
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { pickupRequestId: data.pickupRequestId },
    });

    if (existingReview) {
      res.status(400).json({ error: 'Review already exists for this pickup' });
      return;
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        recyclerId: pickupRequest.recyclerId,
        userId: req.user.userId,
        pickupRequestId: data.pickupRequestId,
        rating: data.rating,
        comment: data.comment,
      },
    });

    // Update recycler's average rating
    const recyclerReviews = await prisma.review.findMany({
      where: { recyclerId: pickupRequest.recyclerId },
    });

    const totalRating = recyclerReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / recyclerReviews.length;

    await prisma.recycler.update({
      where: { id: pickupRequest.recyclerId },
      data: {
        averageRating,
        totalReviews: recyclerReviews.length,
      },
    });

    res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const data = z
      .object({
        rating: z.number().min(1).max(5).optional(),
        comment: z.string().optional(),
      })
      .parse(req.body);

    const review = await prisma.review.findUnique({
      where: { id: id as string },
    });

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    if (review.userId !== req.user.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const updatedReview = await prisma.review.update({
      where: { id: id as string },
      data,
    });

    // Recalculate recycler's average rating if rating changed
    if (data.rating) {
      const recyclerReviews = await prisma.review.findMany({
        where: { recyclerId: review.recyclerId },
      });

      const totalRating = recyclerReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / recyclerReviews.length;

      await prisma.recycler.update({
        where: { id: review.recyclerId },
        data: { averageRating },
      });
    }

    res.status(200).json({
      message: 'Review updated successfully',
      review: updatedReview,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Update review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const review = await prisma.review.findUnique({
      where: { id: id as string },
    });

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    if (review.userId !== req.user.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    await prisma.review.delete({
      where: { id: id as string },
    });

    // Recalculate recycler's average rating
    const recyclerReviews = await prisma.review.findMany({
      where: { recyclerId: review.recyclerId },
    });

    const averageRating =
      recyclerReviews.length > 0
        ? recyclerReviews.reduce((sum, r) => sum + r.rating, 0) / recyclerReviews.length
        : 0;

    await prisma.recycler.update({
      where: { id: review.recyclerId },
      data: {
        averageRating,
        totalReviews: recyclerReviews.length,
      },
    });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
