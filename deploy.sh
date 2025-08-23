#!/bin/bash

echo "🚀 MyMath Platform - Quick Deploy Script"
echo "========================================"

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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Step 1: Build Frontend
print_status "Building Frontend..."
if npm run build; then
    print_success "Frontend built successfully!"
else
    print_error "Frontend build failed!"
    exit 1
fi

# Step 2: Setup environment
print_status "Setting up environment..."
if [ ! -f .env ]; then
    cp .env.production .env
    print_warning "Created .env file from .env.production. Please review and update as needed."
fi

# Step 3: Setup Strapi (if not exists)
if [ ! -d "strapi-app" ]; then
    print_status "Setting up Strapi..."
    ./setup-strapi.sh
fi

# Step 4: Build and start services
print_status "Building and starting Docker services..."
if docker-compose up -d --build; then
    print_success "All services started successfully!"
else
    print_error "Failed to start services!"
    exit 1
fi

# Step 5: Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Step 6: Check service health
print_status "Checking service health..."

# Check Nginx
if curl -f http://localhost:80 > /dev/null 2>&1; then
    print_success "Nginx is running"
else
    print_warning "Nginx might not be ready yet"
fi

# Check Strapi
if curl -f http://localhost:1337/admin > /dev/null 2>&1; then
    print_success "Strapi is running"
else
    print_warning "Strapi might not be ready yet"
fi

# Check MCP
if curl -f http://localhost:4000/health > /dev/null 2>&1; then
    print_success "MCP Service is running"
else
    print_warning "MCP Service might not be ready yet"
fi

# Final status
echo ""
echo "🎉 Deployment completed!"
echo "========================"
echo ""
echo "📱 Frontend: http://localhost (or your domain)"
echo "⚙️  Strapi Admin: http://localhost:1337/admin"
echo "🤖 MCP Service: http://localhost:4000/health"
echo ""
echo "📧 Admin Email: khedrodo@gmail.com"
echo "🔑 Admin Password: group@one07"
echo ""
echo "📋 Useful commands:"
echo "   docker-compose logs -f          # View logs"
echo "   docker-compose ps               # Check status"
echo "   docker-compose restart [service] # Restart service"
echo "   docker-compose down             # Stop all services"
echo ""
print_success "MyMath Platform is ready! 🚀"

