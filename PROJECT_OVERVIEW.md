# E-Waste Locator - Project Overview

## 🎯 What It Does
A web platform that connects people with certified e-waste recyclers and rewards them for recycling through a gamified system with scratch cards, points, and cashback.

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14 + TypeScript + Tailwind CSS + Framer Motion  
**Backend:** Node.js + Express + TypeScript  
**Database:** PostgreSQL (Neon.tech) + Prisma ORM  
**Hosting:** Render.com  
**Auth:** JWT + bcrypt

---

## ✨ Key Features

### 1. Find Recyclers
- Search by location and device type
- View certified recyclers on map
- Check ratings and reviews
- See operating hours and services

### 2. Schedule Pickup
- Book pickup with date/time
- Add multiple devices
- Track pickup status
- Get compliance certificate

### 3. Gamified Rewards ⭐
**The Star Feature!**
- **Scratch Cards:** Interactive canvas-based cards you scratch to reveal rewards
- **Points System:** Earn 50 points per pickup
- **Tiers:** MVP 🌱 → Bronze 🥉 → Silver ⭐ → Gold 👑
- **Cashback:** 100 points = ₹10
- **Vouchers:** Redeem for Amazon, Flipkart, Swiggy, etc.
- **Works Without Login:** Guest users can use all features via localStorage

### 4. Impact Tracking
- Real-time stats with animations
- Shows CO₂ saved, e-waste diverted
- Sound effects when viewing

### 5. Smooth UX
- Sound effects (click, scratch, success)
- Confetti animations
- Responsive design
- Loading states

---

## 🎮 How Rewards Work

### Scratch Card Flow:
```
Schedule Pickup → Get Scratch Card → Scratch 60% → 
Reveal Reward → Points Added → Redeem for Vouchers
```

### Technical Magic:
- **Canvas API** draws the scratch surface
- **Pixel detection** calculates scratch percentage
- **localStorage** stores guest user data
- **Event system** syncs UI in real-time
- **Confetti.js** celebrates wins

### Guest User System:
No login needed! System auto-creates a guest account and stores everything locally. Users can scratch cards, earn points, and redeem rewards immediately.

---

## 📁 Project Structure

```
frontend/
├── app/              # Pages (home, recyclers, rewards, auth)
├── components/       # Reusable UI (ScratchCard, PointsBadge, Navbar)
├── hooks/           # Custom hooks (useSoundEffects)
└── services/        # API calls

backend/
├── controllers/     # Business logic (auth, recyclers, rewards)
├── routes/         # API endpoints
├── middleware/     # Auth & validation
└── prisma/         # Database schema & migrations
```

---

## 🗄️ Database Models

- **User:** Auth + rewards (points, cashback, tier)
- **Recycler:** Business info + location + certifications
- **PickupRequest:** Booking details + status + impact
- **RewardCard:** Scratch cards (type, value, status)
- **Transaction:** Points history
- **Redemption:** Voucher redemptions

---

## � DGeployment

**Frontend:** Push to GitHub → Render builds Next.js → Live  
**Backend:** Push to GitHub → Prisma migrates DB → Express starts → Live

**URLs:**
- Frontend: https://echoweb-frontend.onrender.com
- Backend: https://echoweb-backend.onrender.com

---

## 🎨 Design Highlights

**Colors:**
- Green (#10b981) - Environmental theme
- Orange (#f59e0b) - Rewards & energy
- Blue (#3b82f6) - Trust

**Animations:**
- Framer Motion for smooth transitions
- Canvas for scratch effects
- Confetti for celebrations
- Sound feedback for interactions

---

## 💡 Cool Technical Solutions

### Problem 1: Logout shows profile icon again
**Solution:** Added `justLoggedOut` flag to prevent auto-guest creation

### Problem 2: Scratch sound plays continuously
**Solution:** Throttled to 200ms intervals

### Problem 3: Counting sound plays when not visible
**Solution:** Only plays when stats section is 30% visible

### Problem 4: Scratch card doesn't show reward
**Solution:** Load reward data before scratching in useEffect

---

## 🎓 Skills Demonstrated

**Frontend:**
- Next.js 14 App Router
- TypeScript for type safety
- Canvas API manipulation
- Event-driven architecture
- localStorage management
- Responsive design
- Animation libraries

**Backend:**
- RESTful API design
- JWT authentication
- Database design with Prisma
- PostgreSQL queries
- Error handling
- Middleware patterns

**DevOps:**
- Git workflow
- Environment variables
- Deployment automation
- Database migrations

---

## 📊 Key Metrics

- **125 Tons** e-waste diverted
- **87 Tons** CO₂ saved
- **4 Tier levels** for gamification
- **5 Voucher partners** for redemption
- **100% Guest support** - no login required

---

## 🏆 What Makes It Special

✅ **Gamification** drives user engagement  
✅ **Guest mode** removes friction  
✅ **Real-time updates** feel instant  
✅ **Canvas scratch cards** are unique  
✅ **Environmental impact** with social good  
✅ **Production-ready** with proper error handling  

---

## 🔮 Future Ideas

- Mobile app (React Native)
- Real-time notifications (WebSockets)
- Leaderboards
- Referral program
- AI chatbot for guidance
- Social sharing

---

**Built with ❤️ for a sustainable future**

Live Demo: https://echoweb-frontend.onrender.com
