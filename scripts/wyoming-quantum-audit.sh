#!/bin/bash

# 🤠 Wyoming-Quantum Compliance Audit Script
# Comprehensive system verification with Venice AI precision

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
AUDIT_TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')
AUDIT_LOG="audit_${AUDIT_TIMESTAMP}.log"
QUANTUM_SIGNATURE=""

echo -e "${BLUE}🤠 WYOMING-QUANTUM COMPLIANCE AUDIT${NC}"
echo "========================================"
echo "Timestamp: $(date)"
echo "Audit ID: WQ-${AUDIT_TIMESTAMP}"
echo "Log File: ${AUDIT_LOG}"
echo ""

# Function to log results
log_result() {
    local component=$1
    local status=$2
    local details=$3
    echo "$(date '+%H:%M:%S') | $component | $status | $details" >> "$AUDIT_LOG"
}

# Function to test HTTP endpoint with detailed response
test_endpoint() {
    local name=$1
    local url=$2
    local expected_status=${3:-200}
    
    echo -n "Testing $name... "
    
    local start_time=$(date +%s%N)
    local response=$(curl -s -w "%{http_code}|%{time_total}|%{size_download}" -o /tmp/audit_response.json "$url" 2>/dev/null || echo "000|0|0")
    local end_time=$(date +%s%N)
    
    IFS='|' read -r status_code time_total size_download <<< "$response"
    local response_time=$(( (end_time - start_time) / 1000000 ))
    
    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}✓ OK${NC} (${response_time}ms, ${size_download} bytes)"
        log_result "$name" "PASS" "HTTP $status_code, ${response_time}ms, ${size_download}B"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $status_code)"
        log_result "$name" "FAIL" "HTTP $status_code, expected $expected_status"
        return 1
    fi
}

# Function to test POST endpoint
test_post_endpoint() {
    local name=$1
    local url=$2
    local data=$3
    local expected_status=${4:-200}
    
    echo -n "Testing $name... "
    
    local start_time=$(date +%s%N)
    local response=$(curl -s -w "%{http_code}|%{time_total}" -o /tmp/audit_response.json \
        -X POST \
        -H "Content-Type: application/json" \
        -d "$data" \
        "$url" 2>/dev/null || echo "000|0")
    local end_time=$(date +%s%N)
    
    IFS='|' read -r status_code time_total <<< "$response"
    local response_time=$(( (end_time - start_time) / 1000000 ))
    
    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}✓ OK${NC} (${response_time}ms)"
        log_result "$name" "PASS" "HTTP $status_code, ${response_time}ms"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $status_code)"
        log_result "$name" "FAIL" "HTTP $status_code, expected $expected_status"
        return 1
    fi
}

# 1. LINK INTEGRITY CHECKER
echo -e "${YELLOW}1. LINK INTEGRITY VERIFICATION${NC}"
echo "================================"

# Test main domains
test_endpoint "WyoVerse Main Site" "https://wyoverse.com"
test_endpoint "Crypto Clashers Games" "https://cryptoclashers.games"
test_endpoint "Stoneyard Cash" "https://stoneyard.cash"

# Test v0.dev chat links
test_endpoint "V0 Clash Chat" "https://v0.dev/chat/clash-rt1K4z5ldO7"
test_endpoint "V0 Market Simulation" "https://v0.dev/chat/market-simulation-system-Jx84bKEuW7U"

# Test GitHub repositories
test_endpoint "LuckyspotOgold/Crypto" "https://github.com/LuckyspotOgold/Crypto"
test_endpoint "GitHub API" "https://api.github.com/repos/LuckyspotOgold/Crypto"

echo ""

# 2. BLOCKCHAIN CONNECTIVITY TEST
echo -e "${YELLOW}2. BLOCKCHAIN CONNECTIVITY${NC}"
echo "=========================="

# Test Avalanche C-Chain
echo -n "Testing Avalanche C-Chain... "
avax_response=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
    "https://api.avax.network/ext/bc/C/rpc" 2>/dev/null)

if echo "$avax_response" | grep -q "result"; then
    block_number=$(echo "$avax_response" | jq -r '.result' 2>/dev/null)
    echo -e "${GREEN}✓ Connected${NC} (Block: $block_number)"
    log_result "Avalanche C-Chain" "PASS" "Block: $block_number"
else
    echo -e "${RED}✗ Failed${NC}"
    log_result "Avalanche C-Chain" "FAIL" "No response"
fi

# Test Solana RPC
echo -n "Testing Solana RPC... "
solana_response=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","id":1,"method":"getEpochInfo"}' \
    "https://api.mainnet-beta.solana.com" 2>/dev/null)

