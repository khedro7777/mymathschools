#!/bin/bash

# Deploy to Hostinger VPS Script
# Usage: ./deploy-to-vps.sh

set -e

# Configuration
VPS_HOST="31.97.72.105"
VPS_USER="root"
PROJECT_NAME="mymathschools"
REMOTE_PATH="/var/www/mymath"

echo "🚀 Starting deployment to Hostinger VPS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if SSH key exists
if [ ! -f ~/.ssh/id_rsa ]; then
    print_warning "SSH key not found. You'll need to enter password for each connection."
fi

# Build the project locally
print_status "Building the project locally..."
npm run build

# Create deployment archive
print_status "Creating deployment archive..."
tar -czf mymath-deploy.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=strapi-app/node_modules \
    --exclude=strapi-app/.tmp \
    --exclude=strapi-app/build \
    --exclude=*.log \
    .

# Upload to VPS
print_status "Uploading to VPS..."
scp mymath-deploy.tar.gz ${VPS_USER}@${VPS_HOST}:/tmp/

# Execute deployment on VPS
print_status "Executing deployment on VPS..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e
    
    # Create project directory
    mkdir -p /var/www/mymath
    cd /var/www/mymath
    
    # Backup existing deployment
    if [ -d "current" ]; then
        mv current backup-$(date +%Y%m%d-%H%M%S) || true
    fi
    
    # Extract new deployment
    mkdir -p current
    cd current
    tar -xzf /tmp/mymath-deploy.tar.gz
    
    # Install Docker and Docker Compose if not installed
    if ! command -v docker &> /dev/null; then
        echo "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        systemctl enable docker
        systemctl start docker
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "Installing Docker Compose..."
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
    fi
    
    # Copy environment file
    cp .env.production .env
    
    # Stop existing containers
    docker-compose -f docker-compose.production.yml down || true
    
    # Build and start containers
    docker-compose -f docker-compose.production.yml up -d --build
    
    # Wait for services to be ready
    echo "Waiting for services to start..."
    sleep 30
    
    # Check if services are running
    docker-compose -f docker-compose.production.yml ps
    
    # Setup SSL certificates
    echo "Setting up SSL certificates..."
    docker-compose -f docker-compose.production.yml run --rm certbot || true
    
    # Reload nginx to use new certificates
    docker-compose -f docker-compose.production.yml exec nginx nginx -s reload || true
    
    # Clean up
    rm -f /tmp/mymath-deploy.tar.gz
    
    echo "✅ Deployment completed successfully!"
    echo "🌐 Website: https://mymath.live"
    echo "🔧 API: https://api.mymath.live"
    echo "⚡ N8N: https://n8n.mymath.live"
ENDSSH

# Clean up local files
rm -f mymath-deploy.tar.gz

print_status "Deployment completed!"
print_status "Website: https://mymath.live"
print_status "API: https://api.mymath.live"
print_status "N8N: https://n8n.mymath.live"

echo ""
print_warning "Don't forget to:"
echo "1. Update DNS records to point to your VPS IP (31.97.72.105)"
echo "2. Configure your domain registrar's nameservers"
echo "3. Wait for DNS propagation (up to 24 hours)"
echo "4. Test all services after DNS propagation"

