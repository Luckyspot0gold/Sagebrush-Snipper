#!/bin/bash

# 🧠 VENICE AI INTEGRATION VERIFICATION SCRIPT
# Comprehensive check for WyoVerse Venice AI integration

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
VENICE_API_URL="https://api.venice.ai/v1"
VERIFICATION_ID="venice-check-$(date +%s)"
LOG_FILE="venice_verification_${VERIFICATION_ID}.log"

echo -e "${PURPLE}🧠 VENICE AI INTEGRATION VERIFICATION${NC}"
echo "======================================"
echo "Verification ID: $VERIFICATION_ID"
echo "Timestamp: $(date -Iseconds)"
echo ""

# Function to log messages
log_message() {
    echo "$(date -Iseconds) - $1" >> "$LOG_FILE"
    echo -e "$1"
}

# Function to test Venice AI API connectivity
test_venice_api() {
    log_message "${YELLOW}1. TESTING VENICE AI API CONNECTIVITY${NC}"
    echo "=================================="
    
    if [ -z "$VENICE_API_KEY" ]; then
        log_message "${RED}❌ VENICE_API_KEY not set${NC}"
        return 1
    fi
    
    log_message "${GREEN}✅ VENICE_API_KEY configured${NC}"
    
    # Test API endpoint
    echo -n "Testing Venice AI API endpoint... "
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Bearer $VENICE_API_KEY" \
        -H "Content-Type: application/json" \
        "$VENICE_API_URL/models" 2>/dev/null || echo "000")
    
    if [ "$response" = "200" ]; then
        log_message "${GREEN}✅ Venice AI API accessible${NC}"
        return 0
    else
        log_message "${RED}❌ Venice AI API failed (HTTP $response)${NC}"
        return 1
    fi
}

# Function to test Venice AI model capabilities
test_venice_models() {
    log_message "\n${YELLOW}2. TESTING VENICE AI MODEL CAPABILITIES${NC}"
    echo "====================================="
    
    # Test basic chat completion
    echo -n "Testing chat completion... "
    
    chat_response=$(curl -s -X POST "$VENICE_API_URL/chat/completions" \
        -H "Authorization: Bearer $VENICE_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
            "model": "llama-3.1-8b",
            "messages": [
                {
                    "role": "system",
                    "content": "You are Bar Keep Bill from WyoVerse, a wise frontier bartender."
                },
                {
                    "role": "user", 
                    "content": "How should BTC price movements affect crypto boxing strategies?"
                }
            ],
            "max_tokens": 100
        }' 2>/dev/null)
    
    if echo "$chat_response" | grep -q "choices"; then
        log_message "${GREEN}✅ Chat completion working${NC}"
        
        # Extract and analyze response
        response_content=$(echo "$chat_response" | jq -r '.choices[0].message.content' 2>/dev/null || echo "")
        
        if echo "$response_content" | grep -qi "boxing\|combat\|strategy"; then
            log_message "${GREEN}✅ Model understands boxing context${NC}"
        else
            log_message "${YELLOW}⚠️ Model response lacks boxing context${NC}"
        fi
        
        if echo "$response_content" | grep -qi "btc\|bitcoin\|crypto\|price"; then
            log_message "${GREEN}✅ Model understands crypto context${NC}"
        else
            log_message "${YELLOW}⚠️ Model response lacks crypto context${NC}"
        fi
        
        if echo "$response_content" | grep -qi "partner\|howdy\|frontier"; then
            log_message "${GREEN}✅ Model maintains Bar Keep Bill personality${NC}"
        else
            log_message "${YELLOW}⚠️ Model lacks frontier personality${NC}"
        fi
        
    else
        log_message "${RED}❌ Chat completion failed${NC}"
        echo "Response: $chat_response"
        return 1
    fi
}

