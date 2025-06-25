#!/bin/bash

echo "🎯 FINAL HACKATHON DEPLOYMENT CHECKLIST"
echo "========================================"

echo "✅ Step 1: Supabase Setup"
echo "supabase login"
echo "supabase init"
echo ""

echo "✅ Step 2: Environment Variables"
echo "export SUPABASE_URL='https://your-project.supabase.co'"
echo "export SUPABASE_KEY='your-anon-key'"
echo ""

echo "✅ Step 3: Make Scripts Executable"
echo "chmod +x scripts/deploy-all-domains.sh"
echo "chmod +x scripts/verify-supabase.sh"
echo ""

echo "✅ Step 4: Deploy Ecosystem"
echo "./scripts/deploy-all-domains.sh"
echo ""

echo "✅ Step 5: Verify Setup"
echo "./scripts/verify-supabase.sh"
echo "vercel list"
echo ""

echo "🎬 Step 6: Record Demo Video"
echo "Use FINAL_DEMO_SCRIPT.md for your presentation"
echo ""

echo "🏆 Step 7: Submit to Hackathon"
echo "Upload demo video and documentation"
echo ""

echo "🚀 READY TO WIN!"
# Login to Supabase
supabase login

# Initialize project  
supabase init
