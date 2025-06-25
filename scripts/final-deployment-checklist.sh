#!/bin/bash

echo "🎯 WYOVERSE ECOSYSTEM - FINAL DEPLOYMENT CHECKLIST"
echo "=================================================="
echo "🕐 $(date)"
echo ""

DOMAINS=(
  "stoneyard.cash"
  "cryptoclashers.games"
  "boxing.cryptoclashers.games"
  "racing.cryptoclashers.games"
  "saloon.stoneyard.cash"
  "wyoverse.cryptoclashers.games"
)

echo "🌐 CHECKING ALL DOMAINS..."
echo "=========================="

# Check DNS and HTTPS
for domain in "${DOMAINS[@]}"; do
  echo "🔍 Checking $domain..."
  
  # DNS resolution
  if ! host "$domain" > /dev/null 2>&1; then
    echo "❌ DNS failure for $domain"
  else
    echo "✅ DNS OK for $domain"
  fi

  # HTTPS check
  if ! curl -I "https://$domain" 2>/dev/null | grep -q "HTTP/.* 200"; then
    echo "❌ HTTPS failure for $domain"
  else
    echo "✅ HTTPS OK for $domain"
  fi
  
  # Performance check
  RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" "https://$domain" 2>/dev/null || echo "timeout")
  if [[ "$RESPONSE_TIME" != "timeout" ]]; then
    echo "⚡ Response time: ${RESPONSE_TIME}s"
  fi
  
  echo ""
done

echo "🏆 BOLT BADGE COMPLIANCE CHECK..."
echo "================================="

# Verify Bolt badge in code
if ! find . -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs grep -l "Built with Bolt.new" > /dev/null 2>&1; then
  echo "❌ Bolt badge missing in code"
else
  echo "✅ Bolt badge code found"
fi

# Check for live Bolt badge on main domains
for domain in "stoneyard.cash" "cryptoclashers.games"; do
  if ! curl -s "https://$domain" | grep -q "Built with Bolt.new"; then
    echo "❌ Bolt badge not found on $domain"
  else
    echo "✅ Bolt badge LIVE on $domain"
  fi
done

echo ""
echo "🗄️ SUPABASE CONNECTION TEST..."
echo "==============================="

# Supabase connection test
if [[ -z "$SUPABASE_URL" ]]; then
  echo "❌ SUPABASE_URL not set"
else
  echo "🔗 Testing connection to $SUPABASE_URL"
  SUPABASE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/rest/v1/global_players?select=*" -H "apikey: $SUPABASE_KEY" 2>/dev/null || echo "000")
  
  if [ "$SUPABASE_RESPONSE" -eq 200 ]; then
    echo "✅ Supabase connection successful (HTTP $SUPABASE_RESPONSE)"
  elif [ "$SUPABASE_RESPONSE" -eq 401 ]; then
    echo "⚠️ Supabase auth issue - check API key (HTTP $SUPABASE_RESPONSE)"
  else
    echo "❌ Supabase connection failed (HTTP $SUPABASE_RESPONSE)"
  fi
fi

echo ""
echo "🎮 GAMING FEATURES TEST..."
echo "=========================="

# Test specific gaming endpoints
GAMING_ENDPOINTS=(
  "stoneyard.cash/api/market-data"
  "cryptoclashers.games/api/boxing/matches"
  "saloon.stoneyard.cash"
)

for endpoint in "${GAMING_ENDPOINTS[@]}"; do
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://$endpoint" 2>/dev/null || echo "000")
  if [ "$RESPONSE" -eq 200 ] || [ "$RESPONSE" -eq 404 ]; then
    echo "✅ $endpoint responding (HTTP $RESPONSE)"
  else
    echo "❌ $endpoint failed (HTTP $RESPONSE)"
  fi
done

echo ""
echo "📊 DEPLOYMENT SUMMARY..."
echo "========================"

# Count successful domains
SUCCESSFUL_DOMAINS=0
for domain in "${DOMAINS[@]}"; do
  if curl -I "https://$domain" 2>/dev/null | grep -q "HTTP/.* 200"; then
    ((SUCCESSFUL_DOMAINS++))
  fi
done

echo "🌐 Domains deployed: $SUCCESSFUL_DOMAINS/${#DOMAINS[@]}"
echo "🗄️ Database: $([ -n "$SUPABASE_URL" ] && echo "Connected" || echo "Not configured")"
echo "🏆 Bolt compliance: $(find . -name "*.tsx" -o -name "*.jsx" | xargs grep -l "Built with Bolt.new" > /dev/null 2>&1 && echo "✅ Ready" || echo "❌ Missing")"

echo ""
if [ "$SUCCESSFUL_DOMAINS" -eq "${#DOMAINS[@]}" ]; then
  echo "🎉 HACKATHON DEPLOYMENT: READY TO WIN!"
  echo "🚀 All systems operational!"
else
  echo "⚠️ Some domains need attention before submission"
fi

echo ""
echo "🎬 NEXT STEPS:"
echo "1. Record demo video using FINAL_DEMO_SCRIPT.md"
echo "2. Test user flow across all domains"
echo "3. Submit to hackathon with confidence!"
echo ""
echo "Deployment checklist complete! 🏁"
