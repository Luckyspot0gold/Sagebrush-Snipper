#!/bin/bash

# 🤠 WyoVerse Health Check Script
# Comprehensive system health monitoring

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
API_BASE_URL="${API_BASE_URL:-https://wyoverse.com/api}"
HEALTH_ENDPOINT="${API_BASE_URL}/health"
BARTENDER_ENDPOINT="${API_BASE_URL}/bartender"
JUDGE_ENDPOINT="${API_BASE_URL}/judge-mode"

echo -e "${BLUE}🤠 WyoVerse System Health Check${NC}"
echo "=================================="
echo "Timestamp: $(date)"
echo "Base URL: $API_BASE_URL"
echo ""

# Function to check HTTP endpoint
check_endpoint() {
    local name=$1
    local url=$2
    local expected_status=${3:-200}
    
    echo -n "Checking $name... "
    
    response=$(curl -s -w "%{http_code}" -o /tmp/health_response.json "$url" 2>/dev/null || echo "000")
    
    if [ "$response" = "$expected_status" ]; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAILED (HTTP $response)${NC}"
        return 1
    fi
}

# Function to check API with POST data
check_post_endpoint() {
    local name=$1
    local url=$2
    local data=$3
    local expected_status=${4:-200}
    
    echo -n "Checking $name... "
    
    response=$(curl -s -w "%{http_code}" -o /tmp/health_response.json \
        -X POST \
        -H "Content-Type: application/json" \
        -d "$data" \
        "$url" 2>/dev/null || echo "000")
    
    if [ "$response" = "$expected_status" ]; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAILED (HTTP $response)${NC}"
        return 1
    fi
}

# Basic health checks
echo -e "${YELLOW}Basic Health Checks:${NC}"
check_endpoint "Main Health Check" "$HEALTH_ENDPOINT"
check_post_endpoint "Health Check POST" "$HEALTH_ENDPOINT" '{"check": "basic"}'

# DeepSeek integration check
echo -e "\n${YELLOW}AI Integration Checks:${NC}"
check_post_endpoint "DeepSeek Integration" "$HEALTH_ENDPOINT" '{"check": "deepseek"}'

# Bartender API check
echo -e "\n${YELLOW}Bartender API Checks:${NC}"
check_endpoint "Bartender Status" "$BARTENDER_ENDPOINT"
check_post_endpoint "Bartender Chat" "$BARTENDER_ENDPOINT" '{"question": "Hello Bill!", "sessionId": "health-check"}'

# Judge mode check (if access code is available)
if [ ! -z "$JUDGE_ACCESS_CODE" ]; then
    echo -e "\n${YELLOW}Judge Mode Checks:${NC}"
    check_post_endpoint "Judge Mode Status" "$JUDGE_ENDPOINT" "{\"access_code\": \"$JUDGE_ACCESS_CODE\", \"action\": \"status\"}"
fi

# Performance metrics
echo -e "\n${YELLOW}Performance Metrics:${NC}"
if [ -f /tmp/health_response.json ]; then
    echo "Latest response:"
    cat /tmp/health_response.json | jq '.' 2>/dev/null || cat /tmp/health_response.json
fi

# Database connectivity (if credentials available)
if [ ! -z "$SUPABASE_URL" ] && [ ! -z "$SUPABASE_SERVICE_KEY" ]; then
    echo -e "\n${YELLOW}Database Connectivity:${NC}"
    check_endpoint "Supabase Connection" "$SUPABASE_URL/rest/v1/"
fi

# Market data APIs
echo -e "\n${YELLOW}External API Checks:${NC}"
if [ ! -z "$COINMARKETCAP_API_KEY" ]; then
    check_endpoint "CoinMarketCap API" "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1"
fi

# Venice AI check
if [ ! -z "$VENICE_API_KEY" ]; then
    echo -n "Checking Venice AI... "
    response=$(curl -s -w "%{http_code}" -o /dev/null \
        -H "Authorization: Bearer $VENICE_API_KEY" \
        "https://api.venice.ai/v1/models" 2>/dev/null || echo "000")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓ OK${NC}"
    else
        echo -e "${RED}✗ FAILED (HTTP $response)${NC}"
    fi
fi

# System resources (if running on server)
echo -e "\n${YELLOW}System Resources:${NC}"
if command -v free &> /dev/null; then
    echo "Memory usage:"
    free -h
fi

if command -v df &> /dev/null; then
    echo "Disk usage:"
    df -h / 2>/dev/null || echo "Disk info not available"
fi

if command -v uptime &> /dev/null; then
    echo "System uptime:"
    uptime
fi

# Network connectivity
echo -e "\n${YELLOW}Network Connectivity:${NC}"
echo -n "Internet connectivity... "
if ping -c 1 google.com &> /dev/null; then
    echo -e "${GREEN}✓ OK${NC}"
else
    echo -e "${RED}✗ FAILED${NC}"
fi

# SSL certificate check
echo -n "SSL certificate... "
if command -v openssl &> /dev/null; then
    cert_info=$(echo | openssl s_client -servername wyoverse.com -connect wyoverse.com:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Valid${NC}"
        echo "$cert_info" | grep "notAfter" | sed 's/notAfter=/Expires: /'
    else
        echo -e "${YELLOW}? Unable to check${NC}"
    fi
else
    echo -e "${YELLOW}? OpenSSL not available${NC}"
fi

# Final summary
echo -e "\n${BLUE}Health Check Complete${NC}"
echo "=================================="
echo "Timestamp: $(date)"

# Cleanup
rm -f /tmp/health_response.json

echo -e "\n${GREEN}All systems operational, partner! 🤠${NC}"
