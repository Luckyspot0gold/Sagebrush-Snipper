"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Asset, MarketHistoryPoint, MarketMood } from "@/lib/types"

interface MarketState {
  assets: Asset[]
  marketSentiment: number
  marketVolume: number
  marketMood: MarketMood
  marketHistory: MarketHistoryPoint[]
  isInitialized: boolean
  error: string | null

  // Methods
  initializeMarket: () => Promise<void>
  updateMarketConditions: () => void
  updateAssetPrices: () => void
  updateMarketMood: () => void
  registerAsset: (name: string, initialPrice: number, volatility: number) => void
  clearError: () => void
}

export const useMarketStore = create<MarketState>()(
  persist(
    (set, get) => ({
      assets: [],
      marketSentiment: 0.0,
      marketVolume: 0.5,
      marketMood: "Idle",
      marketHistory: [],
      isInitialized: false,
      error: null,

      clearError: () => set({ error: null }),

      initializeMarket: async () => {
        try {
          if (get().isInitialized) return

          // Create default assets with proper error handling
          const defaultAssets: Asset[] = [
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
            isInitialized: true,
            error: null,
          })
        } catch (error) {
          console.error("Failed to initialize market:", error)
          set({ error: "Failed to initialize market data" })
        }
      },

      updateMarketConditions: () => {
        try {
          const { assets, isInitialized } = get()

          if (!isInitialized) {
            console.warn("Market not initialized, skipping update")
            return
          }

          const volatilityFactor = 0.05
          const trendStrength = 0.02

          // Update market sentiment with bounds checking
          set((state) => {
            const newSentiment = state.marketSentiment + (Math.random() * 2 - 1) * volatilityFactor
            const clampedSentiment = Math.max(-1.0, Math.min(1.0, newSentiment + newSentiment * trendStrength))

            // Update market volume based on absolute sentiment
            const newVolume = Math.min(1.0, Math.max(0.1, 0.5 + Math.abs(clampedSentiment) * 0.5))

            return {
              marketSentiment: clampedSentiment,
              marketVolume: newVolume,
              error: null,
            }
          })

          // Update asset prices
          get().updateAssetPrices()

          // Update market mood
          get().updateMarketMood()

          // Update market history with error handling
          const historyPoint: MarketHistoryPoint = {
            timestamp: Date.now(),
          }

          assets.forEach((asset) => {
            if (asset && typeof asset.price === "number" && !isNaN(asset.price)) {
              historyPoint[asset.name] = asset.price
            }
          })

          set((state) => ({
            marketHistory: [...state.marketHistory, historyPoint].slice(-50), // Keep last 50 points
          }))
        } catch (error) {
          console.error("Failed to update market conditions:", error)
          set({ error: "Failed to update market conditions" })
        }
      },

      updateAssetPrices: () => {
        try {
          const { assets, marketSentiment, marketVolume } = get()

          if (!assets || assets.length === 0) {
            console.warn("No assets to update")
            return
          }

          const updatedAssets = assets.map((asset) => {
            if (!asset || typeof asset.price !== "number" || typeof asset.volatility !== "number") {
              console.warn("Invalid asset data:", asset)
              return asset
            }

            // Calculate price change based on asset volatility, market sentiment and volume
            const volatilityImpact = (Math.random() * 2 - 1) * asset.volatility
            const sentimentImpact = marketSentiment * asset.volatility * 0.5
            const volumeImpact = (marketVolume - 0.5) * asset.volatility * 0.3

            const priceChange = volatilityImpact + sentimentImpact + volumeImpact
            const newPrice = Math.max(0.01, asset.price * (1 + priceChange))

            // Calculate percentage change from previous price
            const percentChange = ((newPrice - asset.price) / asset.price) * 100

            return {
              ...asset,
              price: Number(newPrice.toFixed(2)),
              priceChange: Number(percentChange.toFixed(2)),
            }
          })

          set({ assets: updatedAssets })
        } catch (error) {
          console.error("Failed to update asset prices:", error)
          set({ error: "Failed to update asset prices" })
        }
      },

      updateMarketMood: () => {
        try {
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
        } catch (error) {
          console.error("Failed to update market mood:", error)
          set({ error: "Failed to update market mood" })
        }
      },

      registerAsset: (name: string, initialPrice: number, volatility: number) => {
        try {
          if (!name || typeof initialPrice !== "number" || typeof volatility !== "number") {
            throw new Error("Invalid asset parameters")
          }

          const { assets } = get()

          // Check if asset already exists
          if (assets.some((asset) => asset.name === name)) {
            console.warn(`Asset ${name} already exists`)
            return
          }

          const newAsset: Asset = {
            name,
            price: initialPrice,
            initialPrice,
            volatility: Math.max(0.01, Math.min(1.0, volatility)), // Clamp volatility
            priceChange: 0,
          }

          set({ assets: [...assets, newAsset] })
        } catch (error) {
          console.error("Failed to register asset:", error)
          set({ error: "Failed to register new asset" })
        }
      },
    }),
    {
      name: "wyoverse-market-store",
      partialize: (state) => ({
        assets: state.assets,
        marketHistory: state.marketHistory.slice(-20), // Only persist last 20 points
        isInitialized: state.isInitialized,
      }),
    },
  ),
)
