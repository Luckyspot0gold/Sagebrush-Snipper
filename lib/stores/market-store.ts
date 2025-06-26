"use client"

import { create } from "zustand"
import type { Asset, MarketHistoryPoint, MarketMood } from "@/lib/types"

interface MarketState {
  assets: Asset[]
  marketSentiment: number
  marketVolume: number
  marketMood: MarketMood
  marketHistory: MarketHistoryPoint[]

  // Methods
  initializeMarket: () => void
  updateMarketConditions: () => void
  updateAssetPrices: () => void
  updateMarketMood: () => void
  registerAsset: (name: string, initialPrice: number, volatility: number) => void
}

export const useMarketStore = create<MarketState>((set, get) => ({
  assets: [],
  marketSentiment: 0.0,
  marketVolume: 0.5,
  marketMood: "Idle",
  marketHistory: [],

  initializeMarket: () => {
    // Create default assets
    const defaultAssets = [
      { name: "STONES", price: 100.0, initialPrice: 100.0, volatility: 0.08, priceChange: 0 },
      { name: "Tatonka", price: 50.0, initialPrice: 50.0, volatility: 0.05, priceChange: 0 },
      { name: "Artifact", price: 200.0, initialPrice: 200.0, volatility: 0.12, priceChange: 0 },
      { name: "SaloonShare", price: 75.0, initialPrice: 75.0, volatility: 0.04, priceChange: 0 },
    ]

    // Initialize market history with current prices
    const historyPoint: MarketHistoryPoint = {
      timestamp: Date.now(),
    }

    defaultAssets.forEach((asset) => {
      historyPoint[asset.name] = asset.price
    })

    set({
      assets: defaultAssets,
      marketHistory: [historyPoint],
    })
  },

  updateMarketConditions: () => {
    const { assets } = get()
    const volatilityFactor = 0.05
    const trendStrength = 0.02

    // Update market sentiment
    set((state) => {
      const newSentiment = state.marketSentiment + (Math.random() * 2 - 1) * volatilityFactor
      const clampedSentiment = Math.max(-1.0, Math.min(1.0, newSentiment + newSentiment * trendStrength))

      // Update market volume based on absolute sentiment
      const newVolume = Math.min(1.0, 0.5 + Math.abs(clampedSentiment) * 0.5)

      return {
        marketSentiment: clampedSentiment,
        marketVolume: newVolume,
      }
    })

    // Update asset prices
    get().updateAssetPrices()

    // Update market mood
    get().updateMarketMood()

    // Update market history
    const historyPoint: MarketHistoryPoint = {
      timestamp: Date.now(),
    }

    assets.forEach((asset) => {
      historyPoint[asset.name] = asset.price
    })

    set((state) => ({
      marketHistory: [...state.marketHistory, historyPoint].slice(-50), // Keep last 50 points
    }))
  },

  updateAssetPrices: () => {
    const { assets, marketSentiment, marketVolume } = get()

    const updatedAssets = assets.map((asset) => {
      // Calculate price change based on asset volatility, market sentiment and volume
      const volatilityImpact = (Math.random() * 2 - 1) * asset.volatility
      const sentimentImpact = marketSentiment * asset.volatility * 0.5
      const volumeImpact = (marketVolume - 0.5) * asset.volatility * 0.3

      const priceChange = volatilityImpact + sentimentImpact + volumeImpact
      const newPrice = Math.max(0.01, asset.price * (1 + priceChange))

      // Calculate percentage change from initial price
      const percentChange = ((newPrice - asset.price) / asset.price) * 100

      return {
        ...asset,
        price: newPrice,
        priceChange: percentChange,
      }
    })

    set({ assets: updatedAssets })
  },

  updateMarketMood: () => {
    const { marketSentiment, marketVolume } = get()

    let newMood: MarketMood = "Idle"

    if (marketSentiment > 0.3 && marketVolume > 0.6) {
      newMood = "Bullish"
    } else if (marketSentiment < -0.3 && marketVolume > 0.6) {
      newMood = "Bearish"
    } else if (marketVolume > 0.7) {
      newMood = "Volatile"
    }

    set({ marketMood: newMood })
  },

  registerAsset: (name: string, initialPrice: number, volatility: number) => {
    const { assets } = get()

    // Check if asset already exists
    if (assets.some((asset) => asset.name === name)) {
      return
    }

    const newAsset: Asset = {
      name,
      price: initialPrice,
      initialPrice,
      volatility,
      priceChange: 0,
    }

    set({ assets: [...assets, newAsset] })
  },
}))
