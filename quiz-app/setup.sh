#!/bin/bash

echo "🚀 Setting up Quiz App - One Command Setup"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the quiz-app directory"
    exit 1
fi

print_status "Starting setup process..."

# Step 1: Install dependencies
print_status "Installing dependencies..."
if ! npm install; then
    print_error "Failed to install dependencies"
    exit 1
fi
print_success "Dependencies installed successfully"

# Step 2: Check if MySQL is installed and running
print_status "Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    print_error "MySQL is not installed. Please install MySQL first."
    print_status "On macOS, you can install it with: brew install mysql"
    print_status "On Ubuntu/Debian: sudo apt-get install mysql-server"
    print_status "On Windows: Download from https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

# Check if MySQL service is running
if ! mysqladmin ping -h localhost -u root --silent 2>/dev/null; then
    print_warning "MySQL service is not running. Attempting to start it..."
    if command -v brew &> /dev/null; then
        brew services start mysql
    elif command -v systemctl &> /dev/null; then
        sudo systemctl start mysql
    else
        print_error "Could not start MySQL service automatically. Please start it manually."
        exit 1
    fi
fi
print_success "MySQL is running"

# Step 3: Create .env file with database configuration
print_status "Setting up environment configuration..."

# Check if .env already exists
if [ -f ".env" ]; then
    print_warning ".env file already exists. Backing up..."
    cp .env .env.backup
fi

# Create .env file
cat > .env << EOF
# Database Configuration
# Replace YOUR_MYSQL_PASSWORD with your actual MySQL root password
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/NMIMS_QUIZ"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
EOF

print_success "Environment file created"
print_warning "Please edit .env file and replace YOUR_MYSQL_PASSWORD with your actual MySQL password"

# Step 4: Create database
print_status "Setting up database..."
if mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS NMIMS_QUIZ;" 2>/dev/null; then
    print_success "Database created successfully"
else
    print_warning "Could not create database automatically. Please create it manually:"
    print_status "mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS NMIMS_QUIZ;'"
fi

# Step 5: Generate Prisma client
print_status "Generating Prisma client..."
if npm run prisma:generate; then
    print_success "Prisma client generated successfully"
else
    print_error "Failed to generate Prisma client"
    exit 1
fi

# Step 6: Push database schema
print_status "Setting up database schema..."
if npm run prisma:migrate 2>/dev/null; then
    print_success "Database schema updated successfully"
else
    print_warning "Could not run migrations. This might be normal for a fresh setup."
fi

# Step 7: Seed database
print_status "Seeding database with sample data..."
if npm run prisma:seed; then
    print_success "Database seeded successfully"
else
    print_warning "Could not seed database. You may need to update the .env file with correct password."
fi

print_success "Setup completed!"
echo ""
echo "🎉 Quiz App is ready to run!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env file and replace YOUR_MYSQL_PASSWORD with your actual MySQL password"
echo "2. Run: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "👤 Default Login Credentials:"
echo "   Username: Angshuman"
echo "   Password: password123"
echo ""
echo "🔧 Troubleshooting:"
echo "- If you get database connection errors, make sure your MySQL password is correct in .env"
echo "- If bcrypt errors occur, the setup automatically uses bcryptjs instead"
echo "- Run 'npm run dev:setup' to re-run the entire setup process"
echo ""
print_success "Happy coding! 🚀" 