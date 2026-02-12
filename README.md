# 🌍 E-Waste Locator - Sustainable E-Waste Management Platform

A comprehensive full-stack web application for locating certified e-waste recyclers, scheduling pickups, and tracking environmental impact in India.

## ✨ Features

- 🔍 **Find Recyclers** - Search for CPCB-certified e-waste recyclers near you
- 📅 **Schedule Pickups** - Book convenient pickup times for your e-waste
- ⭐ **Reviews & Ratings** - Read and write reviews for recyclers
- 📊 **Impact Tracking** - Monitor your environmental contribution
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📧 **Email Notifications** - Automated pickup confirmations via SendGrid
- 🎨 **Beautiful UI** - Modern, responsive design with sound effects
- 🌐 **Multi-language Support** - Available in multiple Indian languages

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **UI Components:** Custom components with animations

### Backend
- **Runtime:** Node.js with Express
- **Database:** PostgreSQL (Neon.tech)
- **ORM:** Prisma 7
- **Authentication:** JWT
- **Email:** SendGrid
- **Language:** TypeScript

## 📦 Project Structure

```
├── backend/              # Express API server
│   ├── prisma/          # Database schema & migrations
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth & validation
│   │   ├── services/    # Email & external services
│   │   └── utils/       # JWT & helpers
│   └── .env            # Environment variables
│
├── frontend/            # Next.js application
│   ├── app/            # App router pages
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API client
│   └── .env.local      # Frontend env variables
│
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or Neon.tech account)
- SendGrid account (for emails)

### 1. Clone Repository
```bash
git clone https://github.com/yourfather4901-gif/ECHOWEB.git
cd ECHOWEB
```

### 2. Backend Setup
```bash
cd backend
npm install

# Set up environment variables (see backend/.env.example)
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# Start backend server
npm run dev
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with backend URL

# Start frontend server
npm run dev
```

Frontend runs on: http://localhost:3000

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL=your-postgresql-url
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=your-verified-email
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key (optional)
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Recyclers
- `GET /api/recyclers` - Search recyclers
- `GET /api/recyclers/:id` - Get recycler details
- `GET /api/recyclers/:id/reviews` - Get recycler reviews

### Pickups
- `POST /api/pickups` - Create pickup request
- `GET /api/pickups` - Get user's pickups
- `GET /api/pickups/track/:trackingId` - Track pickup
- `DELETE /api/pickups/:id` - Cancel pickup

### Reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Impact
- `GET /api/impact/user` - Get user's impact metrics
- `GET /api/impact/global` - Get global statistics

## 🌐 Deployment

### Heroku Deployment

**Backend:**
```bash
cd backend
heroku create your-app-name-api
heroku config:set DATABASE_URL=your-db-url
heroku config:set JWT_SECRET=your-secret
# ... set other env vars
git push heroku main
heroku run npx prisma migrate deploy
```

**Frontend:**
```bash
cd frontend
heroku create your-app-name-web
heroku config:set NEXT_PUBLIC_API_URL=your-backend-url
git push heroku main
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- **Anshu** - Full Stack Developer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email: echoofficial761@outlook.com

---

**Built with ❤️ for a sustainable future**
