# Troubleshooting Guide

This guide helps resolve common issues when setting up and running the One Chance quiz application.

## 🚨 Common Issues & Solutions

### 1. Database Connection Issues

**Error:** `Can't connect to MySQL server`
```bash
# Solution: Start MySQL service
# Windows
net start mysql

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

**Error:** `Access denied for user`
```bash
# Solution: Check your DATABASE_URL in .env file
DATABASE_URL="mysql://username:password@localhost:3306/NMIMS_QUIZ"
```

**Error:** `Database doesn't exist`
```sql
-- Solution: Create the database
CREATE DATABASE NMIMS_QUIZ;
```

### 2. Prisma Issues

**Error:** `Prisma client not generated`
```bash
# Solution: Generate Prisma client
npm run prisma:generate
```

**Error:** `Migration failed`
```bash
# Solution: Reset and re-run migrations
npx prisma migrate reset
npm run prisma:migrate
```

**Error:** `Seed script fails`
```bash
# Solution: Check database connection and run seed
npm run prisma:generate
npm run prisma:seed
```

### 3. Node.js/Dependencies Issues

**Error:** `Module not found`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error:** `Port already in use`
```bash
# Solution: Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 4. Cross-Platform Issues

#### Windows-Specific Issues

**Error:** `'ts-node' is not recognized`
```bash
# Solution: Install ts-node globally
npm install -g ts-node typescript
```

**Error:** `Path too long`
```bash
# Solution: Enable long paths in Windows
# Run as administrator in PowerShell:
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1
```

#### macOS-Specific Issues

**Error:** `Permission denied`
```bash
# Solution: Fix permissions
chmod +x setup.sh
```

**Error:** `MySQL not found`
```bash
# Solution: Install MySQL via Homebrew
brew install mysql
brew services start mysql
```

#### Linux-Specific Issues

**Error:** `MySQL service not found`
```bash
# Solution: Install MySQL
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 5. Environment Variables Issues

**Error:** `DATABASE_URL is not set`
```bash
# Solution: Create .env file
cp .env.example .env
# Edit .env with your database settings
```

**Error:** `NEXTAUTH_SECRET is not set`
```bash
# Solution: Generate a secret
openssl rand -base64 32
# Add the output to your .env file
```

### 6. Session/API Issues

**Error:** `Session not found`
```bash
# Solution: Check if database is seeded
npm run prisma:seed
```

**Error:** `Participants not loading`
```bash
# Solution: Check API endpoints
# Verify /api/sessions/participants is working
curl http://localhost:3000/api/sessions/participants?code=TEST123
```

### 7. Build Issues

**Error:** `TypeScript compilation failed`
```bash
# Solution: Check TypeScript configuration
npx tsc --noEmit
```

**Error:** `Next.js build failed`
```bash
# Solution: Clear cache and rebuild
rm -rf .next
npm run build
```

## 🔧 Quick Fixes

### Complete Reset (Nuclear Option)
```bash
# 1. Clean everything
rm -rf node_modules .next package-lock.json

# 2. Reset database
npx prisma migrate reset

# 3. Reinstall and setup
npm install
npm run db:setup
npm run dev
```

### Database Reset
```bash
# Reset database and seed
npx prisma migrate reset --force
npm run prisma:seed
```

### Development Server Issues
```bash
# Kill all Node processes
pkill -f node

# Clear Next.js cache
rm -rf .next

# Restart development server
npm run dev
```

## 📋 Pre-Setup Checklist

Before running the application, ensure:

- [ ] Node.js 18+ is installed
- [ ] MySQL 8.0+ is installed and running
- [ ] Database `NMIMS_QUIZ` exists
- [ ] `.env` file is created with correct settings
- [ ] Port 3000 is available

## 🛠️ Platform-Specific Setup

### Windows
```bash
# Use the Windows setup script
setup.bat

# Or manual setup
npm install
npm run db:setup
npm run dev
```

### macOS
```bash
# Use the Unix setup script
./setup.sh

# Or manual setup
npm install
npm run db:setup
npm run dev
```

### Linux
```bash
# Use the Unix setup script
./setup.sh

# Or manual setup
npm install
npm run db:setup
npm run dev
```

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the logs**: Look at the terminal output for error messages
2. **Verify database**: Ensure MySQL is running and accessible
3. **Check environment**: Verify all environment variables are set
4. **Try the reset**: Use the complete reset procedure above
5. **Ask the team**: Contact your team members for help

## 🔍 Debug Mode

Enable debug logging by adding to your `.env`:
```env
DEBUG=prisma:*
NODE_ENV=development
```

This will show detailed Prisma queries and help identify database issues.

---

**Remember**: Most issues are related to database connectivity or missing environment variables. Start with the database setup and work your way up! 