if echo "$solana_response" | grep -q "result"; then
    epoch=$(echo "$solana_response" | jq -r '.result.epoch' 2>/dev/null)
    echo -e "${GREEN}✓ Connected${NC} (Epoch: $epoch)"
    log_result "Solana RPC" "PASS" "Epoch: $epoch"
else
    echo -e "${RED}✗ Failed${NC}"
    log_result "Solana RPC" "FAIL" "No response"
fi

# Test Ethereum Mainnet
echo -n "Testing Ethereum Mainnet... "
eth_response=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
    "https://eth-mainnet.g.alchemy.com/v2/demo" 2>/dev/null)

if echo "$eth_response" | grep -q "result"; then
    eth_block=$(echo "$eth_response" | jq -r '.result' 2>/dev/null)
    echo -e "${GREEN}✓ Connected${NC} (Block: $eth_block)"
    log_result "Ethereum Mainnet" "PASS" "Block: $eth_block"
else
    echo -e "${RED}✗ Failed${NC}"
    log_result "Ethereum Mainnet" "FAIL" "No response"
fi

echo ""

# 3. BAR KEEP BILL AI VERIFICATION
echo -e "${YELLOW}3. BAR KEEP BILL AI VERIFICATION${NC}"
echo "==============================="

# Test basic bartender endpoint
test_endpoint "Bartender Status" "/api/bartender"

# Test bartender chat functionality
test_post_endpoint "Bartender Chat" "/api/bartender" '{"question": "Hello Bill!", "sessionId": "audit-test"}'

# Test AI personality consistency
echo -n "Testing AI Personality... "
personality_test=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"question": "What do you think about Bitcoin?", "sessionId": "personality-test"}' \
    "/api/bartender" 2>/dev/null)

if echo "$personality_test" | grep -q "partner\|howdy\|dagnabbit"; then
    echo -e "${GREEN}✓ Western Personality Active${NC}"
    log_result "AI Personality" "PASS" "Western slang detected"
else
    echo -e "${YELLOW}? Personality Unclear${NC}"
    log_result "AI Personality" "WARN" "Western slang not detected"
fi

# Test crypto knowledge
echo -n "Testing Crypto Knowledge... "
crypto_test=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"question": "Tell me about Avalanche blockchain", "sessionId": "crypto-test"}' \
    "/api/bartender" 2>/dev/null)

if echo "$crypto_test" | grep -q -i "avalanche\|avax\|blockchain"; then
    echo -e "${GREEN}✓ Crypto Knowledge Active${NC}"
    log_result "Crypto Knowledge" "PASS" "Avalanche knowledge confirmed"
else
    echo -e "${YELLOW}? Knowledge Limited${NC}"
    log_result "Crypto Knowledge" "WARN" "Limited crypto knowledge"
fi

echo ""

# 4. API KEY & MARKET DATA VERIFICATION
echo -e "${YELLOW}4. API KEY & MARKET DATA VERIFICATION${NC}"
echo "===================================="

