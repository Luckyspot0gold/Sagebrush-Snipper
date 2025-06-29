#!/usr/bin/env python3
"""
🏜️ Sagebrush Sniper - Wyoming Crypto Trading Analysis
Built with the spirit of the frontier
"""

import streamlit as st
import yfinance as yf
import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from datetime import datetime, timedelta
import time
import os
from typing import Dict, List, Optional

class SagebrushSniper:
    """🎯 The legendary crypto sniper - faster than Wyoming lightning"""
    
    def __init__(self):
        self.motto = "🏜️ Silent as sagebrush, deadly as a diamondback"
        self.trade_history = []
        
    def analyze_target(self, symbol: str = "BTC-USD", period: str = "30d") -> Optional[Dict]:
        """🔍 Scoutin' the digital frontier for opportunities"""
        try:
            ticker = yf.Ticker(symbol)
            data = ticker.history(period=period, interval="1h")
            
            if data.empty:
                st.error(f"🤠 Couldn't rustle up data for {symbol}, partner!")
                return None
            
            # Calculate technical indicators
            data = self._calculate_indicators(data)
            
            # Generate trading signals
            signals = self._analyze_signals(data)
            
            return {
                'data': data,
                'signals': signals,
                'symbol': symbol,
                'last_updated': datetime.now()
            }
            
        except Exception as e:
            st.error(f"🤠 Error analyzing {symbol}: {str(e)}")
            return None
    
    def _calculate_indicators(self, data: pd.DataFrame) -> pd.DataFrame:
        """Calculate technical indicators"""
        # Moving Averages
        data['SMA_20'] = data['Close'].rolling(window=20).mean()
        data['SMA_50'] = data['Close'].rolling(window=50).mean()
        data['EMA_12'] = data['Close'].ewm(span=12).mean()
        data['EMA_26'] = data['Close'].ewm(span=26).mean()
        
        # Bollinger Bands
        data['BB_middle'] = data['Close'].rolling(window=20).mean()
        bb_std = data['Close'].rolling(window=20).std()
        data['BB_upper'] = data['BB_middle'] + (bb_std * 2)
        data['BB_lower'] = data['BB_middle'] - (bb_std * 2)
        
        # RSI
        delta = data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        data['RSI'] = 100 - (100 / (1 + rs))
        
        # MACD
        data['MACD'] = data['EMA_12'] - data['EMA_26']
        data['MACD_signal'] = data['MACD'].ewm(span=9).mean()
        data['MACD_histogram'] = data['MACD'] - data['MACD_signal']
        
        # Volume analysis
        data['Volume_MA'] = data['Volume'].rolling(window=20).mean()
        data['Volume_Ratio'] = data['Volume'] / data['Volume_MA']
        
        return data
    
    def _analyze_signals(self, data: pd.DataFrame) -> Dict:
        """Generate trading signals"""
        if data.empty:
            return self._empty_signals()
            
        latest = data.iloc[-1]
        
        # Buy signals
        buy_signals = []
        buy_score = 0
        
        if latest['RSI'] < 30:
            buy_signals.append("🎯 RSI Oversold (Bullish)")
            buy_score += 2
            
        if latest['Close'] <= latest['BB_lower'] * 1.02:
            buy_signals.append("🎯 Touching Lower BB (Bounce Expected)")
            buy_score += 2
            
        if (latest['MACD'] > latest['MACD_signal'] and 
            data['MACD'].iloc[-2] <= data['MACD_signal'].iloc[-2]):
            buy_signals.append("🎯 MACD Bullish Crossover")
            buy_score += 3
            
        if latest['Volume_Ratio'] > 1.5:
            buy_signals.append("🎯 High Volume Confirmation")
            buy_score += 1
            
        if latest['SMA_20'] > latest['SMA_50']:
            buy_signals.append("🎯 Golden Cross Active")
            buy_score += 1
        
        # Sell signals
        sell_signals = []
        sell_score = 0
        
        if latest['RSI'] > 70:
            sell_signals.append("⚠️ RSI Overbought (Bearish)")
            sell_score += 2
            
        if latest['Close'] >= latest['BB_upper'] * 0.98:
            sell_signals.append("⚠️ Near Upper BB (Resistance)")
            sell_score += 2
            
        if (latest['MACD'] < latest['MACD_signal'] and 
            data['MACD'].iloc[-2] >= data['MACD_signal'].iloc[-2]):
            sell_signals.append("⚠️ MACD Bearish Crossover")
            sell_score += 3
            
        if latest['SMA_20'] < latest['SMA_50']:
            sell_signals.append("⚠️ Death Cross Active")
            sell_score += 1
        
        return {
            'buy_signals': buy_signals,
            'sell_signals': sell_signals,
            'buy_score': buy_score,
            'sell_score': sell_score,
            'recommendation': self._get_recommendation(buy_score, sell_score),
            'current_price': latest['Close'],
            'rsi': latest['RSI'],
            'macd': latest['MACD'],
            'volume_ratio': latest['Volume_Ratio']
        }
    
    def _get_recommendation(self, buy_score: int, sell_score: int) -> str:
        """Generate trading recommendation"""
        if buy_score >= 5:
            return "🟢 STRONG BUY - Mount up, partner!"
        elif buy_score >= 3:
            return "🟡 BUY - Good lookin' opportunity"
        elif sell_score >= 5:
            return "🔴 STRONG SELL - Time to mosey on out"
        elif sell_score >= 3:
            return "🟠 SELL - Consider lightenin' the load"
        else:
            return "⚪ HOLD - Keep your powder dry"
    
    def _empty_signals(self) -> Dict:
        """Return empty signals structure"""
        return {
            'buy_signals': [],
            'sell_signals': [],
            'buy_score': 0,
            'sell_score': 0,
            'recommendation': "⚪ NO DATA - Check connection",
            'current_price': 0,
            'rsi': 50,
            'macd': 0,
            'volume_ratio': 1
        }

