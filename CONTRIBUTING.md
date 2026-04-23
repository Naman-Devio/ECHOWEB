# 🤝 Contributing to ECHOWEB

Thanks for your interest in contributing! 🎉

## Quick Guide

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR-USERNAME/ECHOWEB.git
cd ECHOWEB
```

### 2. Create Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Write clean code
- Follow existing style
- Test your changes

### 4. Commit
```bash
git commit -m "feat: add amazing feature"
```

Use these prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring

### 5. Push & PR
```bash
git push origin feature/your-feature-name
```
Then open a Pull Request on GitHub!

## Development Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## Code Style

- Use TypeScript
- Follow ESLint rules
- Run `npm run lint` before committing
- Format with Prettier

## Need Help?

- 📧 Email: echoofficial761@outlook.com
- 💬 Open an issue
- 📖 Check the README

---

**Happy Contributing! 🚀**
