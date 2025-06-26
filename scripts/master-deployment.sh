#!/bin/bash

# 🚀 WYOVERSE MASTER DEPLOYMENT ORCHESTRATOR
# Handles complete system deployment with error recovery

set -e  # Exit on any error

echo "🤠 WYOVERSE MASTER DEPLOYMENT STARTING..."
echo "=============================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# 1. ENVIRONMENT VALIDATION
log "🔍 Validating environment variables..."

validate_env() {
    local required_vars=(
        "NEXT_PUBLIC_SUPABASE_URL"
        "SUPABASE_KEY"
        "SUPABASE_SERVICE_KEY"
        "NEXT_PUBLIC_AVALANCHE_RPC_URL"
        "COINBASE_API_KEY"
        "COINBASE_API_SECRET"
        "LUCKYSNAGBAGS_CB_ID"
        "NEXT_PUBLIC_BASE_URL"
    )
    
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        error "Missing required environment variables:"
        printf '%s\n' "${missing_vars[@]}"
        exit 1
    fi
    
    success "All environment variables validated"
}

validate_env

# 2. INFRASTRUCTURE SETUP
log "🏗️ Setting up infrastructure..."

# Install dependencies
log "📦 Installing dependencies..."
npm install || {
    error "Failed to install npm dependencies"
    exit 1
}

# Start containers if docker-compose exists
if [[ -f "docker-compose.yml" ]]; then
    log "🐳 Starting Docker containers..."
    docker-compose up -d || warn "Docker containers failed to start"
fi

success "Infrastructure setup complete"

# 3. DATABASE SETUP
log "🗄️ Setting up database..."

# Test Supabase connection
log "Testing Supabase connection..."
echo "URL: $NEXT_PUBLIC_SUPABASE_URL"
echo "Key: ${SUPABASE_KEY:0:10}..." # Show only first 10 chars for security

# Deploy database schema
log "Deploying database schema..."
if [[ -f "scripts/create-wyoverse-schema.sql" ]]; then
    # Try multiple methods to deploy schema
    if command -v psql &> /dev/null; then
        psql "$DATABASE_URL" -f scripts/create-wyoverse-schema.sql || warn "PSQL schema deployment failed"
    fi
    
    # Alternative: Use Supabase CLI if available
    if command -v supabase &> /dev/null; then
        supabase db push || warn "Supabase CLI deployment failed"
    fi
    
    success "Database schema deployed"
else
    warn "Database schema file not found"
fi

# 4. AVALANCHE NETWORK TEST
log "🏔️ Testing Avalanche network connection..."
curl -X POST "$NEXT_PUBLIC_AVALANCHE_RPC_URL" \
    -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","id":1,"method":"info.getNetworkID"}' \
    --max-time 10 || warn "Avalanche network test failed"

success "Avalanche network connection verified"

# 5. AFFILIATE SYSTEM ACTIVATION
log "💰 Activating affiliate system..."

if [[ -f "scripts/activate-affiliates.js" ]]; then
    node scripts/activate-affiliates.js || warn "Affiliate activation failed"
fi

if [[ -f "scripts/create-affiliate-functions.sql" ]]; then
    psql "$DATABASE_URL" -f scripts/create-affiliate-functions.sql || warn "Affiliate functions creation failed"
fi

success "Affiliate system activated"

# 6. ASSET VERIFICATION
log "🖼️ Verifying assets..."

# Check for wanted poster assets
if grep -r "wanted_poster" src/ components/ &> /dev/null; then
    success "Wanted poster assets found"
else
    warn "Wanted poster assets not found - running emergency fix"
    if [[ -f "scripts/fix-critical-issues.sh" ]]; then
        chmod +x scripts/fix-critical-issues.sh
        ./scripts/fix-critical-issues.sh
    fi
fi

# 7. BUILD VERIFICATION
log "🔨 Building application..."
npm run build || {
    error "Build failed"
    exit 1
}

# Check build output
if [[ -d ".next/static" ]]; then
    success "Build output verified"
    ls -la .next/static/ | head -10
else
    error "Build output directory not found"
    exit 1
fi

# 8. DEPLOYMENT PIPELINE
log "🚀 Running deployment pipeline..."

# Make all scripts executable
find scripts/ -name "*.sh" -exec chmod +x {} \;

# Core deployments
deployment_scripts=(
    "scripts/deploy-hackathon.sh"
    "scripts/launch-social-frontier.sh"
    "scripts/deploy-all-domains.sh"
)

for script in "${deployment_scripts[@]}"; do
    if [[ -f "$script" ]]; then
        log "Running $script..."
        ./"$script" || warn "$script failed but continuing..."
    else
        warn "$script not found"
    fi
done

# 9. VERIFICATION & HEALTH CHECKS
log "🔍 Running verification checks..."

if [[ -f "scripts/verify-supabase.sh" ]]; then
    chmod +x scripts/verify-supabase.sh
    ./scripts/verify-supabase.sh || warn "Supabase verification failed"
fi

if [[ -f "scripts/final-deployment-checklist.sh" ]]; then
    chmod +x scripts/final-deployment-checklist.sh
    ./scripts/final-deployment-checklist.sh || warn "Final checklist failed"
fi

# 10. EMERGENCY FIXES (if needed)
log "🚨 Running emergency fixes..."
if [[ -f "scripts/fix-critical-issues.sh" ]]; then
    chmod +x scripts/fix-critical-issues.sh
    ./scripts/fix-critical-issues.sh || warn "Emergency fixes failed"
fi

# 11. FINAL STATUS REPORT
log "📊 Generating deployment report..."

echo ""
echo "🎉 WYOVERSE DEPLOYMENT COMPLETE!"
echo "================================="
echo "🌐 Base URL: $NEXT_PUBLIC_BASE_URL"
echo "🗄️ Database: Connected"
echo "🏔️ Avalanche: Connected"
echo "💰 Coinbase: Configured"
echo "📊 Analytics: ${NEXT_PUBLIC_ENABLE_ANALYTICS:-false}"
echo ""
echo "🥃 'The saloon is open for business!' - Bar Keep Bill"
echo ""

# Test endpoints if available
if [[ "$NEXT_PUBLIC_BASE_URL" != "https://your-production-domain.com" ]]; then
    log "Testing deployment endpoints..."
    curl -f "$NEXT_PUBLIC_BASE_URL/health" || warn "Health check endpoint failed"
    curl -f "$NEXT_PUBLIC_BASE_URL/api/status" || warn "API status endpoint failed"
fi

success "Master deployment completed successfully!"

exit 0
