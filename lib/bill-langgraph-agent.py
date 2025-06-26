#!/usr/bin/env python3
"""
🤠 BAR KEEP BILL - LANGGRAPH AMBIENT AGENT
Advanced AI agent with human-in-the-loop oversight for hackathon submission
"""

import os
import json
import asyncio
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from datetime import datetime
from enum import Enum

# Core AI/Agent imports
try:
    from langgraph.graph import StateGraph, END
    from langgraph.prebuilt import ToolExecutor
    import requests
    from supabase import create_client, Client
    import pandas as pd
    import numpy as np
except ImportError:
    print("Installing required packages...")
    os.system("pip install langgraph supabase pandas numpy requests")
    from langgraph.graph import StateGraph, END
    from langgraph.prebuilt import ToolExecutor
    import requests
    from supabase import create_client, Client
    import pandas as pd
    import numpy as np

class EventType(Enum):
    WELCOME = "welcome"
    MARKET_BOOM = "market_boom"
    MARKET_CRASH = "market_crash"
    HIGH_ACTIVITY = "high_activity"
    NEW_PLAYER = "new_player"
    LARGE_TRADE = "large_trade"
    IDLE = "idle"
    GOSSIP = "gossip_event"

@dataclass
class GameState:
    event_type: EventType
    player_data: Dict[str, Any]
    market_data: Dict[str, Any]
    context: str
    requires_approval: bool = False
    response: str = ""
    confidence: float = 0.0
    timestamp: datetime = None

    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.now()

@dataclass
class MarketEvent:
    symbol: str
    price_change: float
    volume: float
    timestamp: datetime
    significance: str  # "low", "medium", "high", "critical"