def create_price_chart(data: pd.DataFrame, symbol: str):
    """📊 Creating charts prettier than a Wyoming sunset"""
    
    fig = make_subplots(
        rows=3, cols=1,
        subplot_titles=(f'{symbol} Price & Indicators', 'RSI', 'MACD'),
        vertical_spacing=0.08,
        row_heights=[0.6, 0.2, 0.2]
    )
    
    # Candlestick chart
    fig.add_trace(
        go.Candlestick(
            x=data.index,
            open=data['Open'],
            high=data['High'],
            low=data['Low'],
            close=data['Close'],
            name="Price",
            increasing_line_color='#26a69a',
            decreasing_line_color='#ef5350'
        ),
        row=1, col=1
    )
    
    # Bollinger Bands
    fig.add_trace(
        go.Scatter(x=data.index, y=data['BB_upper'], 
                  name="BB Upper", line=dict(color='red', dash='dash')),
        row=1, col=1
    )
    fig.add_trace(
        go.Scatter(x=data.index, y=data['BB_lower'], 
                  name="BB Lower", line=dict(color='green', dash='dash')),
        row=1, col=1
    )
    
    # Moving averages
    fig.add_trace(
        go.Scatter(x=data.index, y=data['SMA_20'], 
                  name="SMA 20", line=dict(color='orange', width=2)),
        row=1, col=1
    )
    
    # RSI
    fig.add_trace(
        go.Scatter(x=data.index, y=data['RSI'], 
                  name="RSI", line=dict(color='purple')),
        row=2, col=1
    )
    fig.add_hline(y=70, line_dash="dash", line_color="red", row=2, col=1)
    fig.add_hline(y=30, line_dash="dash", line_color="green", row=2, col=1)
    
    # MACD
    fig.add_trace(
        go.Scatter(x=data.index, y=data['MACD'], 
                  name="MACD", line=dict(color='blue')),
        row=3, col=1
    )
    fig.add_trace(
        go.Scatter(x=data.index, y=data['MACD_signal'], 
                  name="Signal", line=dict(color='red')),
        row=3, col=1
    )
    
    fig.update_layout(
        title=f"🎯 {symbol} Technical Analysis",
        height=800,
        showlegend=True,
        template="plotly_dark"
    )
    
    return fig

def main():
    """🤠 Main application - where the magic happens"""
    
    st.set_page_config(
        page_title="🏜️ Sagebrush Sniper",
        page_icon="🎯",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    # Header
    st.markdown("""
    <div style='text-align: center; padding: 20px; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); border-radius: 15px; margin-bottom: 20px;'>
        <h1 style='color: white; margin: 0;'>🏜️ SAGEBRUSH SNIPER 🎯</h1>
        <p style='color: #FFD700; margin: 5px 0 0 0; font-size: 18px;'><i>"Trading so fast, nobody even knows what he looks like"</i></p>
    </div>
    """, unsafe_allow_html=True)
    
    # Initialize sniper
    sniper = SagebrushSniper()
    
    # Sidebar controls
    with st.sidebar:
        st.markdown("### 🎯 Sniper Controls")
        
        symbol = st.selectbox(
            "🏹 Target Asset",
            ["BTC-USD", "ETH-USD", "ADA-USD", "SOL-USD", "DOGE-USD", "LTC-USD"],
            index=0
        )
        
        period = st.selectbox(
            "⏰ Time Frame",
            ["1d", "5d", "1mo", "3mo"],
            index=2
        )
        
        st.markdown("---")
        
        if st.button("🔍 ANALYZE TARGET", type="primary", use_container_width=True):
            with st.spinner("🏜️ Scouting the digital frontier..."):
                analysis = sniper.analyze_target(symbol, period)
                if analysis:
                    st.session_state.analysis = analysis
                    st.success("🎯 Target acquired!")
    
    # Main content
    if 'analysis' in st.session_state:
        analysis = st.session_state.analysis
        data = analysis['data']
        signals = analysis['signals']
        
        # Metrics row
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("💰 Price", f"${signals['current_price']:,.2f}")
        with col2:
            rsi_color = "🟢" if signals['rsi'] < 30 else "🔴" if signals['rsi'] > 70 else "🟡"
            st.metric(f"{rsi_color} RSI", f"{signals['rsi']:.1f}")
        with col3:
            st.metric("📊 Signal", signals['recommendation'].split(' - ')[0])
        with col4:
            st.metric("📈 Strength", f"{max(signals['buy_score'], signals['sell_score'])}/10")
        
        # Price chart
        fig = create_price_chart(data, analysis['symbol'])
        st.plotly_chart(fig, use_container_width=True)
        
        # Signals display
        col1, col2 = st.columns(2)
        
        with col1:
            if signals['buy_signals']:
                st.success("🟢 **BUY SIGNALS**")
                for signal in signals['buy_signals']:
                    st.write(f"• {signal}")
        
        with col2:
            if signals['sell_signals']:
                st.error("🔴 **SELL SIGNALS**")
                for signal in signals['sell_signals']:
                    st.write(f"• {signal}")
        
        st.info(signals['recommendation'])
    
    else:
        st.markdown("""
        <div style='text-align: center; padding: 60px; border: 3px dashed #D2691E; border-radius: 20px; margin: 40px;'>
            <h2>🤠 Welcome to the Digital Frontier!</h2>
            <p style='font-size: 20px;'>The Sagebrush Sniper is ready to ride</p>
            <p>👈 Select your target in the sidebar to begin</p>
            <p><i>"Silent as sagebrush, deadly as a diamondback"</i></p>
        </div>
        """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()