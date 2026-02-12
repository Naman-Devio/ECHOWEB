import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import recyclerRoutes from './routes/recyclerRoutes';
import pickupRoutes from './routes/pickupRoutes';
import reviewRoutes from './routes/reviewRoutes';
import impactRoutes from './routes/impactRoutes';

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
app.use('/api/auth', authRoutes);
app.use('/api/recyclers', recyclerRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/impact', impactRoutes);

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
