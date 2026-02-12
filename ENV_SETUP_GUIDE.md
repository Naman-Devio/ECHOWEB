# Environment Variables Setup Guide

This guide will help you obtain all the necessary API keys and environment variables for the E-Waste Locator project.

## 🔧 Required Environment Variables

### 1. DATABASE_URL (PostgreSQL) - **REQUIRED**

**What it is:** Connection string for your PostgreSQL database

**How to get it:**

#### Option A: Local PostgreSQL (Development)
1. Install PostgreSQL on your machine:
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. Start PostgreSQL service
3. Create a database:
   ```bash
   psql -U postgres
   CREATE DATABASE ewaste_locator;
   \q
   ```

4. Your DATABASE_URL will be:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/ewaste_locator?schema=public"
   ```

#### Option B: Free Cloud PostgreSQL (Recommended for Production)
1. **Neon.tech** (FREE - Recommended):
   - Go to https://neon.tech
   - Sign up with GitHub/Google
   - Create a new project
   - Copy the connection string provided
   - Example: `postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb`

2. **Supabase** (FREE):
   - Go to https://supabase.com
   - Create account and new project
   - Go to Settings > Database
   - Copy the connection string (URI format)

3. **ElephantSQL** (FREE tier available):
   - Go to https://www.elephantsql.com
   - Create account
   - Create new instance (Tiny Turtle - FREE)
   - Copy the URL provided

---

### 2. JWT_SECRET & JWT_REFRESH_SECRET - **REQUIRED**

**What it is:** Secret keys for signing JWT tokens

**How to get it:**
Generate random secure strings:

```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Or use online generator
# https://generate-secret.vercel.app/32
```

Generate TWO different secrets:
```
JWT_SECRET=your_generated_secret_here_32_chars_minimum
JWT_REFRESH_SECRET=different_secret_here_32_chars_minimum
```

---

### 3. FRONTEND_URL - **REQUIRED**

**What it is:** URL of your frontend application

**Development:**
```
FRONTEND_URL=http://localhost:3000
```

**Production (after deployment):**
```
FRONTEND_URL=https://your-app-name.vercel.app
```

---

### 4. Email Service (SMTP) - **OPTIONAL but Recommended**

**What it is:** Email service for sending verification emails, password resets, etc.

#### Option A: Gmail (FREE - Easy for Development)
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App Passwords
4. Generate an app password for "Mail"
5. Use these settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your.email@gmail.com
   SMTP_PASSWORD=your_app_password_here
   EMAIL_FROM=your.email@gmail.com
   ```

#### Option B: SendGrid (FREE - 100 emails/day)
1. Go to https://sendgrid.com
2. Sign up for free account
3. Create an API key in Settings > API Keys
4. Verify your sender email
5. Use these settings:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your_sendgrid_api_key
   EMAIL_FROM=your_verified_email@domain.com
   ```

#### Option C: Resend (FREE - Modern, Easy)
1. Go to https://resend.com
2. Sign up (GitHub login available)
3. Get API key from dashboard
4. Add domain or use their test domain
5. Use their API (you'll need to update emailService.ts)

**Note:** For now, emails are just logged to console. You can add this later.

---

### 5. Google Maps API Key - **OPTIONAL**

**What it is:** For geocoding addresses and showing maps

**How to get it:**
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Go to Credentials > Create Credentials > API Key
5. Restrict the key to your domain for security
6. Copy the API key:
   ```
   GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

**FREE Tier:** $200 credit per month (enough for small apps)

**Alternative (FREE):** Use OpenStreetMap with Leaflet (no API key needed)

---

### 6. OpenAI API Key - **OPTIONAL**

**What it is:** For AI-powered device identification feature

