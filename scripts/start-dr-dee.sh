#!/bin/bash

# 🤖 Start Dr. Dee Assistant
echo "🤠 Starting Dr. Dee Assistant..."

cd apps/dr-dee-assistant

# Install dependencies if needed
if [ ! -d "venv" ]; then
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Start the assistant
echo "🚀 Dr. Dee is coming online..."
streamlit run main.py --server.port 8502 --server.address 0.0.0.0

echo "✅ Dr. Dee Assistant running at http://localhost:8502"