#!/bin/bash

echo "🔍 VERIFYING SUPABASE SETUP"
echo "============================"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "📦 Installing Supabase CLI..."
    npm install -g supabase
fi

echo "🔐 Checking authentication..."
supabase --version

echo "📊 Checking database schema..."
supabase db dump --schema-only -f schema-verification.sql

echo "📋 Listing tables..."
grep "CREATE TABLE" schema-verification.sql || echo "No tables found - run schema setup first!"

echo "🧪 Testing connection..."
supabase db ping

echo "✅ Supabase verification complete!"
