import { PrismaClient, UserType, VerificationStatus, DeviceType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create PostgreSQL connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      passwordHash: hashedPassword,
      name: 'John Doe',
      phone: '+919876543210',
      userType: UserType.INDIVIDUAL,
      emailVerified: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'tech.corp@example.com' },
    update: {},
    create: {
      email: 'tech.corp@example.com',
      passwordHash: hashedPassword,
      name: 'Tech Corp Admin',
      phone: '+919876543211',
      userType: UserType.BUSINESS,
      organizationName: 'Tech Corp India',
      gstNumber: '29ABCDE1234F1Z5',
      emailVerified: true,
    },
  });

  console.log('Created users:', { user1: user1.email, user2: user2.email });

  // Create test recyclers
  const recycler1 = await prisma.recycler.upsert({
    where: { email: 'greenrecycle@example.com' },
    update: {},
    create: {
      businessName: 'Green Recycle Solutions',
      cpcbAuthNumber: 'CPCB-DL-2024-001',
      certificationExpiry: new Date('2025-12-31'),
      certificationDocuments: ['https://example.com/cert1.pdf'],
      verificationStatus: VerificationStatus.VERIFIED,
      verifiedAt: new Date(),
      email: 'greenrecycle@example.com',
      phone: '+919876543220',
      website: 'https://greenrecycle.example.com',
      addressStreet: '123 Green Street, Sector 18',
      addressCity: 'Delhi',
      addressState: 'Delhi',
      addressPincode: '110001',
      latitude: 28.7041,
      longitude: 77.1025,
      acceptedDeviceTypes: [
        DeviceType.MOBILE_PHONE,
        DeviceType.LAPTOP,
        DeviceType.DESKTOP,
        DeviceType.TABLET,
        DeviceType.MONITOR,
      ],
      bulkPickupAvailable: true,
      bulkMinimumKg: 50,
      serviceRadius: 25,
      operatingHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '18:00' },
        saturday: { open: '10:00', close: '16:00' },
        sunday: { open: 'closed', close: 'closed' },
      },
      averageRating: 4.5,
      totalReviews: 120,
      monthlyCapacityKg: 10000,
      currentMonthProcessedKg: 3500,
    },
  });

  const recycler2 = await prisma.recycler.upsert({
    where: { email: 'ecotech@example.com' },
    update: {},
    create: {
      businessName: 'EcoTech Recyclers',
      cpcbAuthNumber: 'CPCB-MH-2024-002',
      certificationExpiry: new Date('2025-06-30'),
      certificationDocuments: ['https://example.com/cert2.pdf'],
      verificationStatus: VerificationStatus.VERIFIED,
      verifiedAt: new Date(),
      email: 'ecotech@example.com',
      phone: '+919876543221',
      addressStreet: '456 Eco Lane, Andheri East',
      addressCity: 'Mumbai',
      addressState: 'Maharashtra',
      addressPincode: '400069',
      latitude: 19.076,
      longitude: 72.8777,
      acceptedDeviceTypes: [
        DeviceType.TV,
        DeviceType.REFRIGERATOR,
        DeviceType.WASHING_MACHINE,
        DeviceType.AC,
        DeviceType.BATTERY,
      ],
      bulkPickupAvailable: true,
      bulkMinimumKg: 100,
      serviceRadius: 20,
      operatingHours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '17:00' },
        sunday: { open: 'closed', close: 'closed' },
      },
      averageRating: 4.8,
      totalReviews: 85,
      monthlyCapacityKg: 15000,
      currentMonthProcessedKg: 5200,
    },
  });

  const recycler3 = await prisma.recycler.upsert({
    where: { email: 'techrecycle@example.com' },
    update: {},
    create: {
      businessName: 'Tech Recycle Hub',
      cpcbAuthNumber: 'CPCB-KA-2024-003',
      certificationExpiry: new Date('2025-09-30'),
      certificationDocuments: ['https://example.com/cert3.pdf'],
      verificationStatus: VerificationStatus.PENDING,
      email: 'techrecycle@example.com',
      phone: '+919876543222',
      addressStreet: '789 Tech Park, Whitefield',
      addressCity: 'Bangalore',
      addressState: 'Karnataka',
      addressPincode: '560066',
      latitude: 12.9716,
      longitude: 77.5946,
      acceptedDeviceTypes: [
        DeviceType.MOBILE_PHONE,
        DeviceType.LAPTOP,
        DeviceType.PRINTER,
        DeviceType.CAMERA,
        DeviceType.SPEAKER,
      ],
      bulkPickupAvailable: false,
      serviceRadius: 15,
      operatingHours: {
        monday: { open: '10:00', close: '19:00' },
        tuesday: { open: '10:00', close: '19:00' },
        wednesday: { open: '10:00', close: '19:00' },
        thursday: { open: '10:00', close: '19:00' },
        friday: { open: '10:00', close: '19:00' },
        saturday: { open: '10:00', close: '15:00' },
        sunday: { open: 'closed', close: 'closed' },
      },
      averageRating: 0,
      totalReviews: 0,
      monthlyCapacityKg: 5000,
      currentMonthProcessedKg: 0,
    },
  });

  console.log('Created recyclers:', {
    recycler1: recycler1.businessName,
    recycler2: recycler2.businessName,
    recycler3: recycler3.businessName,
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
