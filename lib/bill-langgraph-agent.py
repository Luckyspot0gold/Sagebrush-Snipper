#!/usr/bin/env python3
"""
🤠 Bar Keep Bill - LangGraph AI Agent
Advanced conversational AI with market awareness and human oversight
"""

import os
import json
import asyncio
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from datetime import datetime
from enum import Enum

# LangGraph and AI imports
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolExecutor
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.tools import tool

# Venice AI integration
import requests
import os

class EventType(Enum):
    WELCOME = "welcome"
    MARKET_BOOM = "market_boom"
    MARKET_CRASH = "market_crash"
    HIGH_ACTIVITY = "high_activity"
    NEW_TRADE = "new_trade"
    IDLE = "idle"
    HUMAN_REVIEW = "human_review"

@dataclass
class GameState:
    """State management for Bar Keep Bill"""
    player_id: str
    conversation_history: List[Dict]
    current_event: EventType
    market_data: Dict
    bill_mood: str  # "cheerful", "concerned", "excited", "wise"
    energy_level: int  # 0-100
    wisdom_points: int
    requires_human_review: bool = False
    last_interaction: datetime = None

class BillAIAgent:
    """
    Bar Keep Bill - Advanced AI Agent with LangGraph
    Features:
    - Market-aware responses
    - Mood system based on events
    - Human oversight for sensitive topics
    - Memory of player interactions
    """
    
    def __init__(self):
        self.venice_api_key = os.getenv("VENICE_API_KEY")
        self.wyoverse_api = os.getenv("NEXT_PUBLIC_WYOVERSE_API")
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
        
        # Initialize LangGraph workflow
        self.workflow = StateGraph(GameState)
        self._setup_workflow()
        
        # Bill's personality traits
        self.personality = {
            "base_character": "Wise frontier bartender from 1880s Wyoming",
            "speech_patterns": ["Well partner", "I reckon", "Much obliged", "By thunder"],
            "knowledge_areas": ["frontier_trading", "market_wisdom", "local_gossip", "survival_tips"],
            "mood_triggers": {
                "market_up": "cheerful",
                "market_down": "concerned", 
                "new_player": "welcoming",
                "high_volume": "excited"
            }
        }

    def _setup_workflow(self):
        """Setup LangGraph workflow nodes"""
        
        # Add workflow nodes
        self.workflow.add_node("detect_event", self._detect_event)
        self.workflow.add_node("analyze_context", self._analyze_context)
        self.workflow.add_node("generate_response", self._generate_response)
        self.workflow.add_node("human_review", self._human_review)
        self.workflow.add_node("update_state", self._update_state)
        
        # Define workflow edges
        self.workflow.set_entry_point("detect_event")
        self.workflow.add_edge("detect_event", "analyze_context")
        self.workflow.add_conditional_edges(
            "analyze_context",
            self._should_review,
            {
                "review": "human_review",
                "continue": "generate_response"
            }
        )
        self.workflow.add_edge("generate_response", "update_state")
        self.workflow.add_edge("human_review", "generate_response")
        self.workflow.add_edge("update_state", END)
        
        # Compile the workflow
        self.app = self.workflow.compile()

    async def _detect_event(self, state: GameState) -> GameState:
        """Detect current game/market events"""
        try:
            # Get market data from WyoVerse API
            market_response = await self._fetch_market_data()
            
            if market_response:
                price_change = market_response.get("change_24h", 0)
                volume = market_response.get("volume", 0)
                
                # Determine event type based on market conditions
                if abs(price_change) > 10:
                    state.current_event = EventType.MARKET_BOOM if price_change > 0 else EventType.MARKET_CRASH
                elif volume > 1000000:
                    state.current_event = EventType.HIGH_ACTIVITY
                elif not state.conversation_history:
                    state.current_event = EventType.WELCOME
                else:
                    state.current_event = EventType.IDLE
                    
                state.market_data = market_response
                
        except Exception as e:
            print(f"Event detection error: {e}")
            state.current_event = EventType.IDLE
            
        return state

    async def _analyze_context(self, state: GameState) -> GameState:
        """Analyze conversation context and player history"""
        
        # Update Bill's mood based on events
        if state.current_event == EventType.MARKET_BOOM:
            state.bill_mood = "excited"
            state.energy_level = min(100, state.energy_level + 20)
        elif state.current_event == EventType.MARKET_CRASH:
            state.bill_mood = "concerned"
            state.energy_level = max(20, state.energy_level - 10)
        elif state.current_event == EventType.WELCOME:
            state.bill_mood = "welcoming"
            state.energy_level = 80
        else:
            state.bill_mood = "cheerful"
            
        # Check if human review is needed
        recent_messages = state.conversation_history[-5:] if state.conversation_history else []
        sensitive_topics = ["financial_advice", "investment_recommendations", "personal_problems"]
        
        for msg in recent_messages:
            if any(topic in msg.get("content", "").lower() for topic in sensitive_topics):
                state.requires_human_review = True
                break
                
        return state

    def _should_review(self, state: GameState) -> str:
        """Conditional edge: determine if human review is needed"""
        return "review" if state.requires_human_review else "continue"

    async def _human_review(self, state: GameState) -> GameState:
        """Send to human review queue and wait for approval"""
        
        # Store in Supabase for human review
        review_data = {
            "player_id": state.player_id,
            "conversation_context": state.conversation_history[-3:],
            "proposed_response": "PENDING_HUMAN_REVIEW",
            "event_type": state.current_event.value,
            "timestamp": datetime.now().isoformat(),
            "status": "pending"
        }
        
        # In production, this would integrate with Supabase
        print(f"🔍 Human review requested for player {state.player_id}")
        
        # For demo, auto-approve after short delay
        await asyncio.sleep(2)
        state.requires_human_review = False
        
        return state

    async def _generate_response(self, state: GameState) -> GameState:
        """Generate Bill's response using Venice AI"""
        
        try:
            # Build context for Venice AI
            context = self._build_context(state)
            
            # Call Venice AI
            response = await self._call_venice_ai(context, state)
            
            # Add response to conversation history
            state.conversation_history.append({
                "role": "assistant",
                "content": response,
                "timestamp": datetime.now().isoformat(),
                "mood": state.bill_mood,
                "event": state.current_event.value
            })
            
        except Exception as e:
            print(f"Response generation error: {e}")
            # Fallback response
            fallback_responses = {
                EventType.WELCOME: "Well howdy there, partner! Welcome to my saloon. What can I get ya?",
                EventType.MARKET_BOOM: "By thunder! The markets are lookin' mighty fine today! Drinks are on the house!",
                EventType.MARKET_CRASH: "Well partner, markets are rougher than a bronco today. How 'bout a whiskey to steady the nerves?",
                EventType.IDLE: "What can I do ya for, friend? Got some fine drinks and even finer conversation."
            }
            
            response = fallback_responses.get(state.current_event, "Howdy, partner!")
            state.conversation_history.append({
                "role": "assistant", 
                "content": response,
                "timestamp": datetime.now().isoformat()
            })
            
        return state

    async def _update_state(self, state: GameState) -> GameState:
        """Update game state and save to database"""
        
        state.last_interaction = datetime.now()
        
        # Update wisdom points based on interaction quality
        if state.current_event in [EventType.MARKET_BOOM, EventType.MARKET_CRASH]:
            state.wisdom_points += 5
        else:
            state.wisdom_points += 1
            
        # Save to Supabase (in production)
        await self._save_state_to_db(state)
        
        return state

    def _build_context(self, state: GameState) -> str:
        """Build context prompt for Venice AI"""
        
        market_context = ""
        if state.market_data:
            price_change = state.market_data.get("change_24h", 0)
            market_context = f"Market is {'up' if price_change > 0 else 'down'} {abs(price_change):.1f}% today. "
        
        mood_context = f"Bill is feeling {state.bill_mood} (energy: {state.energy_level}/100). "
        
        recent_conversation = ""
        if state.conversation_history:
            recent_msgs = state.conversation_history[-3:]
            recent_conversation = "Recent conversation: " + " | ".join([
                f"{msg['role']}: {msg['content'][:100]}" for msg in recent_msgs
            ])
        
        context = f"""
        You are Bar Keep Bill, a wise and friendly bartender in 1880s Wyoming frontier town.
        
        Character traits:
        - Speaks with frontier dialect ("Well partner", "I reckon", "Much obliged")
        - Knowledgeable about trading, markets, and frontier life
        - Offers drinks and wisdom in equal measure
        - Always helpful but never gives direct financial advice
        
        Current situation:
        {market_context}
        {mood_context}
        Event: {state.current_event.value}
        
        {recent_conversation}
        
        Respond as Bill would, staying in character. Keep responses under 150 words.
        """
        
        return context

    async def _call_venice_ai(self, context: str, state: GameState) -> str:
        """Call Venice AI API for response generation"""
        
        if not self.venice_api_key:
            return "Well partner, my brain's a bit foggy today. How 'bout a drink while I gather my thoughts?"
        
        try:
            headers = {
                "Authorization": f"Bearer {self.venice_api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": "llama-3.1-8b",
                "messages": [
                    {"role": "system", "content": context},
                    {"role": "user", "content": state.conversation_history[-1]["content"] if state.conversation_history else "Hello"}
                ],
                "max_tokens": 150,
                "temperature": 0.8
            }
            
            response = requests.post(
                "https://api.venice.ai/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                return result["choices"][0]["message"]["content"]
            else:
                print(f"Venice AI error: {response.status_code}")
                return self._get_fallback_response(state.current_event)
                
        except Exception as e:
            print(f"Venice AI call failed: {e}")
            return self._get_fallback_response(state.current_event)

    def _get_fallback_response(self, event_type: EventType) -> str:
        """Fallback responses when AI is unavailable"""
        responses = {
            EventType.WELCOME: "Well howdy there, partner! Welcome to my establishment. What brings you to these parts?",
            EventType.MARKET_BOOM: "Hot diggity! The trading's been mighty good today! How 'bout we celebrate with a drink?",
            EventType.MARKET_CRASH: "Well partner, looks like the markets are bumpier than a wagon trail. Let me pour you somethin' strong.",
            EventType.HIGH_ACTIVITY: "Busier than a bee in a sunflower field around here! What can I get ya?",
            EventType.IDLE: "Afternoon, friend. What'll it be today?"
        }
        return responses.get(event_type, "Howdy, partner! What can I do ya for?")

    async def _fetch_market_data(self) -> Optional[Dict]:
        """Fetch current market data from WyoVerse API"""
        try:
            if not self.wyoverse_api:
                return None
                
            response = requests.get(f"{self.wyoverse_api}/market-data", timeout=5)
            if response.status_code == 200:
                return response.json()
        except Exception as e:
            print(f"Market data fetch error: {e}")
        return None

    async def _save_state_to_db(self, state: GameState):
        """Save game state to Supabase"""
        # In production, implement Supabase integration
        print(f"💾 Saving state for player {state.player_id}")

    async def process_message(self, player_id: str, message: str, current_state: Optional[GameState] = None) -> Dict:
        """Main entry point for processing player messages"""
        
        # Initialize or load state
        if current_state is None:
            current_state = GameState(
                player_id=player_id,
                conversation_history=[],
                current_event=EventType.IDLE,
                market_data={},
                bill_mood="cheerful",
                energy_level=75,
                wisdom_points=0
            )
        
        # Add player message to history
        current_state.conversation_history.append({
            "role": "user",
            "content": message,
            "timestamp": datetime.now().isoformat()
        })
        
        # Process through LangGraph workflow
        result_state = await self.app.ainvoke(current_state)
        
        # Return response
        latest_response = result_state.conversation_history[-1]
        
        return {
            "response": latest_response["content"],
            "mood": result_state.bill_mood,
            "energy": result_state.energy_level,
            "wisdom_points": result_state.wisdom_points,
            "event_type": result_state.current_event.value,
            "timestamp": latest_response["timestamp"]
        }

# Initialize global agent instance
bill_agent = BillAIAgent()

# Export for use in API routes
__all__ = ["bill_agent", "BillAIAgent", "GameState", "EventType"]