# Function to test Venice AI integration in WyoVerse
test_wyoverse_integration() {
    log_message "\n${YELLOW}3. TESTING WYOVERSE INTEGRATION${NC}"
    echo "=============================="
    
    # Test local API endpoint
    echo -n "Testing local Venice AI endpoint... "
    
    if command -v curl >/dev/null 2>&1; then
        local_response=$(curl -s -o /dev/null -w "%{http_code}" \
            "http://localhost:3000/api/venice-verify" 2>/dev/null || echo "000")
        
        if [ "$local_response" = "200" ]; then
            log_message "${GREEN}✅ Local Venice AI endpoint accessible${NC}"
        else
            log_message "${YELLOW}⚠️ Local Venice AI endpoint not running (HTTP $local_response)${NC}"
        fi
    else
        log_message "${YELLOW}⚠️ curl not available for local testing${NC}"
    fi
    
    # Check for Venice AI integration files
    echo -n "Checking Venice AI integration files... "
    
    integration_files=(
        "lib/venice-ai-verifier.ts"
        "app/api/venice-verify/route.ts"
        "components/venice-ai-dashboard.tsx"
        "app/venice-verify/page.tsx"
    )
    
    missing_files=()
    for file in "${integration_files[@]}"; do
        if [ ! -f "$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        log_message "${GREEN}✅ All Venice AI integration files present${NC}"
    else
        log_message "${RED}❌ Missing Venice AI integration files:${NC}"
        printf '%s\n' "${missing_files[@]}"
        return 1
    fi
}

# Function to test combat integration
test_combat_integration() {
    log_message "\n${YELLOW}4. TESTING COMBAT INTEGRATION${NC}"
    echo "============================"
    
    # Test combat-related components
    combat_components=(
        "components/enhanced-crypto-clashers-boxing.tsx"
        "components/enhanced-crypto-clashers-racing.tsx"
        "app/boxing-arena/page.tsx"
        "app/racing-circuit/page.tsx"
    )
    
    echo -n "Checking combat components... "
    
    missing_combat=()
    for component in "${combat_components[@]}"; do
        if [ ! -f "$component" ]; then
            missing_combat+=("$component")
        fi
    done
    
    if [ ${#missing_combat[@]} -eq 0 ]; then
        log_message "${GREEN}✅ All combat components present${NC}"
    else
        log_message "${YELLOW}⚠️ Missing combat components:${NC}"
        printf '%s\n' "${missing_combat[@]}"
    fi
    
    # Check for Venice AI references in combat code
    echo -n "Checking Venice AI integration in combat code... "
    
    venice_refs=0
    for component in "${combat_components[@]}"; do
        if [ -f "$component" ] && grep -q -i "venice\|ai\|quantum" "$component"; then
            ((venice_refs++))
        fi
    done
    
    if [ $venice_refs -gt 0 ]; then
        log_message "${GREEN}✅ Venice AI references found in $venice_refs combat components${NC}"
    else
        log_message "${YELLOW}⚠️ No Venice AI references found in combat components${NC}"
    fi
}

# Function to test market integration
test_market_integration() {
    log_message "\n${YELLOW}5. TESTING MARKET INTEGRATION${NC}"
    echo "============================"
    
    # Test market data components
    market_components=(
        "app/api/crypto-data/route.ts"
        "app/api/crypto-data-enhanced/route.ts"
        "app/api/market-data/route.ts"
        "components/real-time-market-widget.tsx"
        "components/advanced-crypto-market.tsx"
    )
    
    echo -n "Checking market components... "
    
    present_market=0
    for component in "${market_components[@]}"; do
        if [ -f "$component" ]; then
            ((present_market++))
        fi
    done
    
    if [ $present_market -ge 3 ]; then
        log_message "${GREEN}✅ Market integration components present ($present_market/5)${NC}"
    else
        log_message "${YELLOW}⚠️ Limited market integration ($present_market/5 components)${NC}"
    fi
    
    # Test market API endpoints
    echo -n "Testing market API endpoints... "
    
    market_endpoints=(
        "/api/crypto-data"
        "/api/market-data"
    )
    
    working_endpoints=0
    for endpoint in "${market_endpoints[@]}"; do
        response=$(curl -s -o /dev/null -w "%{http_code}" \
            "http://localhost:3000$endpoint" 2>/dev/null || echo "000")
        
        if [ "$response" = "200" ]; then
            ((working_endpoints++))
        fi
    done
    
    if [ $working_endpoints -gt 0 ]; then
        log_message "${GREEN}✅ Market API endpoints working ($working_endpoints/2)${NC}"
    else
        log_message "${YELLOW}⚠️ Market API endpoints not accessible${NC}"
    fi
}

# Function to generate verification report
generate_report() {
    log_message "\n${YELLOW}6. GENERATING VERIFICATION REPORT${NC}"
    echo "================================"
    
    # Calculate overall score
    local total_tests=5
    local passed_tests=0
    
    # Check test results from log
    if grep -q "✅ Venice AI API accessible" "$LOG_FILE"; then
        ((passed_tests++))
    fi
    
    if grep -q "✅ Chat completion working" "$LOG_FILE"; then
        ((passed_tests++))
    fi
    
    if grep -q "✅ All Venice AI integration files present" "$LOG_FILE"; then
        ((passed_tests++))
    fi
    
    if grep -q "✅ All combat components present" "$LOG_FILE"; then
        ((passed_tests++))
    fi
    
    if grep -q "✅ Market integration components present" "$LOG_FILE"; then
        ((passed_tests++))
    fi
    
    local score=$((passed_tests * 100 / total_tests))
    
    # Generate report
    cat > "venice_ai_report_${VERIFICATION_ID}.md" << EOF
# Venice AI Integration Verification Report

**Verification ID:** $VERIFICATION_ID  
**Timestamp:** $(date -Iseconds)  
**Overall Score:** ${score}%  
**Tests Passed:** ${passed_tests}/${total_tests}  

## Test Results

### 1. Venice AI API Connectivity
$(grep "Venice AI API" "$LOG_FILE" | tail -1)

### 2. Model Capabilities
$(grep "Chat completion\|boxing context\|crypto context\|personality" "$LOG_FILE" | head -4)

### 3. WyoVerse Integration
$(grep "Local Venice AI endpoint\|integration files" "$LOG_FILE" | head -2)

### 4. Combat Integration
$(grep "combat components\|Venice AI references" "$LOG_FILE" | head -2)

### 5. Market Integration
$(grep "Market integration\|Market API" "$LOG_FILE" | head -2)

## Recommendations

EOF

    # Add recommendations based on score
    if [ $score -ge 90 ]; then
        echo "- ✅ Venice AI integration is fully operational" >> "venice_ai_report_${VERIFICATION_ID}.md"
        echo "- ✅ Ready for hackathon submission" >> "venice_ai_report_${VERIFICATION_ID}.md"
    elif [ $score -ge 70 ]; then
        echo "- ⚠️ Venice AI integration is mostly operational" >> "venice_ai_report_${VERIFICATION_ID}.md"
        echo "- ⚠️ Address minor issues before submission" >> "venice_ai_report_${VERIFICATION_ID}.md"
    else
        echo "- ❌ Venice AI integration needs significant work" >> "venice_ai_report_${VERIFICATION_ID}.md"
        echo "- ❌ Not ready for hackathon submission" >> "venice_ai_report_${VERIFICATION_ID}.md"
    fi
    
    cat >> "venice_ai_report_${VERIFICATION_ID}.md" << EOF
- Monitor Venice AI API quota usage
- Implement fallback responses for API failures
- Add performance monitoring for response times
- Test with live market data integration

## Next Steps

1. Review failed tests and implement fixes
2. Run full Venice AI verification dashboard
3. Test combat scenarios with real market data
4. Prepare demo video showcasing Venice AI features

---
*Generated by WyoVerse Venice AI Verification System*
EOF

    log_message "${GREEN}✅ Verification report generated: venice_ai_report_${VERIFICATION_ID}.md${NC}"
    
    # Display summary
    echo ""
    echo -e "${BLUE}🎯 VENICE AI VERIFICATION SUMMARY${NC}"
    echo "================================="
    echo "Overall Score: ${score}%"
    echo "Tests Passed: ${passed_tests}/${total_tests}"
    
    if [ $score -ge 90 ]; then
        echo -e "Status: ${GREEN}FULLY OPERATIONAL${NC}"
        echo -e "Hackathon Ready: ${GREEN}✅ YES${NC}"
    elif [ $score -ge 70 ]; then
        echo -e "Status: ${YELLOW}MOSTLY OPERATIONAL${NC}"
        echo -e "Hackathon Ready: ${YELLOW}⚠️ WITH FIXES${NC}"
    else
        echo -e "Status: ${RED}NEEDS WORK${NC}"
        echo -e "Hackathon Ready: ${RED}❌ NO${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}📄 Reports Generated:${NC}"
    echo "- Log: $LOG_FILE"
    echo "- Report: venice_ai_report_${VERIFICATION_ID}.md"
}

# Main execution
main() {
    # Create log file
    touch "$LOG_FILE"
    
    # Run all tests
    test_venice_api || true
    test_venice_models || true
    test_wyoverse_integration || true
    test_combat_integration || true
    test_market_integration || true
    
    # Generate final report
    generate_report
    
    echo ""
    echo -e "${PURPLE}🤠 Venice AI verification complete, partner!${NC}"
    echo -e "${PURPLE}Check the reports for detailed results.${NC}"
}

# Run main function
main "$@"
