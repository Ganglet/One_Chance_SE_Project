# One Chance - Quiz Application

A real-time quiz application built with Next.js, Prisma, and MySQL. Features include live participant tracking, session management, and comprehensive analytics.

## 🚀 Quick Start (After Pulling from GitHub)

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or pnpm

### One-Command Setup

**For Unix/Linux/macOS:**
```bash
cd quiz-app
chmod +x setup.sh
./setup.sh
```

**For Windows:**
```cmd
cd quiz-app
setup.bat
```

**Alternative (using npm):**
```bash
cd quiz-app
npm run dev:setup
```

### Manual Setup (if automated setup fails)

1. **Install dependencies**
   ```bash
   cd quiz-app
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the `quiz-app` directory:
   ```env
   DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/NMIMS_QUIZ"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```
   **Important:** Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL root password.

3. **Set up the database**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS NMIMS_QUIZ;"
   
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   
   # Seed the database
   npm run prisma:seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 👥 Default Users

After seeding, you can log in with these credentials:

### Host Users
- **Username:** Angshuman, **Password:** password123
- **Username:** Anshuman, **Password:** password123  
- **Username:** Rayyan, **Password:** password123

### Participant Users
- **Username:** Sarah, **Password:** password123
- **Username:** Mike, **Password:** password123

## 🏗️ Project Structure

```
One_Chance_SE_Project/
├── quiz-app/                 # Next.js application
│   ├── app/                  # App router pages
│   ├── components/           # UI components
│   ├── lib/                  # Database utilities
│   ├── hooks/               # Custom React hooks
│   ├── setup.sh             # Unix/Linux setup script
│   ├── setup.bat            # Windows setup script
│   └── public/              # Static assets
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma        # Database schema
│   ├── seed.ts             # Database seeding script
│   └── migrations/         # Database migrations
└── generated/              # Generated Prisma client
```

## 🎯 Features

### For Hosts
- Create and manage quizzes
- Real-time session control
- Live participant tracking
- Comprehensive analytics
- Session management

### For Participants
- Join sessions with codes
- Real-time quiz participation
- Live scoring and feedback
- Performance tracking

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Make sure MySQL is running
   - Verify your password in the `.env` file
   - Check if the database exists: `mysql -u root -p -e "SHOW DATABASES;"`

2. **bcrypt Module Error**
   - The project now uses `bcryptjs` instead of `bcrypt` to avoid native binary issues
   - This is automatically handled in the setup scripts

3. **Prisma Schema Not Found**
   - The schema is located in `../prisma/schema.prisma`
   - This is automatically configured in the package.json scripts

4. **Port Already in Use**
   - Kill existing processes: `pkill -f "next dev"`
   - Or use a different port: `npm run dev -- -p 3001`

### Reset Everything

If you need to start fresh:
```bash
cd quiz-app
rm -rf node_modules .next
rm .env
npm install
./setup.sh  # or setup.bat on Windows
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data
- `npm run setup` - Full setup (install + database)
- `npm run dev:setup` - Setup + start dev server

### Environment Variables

Required environment variables in `.env`:
- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXTAUTH_URL` - Your application URL

## 📝 Recent Fixes

This project has been updated to handle common setup issues:

1. **Fixed bcrypt native binary issues** - Now uses `bcryptjs`
2. **Fixed Prisma schema location** - Properly configured paths
3. **Added comprehensive setup scripts** - One-command setup
4. **Improved error handling** - Better error messages and guidance
5. **Added environment validation** - Checks for prerequisites

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 