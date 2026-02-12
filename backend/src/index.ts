import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import recyclerRoutes from './routes/recyclerRoutes';
import pickupRoutes from './routes/pickupRoutes';
import reviewRoutes from './routes/reviewRoutes';
import impactRoutes from './routes/impactRoutes';
import rewardsRoutes from './routes/rewardsRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'E-Waste Locator API is running' });
});

// API Routes
console.log('Registering routes...');
app.use('/api/auth', authRoutes);
console.log('Auth routes registered');
app.use('/api/recyclers', recyclerRoutes);
console.log('Recycler routes registered');
app.use('/api/pickups', pickupRoutes);
console.log('Pickup routes registered');
app.use('/api/reviews', reviewRoutes);
console.log('Review routes registered');
app.use('/api/impact', impactRoutes);
console.log('Impact routes registered');
app.use('/api/rewards', rewardsRoutes);
console.log('Rewards routes registered');

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Run seed on first startup if needed
  if (process.env.NODE_ENV === 'production') {
    try {
      const { execSync } = require('child_process');
      console.log('Running database seed...');
      execSync('npx prisma db seed', { stdio: 'inherit' });
      console.log('Database seeded successfully');
    } catch (error) {
      console.log('Seed already run or failed:', error);
    }
  }
});

export default app;
