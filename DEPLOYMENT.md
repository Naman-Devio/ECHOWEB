# E-Waste Locator - Deployment Guide

## Heroku Deployment

### Prerequisites
- Heroku CLI installed
- Git repository initialized
- Heroku account created

### Backend Deployment (Heroku)

1. **Create Heroku App**
```bash
cd backend
heroku create ewaste-locator-api
```

2. **Add PostgreSQL Database**
```bash
heroku addons:create heroku-postgresql:mini
```

3. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-secret-key
heroku config:set JWT_REFRESH_SECRET=your-refresh-secret-key
heroku config:set OPENAI_API_KEY=your-openai-key
heroku config:set GOOGLE_MAPS_API_KEY=your-google-maps-key
```

4. **Deploy Backend**
```bash
git add .
git commit -m "Deploy backend"
git push heroku main
```

5. **Run Database Migrations**
```bash
heroku run npx prisma migrate deploy
heroku run npx prisma db seed
```

### Frontend Deployment (Vercel - Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy Frontend**
```bash
cd frontend
vercel
```

3. **Set Environment Variables in Vercel Dashboard**
- `NEXT_PUBLIC_API_URL`: Your Heroku backend URL
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

4. **Production Deployment**
```bash
vercel --prod
```

### Alternative: Frontend on Heroku

If you prefer to deploy frontend on Heroku:

1. **Create Frontend App**
```bash
cd frontend
heroku create ewaste-locator-web
```

2. **Add Node.js Buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

3. **Create Procfile in frontend directory**
```
web: npm start
```

4. **Update package.json scripts**
```json
{
  "scripts": {
    "start": "next start -p $PORT",
    "heroku-postbuild": "npm run build"
  }
}
```

5. **Deploy**
```bash
git add .
git commit -m "Deploy frontend"
git push heroku main
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
PORT=5000
NODE_ENV=production
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d
OPENAI_API_KEY=sk-...
GOOGLE_MAPS_API_KEY=AIza...
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG...
EMAIL_FROM=noreply@ewaste-locator.com
SMS_API_KEY=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
AWS_S3_BUCKET=ewaste-locator
REDIS_URL=redis://...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://ewaste-locator-api.herokuapp.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_ENABLE_IMAGE_CLASSIFICATION=true
```

## Post-Deployment Checklist

- [ ] Verify backend health endpoint: `https://your-app.herokuapp.com/health`
- [ ] Test database connection
- [ ] Verify frontend loads correctly
- [ ] Test API endpoints from frontend
- [ ] Check environment variables are set
- [ ] Run database migrations
- [ ] Seed initial data if needed
- [ ] Test authentication flow
- [ ] Verify email sending works
- [ ] Test file uploads (if applicable)
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate
- [ ] Set up monitoring (Sentry, etc.)

## Monitoring

### View Logs
```bash
# Backend logs
heroku logs --tail --app ewaste-locator-api

# Frontend logs (if on Heroku)
heroku logs --tail --app ewaste-locator-web
```

### Database Management
```bash
# Access database
heroku pg:psql --app ewaste-locator-api

# View database info
heroku pg:info --app ewaste-locator-api

# Backup database
heroku pg:backups:capture --app ewaste-locator-api
```

## Scaling

### Heroku Dynos
```bash
# Scale web dynos
heroku ps:scale web=2 --app ewaste-locator-api

# View current dyno status
heroku ps --app ewaste-locator-api
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version in package.json
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Database Connection Issues**
   - Verify DATABASE_URL is set
   - Check Prisma schema is correct
   - Ensure migrations are run

3. **Environment Variable Issues**
   - List all config vars: `heroku config`
   - Set missing variables
   - Restart app after changes

4. **Frontend Can't Connect to Backend**
   - Verify NEXT_PUBLIC_API_URL is correct
   - Check CORS settings in backend
   - Ensure backend is running

## Custom Domain Setup

1. **Add Domain to Heroku**
```bash
heroku domains:add www.ewaste-locator.com --app ewaste-locator-api
```

2. **Configure DNS**
- Add CNAME record pointing to Heroku DNS target
- Wait for DNS propagation

3. **Enable SSL**
```bash
heroku certs:auto:enable --app ewaste-locator-api
```

## Continuous Deployment

### GitHub Integration

1. Connect Heroku app to GitHub repository
2. Enable automatic deploys from main branch
3. Enable "Wait for CI to pass" if using CI/CD

### Manual Deployment
```bash
git push heroku main
```

## Performance Optimization

1. **Enable Caching**
   - Use Redis for session storage
   - Implement API response caching

2. **CDN for Static Assets**
   - Use Cloudflare or similar CDN
   - Configure in frontend

3. **Database Optimization**
   - Add indexes for frequently queried fields
   - Use connection pooling
   - Monitor slow queries

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set secure environment variables
- [ ] Enable CORS with specific origins
- [ ] Implement rate limiting
- [ ] Use strong JWT secrets
- [ ] Encrypt sensitive data at rest
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities
- [ ] Implement proper error handling
- [ ] Use security headers

## Cost Optimization

- Start with free/hobby dynos for testing
- Upgrade to production dynos for live traffic
- Monitor dyno usage and scale as needed
- Use database connection pooling
- Implement caching to reduce database queries
- Optimize API calls to external services

## Support

For deployment issues:
1. Check Heroku status page
2. Review application logs
3. Check Heroku documentation
4. Contact Heroku support if needed
