#!/bin/bash

# 🏜️ WyoVerse Deployment Script
# "Deploying faster than a tumbleweed in a tornado"

set -e

echo "🤠 Starting WyoVerse deployment..."

# Check environment
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Copy .env.example and configure."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
pip install -r requirements.txt

# Build applications
echo "🔨 Building applications..."
npm run build

# Deploy to various platforms
echo "🚀 Deploying to platforms..."

# Deploy Sagebrush Sniper to Streamlit Cloud
if command -v streamlit &> /dev/null; then
    echo "📊 Deploying Sagebrush Sniper..."
    cd apps/sagebrush-sniper
    streamlit run main.py --server.port 8501 &
    cd ../..
fi

# Deploy main app to Vercel
if command -v vercel &> /dev/null; then
    echo "🌐 Deploying to Vercel..."
    vercel --prod
fi

# Deploy to Surge.sh as backup
if command -v surge &> /dev/null; then
    echo "⚡ Deploying to Surge..."
    surge ./out wyoverse.surge.sh
fi

echo "✅ Deployment complete!"
echo "🎯 Visit your applications:"
echo "   - Main Hub: https://wyoverse.vercel.app"
echo "   - Sagebrush Sniper: http://localhost:8501"
echo "   - Backup: https://wyoverse.surge.sh"

echo "🤠 Happy trading, partner!"