import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../../backend/src/routes/authRoutes';
import recyclerRoutes from '../../backend/src/routes/recyclerRoutes';
import pickupRoutes from '../../backend/src/routes/pickupRoutes';
import reviewRoutes from '../../backend/src/routes/reviewRoutes';
import impactRoutes from '../../backend/src/routes/impactRoutes';
import rewardsRoutes from '../../backend/src/routes/rewardsRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'E-Waste Locator API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/recyclers', recyclerRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/rewards', rewardsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: any) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Wrap Express app for Netlify Functions
const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Rewrite path: Netlify redirects strip /api prefix, but Express routes expect it
  // e.g. /.netlify/functions/api/auth/login -> /api/auth/login
  event.path = event.path.replace(/^\/\.netlify\/functions\/api/, '/api');
  return await serverlessHandler(event, context);
};