class BarKeepAgent:
    def __init__(self):
        # Initialize Supabase connection
        self.supabase_url = os.getenv('SUPABASE_NEXT_PUBLIC_SUPABASE_URL')
        self.supabase_key = os.getenv('SUPABASE_SERVICE_KEY')
        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
        
        # Initialize Venice AI (simulated for hackathon)
        self.venice_api_key = os.getenv('VENICE_API_KEY', 'demo-key')
        
        # Initialize Avalanche listener
        self.avalanche_rpc = os.getenv('NEXT_PUBLIC_AVALANCHE_RPC_URL')
        
        # Build the LangGraph workflow
        self.workflow = self._build_workflow()
        self.app = self.workflow.compile()
        
        # Event thresholds
        self.MARKET_BOOM_THRESHOLD = 10.0  # 10% price increase
        self.MARKET_CRASH_THRESHOLD = -10.0  # 10% price decrease
        self.HIGH_ACTIVITY_THRESHOLD = 1000  # Transaction count
        
        print("🤠 Bar Keep Bill's AI brain initialized!")

    def _build_workflow(self) -> StateGraph:
        """Build the LangGraph workflow for Bill's decision making"""
        workflow = StateGraph(GameState)
        
        # Add nodes
        workflow.add_node("detect_event", self._detect_event)
        workflow.add_node("analyze_context", self._analyze_context)
        workflow.add_node("generate_response", self._generate_response)
        workflow.add_node("human_review", self._human_review)
        workflow.add_node("execute_action", self._execute_action)
        
        # Define the flow
        workflow.set_entry_point("detect_event")
        
        workflow.add_edge("detect_event", "analyze_context")
        workflow.add_edge("analyze_context", "generate_response")
        
        # Conditional edge for human review
        workflow.add_conditional_edges(
            "generate_response",
            self._should_require_approval,
            {
                "human_review": "human_review",
                "execute_action": "execute_action"
            }
        )
        
        workflow.add_edge("human_review", "execute_action")
        workflow.add_edge("execute_action", END)
        
        return workflow

    async def _detect_event(self, state: GameState) -> GameState:
        """Detect what type of event is happening"""
        try:
            # Check market conditions
            market_data = await self._get_market_data()
            
            # Check for new players
            new_players = await self._check_new_players()
            
            # Check trading activity
            activity_level = await self._check_activity_level()
            
            # Determine event type
            if new_players > 0:
                state.event_type = EventType.NEW_PLAYER
            elif market_data.get('avax_change', 0) > self.MARKET_BOOM_THRESHOLD:
                state.event_type = EventType.MARKET_BOOM
            elif market_data.get('avax_change', 0) < self.MARKET_CRASH_THRESHOLD:
                state.event_type = EventType.MARKET_CRASH
            elif activity_level > self.HIGH_ACTIVITY_THRESHOLD:
                state.event_type = EventType.HIGH_ACTIVITY
            else:
                state.event_type = EventType.IDLE
            
            state.market_data = market_data
            
            print(f"🔍 Event detected: {state.event_type.value}")
            return state
            
        except Exception as e:
            print(f"❌ Event detection failed: {e}")
            state.event_type = EventType.IDLE
            return state

    async def _analyze_context(self, state: GameState) -> GameState:
        """Analyze the context around the detected event"""
        context_parts = []
        
        # Add market context
        if state.market_data:
            avax_change = state.market_data.get('avax_change', 0)
            if avax_change > 5:
                context_parts.append(f"AVAX is up {avax_change:.1f}% - bullish sentiment")
            elif avax_change < -5:
                context_parts.append(f"AVAX is down {avax_change:.1f}% - bearish sentiment")
        
        # Add player context
        if state.event_type == EventType.NEW_PLAYER:
            context_parts.append("New pioneer has arrived in the territory")
        
        # Add time context
        hour = datetime.now().hour
        if 6 <= hour < 12:
            context_parts.append("Morning trading session")
        elif 12 <= hour < 18:
            context_parts.append("Afternoon market activity")
        else:
            context_parts.append("Evening saloon hours")
        
        state.context = " | ".join(context_parts)
        print(f"📊 Context: {state.context}")
        
        return state

    async def _generate_response(self, state: GameState) -> GameState:
        """Generate Bill's response using Venice AI (simulated)"""
        try:
            # Build prompt for Venice AI
            prompt = self._build_character_prompt(state)
            
            # Simulate Venice AI call (replace with actual API in production)
            response = await self._call_venice_ai(prompt)
            
            state.response = response
            state.confidence = 0.85  # Simulated confidence score
            
            # Determine if human approval needed
            sensitive_topics = ["large", "crash", "boom", "emergency"]
            state.requires_approval = any(topic in response.lower() for topic in sensitive_topics)
            
            print(f"🤠 Bill says: {response[:100]}...")
            return state
            
        except Exception as e:
            print(f"❌ Response generation failed: {e}")
            state.response = "Well partner, seems my telegraph's actin' up. Try again in a spell."
            state.confidence = 0.3
            return state

    def _build_character_prompt(self, state: GameState) -> str:
        """Build character-appropriate prompt for Venice AI"""
        base_personality = """
        You are Bar Keep Bill, a wise frontier bartender from 1852 who now runs a digital saloon.
        
        PERSONALITY:
        - Use frontier/cowboy language ("partner", "dagnabbit", "well I'll be")
        - Mix old west wisdom with modern crypto knowledge
        - Always helpful but gruff and experienced
        - Tell relevant stories from the frontier days
        
        CURRENT SITUATION:
        """
        
        situation = f"""
        Event: {state.event_type.value}
        Context: {state.context}
        Market Data: {json.dumps(state.market_data, indent=2) if state.market_data else "No data"}
        
        Respond as Bill would, giving appropriate advice for this situation.
        Keep response under 200 words and stay in character.
        """
        
        return base_personality + situation

    async def _call_venice_ai(self, prompt: str) -> str:
        """Call Venice AI API (simulated for hackathon)"""
        # In production, this would call the actual Venice AI API
        # For hackathon demo, we'll use rule-based responses
        
        responses_by_event = {
            EventType.WELCOME: [
                "Well howdy there, partner! *tips hat* Welcome to the finest digital saloon this side of the blockchain. Pull up a stool and let old Bill show ya the ropes of frontier trading!",
                "New face in town, eh? *wipes down glass* Name's Bill, and I've been tendin' this establishment since the great crypto rush of '52. What brings ya to our neck of the digital woods?"
            ],
            EventType.MARKET_BOOM: [
                "Well I'll be jiggered! *polishes glass excitedly* Markets are hotter than a branding iron today! Time to take some profits off the table, but don't get too greedy now, partner.",
                "Thunderation! Haven't seen a bull run like this since the gold rush! *slides celebratory whiskey* But remember what old Bill always says - what goes up like a rocket can come down like a rock."
            ],
            EventType.MARKET_CRASH: [
                "*furrows brow while cleaning shot glass* Markets are colder than a Wyoming winter, partner. But this old bartender's seen plenty of storms - they always pass. Time to look for bargains!",
                "Dagnabbit! Market's taken a tumble, but don't you go sellin' in a panic now. *pours stiff drink* This here whiskey'll help ya think clearer about them opportunities."
            ],
            EventType.HIGH_ACTIVITY: [
                "*looks around bustling saloon* Well ain't this place hoppin'! Trading volume's higher than a cat's back. Might be time to slow down and make sure you ain't chasin' fool's gold.",
                "Busier than a one-legged cat in a sandbox! *chuckles* All this activity reminds me of the old cattle drives - sometimes ya gotta let the dust settle before ya can see clear."
            ],
            EventType.IDLE: [
                "*leans on bar thoughtfully* Quiet evening in the territory. Perfect time for plannin' your next moves, partner. Fortune favors the prepared mind, as they say.",
                "*adjusts suspenders* Peaceful times like these are when the smart traders do their homework. What's your strategy for the next market move, friend?"
            ]
        }
        
        event_responses = responses_by_event.get(state.event_type, responses_by_event[EventType.IDLE])
        return np.random.choice(event_responses)

    def _should_require_approval(self, state: GameState) -> str:
        """Determine if response needs human approval"""
        if state.requires_approval or state.confidence < 0.7:
            return "human_review"
        return "execute_action"

    async def _human_review(self, state: GameState) -> GameState:
        """Submit response for human review via Supabase"""
        try:
            review_data = {
                'event_type': state.event_type.value,
                'context': state.context,
                'proposed_response': state.response,
                'confidence': state.confidence,
                'requires_approval': True,
                'status': 'pending_review',
                'created_at': state.timestamp.isoformat()
            }
            
            result = self.supabase.table('bill_responses_review').insert(review_data).execute()
            
            print(f"📋 Response submitted for human review: {result.data[0]['id']}")
            
            # For hackathon demo, auto-approve after short delay
            await asyncio.sleep(2)
            state.requires_approval = False
            
            return state
            
        except Exception as e:
            print(f"❌ Human review submission failed: {e}")
            return state

    async def _execute_action(self, state: GameState) -> GameState:
        """Execute Bill's response and any associated actions"""
        try:
            # Log the interaction
            interaction_data = {
                'event_type': state.event_type.value,
                'context': state.context,
                'response': state.response,
                'confidence': state.confidence,
                'executed_at': datetime.now().isoformat()
            }
            
            self.supabase.table('bill_interactions').insert(interaction_data).execute()
            
            # Trigger any special actions based on event type
            if state.event_type == EventType.NEW_PLAYER:
                await self._send_welcome_brew(state.player_data)
            elif state.event_type == EventType.MARKET_CRASH:
                await self._offer_discount_drinks()
            elif state.event_type == EventType.HIGH_ACTIVITY:
                await self._start_minigame()
            
            print(f"✅ Action executed: {state.event_type.value}")
            return state
            
        except Exception as e:
            print(f"❌ Action execution failed: {e}")
            return state

    # Helper methods for data gathering
    async def _get_market_data(self) -> Dict[str, Any]:
        """Get current market data"""
        try:
            # Simulate market data (replace with real API calls)
            return {
                'avax_price': 34.21,
                'avax_change': np.random.uniform(-15, 15),
                'stones_price': 2.47,
                'stones_change': np.random.uniform(-10, 10),
                'volume_24h': np.random.uniform(1000, 10000),
                'timestamp': datetime.now().isoformat()
            }
        except Exception as e:
            print(f"❌ Market data fetch failed: {e}")
            return {}

    async def _check_new_players(self) -> int:
        """Check for new player registrations"""
        try:
            # Query Supabase for recent user registrations
            result = self.supabase.table('users').select('id').gte(
                'created_at', 
                (datetime.now().timestamp() - 3600)  # Last hour
            ).execute()
            
            return len(result.data)
        except Exception as e:
            print(f"❌ New player check failed: {e}")
            return 0

    async def _check_activity_level(self) -> int:
        """Check current trading activity level"""
        try:
            # Simulate activity level
            return np.random.randint(100, 2000)
        except Exception as e:
            print(f"❌ Activity check failed: {e}")
            return 0

    # Action methods
    async def _send_welcome_brew(self, player_data: Dict[str, Any]):
        """Send welcome gift to new player"""
        print("🍺 Sending welcome brew to new player!")
        # Implementation would send actual in-game item

    async def _offer_discount_drinks(self):
        """Offer discounted drinks during market crashes"""
        print("💰 Offering discount drinks during market downturn!")
        # Implementation would update in-game prices

    async def _start_minigame(self):
        """Start a minigame during high activity"""
        print("🎮 Starting saloon minigame due to high activity!")
        # Implementation would trigger game event

    # Main execution methods
    async def process_event(self, initial_state: GameState = None) -> GameState:
        """Process a single event through the workflow"""
        if initial_state is None:
            initial_state = GameState(
                event_type=EventType.IDLE,
                player_data={},
                market_data={},
                context=""
            )
        
        try:
            result = await self.app.ainvoke(initial_state)
            return result
        except Exception as e:
            print(f"❌ Event processing failed: {e}")
            return initial_state

    async def run_ambient_loop(self, interval: int = 30):
        """Run the ambient agent loop"""
        print(f"🤠 Bar Keep Bill starting ambient monitoring (every {interval}s)")
        
        while True:
            try:
                # Process current state
                result = await self.process_event()
                
                # Only respond if something interesting happened
                if result.event_type != EventType.IDLE:
                    print(f"🎯 Bill responded to {result.event_type.value}: {result.response[:50]}...")
                
                await asyncio.sleep(interval)
                
            except KeyboardInterrupt:
                print("🤠 Bar Keep Bill signing off for the night!")
                break
            except Exception as e:
                print(f"❌ Ambient loop error: {e}")
                await asyncio.sleep(interval)