**How to get it:**
1. Go to https://platform.openai.com
2. Sign up / Log in
3. Go to API Keys section
4. Create new secret key
5. Copy immediately (won't be shown again):
   ```
   OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

**Cost:** Pay as you go (starts at $5 minimum)
- GPT-3.5-Turbo: ~$0.002 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens

**Note:** This feature is optional. You can launch without it.

---

### 7. AWS S3 (File Storage) - **OPTIONAL**

**What it is:** For storing compliance certificates, images, documents

**How to get it:**
1. Go to https://aws.amazon.com
2. Create AWS account (requires credit card but has free tier)
3. Go to IAM > Users > Create User
4. Attach policy: AmazonS3FullAccess
5. Create access key
6. Create S3 bucket in your region
7. Use these credentials:
   ```
   AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
   AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=ewaste-locator-files
   ```

**FREE Tier:** 5GB storage, 20,000 GET requests, 2,000 PUT requests per month

**Alternative (FREE):** 
- **Cloudinary** (https://cloudinary.com) - 25GB storage free
- **Supabase Storage** - 1GB free

---

### 8. SMS Service - **OPTIONAL**

**What it is:** For sending SMS notifications

#### Option A: Twilio (FREE trial)
1. Go to https://www.twilio.com
2. Sign up for free trial ($15 credit)
3. Get phone number
4. Get credentials from console:
   ```
   SMS_API_KEY=your_account_sid
   SMS_API_SECRET=your_auth_token
   ```

#### Option B: AWS SNS (Pay as you go)
- Very cheap (~$0.00645 per SMS in India)

**Note:** SMS is optional. Email notifications work fine for MVP.

---

### 9. Redis - **OPTIONAL**

**What it is:** For caching and session management (improves performance)

#### Option A: Local Redis (Development)
```bash
# Install Redis
# Mac: brew install redis
# Windows: Use WSL or Docker
# Linux: sudo apt-get install redis

# Start Redis
redis-server

# Use this URL
REDIS_URL=redis://localhost:6379
```

#### Option B: Free Cloud Redis
1. **Upstash** (FREE - Recommended):
   - Go to https://upstash.com
   - Create account
   - Create Redis database
   - Copy the Redis URL

2. **Redis Cloud** (FREE 30MB):
   - Go to https://redis.com/try-free
   - Create account and database
   - Copy connection string

**Note:** Redis is optional for MVP. Add it later for scaling.

---

## 📋 Quick Start Configuration

### Minimum Required for Development:

Create `backend/.env` file:

```bash
# REQUIRED - Minimum to run the app
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ewaste_locator?schema=public"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=change-this-to-a-random-32-char-string-in-production
JWT_REFRESH_SECRET=change-this-to-another-random-32-char-string
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
EMAIL_FROM=noreply@ewaste-locator.com

# OPTIONAL - Leave empty for now
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMS_API_KEY=
SMS_API_SECRET=
OPENAI_API_KEY=
GOOGLE_MAPS_API_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
REDIS_URL=
```

### For Production (Heroku/Vercel):

You'll need:
1. ✅ DATABASE_URL (use Neon.tech - FREE)
2. ✅ JWT_SECRET & JWT_REFRESH_SECRET (generate random)
3. ✅ FRONTEND_URL (your deployed frontend URL)
4. ⚠️ SMTP settings (recommended - use SendGrid FREE tier)
5. ❌ Others are optional

---

## 🚀 What Still Needs to Be Done

### Backend Improvements:

1. **Email Service Integration** (Priority: HIGH)
   - Currently emails are just logged to console
   - Need to integrate with SendGrid/Resend
   - Update `backend/src/services/emailService.ts`

2. **Rate Limiting** (Priority: HIGH)
   - Protect API from abuse
   - Install: `npm install express-rate-limit`
   - Add middleware to protect auth endpoints

3. **Input Validation Middleware** (Priority: MEDIUM)
   - Centralized validation error handling
   - Better error messages

4. **File Upload** (Priority: MEDIUM)
   - For compliance certificates
   - User profile pictures
   - Device images for AI identification

5. **Caching Layer** (Priority: LOW)
   - Redis for frequently accessed data
   - Improves performance

6. **API Documentation** (Priority: MEDIUM)
   - Swagger/OpenAPI documentation
   - Makes it easier for frontend integration

7. **Testing** (Priority: MEDIUM)
   - Unit tests for controllers
   - Integration tests for API endpoints
   - Use Jest or Vitest

8. **Logging** (Priority: MEDIUM)
   - Structured logging with Winston or Pino
   - Better error tracking

9. **Database Migrations** (Priority: HIGH)
   - Currently using Prisma migrations
   - Need to run: `npx prisma migrate dev`

10. **Seed Data** (Priority: HIGH)
    - Add sample recyclers for testing
    - Run: `npx prisma db seed`

### Frontend Improvements:

1. **Connect to Real Backend API** (Priority: HIGH)
   - Update API service to use real endpoints
   - Replace mock data with API calls
   - Handle loading states and errors

2. **User Dashboard** (Priority: HIGH)
   - Show user's pickup history
   - Display personal impact metrics
   - Profile management

3. **Real-time Tracking** (Priority: MEDIUM)
   - Track pickup status
   - Notifications for status changes

4. **Map Integration** (Priority: MEDIUM)
   - Show recyclers on map
   - Distance calculation
   - Route planning

5. **AI Device Identification** (Priority: LOW)
   - Upload device photo
   - AI identifies device type
   - Suggests disposal method

6. **Multi-language Support** (Priority: LOW)
   - Hindi, Tamil, Telugu, Bengali
   - i18n integration

7. **PWA Features** (Priority: LOW)
   - Offline support
   - Push notifications
   - Install as app

8. **Payment Integration** (Priority: LOW)
   - If you want to charge for premium features
   - Razorpay integration (Indian payment gateway)

### DevOps & Deployment:

1. **CI/CD Pipeline** (Priority: MEDIUM)
   - GitHub Actions for automated testing
   - Automated deployment

2. **Monitoring** (Priority: MEDIUM)
   - Error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring

3. **Backup Strategy** (Priority: HIGH)
   - Automated database backups
   - Disaster recovery plan

4. **Security Audit** (Priority: HIGH)
   - Penetration testing
   - Security headers
   - HTTPS enforcement

---

## 📝 Next Steps

### Immediate (This Week):

1. ✅ Set up PostgreSQL database (local or Neon.tech)
2. ✅ Generate JWT secrets
3. ✅ Create `.env` file in backend folder
4. ✅ Run database migrations: `cd backend && npx prisma migrate dev`
5. ✅ Seed database: `npx prisma db seed`
6. ✅ Test backend: `npm run dev`
7. ✅ Test frontend: `cd frontend && npm run dev`

### Short Term (This Month):

1. ⚠️ Set up email service (SendGrid FREE)
2. ⚠️ Add rate limiting to API
3. ⚠️ Connect frontend to real backend
4. ⚠️ Deploy to Heroku/Vercel
5. ⚠️ Set up domain name

### Long Term (Next 3 Months):

1. 📱 Add map integration
2. 📱 Build user dashboard
3. 📱 Add real-time tracking
4. 📱 Implement AI features
5. 📱 Add multi-language support
6. 📱 Mobile app (React Native)

---

## 💡 Pro Tips

1. **Start Simple:** Don't try to get all API keys at once. Start with just database and JWT.

2. **Use Free Tiers:** Almost everything has a generous free tier that's perfect for MVP.

3. **Environment Files:** Never commit `.env` files to Git. They're already in `.gitignore`.

4. **Production Secrets:** Use environment variables in your hosting platform (Heroku Config Vars, Vercel Environment Variables).

5. **API Key Security:** 
   - Never expose API keys in frontend code
   - Use backend as proxy for sensitive operations
   - Rotate keys regularly

6. **Cost Management:**
   - Set up billing alerts on AWS/Google Cloud
   - Monitor API usage
   - Start with free tiers and upgrade as needed

---

## 🆘 Need Help?

If you get stuck:
1. Check the service's documentation
2. Look for "getting started" or "quickstart" guides
3. Most services have free support forums
4. Stack Overflow is your friend

---

## 📚 Useful Resources

- **PostgreSQL:** https://www.postgresql.org/docs/
- **Prisma:** https://www.prisma.io/docs
- **JWT:** https://jwt.io/introduction
- **SendGrid:** https://docs.sendgrid.com/
- **Neon.tech:** https://neon.tech/docs/introduction
- **Heroku:** https://devcenter.heroku.com/
- **Vercel:** https://vercel.com/docs

---

Good luck! 🚀 Your E-Waste Locator platform is almost ready to launch!
