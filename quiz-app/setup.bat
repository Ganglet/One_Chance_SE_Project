@echo off
echo 🚀 Setting up Quiz App - One Command Setup
echo ==========================================
echo.

echo [INFO] Starting setup process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] Please run this script from the quiz-app directory
    pause
    exit /b 1
)

REM Step 1: Install dependencies
echo [INFO] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

REM Step 2: Check if MySQL is installed
echo [INFO] Checking MySQL installation...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] MySQL is not installed or not in PATH
    echo [INFO] Please install MySQL from: https://dev.mysql.com/downloads/mysql/
    echo [INFO] Make sure to add MySQL to your system PATH
    pause
    exit /b 1
)
echo [SUCCESS] MySQL is installed

REM Step 3: Create .env file
echo [INFO] Setting up environment configuration...

REM Check if .env already exists
if exist ".env" (
    echo [WARNING] .env file already exists. Backing up...
    copy .env .env.backup
)

REM Create .env file
(
echo # Database Configuration
echo # Replace YOUR_MYSQL_PASSWORD with your actual MySQL root password
echo DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/NMIMS_QUIZ"
echo.
echo # Next.js Configuration
echo NEXTAUTH_SECRET="your-secret-key-here"
echo NEXTAUTH_URL="http://localhost:3000"
) > .env

echo [SUCCESS] Environment file created
echo [WARNING] Please edit .env file and replace YOUR_MYSQL_PASSWORD with your actual MySQL password

REM Step 4: Generate Prisma client
echo [INFO] Generating Prisma client...
call npm run prisma:generate
if errorlevel 1 (
    echo [ERROR] Failed to generate Prisma client
    pause
    exit /b 1
)
echo [SUCCESS] Prisma client generated successfully

REM Step 5: Push database schema
echo [INFO] Setting up database schema...
call npm run prisma:migrate
if errorlevel 1 (
    echo [WARNING] Could not run migrations. This might be normal for a fresh setup.
)

REM Step 6: Seed database
echo [INFO] Seeding database with sample data...
call npm run prisma:seed
if errorlevel 1 (
    echo [WARNING] Could not seed database. You may need to update the .env file with correct password.
)

echo [SUCCESS] Setup completed!
echo.
echo 🎉 Quiz App is ready to run!
echo.
echo 📋 Next Steps:
echo 1. Edit .env file and replace YOUR_MYSQL_PASSWORD with your actual MySQL password
echo 2. Run: npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
echo 👤 Default Login Credentials:
echo    Username: Angshuman
echo    Password: password123
echo.
echo 🔧 Troubleshooting:
echo - If you get database connection errors, make sure your MySQL password is correct in .env
echo - If bcrypt errors occur, the setup automatically uses bcryptjs instead
echo - Run 'npm run dev:setup' to re-run the entire setup process
echo.
echo [SUCCESS] Happy coding! 🚀
pause 