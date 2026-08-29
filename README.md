<div align="center">

# 🌍 ECHOWEB

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=10B981&center=true&vCenter=true&width=940&lines=Sustainable+E-Waste+Management+Platform;Find+Recyclers+%7C+Schedule+Pickups+%7C+Track+Impact" alt="Typing SVG" />

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔍 Smart Recycler Discovery
- Search CPCB-certified recyclers
- Advanced location-based filtering
- Detailed recycler profiles
- Real-time availability

</td>
<td width="50%">

### 📅 Easy Pickup Scheduling
- Book convenient pickup times
- Track with unique IDs
- Email notifications
- Cancel/reschedule anytime

</td>
</tr>
<tr>
<td width="50%">

### ⭐ Community Reviews
- Read authentic reviews
- Rate recyclers (1-5 stars)
- Share your experience
- Help others decide

</td>
<td width="50%">

### 📊 Impact Tracking
- Personal impact dashboard
- CO2 savings calculator
- E-waste weight tracking
- Global statistics

</td>
</tr>
<tr>
<td width="50%">

### 🎁 Rewards System
- Earn points for recycling
- Tier-based levels
- Redeemable rewards
- Achievement badges

</td>
<td width="50%">

### 🔐 Secure & Fast
- JWT authentication
- Encrypted data
- Fast performance
- Mobile responsive

</td>
</tr>
</table>

---

## 🎥 Demo

<div align="center">

### 🖼️ Screenshots

<table>
<tr>
<td><img src="https://h.uguu.se/DCuoWnqv.jpg" alt="Home Page" /></td>
<td><img src="https://h.uguu.se/jDGaMkQc.jpg" alt="Recycler Search" /></td>
</tr>
<tr>
<td><img src="https://d.uguu.se/ycDAuADY.jpg" alt="Rewards" /></td>
<td><img src="https://d.uguu.se/mmjPOwpr.jpg" alt="Impact Dashboard" /></td>
</tr>
</table>

> 📸 **Add your actual screenshots here!** Replace the placeholder images with real screenshots of your app.

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
<img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind,vercel" />

### Backend
<img src="https://skillicons.dev/icons?i=nodejs,express,typescript,prisma,postgres" />

### Tools & Services
<img src="https://skillicons.dev/icons?i=git,github,vscode,npm,postman" />

</div>

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+  |  PostgreSQL  |  npm/yarn
```

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Naman-Devio/ECHOWEB.git
cd ECHOWEB

# 2️⃣ Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev

# 3️⃣ Frontend Setup (in new terminal)
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with backend URL
npm run dev
```

### 🎉 Open http://localhost:3000

---

## 📦 Project Structure

```
ECHOWEB/
├── 📁 backend/          # Express API + Prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   └── prisma/
│
└── 📁 frontend/         # Next.js App
    ├── app/
    ├── components/
    ├── hooks/
    └── services/
```

---

## 🔑 Environment Variables

<details>
<summary><b>Backend (.env)</b></summary>

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@yourdomain.com"
```

</details>

<details>
<summary><b>Frontend (.env.local)</b></summary>

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-maps-key"
```

</details>

---

## 📚 API Endpoints

<details>
<summary><b>🔐 Authentication</b></summary>

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token

</details>

<details>
<summary><b>♻️ Recyclers</b></summary>

- `GET /api/recyclers` - Search recyclers
- `GET /api/recyclers/:id` - Get details
- `GET /api/recyclers/:id/reviews` - Get reviews

</details>

<details>
<summary><b>📦 Pickups</b></summary>

- `POST /api/pickups` - Create pickup
- `GET /api/pickups` - Get user pickups
- `GET /api/pickups/track/:trackingId` - Track pickup
- `DELETE /api/pickups/:id` - Cancel pickup

</details>

<details>
<summary><b>⭐ Reviews & Impact</b></summary>

- `POST /api/reviews` - Create review
- `GET /api/impact/user` - User impact
- `GET /api/impact/global` - Global stats

</details>

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

<div align="center">

### 💡 Ideas for Contributions

🐛 Bug fixes | ✨ New features | 📝 Documentation | 🎨 UI improvements

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use, modify, and distribute
```

---

## 👨‍💻 Author

<div align="center">

### **Naman** (CodeWithNaman)

[![GitHub](https://img.shields.io/badge/GitHub-Naman--Devio-181717?style=for-the-badge&logo=github)](https://github.com/Naman-Devio)
[![Email](https://img.shields.io/badge/Email-echoofficial761%40outlook.com-0078D4?style=for-the-badge&logo=microsoft-outlook)](mailto:echoofficial761@outlook.com)

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="400">

</div>

---

## 🌟 Show Your Support

<div align="center">

If you like this project, please ⭐ **star this repository** and share it with others!

[![GitHub stars](https://img.shields.io/github/stars/Naman-Devio/ECHOWEB?style=social)](https://github.com/Naman-Devio/ECHOWEB/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Naman-Devio/ECHOWEB?style=social)](https://github.com/Naman-Devio/ECHOWEB/network/members)

</div>

---

## 📊 GitHub Stats

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/Naman-Devio/ECHOWEB?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/Naman-Devio/ECHOWEB?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Naman-Devio/ECHOWEB?style=flat-square)
![GitHub](https://img.shields.io/github/license/Naman-Devio/ECHOWEB?style=flat-square)

</div>

---

<div align="center">

### 🌱 Built with ❤️ for a Sustainable Future

<img src="https://user-images.githubusercontent.com/74038190/216122041-518ac897-8d92-4c6b-9b3f-ca01dcaf38ee.png" width="200" />

**Made with 💚 by [Naman](https://github.com/Naman-Devio)**

</div>
