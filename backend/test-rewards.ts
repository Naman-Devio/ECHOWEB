import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function addTestRewards() {
  try {
    // Get the first user
    const user = await prisma.user.findFirst();
    
    if (!user) {
      console.log('No users found. Please create a user first.');
      return;
    }

    console.log(`Adding test rewards for user: ${user.email}`);

    // Add points
    await prisma.user.update({
      where: { id: user.id },
      data: {
        rewardPoints: 500,
        cashbackBalance: 50,
        totalEarned: 100,
        currentStreak: 3,
      },
    });

    // Create some scratch cards
    const cards = [
      {
        userId: user.id,
        rewardType: 'CASHBACK' as const,
        rewardValue: 100,
        status: 'AVAILABLE' as const,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        reason: 'Test reward card',
      },
      {
        userId: user.id,
        rewardType: 'POINTS' as const,
        rewardValue: 250,
        status: 'AVAILABLE' as const,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        reason: 'Test reward card',
      },
      {
        userId: user.id,
        rewardType: 'CASHBACK' as const,
        rewardValue: 75,
        status: 'AVAILABLE' as const,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        reason: 'Test reward card',
      },
    ];

    for (const card of cards) {
      await prisma.rewardCard.create({ data: card });
    }

    // Create some transaction history
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'EARNED_PICKUP',
        amount: 0,
        pointsAmount: 100,
        description: 'Earned 100 points for recycling 10kg e-waste',
        balanceAfter: 50,
        pointsBalanceAfter: 500,
      },
    });

    console.log('✅ Test rewards added successfully!');
    console.log(`User now has:`);
    console.log(`- 500 points`);
    console.log(`- ₹50 cashback`);
    console.log(`- 3 scratch cards available`);
    console.log(`\nYou can now visit http://localhost:3000/rewards to see them!`);
  } catch (error) {
    console.error('Error adding test rewards:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

addTestRewards();