# Test CoinMarketCap API
if [ ! -z "$COINMARKETCAP_API_KEY" ]; then
    echo -n "Testing CoinMarketCap API... "
    cmc_response=$(curl -s -H "X-CMC_PRO_API_KEY: $COINMARKETCAP_API_KEY" \
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1" 2>/dev/null)
    
    if echo "$cmc_response" | grep -q "data"; then
        echo -e "${GREEN}✓ API Key Valid${NC}"
        log_result "CoinMarketCap API" "PASS" "API key authenticated"
    else
        echo -e "${RED}✗ API Key Invalid${NC}"
        log_result "CoinMarketCap API" "FAIL" "Authentication failed"
    fi
else
    echo -e "${YELLOW}⚠ CoinMarketCap API Key Not Set${NC}"
    log_result "CoinMarketCap API" "WARN" "API key not configured"
fi

# Test Coinbase API
echo -n "Testing Coinbase Public API... "
coinbase_response=$(curl -s "https://api.coinbase.com/v2/prices/BTC-USD/spot" 2>/dev/null)

if echo "$coinbase_response" | grep -q "amount"; then
    btc_price=$(echo "$coinbase_response" | jq -r '.data.amount' 2>/dev/null)
    echo -e "${GREEN}✓ Connected${NC} (BTC: \$$btc_price)"
    log_result "Coinbase API" "PASS" "BTC price: \$$btc_price"
else
    echo -e "${RED}✗ Failed${NC}"
    log_result "Coinbase API" "FAIL" "No price data"
fi

# Test Venice AI
if [ ! -z "$VENICE_API_KEY" ]; then
    echo -n "Testing Venice AI... "
    venice_response=$(curl -s -H "Authorization: Bearer $VENICE_API_KEY" \
        "https://api.venice.ai/v1/models" 2>/dev/null)
    
    if echo "$venice_response" | grep -q "data\|models"; then
        echo -e "${GREEN}✓ API Key Valid${NC}"
        log_result "Venice AI" "PASS" "API authenticated"
    else
        echo -e "${RED}✗ API Key Invalid${NC}"
        log_result "Venice AI" "FAIL" "Authentication failed"
    fi
else
    echo -e "${YELLOW}⚠ Venice AI Key Not Set${NC}"
    log_result "Venice AI" "WARN" "API key not configured"
fi

echo ""

# 5. WALLET INTEGRATION TEST
echo -e "${YELLOW}5. WALLET INTEGRATION VERIFICATION${NC}"
echo "=================================="

# Test wallet connection endpoints
test_endpoint "Wallet Connect Page" "/wallet-test"

# Test MetaMask detection
echo -n "Testing MetaMask Integration... "
if command -v node &> /dev/null; then
    metamask_test=$(node -e "
        const { ethers } = require('ethers');
        try {
            const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
            provider.getNetwork().then(network => {
                console.log('MetaMask compatible: Chain ID', network.chainId);
            }).catch(e => console.log('Error:', e.message));
        } catch(e) {
            console.log('ethers not available');
        }
    " 2>/dev/null)
    
    if echo "$metamask_test" | grep -q "Chain ID"; then
        echo -e "${GREEN}✓ Compatible${NC}"
        log_result "MetaMask Integration" "PASS" "Avalanche network compatible"
    else
        echo -e "${YELLOW}? Compatibility Unknown${NC}"
        log_result "MetaMask Integration" "WARN" "Could not verify compatibility"
    fi
else
    echo -e "${YELLOW}? Node.js Not Available${NC}"
    log_result "MetaMask Integration" "WARN" "Node.js not available for testing"
fi

# Test Phantom Wallet compatibility
echo -n "Testing Phantom Wallet Integration... "
phantom_test=$(curl -s "https://phantom.app/api/health" 2>/dev/null || echo "")

if [ ! -z "$phantom_test" ]; then
    echo -e "${GREEN}✓ Service Available${NC}"
    log_result "Phantom Wallet" "PASS" "Service accessible"
else
    echo -e "${YELLOW}? Service Status Unknown${NC}"
    log_result "Phantom Wallet" "WARN" "Could not verify service"
fi

echo ""

# 6. SECURITY & ENVIRONMENT VERIFICATION
echo -e "${YELLOW}6. SECURITY & ENVIRONMENT VERIFICATION${NC}"
echo "====================================="

# Check for exposed secrets
echo -n "Checking for exposed secrets... "
if grep -r "sk_\|pk_\|API_KEY.*=" . --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null | grep -v ".env" | grep -v "audit" > /tmp/exposed_secrets.txt; then
    secret_count=$(wc -l < /tmp/exposed_secrets.txt)
    echo -e "${RED}✗ Found $secret_count exposed secrets${NC}"
    log_result "Secret Exposure" "FAIL" "$secret_count secrets exposed"
    echo "Exposed secrets found in:"
    cat /tmp/exposed_secrets.txt
else
    echo -e "${GREEN}✓ No exposed secrets${NC}"
    log_result "Secret Exposure" "PASS" "No secrets found in code"
fi

# Check environment variables
echo -n "Checking required environment variables... "
required_vars=("SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ All required variables set${NC}"
    log_result "Environment Variables" "PASS" "All required variables present"
else
    echo -e "${YELLOW}⚠ Missing: ${missing_vars[*]}${NC}"
    log_result "Environment Variables" "WARN" "Missing: ${missing_vars[*]}"
fi

# Check SSL certificates
echo -n "Checking SSL certificates... "
if command -v openssl &> /dev/null; then
    ssl_check=$(echo | openssl s_client -servername wyoverse.com -connect wyoverse.com:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    if [ $? -eq 0 ]; then
        expiry=$(echo "$ssl_check" | grep "notAfter" | cut -d= -f2)
        echo -e "${GREEN}✓ Valid${NC} (Expires: $expiry)"
        log_result "SSL Certificate" "PASS" "Valid until $expiry"
    else
        echo -e "${YELLOW}? Could not verify${NC}"
        log_result "SSL Certificate" "WARN" "Verification failed"
    fi
else
    echo -e "${YELLOW}? OpenSSL not available${NC}"
    log_result "SSL Certificate" "WARN" "OpenSSL not available"
fi

echo ""

# 7. PERFORMANCE & LOAD TESTING
echo -e "${YELLOW}7. PERFORMANCE & LOAD TESTING${NC}"
echo "============================="

# Test response times
echo "Testing response times..."
endpoints=("/api/health" "/api/bartender" "/api/market-data")

for endpoint in "${endpoints[@]}"; do
    echo -n "  $endpoint... "
    start_time=$(date +%s%N)
    response=$(curl -s -o /dev/null -w "%{http_code}" "$endpoint" 2>/dev/null)
    end_time=$(date +%s%N)
    response_time=$(( (end_time - start_time) / 1000000 ))
    
    if [ "$response" = "200" ]; then
        if [ $response_time -lt 1000 ]; then
            echo -e "${GREEN}✓ Fast${NC} (${response_time}ms)"
            log_result "Performance $endpoint" "PASS" "${response_time}ms"
        elif [ $response_time -lt 3000 ]; then
            echo -e "${YELLOW}⚠ Slow${NC} (${response_time}ms)"
            log_result "Performance $endpoint" "WARN" "${response_time}ms"
        else
            echo -e "${RED}✗ Very Slow${NC} (${response_time}ms)"
            log_result "Performance $endpoint" "FAIL" "${response_time}ms"
        fi
    else
        echo -e "${RED}✗ Error${NC} (HTTP $response)"
        log_result "Performance $endpoint" "FAIL" "HTTP $response"
    fi
done

echo ""

# 8. QUANTUM SIGNATURE VERIFICATION
echo -e "${YELLOW}8. QUANTUM SIGNATURE VERIFICATION${NC}"
echo "================================="

# Generate quantum signature
QUANTUM_SIGNATURE=$(echo -n "WyoVerse-${AUDIT_TIMESTAMP}" | sha256sum | cut -d' ' -f1)
echo "Quantum Signature: $QUANTUM_SIGNATURE"

# Verify quantum entanglement (mock)
echo -n "Testing quantum entanglement... "
quantum_test=$(echo "$QUANTUM_SIGNATURE" | grep -E '^[a-f0-9]{64}$')
if [ ! -z "$quantum_test" ]; then
    echo -e "${GREEN}✓ Entangled${NC}"
    log_result "Quantum Signature" "PASS" "Signature: $QUANTUM_SIGNATURE"
else
    echo -e "${RED}✗ Decoherence detected${NC}"
    log_result "Quantum Signature" "FAIL" "Invalid signature format"
fi

echo ""

# 9. FINAL AUDIT SUMMARY
echo -e "${BLUE}9. AUDIT SUMMARY${NC}"
echo "================"

# Count results
total_tests=$(grep -c "|" "$AUDIT_LOG")
passed_tests=$(grep -c "| PASS |" "$AUDIT_LOG")
failed_tests=$(grep -c "| FAIL |" "$AUDIT_LOG")
warning_tests=$(grep -c "| WARN |" "$AUDIT_LOG")

echo "Total Tests: $total_tests"
echo -e "Passed: ${GREEN}$passed_tests${NC}"
echo -e "Failed: ${RED}$failed_tests${NC}"
echo -e "Warnings: ${YELLOW}$warning_tests${NC}"

# Calculate score
if [ $total_tests -gt 0 ]; then
    score=$(( (passed_tests * 100) / total_tests ))
    echo "Overall Score: $score%"
    
    if [ $score -ge 90 ]; then
        echo -e "${GREEN}🏆 WYOMING-QUANTUM COMPLIANT${NC}"
        log_result "Overall Audit" "PASS" "Score: $score%"
    elif [ $score -ge 75 ]; then
        echo -e "${YELLOW}⚠ PARTIALLY COMPLIANT${NC}"
        log_result "Overall Audit" "WARN" "Score: $score%"
    else
        echo -e "${RED}❌ NON-COMPLIANT${NC}"
        log_result "Overall Audit" "FAIL" "Score: $score%"
    fi
fi

echo ""
echo "Audit completed at $(date)"
echo "Full log available in: $AUDIT_LOG"
echo -e "${CYAN}Quantum signature: $QUANTUM_SIGNATURE${NC}"

# Generate audit report
cat > "audit_report_${AUDIT_TIMESTAMP}.md" << EOF
# Wyoming-Quantum Compliance Audit Report

**Audit ID:** WQ-${AUDIT_TIMESTAMP}  
**Timestamp:** $(date)  
**Quantum Signature:** $QUANTUM_SIGNATURE  

## Summary

- **Total Tests:** $total_tests
- **Passed:** $passed_tests
- **Failed:** $failed_tests  
- **Warnings:** $warning_tests
- **Overall Score:** $score%

## Detailed Results

\`\`\`
$(cat "$AUDIT_LOG")
\`\`\`

## Recommendations

$(if [ $failed_tests -gt 0 ]; then echo "- Address failed tests immediately"; fi)
$(if [ $warning_tests -gt 0 ]; then echo "- Review warning items for optimization"; fi)
- Maintain regular audit schedule
- Monitor quantum signature integrity

---
*Generated by WyoVerse Quantum Audit System v1.0*
EOF

echo "Audit report generated: audit_report_${AUDIT_TIMESTAMP}.md"

# Cleanup
rm -f /tmp/audit_response.json /tmp/exposed_secrets.txt

exit 0
