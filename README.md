
# One Chance - Quiz Application

## 🌟 Overview

**One Chance** is a robust, real-time quiz platform designed for educational institutions, competitions, and interactive learning environments. Built with Next.js, Prisma, and MySQL, it offers seamless experiences for both hosts and participants, with a focus on reliability, security, and analytics.

---

## 🚀 Key Features & Unique Selling Points (USPs)

### 🏆 For Hosts
- **Intuitive Quiz Creation:** Easily create, edit, and manage quizzes with multiple question types (MCQ, subjective, etc.).
- **Real-Time Session Control:** Start, pause, and end quizzes live; monitor participant activity and progress instantly.
- **Live Participant Tracking:** See who joins, monitor responses, and detect suspicious activity (proctoring-ready).
- **Comprehensive Analytics:** Get instant feedback, performance breakdowns, and exportable reports for each session.
- **Team & Individual Modes:** Host quizzes for individuals or teams, with automatic scoring and ranking.
- **Session Management:** Schedule quizzes, manage multiple concurrent sessions, and control access with unique codes.
- **Secure Hosting:** Only authorized users can create or host quizzes, with role-based access control.

### �‍🎓 For Participants
- **Easy Join with Codes:** Enter a session code to join quizzes from any device—no installation required.
- **Live Scoring & Feedback:** See scores and feedback in real time after each question or at the end.
- **Performance Dashboard:** Track your progress, review answers, and analyze strengths/weaknesses.
- **Team Collaboration:** Join as a team, collaborate on answers, and compete in group quizzes.
- **Accessible UI:** Mobile-friendly, responsive design for seamless participation.

### 🔥 USPs & What Sets Us Apart
- **Proctoring-Ready:** Built-in hooks for proctoring and suspicious activity detection (expandable for AI proctoring).
- **Scalable Architecture:** Handles hundreds of concurrent users with efficient session and state management.
- **Customizable & Extensible:** Modular codebase for easy feature addition and integration with other systems.
- **Comprehensive Error Handling:** User-friendly error messages and troubleshooting guides.
- **One-Command Setup:** Automated scripts for fast local or cloud deployment.
- **Security First:** Secure authentication, environment validation, and safe data handling.

---


## ⚡ Quick Start (After Cloning)


### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or pnpm


### One-Command Setup


#### For Unix/Linux/macOS:
```bash
cd quiz-app
chmod +x setup.sh
./setup.sh
```

#### For Windows:
```cmd
cd quiz-app
setup.bat
```

#### Alternative (using npm):
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


---

## 👥 Default Users (Demo)

After seeding, you can log in with these credentials:

### Host Users
- **Username:** Angshuman, **Password:** password123
- **Username:** Anshuman, **Password:** password123  
- **Username:** Rayyan, **Password:** password123

### Participant Users
- **Username:** Sarah, **Password:** password123
- **Username:** Mike, **Password:** password123


---

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


---

## 🎯 Detailed Feature List

### Host Dashboard
- Create, edit, and delete quizzes
- Add questions of various types (MCQ, subjective, etc.)
- Set quiz schedules and time limits
- Monitor live sessions and participant activity
- View analytics: scores, participation rates, question-wise stats
- Export results as CSV/Excel

### Participant Experience
- Join quizzes via unique code or invite link
- Answer questions in real time
- See live leaderboard and instant feedback
- Review answers and analytics post-quiz

### Security & Reliability
- Secure authentication (NextAuth.js)
- Role-based access (host/participant)
- Environment validation and error handling
- Data privacy: no sensitive data stored in client

### Technology Highlights
- **Next.js:** Fast, modern React framework for SSR and API routes
- **Prisma:** Type-safe ORM for MySQL, easy migrations and seeding
- **Tailwind CSS:** Modern, responsive UI
- **Proctoring Hooks:** Ready for integration with webcam/microphone monitoring

---


## 🛡️ Security, Scalability & Extensibility

- **Secure by Design:** All sensitive operations require authentication. Passwords are hashed. Environment variables are validated at startup.
- **Scalable:** Designed to support large quizzes with many participants. Efficient state management and database queries.
- **Extensible:** Modular codebase—add new question types, analytics, or integrations easily.

---

## 🧑‍💻 Usage Scenarios

- **Classroom Quizzes:** Teachers can host live quizzes, track student performance, and export results.
- **Online Competitions:** Organizers can run large-scale contests with real-time leaderboards and anti-cheating features.
- **Corporate Training:** HR can assess employees with secure, analytics-driven quizzes.

---

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


## 🛠️ Development & Contribution


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


---

## 📝 Recent Fixes & Improvements

This project has been updated to handle common setup issues:

1. **Fixed bcrypt native binary issues** - Now uses `bcryptjs`
2. **Fixed Prisma schema location** - Properly configured paths
3. **Added comprehensive setup scripts** - One-command setup
4. **Improved error handling** - Better error messages and guidance
5. **Added environment validation** - Checks for prerequisites


---

## 🤝 How to Contribute

We welcome contributions! To get started:
1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/your-feature`)
3. **Make your changes** (add tests if possible)
4. **Test thoroughly**
5. **Submit a pull request** with a clear description

For major changes, please open an issue first to discuss what you’d like to change.

---

## ❓ FAQ & Support

**Q: Can I use a different database?**
A: The app is optimized for MySQL but can be adapted for PostgreSQL with minor changes in `prisma/schema.prisma`.

**Q: How do I add new question types?**
A: Extend the question model in Prisma and update the quiz creation UI.

**Q: Is it mobile-friendly?**
A: Yes! The UI is fully responsive and works on all modern devices.

**Q: Who do I contact for help?**
A: Open an issue on GitHub or contact the maintainers listed in the repository.

---

## 📄 License

This project is licensed under the MIT License.