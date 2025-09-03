#!/bin/bash

# Hostinger VPS Deployment Script for Mymath Academy
# Usage: ./deploy-hostinger-manual.sh

set -e

# Configuration
VPS_HOST="31.97.72.105"
VPS_USER="root"
VPS_PASSWORD="SadekKhedr77@@"
PROJECT_NAME="mymathschools"
REMOTE_PATH="/var/www/mymath"
GITHUB_REPO="https://github.com/khedro7777/mymathschools.git"
BRANCH="production-ready"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Function to execute commands on VPS
execute_on_vps() {
    local command="$1"
    print_status "Executing on VPS: $command"
    
    sshpass -p "$VPS_PASSWORD" ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "$command"
}

# Function to copy files to VPS
copy_to_vps() {
    local local_path="$1"
    local remote_path="$2"
    print_status "Copying $local_path to VPS:$remote_path"
    
    sshpass -p "$VPS_PASSWORD" scp -o StrictHostKeyChecking=no -r "$local_path" "$VPS_USER@$VPS_HOST:$remote_path"
}

echo "🚀 Starting Hostinger VPS Deployment for Mymath Academy..."
echo "=================================================="

# Step 1: Check if sshpass is installed
print_step "1. Checking dependencies..."
if ! command -v sshpass &> /dev/null; then
    print_warning "sshpass not found. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install hudochenkov/sshpass/sshpass
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y sshpass
    else
        print_error "Please install sshpass manually"
        exit 1
    fi
fi

# Step 2: Test VPS connection
print_step "2. Testing VPS connection..."
if execute_on_vps "echo 'Connection successful'"; then
    print_status "✅ VPS connection established"
else
    print_error "❌ Failed to connect to VPS"
    exit 1
fi

# Step 3: Update VPS system
print_step "3. Updating VPS system..."
execute_on_vps "apt update && apt upgrade -y"

# Step 4: Install required packages
print_step "4. Installing required packages..."
execute_on_vps "apt install -y git curl wget unzip software-properties-common"

# Step 5: Install Docker and Docker Compose
print_step "5. Installing Docker..."
execute_on_vps "
    # Remove old Docker versions
    apt remove -y docker docker-engine docker.io containerd runc || true
    
    # Install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    
    # Start and enable Docker
    systemctl start docker
    systemctl enable docker
    
    # Install Docker Compose
    curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # Verify installation
    docker --version
    docker-compose --version
"

# Step 6: Install Node.js and npm
print_step "6. Installing Node.js..."
execute_on_vps "
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    node --version
    npm --version
"

# Step 7: Create project directory
print_step "7. Creating project directory..."
execute_on_vps "mkdir -p $REMOTE_PATH && cd $REMOTE_PATH"

# Step 8: Clone repository
print_step "8. Cloning repository..."
execute_on_vps "
    cd $REMOTE_PATH
    if [ -d '.git' ]; then
        git pull origin $BRANCH
    else
        git clone -b $BRANCH $GITHUB_REPO .
    fi
"

# Step 9: Set up environment variables
print_step "9. Setting up environment variables..."
execute_on_vps "
    cd $REMOTE_PATH
    cp .env.production .env
    
    # Update environment variables for production
    sed -i 's/localhost/31.97.72.105/g' .env
    sed -i 's/http:/https:/g' .env
"

# Step 10: Install frontend dependencies and build
print_step "10. Building frontend..."
execute_on_vps "
    cd $REMOTE_PATH
    npm install
    npm run build
"

# Step 11: Set up Strapi
print_step "11. Setting up Strapi..."
execute_on_vps "
    cd $REMOTE_PATH/strapi-app
    npm install
    
    # Create production environment file
    cat > .env << EOF
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here

DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=mymath_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=SadekKhedr77@@
DATABASE_SSL=false
EOF
"

# Step 12: Deploy with Docker Compose
print_step "12. Deploying with Docker Compose..."
execute_on_vps "
    cd $REMOTE_PATH
    
    # Stop existing containers
    docker-compose -f docker-compose.production.yml down || true
    
    # Build and start containers
    docker-compose -f docker-compose.production.yml up -d --build
    
    # Wait for services to start
    sleep 30
    
    # Check container status
    docker-compose -f docker-compose.production.yml ps
"

# Step 13: Set up SSL certificates (Let's Encrypt)
print_step "13. Setting up SSL certificates..."
execute_on_vps "
    cd $REMOTE_PATH
    
    # Install certbot
    apt install -y certbot python3-certbot-nginx
    
    # Generate certificates (this will require domain to be pointed to VPS)
    # certbot --nginx -d mymath.live -d api.mymath.live -d n8n.mymath.live --non-interactive --agree-tos --email newkhedro2@gmail.com || true
    
    # For now, create self-signed certificates for testing
    mkdir -p /etc/nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/mymath.key \
        -out /etc/nginx/ssl/mymath.crt \
        -subj '/C=EG/ST=Cairo/L=Cairo/O=Mymath Academy/CN=mymath.live'
"

# Step 14: Configure firewall
print_step "14. Configuring firewall..."
execute_on_vps "
    # Install and configure UFW
    apt install -y ufw
    
    # Allow SSH, HTTP, and HTTPS
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 1337/tcp
    ufw allow 5678/tcp
    
    # Enable firewall
    ufw --force enable
    
    # Show status
    ufw status
"

# Step 15: Final checks
print_step "15. Running final checks..."
execute_on_vps "
    cd $REMOTE_PATH
    
    # Check if all services are running
    docker-compose -f docker-compose.production.yml ps
    
    # Check logs for any errors
    docker-compose -f docker-compose.production.yml logs --tail=20
    
    # Test if services are responding
    curl -I http://localhost || true
    curl -I http://localhost:1337 || true
"

print_status "🎉 Deployment completed!"
print_status "📋 Next steps:"
echo "1. Point your domain DNS to VPS IP: 31.97.72.105"
echo "   - mymath.live → 31.97.72.105"
echo "   - api.mymath.live → 31.97.72.105"
echo "   - n8n.mymath.live → 31.97.72.105"
echo ""
echo "2. After DNS propagation, run SSL setup:"
echo "   ssh root@31.97.72.105"
echo "   certbot --nginx -d mymath.live -d api.mymath.live -d n8n.mymath.live"
echo ""
echo "3. Access your services:"
echo "   - Website: https://mymath.live"
echo "   - Strapi Admin: https://api.mymath.live/admin"
echo "   - N8N: https://n8n.mymath.live"
echo ""
print_status "🚀 Mymath Academy is now live!"

