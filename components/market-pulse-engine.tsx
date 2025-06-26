"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Zap, Target, AlertTriangle } from "lucide-react"

interface CommodityData {
  name: string
  price: number
  change: number
  volume: number
  playerImpact: number
  volatility: number
  pulse: number[]
  lastUpdate: number
}

interface PlayerInfluence {
  level: "Novice" | "Trader" | "Tycoon" | "Baron" | "Mogul"
  impactMultiplier: number
  totalTrades: number
  marketEvents: number
}

export function MarketPulseEngine() {
  const [commodities, setCommodities] = useState<Record<string, CommodityData>>({
    lumber: {
      name: "Wyoming Lumber",
      price: 847.5,
      change: 2.3,
      volume: 12500,
      playerImpact: 0.8,
      volatility: 0.15,
      pulse: [845, 847, 849, 847, 850, 847],
      lastUpdate: Date.now(),
    },
    grain: {
      name: "Prairie Grain",
      price: 234.75,
      change: -1.2,
      volume: 8900,
      playerImpact: 1.4,
      volatility: 0.25,
      pulse: [236, 235, 234, 235, 233, 235],
      lastUpdate: Date.now(),
    },
    gold: {
      name: "Digital Gold",
      price: 1847.25,
      change: 0.5,
      volume: 45600,
      playerImpact: 0.3,
      volatility: 0.08,
      pulse: [1845, 1846, 1847, 1848, 1847, 1847],
      lastUpdate: Date.now(),
    },
    stones: {
      name: "WyoVerse Stones",
      price: 12.45,
      change: 5.7,
      volume: 156000,
      playerImpact: 3.2,
      volatility: 0.35,
      pulse: [11.8, 12.1, 12.3, 12.4, 12.6, 12.5],
      lastUpdate: Date.now(),
    },
  })

  const [playerInfluence, setPlayerInfluence] = useState<PlayerInfluence>({
    level: "Tycoon",
    impactMultiplier: 2.5,
    totalTrades: 847,
    marketEvents: 12,
  })

  const [activeEvents, setActiveEvents] = useState<string[]>([
    "🔥 Lumber Shortage in Thunder Valley",
    "⚡ Stone Rush at Silver Creek",
  ])

  const pulseIntervalRef = useRef<NodeJS.Timeout>()

  // Real-time market pulse simulation
  useEffect(() => {
    pulseIntervalRef.current = setInterval(() => {
      setCommodities((prev) => {
        const updated = { ...prev }

        Object.keys(updated).forEach((key) => {
          const commodity = updated[key]

          // Generate realistic price movement
          const volatilityFactor = commodity.volatility * (Math.random() - 0.5) * 2
          const playerImpactFactor = commodity.playerImpact * 0.01
          const marketTrend = Math.sin(Date.now() / 10000) * 0.005

          const priceChange = commodity.price * (volatilityFactor + playerImpactFactor + marketTrend)
          const newPrice = Math.max(0.01, commodity.price + priceChange)

          // Update pulse array
          const newPulse = [...commodity.pulse.slice(1), newPrice]

          updated[key] = {
            ...commodity,
            price: newPrice,
            change:
              ((newPrice - commodity.pulse[commodity.pulse.length - 1]) / commodity.pulse[commodity.pulse.length - 1]) *
              100,
            pulse: newPulse,
            lastUpdate: Date.now(),
          }
        })

        return updated
      })
    }, 2000) // Update every 2 seconds

    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
      }
    }
  }, [])

  const executeTrade = (commodityKey: string, amount: number, type: "buy" | "sell") => {
    setCommodities((prev) => {
      const updated = { ...prev }
      const commodity = updated[commodityKey]

      // Calculate player impact based on influence level
      const baseImpact = (amount / 1000) * playerInfluence.impactMultiplier
      const priceImpact = type === "buy" ? baseImpact : -baseImpact

      updated[commodityKey] = {
        ...commodity,
        price: commodity.price * (1 + priceImpact / 100),
        playerImpact: commodity.playerImpact + Math.abs(priceImpact),
        volume: commodity.volume + amount,
      }

      return updated
    })

    // Update player influence
    setPlayerInfluence((prev) => ({
      ...prev,
      totalTrades: prev.totalTrades + 1,
      marketEvents: Math.random() > 0.9 ? prev.marketEvents + 1 : prev.marketEvents,
    }))

    // Trigger market events for large trades
    if (amount > 5000 && Math.random() > 0.7) {
      const eventMessages = [
        `🚨 Major ${type.toUpperCase()} order detected in ${commodities[commodityKey].name}!`,
        `⚡ Market volatility spike in ${commodities[commodityKey].name}!`,
        `🔥 Supply chain disruption affecting ${commodities[commodityKey].name}!`,
      ]

      setActiveEvents((prev) => [...prev.slice(-2), eventMessages[Math.floor(Math.random() * eventMessages.length)]])
    }
  }

  const getInfluenceColor = (level: string) => {
    switch (level) {
      case "Novice":
        return "bg-gray-500"
      case "Trader":
        return "bg-blue-500"
      case "Tycoon":
        return "bg-purple-500"
      case "Baron":
        return "bg-red-500"
      case "Mogul":
        return "bg-gold"
      default:
        return "bg-gray-500"
    }
  }

  const renderPulseChart = (pulse: number[], name: string) => {
    const max = Math.max(...pulse)
    const min = Math.min(...pulse)
    const range = max - min || 1

    return (
      <div className="h-16 flex items-end space-x-1">
        {pulse.map((value, index) => {
          const height = ((value - min) / range) * 100
          return (
            <div
              key={index}
              className="bg-blue-500 w-2 transition-all duration-300"
              style={{ height: `${Math.max(height, 5)}%` }}
              title={`${name}: $${value.toFixed(2)}`}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Market Events Ticker */}
      <Card className="border-4 border-black bg-red-50">
        <CardHeader>
          <CardTitle className="headline-secondary flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            LIVE MARKET EVENTS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activeEvents.map((event, index) => (
              <div key={index} className="bg-black text-yellow-400 p-2 rounded font-mono text-sm animate-pulse">
                {event}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Player Influence Dashboard */}
      <Card className="border-4 border-black bg-purple-50">
        <CardHeader>
          <CardTitle className="headline-secondary flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-600" />
            MARKET INFLUENCE STATUS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Badge className={`${getInfluenceColor(playerInfluence.level)} text-white text-lg px-4 py-2`}>
                {playerInfluence.level}
              </Badge>
              <p className="text-sm mt-1">Influence Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{playerInfluence.impactMultiplier}x</div>
              <p className="text-sm">Price Impact</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{playerInfluence.totalTrades}</div>
              <p className="text-sm">Total Trades</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{playerInfluence.marketEvents}</div>
              <p className="text-sm">Market Events</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Market Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(commodities).map(([key, commodity]) => (
          <Card key={key} className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary flex items-center justify-between">
                <span>{commodity.name}</span>
                <Badge className={commodity.change >= 0 ? "bg-green-500" : "bg-red-500"}>
                  {commodity.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {commodity.change.toFixed(2)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Price Display */}
                <div className="text-center">
                  <div className="text-3xl font-bold">${commodity.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Current Price</div>
                </div>

                {/* Pulse Chart */}
                <div className="border-2 border-gray-300 p-2 bg-gray-50">
                  <div className="text-xs text-center mb-2">Live Price Pulse</div>
                  {renderPulseChart(commodity.pulse, commodity.name)}
                </div>

                {/* Market Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Volume:</span>
                    <div className="font-bold">{commodity.volume.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Your Impact:</span>
                    <div className="font-bold text-purple-600">+{commodity.playerImpact.toFixed(1)}%</div>
                  </div>
                </div>

                {/* Trading Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => executeTrade(key, 1000, "buy")}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    BUY 1000
                  </Button>
                  <Button
                    onClick={() => executeTrade(key, 1000, "sell")}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    SELL 1000
                  </Button>
                </div>

                {/* Volatility Indicator */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Volatility</span>
                    <span>{(commodity.volatility * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={commodity.volatility * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Impact Visualization */}
      <Card className="border-4 border-black bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="headline-secondary text-center flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            YOUR MARKET DOMINANCE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-purple-600">
              {Object.values(commodities)
                .reduce((sum, c) => sum + c.playerImpact, 0)
                .toFixed(1)}
              %
            </div>
            <div className="text-lg">Total Market Impact</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {Object.entries(commodities).map(([key, commodity]) => (
                <div key={key} className="text-center p-3 bg-white border-2 border-purple-200 rounded">
                  <div className="text-xl font-bold text-purple-600">+{commodity.playerImpact.toFixed(1)}%</div>
                  <div className="text-sm">{commodity.name}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded">
              <p className="font-serif italic">
                "Your trading decisions are reshaping the entire frontier economy. Every transaction sends ripples
                through the market, affecting prices and opportunities for all pioneers!"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
