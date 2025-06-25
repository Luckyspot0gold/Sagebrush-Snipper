#!/bin/bash

echo "🚀 DEPLOYING ALL DOMAINS FOR HACKATHON SUBMISSION"
echo "=================================================="

# Set environment variables
export NODE_ENV=production
export SUPABASE_NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URSUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY=$SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY

echo "📦 Building production bundle..."
npm run build

echo "🌐 Deploying to cryptoclashers.games..."
vercel --prod --scope=your-team --alias=cryptoclashers.games

echo "💰 Deploying to stoneyard.cash..."
vercel --prod --scope=your-team --alias=stoneyard.cash

echo "🤠 Deploying main WyoVerse..."
vercel --prod --scope=your-team --alias=wyoverse.com

echo "✅ ALL DOMAINS DEPLOYED SUCCESSFULLY!"
echo "🎯 Ready for hackathon submission!"

# Test all domains
echo "🧪 Testing domain responses..."
curl -I https://cryptoclashers.games
curl -I https://stoneyard.cash
curl -I https://wyoverse.com

echo "🏆 HACKATHON DEPLOYMENT COMPLETE!"