# Global agent instance
bill_agent = BarKeepAgent()

# API endpoints for Next.js integration
async def get_bill_response(event_type: str = "idle", player_data: Dict = None) -> Dict:
    """API endpoint for getting Bill's response to events"""
    try:
        initial_state = GameState(
            event_type=EventType(event_type),
            player_data=player_data or {},
            market_data={},
            context=""
        )
        
        result = await bill_agent.process_event(initial_state)
        
        return {
            "success": True,
            "response": result.response,
            "confidence": result.confidence,
            "event_type": result.event_type.value,
            "context": result.context,
            "timestamp": result.timestamp.isoformat()
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "response": "Well partner, seems my telegraph's on the fritz. Try again in a spell."
        }

if __name__ == "__main__":
    # Test the agent
    async def test_agent():
        print("🧪 Testing Bar Keep Bill's LangGraph Agent...")
        
        # Test different event types
        test_events = [
            EventType.WELCOME,
            EventType.MARKET_BOOM,
            EventType.MARKET_CRASH,
            EventType.HIGH_ACTIVITY
        ]
        
        for event in test_events:
            print(f"\n🎯 Testing {event.value}...")
            state = GameState(
                event_type=event,
                player_data={"id": "test_player"},
                market_data={},
                context=""
            )
            
            result = await bill_agent.process_event(state)
            print(f"🤠 Bill: {result.response}")
            print(f"   Confidence: {result.confidence}")
            print(f"   Required approval: {result.requires_approval}")
    
    # Run test
    asyncio.run(test_agent())
