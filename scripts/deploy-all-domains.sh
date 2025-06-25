#!/bin/bash

echo "🚀 DEPLOYING WYOVERSE ECOSYSTEM - ALL DOMAINS & SUBDOMAINS"
echo "=========================================================="

# Set deployment flags
DEPLOY_FLAGS="--prod --yes --force"

echo "📦 Building production bundle..."
npm run build

echo "🎯 Deploying main domains..."
echo "🥊 Deploying CryptoClashers.games..."
vercel $DEPLOY_FLAGS --alias=cryptoclashers.games

echo "💰 Deploying StoneYard.cash..."
vercel $DEPLOY_FLAGS --alias=stoneyard.cash

echo "🌐 Deploying specialized subdomains..."
echo "🥊 Boxing arena subdomain..."
vercel $DEPLOY_FLAGS --alias=boxing.cryptoclashers.games

echo "🏁 Racing circuit subdomain..."
vercel $DEPLOY_FLAGS --alias=racing.cryptoclashers.games

echo "🍻 Saloon subdomain..."
vercel $DEPLOY_FLAGS --alias=saloon.stoneyard.cash

echo "🤠 WyoVerse hub subdomain..."
vercel $DEPLOY_FLAGS --alias=wyoverse.cryptoclashers.games

echo "⚙️ Setting environment variables..."
vercel env add SUPABASE_NEXT_PUBLIC_SUPABASE_URL "$SUPABASE_URL" --yes
vercelSUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY "$SUPABASE_KEY" --yes
vercel env add NEXT_PUBLIC_DOMAIN_MAIN "cryptoclashers.games" --yes
vercel env add NEXT_PUBLIC_DOMAIN_TRADING "stoneyard.cash" --yes

echo "🧪 Testing all deployments..."
domains=(
  "https://cryptoclashers.games"
  "https://stoneyard.cash"
  "https://boxing.cryptoclashers.games"
  "https://racing.cryptoclashers.games"
  "https://saloon.stoneyard.cash"
  "https://wyoverse.cryptoclashers.games"
)

for domain in "${domains[@]}"; do
  echo "Testing $domain..."
  curl -I "$domain" | head -1
done

echo "✅ ECOSYSTEM DEPLOYMENT COMPLETE!"
echo "🏆 Ready for hackathon submission!"
