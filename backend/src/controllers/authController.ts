import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../config/database';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { generateOTP, storeOTP, verifyOTP } from '../utils/otp';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/emailService';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  phone: z.string(),
  userType: z.enum(['INDIVIDUAL', 'BUSINESS', 'INSTITUTION']).optional(),
  organizationName: z.string().optional(),
  gstNumber: z.string().optional(),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Hash password with 12 salt rounds
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Generate OTP
    const otp = generateOTP();
    storeOTP(data.email, otp);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        phone: data.phone,
        userType: data.userType || 'INDIVIDUAL',
        organizationName: data.organizationName,
        gstNumber: data.gstNumber,
        emailVerified: false,
      },
    });

    // Send verification email
    await sendVerificationEmail(data.email, otp);

    res.status(201).json({
      message: 'User registered successfully. Please verify your email.',
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = verifyEmailSchema.parse(req.body);

    // Verify OTP
    const isValid = verifyOTP(data.email, data.otp);
    if (!isValid) {
      res.status(400).json({ error: 'Invalid or expired OTP' });
      return;
    }

    // Update user
    const user = await prisma.user.update({
      where: { email: data.email },
      data: { emailVerified: true },
    });

    res.status(200).json({
      message: 'Email verified successfully',
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check if email is verified
    if (!user.emailVerified) {
      res.status(403).json({ error: 'Please verify your email first' });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = forgotPasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      // Don't reveal if user exists
      res.status(200).json({ message: 'If the email exists, a reset link has been sent' });
      return;
    }

    // Generate reset token
    const resetToken = generateOTP();
    storeOTP(data.email, resetToken);

    // Send reset email
    await sendPasswordResetEmail(data.email, resetToken);

    res.status(200).json({ message: 'If the email exists, a reset link has been sent' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  newPassword: z.string().min(8),
});

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = resetPasswordSchema.parse(req.body);

    // Verify OTP
    const isValid = verifyOTP(data.email, data.otp);
    if (!isValid) {
      res.status(400).json({ error: 'Invalid or expired reset token' });
      return;
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(data.newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { email: data.email },
      data: { passwordHash },
    });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = refreshTokenSchema.parse(req.body);

    // Verify refresh token
    const { verifyRefreshToken } = await import('../utils/jwt');
    const payload = verifyRefreshToken(data.refreshToken);

    // Generate new access token
    const accessToken = generateAccessToken({ userId: payload.userId, email: payload.email });

    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.issues });
      return;
    }
    console.error('Refresh token error:', error);
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};
