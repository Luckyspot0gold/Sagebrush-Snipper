#!/usr/bin/env python3
"""
🧠 VENICE AI HACKATHON PREPARATION SCRIPT
Complete preparation for hackathon submission with Venice AI integration
"""

import os
import json
import asyncio
import requests
import subprocess
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import hashlib

class VeniceAIHackathonPrep:
    def __init__(self):
        self.venice_api_key = os.getenv("VENICE_API_KEY")
        self.venice_base_url = "https://api.venice.ai/v1"
        self.hackathon_deadline = "2024-06-30T23:59:59Z"
        self.prep_id = f"venice-prep-{int(datetime.now().timestamp())}"
        self.results = {}
        
    def check_environment(self) -> Dict:
        """Check environment setup for Venice AI"""
        print("🔧 Checking Environment Setup...")
        
        required_vars = [
            "VENICE_API_KEY",
            "NEXT_PUBLIC_SUPABASE_URL", 
            "NEXT_PUBLIC_SUPABASE_ANON_KEY",
            "COINMARKETCAP_API_KEY",
            "NEXT_PUBLIC_AVALANCHE_RPC_URL"
        ]
        
        missing_vars = []
        for var in required_vars:
            if not os.getenv(var):
                missing_vars.append(var)
        
        env_score = ((len(required_vars) - len(missing_vars)) / len(required_vars)) * 100
        
        return {
            "component": "Environment Setup",
            "score": env_score,
            "status": "PASS" if env_score >= 80 else "FAIL",
            "missing_vars": missing_vars,
            "total_vars": len(required_vars)
        }
    
    async def test_venice_ai_api(self) -> Dict:
        """Test Venice AI API connectivity and capabilities"""
        print("🧠 Testing Venice AI API...")
        
        if not self.venice_api_key:
            return {
                "component": "Venice AI API",
                "score": 0,
                "status": "FAIL",
                "error": "VENICE_API_KEY not configured"
            }
        
        try:
            # Test basic API connectivity
            headers = {
                "Authorization": f"Bearer {self.venice_api_key}",
                "Content-Type": "application/json"
            }
            
            # Test chat completion
            chat_payload = {
                "model": "llama-3.1-8b",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are Bar Keep Bill, a wise frontier bartender who understands crypto markets and boxing strategies."
                    },
                    {
                        "role": "user",
                        "content": "Analyze how BTC price volatility should affect crypto boxing match strategies. Be specific about combat moves."
                    }
                ],
                "max_tokens": 150,
                "temperature": 0.7
            }
            
            response = requests.post(
                f"{self.venice_base_url}/chat/completions",
                headers=headers,
                json=chat_payload,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                response_content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                
                # Analyze response quality
                quality_checks = {
                    "has_boxing_context": any(word in response_content.lower() for word in ["boxing", "combat", "fight", "jab", "hook"]),
                    "has_crypto_context": any(word in response_content.lower() for word in ["btc", "bitcoin", "crypto", "price", "volatility"]),
                    "has_personality": any(word in response_content.lower() for word in ["partner", "howdy", "frontier", "reckon"]),
                    "sufficient_length": len(response_content) > 50
                }
                
                quality_score = sum(quality_checks.values()) / len(quality_checks) * 100
                
                return {
                    "component": "Venice AI API",
                    "score": quality_score,
                    "status": "PASS" if quality_score >= 75 else "PARTIAL",
                    "response_length": len(response_content),
                    "quality_checks": quality_checks,
                    "tokens_used": data.get("usage", {}).get("total_tokens", 0)
                }
            else:
                return {
                    "component": "Venice AI API",
                    "score": 0,
                    "status": "FAIL",
                    "error": f"API request failed: {response.status_code} {response.text}"
                }
                
        except Exception as e:
            return {
                "component": "Venice AI API",
                "score": 0,
                "status": "FAIL",
                "error": str(e)
            }
    
    def check_project_structure(self) -> Dict:
        """Check project structure for Venice AI integration"""
        print("📁 Checking Project Structure...")
        
        required_files = [
            "lib/venice-ai-verifier.ts",
            "app/api/venice-verify/route.ts",
            "components/venice-ai-dashboard.tsx",
            "app/venice-verify/page.tsx",
            "components/enhanced-crypto-clashers-boxing.tsx",
            "components/enhanced-crypto-clashers-racing.tsx",
            "app/boxing-arena/page.tsx",
            "app/racing-circuit/page.tsx"
        ]
        
        present_files = []
        missing_files = []
        
        for file_path in required_files:
            if os.path.exists(file_path):
                present_files.append(file_path)
            else:
                missing_files.append(file_path)
        
        structure_score = (len(present_files) / len(required_files)) * 100
        
        return {
            "component": "Project Structure",
            "score": structure_score,
            "status": "PASS" if structure_score >= 90 else "PARTIAL" if structure_score >= 70 else "FAIL",
            "present_files": len(present_files),
            "missing_files": missing_files,
            "total_files": len(required_files)
        }
    
    def check_combat_integration(self) -> Dict:
        """Check Venice AI integration in combat components"""
        print("🥊 Checking Combat Integration...")
        
        combat_files = [
            "components/enhanced-crypto-clashers-boxing.tsx",
            "components/enhanced-crypto-clashers-racing.tsx",
            "app/boxing-arena/page.tsx"
        ]
        
        integration_score = 0
        integration_details = {}
        
        for file_path in combat_files:
            if os.path.exists(file_path):
                with open(file_path, 'r') as f:
                    content = f.read()
                    
                # Check for Venice AI integration indicators
                has_ai_refs = any(keyword in content.lower() for keyword in [
                    "venice", "ai", "quantum", "enhanced", "intelligent"
                ])
                
                has_market_integration = any(keyword in content.lower() for keyword in [
                    "market", "price", "crypto", "btc", "volatility"
                ])
                
                has_combat_logic = any(keyword in content.lower() for keyword in [
                    "jab", "hook", "uppercut", "combo", "strategy"
                ])
                
                file_score = (has_ai_refs + has_market_integration + has_combat_logic) / 3 * 100
                integration_score += file_score
                
                integration_details[file_path] = {
                    "has_ai_refs": has_ai_refs,
                    "has_market_integration": has_market_integration,
                    "has_combat_logic": has_combat_logic,
                    "score": file_score
                }
        
        avg_score = integration_score / len(combat_files) if combat_files else 0
        
        return {
            "component": "Combat Integration",
            "score": avg_score,
            "status": "PASS" if avg_score >= 80 else "PARTIAL" if avg_score >= 60 else "FAIL",
            "files_checked": len(combat_files),
            "integration_details": integration_details
        }
    
    def check_market_data_integration(self) -> Dict:
        """Check market data integration for Venice AI"""
        print("📈 Checking Market Data Integration...")
        
        market_files = [
            "app/api/crypto-data/route.ts",
            "app/api/crypto-data-enhanced/route.ts",
            "app/api/market-data/route.ts",
            "components/real-time-market-widget.tsx"
        ]
        
        present_market_files = 0
        market_integration_score = 0
        
        for file_path in market_files:
            if os.path.exists(file_path):
                present_market_files += 1
                
                with open(file_path, 'r') as f:
                    content = f.read()
                    
                # Check for market data features
                has_real_time = "real" in content.lower() and "time" in content.lower()
                has_crypto_apis = any(api in content.lower() for api in [
                    "coinbase", "coingecko", "coinmarketcap", "binance"
                ])
                has_price_tracking = any(keyword in content.lower() for keyword in [
                    "price", "volume", "change", "volatility"
                ])
                
                file_score = (has_real_time + has_crypto_apis + has_price_tracking) / 3 * 100
                market_integration_score += file_score
        
        avg_market_score = market_integration_score / len(market_files) if market_files else 0
        
        return {
            "component": "Market Data Integration",
            "score": avg_market_score,
            "status": "PASS" if avg_market_score >= 70 else "PARTIAL" if avg_market_score >= 50 else "FAIL",
            "present_files": present_market_files,
            "total_files": len(market_files)
        }
    
    def generate_demo_script(self) -> Dict:
        """Generate demo script for hackathon submission"""
        print("🎬 Generating Demo Script...")
        
        demo_script = """
# 🤠 WyoVerse Venice AI Demo Script

## Opening (0-15 seconds)
- Show newspaper front page with "WyoVerse Pioneer" header
- Highlight Venice AI integration badge
- "Welcome to the world's first crypto-controlled boxing metaverse"

## Venice AI Showcase (15-30 seconds)
- Navigate to Bar Keep Bill's Saloon
- Ask: "How should BTC price movements affect boxing strategies?"
- Show Venice AI generating intelligent response with frontier personality
- Highlight quantum-enhanced processing indicator

## Combat Demonstration (30-60 seconds)
- Open Crypto Clashers Boxing Arena
- Show BTC miner boxer vs ETH guardian
- Trigger real market data: "BTC just increased 3%"
- Watch miner boxer execute aggressive jab combo
- Show Venice AI commentary: "That's some fine strategy, partner!"

## Market Integration (60-75 seconds)
- Display real-time market widget
- Show price changes triggering different combat moves:
  * BTC +5% → Miner double jab
  * LINK oracle update → Guardian special move
  * SOL network lag → Cowboy stumble

## Innovation Highlight (75-90 seconds)
- Show Venice AI learning from combat outcomes
- Display quantum signature verification
- Highlight Wyoming blockchain compliance
- Show Aleo ZK proof for fair match verification

## Closing (90-120 seconds)
- Return to newspaper interface
- Show community stats and live trading volume
- Display "Built with Venice AI" badge
- End with: "Where the Digital Frontier Meets Pioneer Spirit"
- Show GitHub repo and live demo links

## Technical Callouts
- Venice AI quantum-enhanced responses
- Real-time crypto market integration
- Wyoming blockchain compliance
- Aleo ZK proof verification
- Multi-chain support (Avalanche, Solana, Ethereum)
"""
        
        # Save demo script
        with open(f"demo_script_{self.prep_id}.md", "w") as f:
            f.write(demo_script)
        
        return {
            "component": "Demo Script",
            "score": 100,
            "status": "PASS",
            "script_file": f"demo_script_{self.prep_id}.md",
            "duration": "2 minutes",
            "sections": 6
        }
    
    def check_hackathon_readiness(self) -> Dict:
        """Check overall hackathon readiness"""
        print("🏆 Checking Hackathon Readiness...")
        
        # Calculate time remaining
        deadline = datetime.fromisoformat(self.hackathon_deadline.replace('Z', '+00:00'))
        now = datetime.now(deadline.tzinfo)
        time_remaining = deadline - now
        
        readiness_checks = {
            "venice_ai_integrated": self.results.get("Venice AI API", {}).get("status") == "PASS",
            "project_structure_complete": self.results.get("Project Structure", {}).get("status") in ["PASS", "PARTIAL"],
            "combat_integration_working": self.results.get("Combat Integration", {}).get("status") in ["PASS", "PARTIAL"],
            "market_data_connected": self.results.get("Market Data Integration", {}).get("status") in ["PASS", "PARTIAL"],
            "demo_script_ready": self.results.get("Demo Script", {}).get("status") == "PASS",
            "sufficient_time": time_remaining.total_seconds() > 3600  # At least 1 hour remaining
        }
        
        readiness_score = sum(readiness_checks.values()) / len(readiness_checks) * 100
        
        return {
            "component": "Hackathon Readiness",
            "score": readiness_score,
            "status": "READY" if readiness_score >= 80 else "NEEDS_WORK",
            "time_remaining_hours": time_remaining.total_seconds() / 3600,
            "readiness_checks": readiness_checks,
            "deadline": self.hackathon_deadline
        }
    
    async def run_full_preparation(self) -> Dict:
        """Run complete hackathon preparation"""
        print(f"🤠 Starting Venice AI Hackathon Preparation {self.prep_id}")
        print("=" * 60)
        
        start_time = datetime.now()
        
        # Run all preparation checks
        self.results["Environment Setup"] = self.check_environment()
        self.results["Venice AI API"] = await self.test_venice_ai_api()
        self.results["Project Structure"] = self.check_project_structure()
        self.results["Combat Integration"] = self.check_combat_integration()
        self.results["Market Data Integration"] = self.check_market_data_integration()
        self.results["Demo Script"] = self.generate_demo_script()
        self.results["Hackathon Readiness"] = self.check_hackathon_readiness()
        
        # Calculate overall score
        total_score = sum(result.get("score", 0) for result in self.results.values())
        overall_score = total_score / len(self.results)
        
        # Determine overall status
        if overall_score >= 85:
            overall_status = "READY_FOR_SUBMISSION"
        elif overall_score >= 70:
            overall_status = "NEEDS_MINOR_FIXES"
        else:
            overall_status = "NEEDS_MAJOR_WORK"
        
        end_time = datetime.now()
        
        # Generate final report
        report = {
            "prep_id": self.prep_id,
            "timestamp": start_time.isoformat(),
            "duration_seconds": (end_time - start_time).total_seconds(),
            "overall_score": round(overall_score, 2),
            "overall_status": overall_status,
            "results": self.results,
            "recommendations": self.generate_recommendations(),
            "next_steps": self.generate_next_steps()
        }
        
        # Save report
        with open(f"venice_ai_hackathon_prep_{self.prep_id}.json", "w") as f:
            json.dump(report, f, indent=2)
        
        print(f"\n🎯 Venice AI Hackathon Preparation Complete!")
        print(f"Overall Score: {overall_score:.1f}%")
        print(f"Status: {overall_status}")
        print(f"Report saved: venice_ai_hackathon_prep_{self.prep_id}.json")
        
        return report
    
    def generate_recommendations(self) -> List[str]:
        """Generate recommendations based on results"""
        recommendations = []
        
        for component, result in self.results.items():
            if result.get("status") == "FAIL":
                recommendations.append(f"🔴 CRITICAL: Fix {component} - {result.get('error', 'Component failed')}")
            elif result.get("status") == "PARTIAL":
                recommendations.append(f"🟡 IMPROVE: Optimize {component} - Score: {result.get('score', 0):.1f}%")
        
        # Add general recommendations
        recommendations.extend([
            "🧠 Test Venice AI responses with various market scenarios",
            "🎬 Record demo video showcasing Venice AI features",
            "📊 Monitor Venice AI API quota usage",
            "🔐 Implement fallback responses for API failures",
            "🏆 Prepare hackathon submission materials"
        ])
        
        return recommendations
    
    def generate_next_steps(self) -> List[str]:
        """Generate next steps for hackathon submission"""
        next_steps = [
            "1. Address any failed components immediately",
            "2. Test Venice AI integration with live market data",
            "3. Record demo video following the generated script",
            "4. Prepare hackathon submission form",
            "5. Upload project to GitHub with Venice AI documentation",
            "6. Submit to hackathon platform before deadline",
            "7. Monitor Venice AI performance during judging"
        ]
        
        return next_steps

# CLI Interface
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Venice AI Hackathon Preparation")
    parser.add_argument("--component", help="Check specific component")
    parser.add_argument("--generate-demo", action="store_true", help="Generate demo script only")
    
    args = parser.parse_args()
    
    async def main():
        prep = VeniceAIHackathonPrep()
        
        if args.generate_demo:
            result = prep.generate_demo_script()
            print(f"Demo script generated: {result['script_file']}")
        elif args.component:
            if args.component == "environment":
                result = prep.check_environment()
            elif args.component == "structure":
                result = prep.check_project_structure()
            elif args.component == "combat":
                result = prep.check_combat_integration()
            elif args.component == "market":
                result = prep.check_market_data_integration()
            elif args.component == "api":
                result = await prep.test_venice_ai_api()
            else:
                print(f"Unknown component: {args.component}")
                return
            
            print(json.dumps(result, indent=2))
        else:
            # Run full preparation
            report = await prep.run_full_preparation()
            print(f"\nFull preparation report: {report['overall_status']}")
    
    asyncio.run(main())
