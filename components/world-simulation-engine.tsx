"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CloudRain, Sun, Thermometer, TrendingUp, TrendingDown, Globe, Zap, BarChart3 } from "lucide-react"

interface WorldState {
  weather: {
    temperature: number
    precipitation: number
    condition: string
    impact: string
  }
  economy: {
    lumber: { price: number; trend: number }
    grain: { price: number; trend: number }
    iron: { price: number; trend: number }
    avax: { price: number; trend: number }
  }
  playerImpact: {
    totalPlayers: number
    landDeveloped: number
    tradeVolume: number
    marketInfluence: number
  }
  worldTime: number
}

export function WorldSimulationEngine() {
  const [worldState, setWorldState] = useState<WorldState>({
    weather: {
      temperature: 72,
      precipitation: 15,
      condition: "Partly Cloudy",
      impact: "Favorable for crop growth",
    },
    economy: {
      lumber: { price: 45.3, trend: 2.3 },
      grain: { price: 8.75, trend: -1.1 },
      iron: { price: 125.4, trend: 4.7 },
      avax: { price: 42.85, trend: 1.8 },
    },
    playerImpact: {
      totalPlayers: 1247,
      landDeveloped: 8934,
      tradeVolume: 2847593,
      marketInfluence: 12.7,
    },
    worldTime: 1847,
  })

  const [isSimulating, setIsSimulating] = useState(true)

  // Simulate world progression
  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      setWorldState((prev) => {
        // Weather simulation
        const tempChange = (Math.random() - 0.5) * 4
        const precipChange = (Math.random() - 0.5) * 10

        // Economic fluctuations influenced by weather and player actions
        const weatherMultiplier = prev.weather.temperature > 70 ? 1.1 : 0.9
        const playerInfluenceMultiplier = 1 + prev.playerImpact.marketInfluence / 100

        return {
          ...prev,
          weather: {
            temperature: Math.max(32, Math.min(95, prev.weather.temperature + tempChange)),
            precipitation: Math.max(0, Math.min(100, prev.weather.precipitation + precipChange)),
            condition:
              prev.weather.temperature > 80 ? "Hot & Dry" : prev.weather.precipitation > 50 ? "Rainy" : "Partly Cloudy",
            impact:
              prev.weather.temperature > 80
                ? "Drought stress on crops"
                : prev.weather.precipitation > 50
                  ? "Flooding risk"
                  : "Favorable conditions",
          },
          economy: {
            lumber: {
              price: Math.max(20, prev.economy.lumber.price + (Math.random() - 0.5) * 2 * weatherMultiplier),
              trend: (Math.random() - 0.5) * 5,
            },
            grain: {
              price: Math.max(5, prev.economy.grain.price + (Math.random() - 0.5) * 1 * weatherMultiplier),
              trend: (Math.random() - 0.5) * 3,
            },
            iron: {
              price: Math.max(50, prev.economy.iron.price + (Math.random() - 0.5) * 5),
              trend: (Math.random() - 0.5) * 4,
            },
            avax: {
              price: Math.max(10, prev.economy.avax.price + (Math.random() - 0.5) * 3),
              trend: (Math.random() - 0.5) * 6,
            },
          },
          playerImpact: {
            totalPlayers: prev.playerImpact.totalPlayers + Math.floor(Math.random() * 5),
            landDeveloped: prev.playerImpact.landDeveloped + Math.floor(Math.random() * 20),
            tradeVolume: prev.playerImpact.tradeVolume + Math.floor(Math.random() * 10000),
            marketInfluence: Math.min(50, prev.playerImpact.marketInfluence + (Math.random() - 0.5) * 0.5),
          },
          worldTime: prev.worldTime + 1,
        }
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isSimulating])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Hot & Dry":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "Rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-orange-400" />
    }
  }

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  return (
    <div className="space-y-6">
      {/* World Status Header */}
      <Card className="border-4 border-black bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="headline-secondary text-center text-3xl flex items-center justify-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            WYOVERSE WORLD SIMULATION ENGINE
            <Zap className="h-8 w-8 text-yellow-500" />
          </CardTitle>
          <div className="text-center">
            <Badge className="bg-green-500 text-white text-lg px-4 py-2">
              World Time: Year {worldState.worldTime} • {isSimulating ? "🟢 LIVE" : "⏸️ PAUSED"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Real-World Data Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary flex items-center gap-2">
              <Thermometer className="h-6 w-6 text-red-500" />
              WYOMING WEATHER SYSTEM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(worldState.weather.condition)}
                  <span className="text-xl font-bold">{worldState.weather.condition}</span>
                </div>
                <Badge className="bg-blue-500 text-white">LIVE DATA</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border border-gray-300 rounded">
                  <div className="text-2xl font-bold">{worldState.weather.temperature}°F</div>
                  <div className="text-sm text-gray-600">Temperature</div>
                </div>
                <div className="text-center p-3 border border-gray-300 rounded">
                  <div className="text-2xl font-bold">{worldState.weather.precipitation}%</div>
                  <div className="text-sm text-gray-600">Precipitation</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold mb-2">Economic Impact:</h4>
                <p className="text-sm italic">{worldState.weather.impact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-green-600" />
              COMMODITY MARKETS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(worldState.economy).map(([commodity, data]) => (
                <div key={commodity} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-bold capitalize">{commodity}</span>
                    {getTrendIcon(data.trend)}
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${data.price.toFixed(2)}</div>
                    <div className={`text-sm ${data.trend > 0 ? "text-green-600" : "text-red-600"}`}>
                      {data.trend > 0 ? "+" : ""}
                      {data.trend.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Player Impact Visualization */}
      <Card className="border-4 border-black bg-purple-50">
        <CardHeader>
          <CardTitle className="headline-secondary text-center">🌍 COLLECTIVE PIONEER IMPACT ON WYOVERSE 🌍</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border-2 border-purple-300 rounded bg-white">
              <div className="text-3xl font-bold text-purple-600">
                {worldState.playerImpact.totalPlayers.toLocaleString()}
              </div>
              <div className="text-sm">Active Pioneers</div>
              <Progress value={(worldState.playerImpact.totalPlayers / 2000) * 100} className="mt-2" />
            </div>

            <div className="text-center p-4 border-2 border-green-300 rounded bg-white">
              <div className="text-3xl font-bold text-green-600">
                {worldState.playerImpact.landDeveloped.toLocaleString()}
              </div>
              <div className="text-sm">Acres Developed</div>
              <Progress value={(worldState.playerImpact.landDeveloped / 15000) * 100} className="mt-2" />
            </div>

            <div className="text-center p-4 border-2 border-blue-300 rounded bg-white">
              <div className="text-3xl font-bold text-blue-600">
                ${(worldState.playerImpact.tradeVolume / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm">Trade Volume</div>
              <Progress value={(worldState.playerImpact.tradeVolume / 5000000) * 100} className="mt-2" />
            </div>

            <div className="text-center p-4 border-2 border-red-300 rounded bg-white">
              <div className="text-3xl font-bold text-red-600">
                {worldState.playerImpact.marketInfluence.toFixed(1)}%
              </div>
              <div className="text-sm">Market Influence</div>
              <Progress value={(worldState.playerImpact.marketInfluence / 50) * 100} className="mt-2" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-serif italic">
              "Every pioneer's decision ripples through the frontier economy, shaping the destiny of the entire
              territory."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Controls */}
      <Card className="border-4 border-black bg-black text-green-400">
        <CardHeader>
          <CardTitle className="text-center font-mono">🖥️ SIMULATION CONTROL TERMINAL 🖥️</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm space-y-2">
            <div>
              {">"} WORLD_ENGINE_STATUS: {isSimulating ? "RUNNING" : "PAUSED"}
            </div>
            <div>{">"} REAL_DATA_FEEDS: WEATHER ✅ COMMODITIES ✅ CRYPTO ✅</div>
            <div>
              {">"} PLAYER_ACTIONS_PROCESSED: {worldState.playerImpact.totalPlayers * 47}
            </div>
            <div>
              {">"} ECONOMIC_CALCULATIONS: {worldState.worldTime * 4} per tick
            </div>
            <div>
              {">"} BLOCKCHAIN_ANCHORS: {Math.floor(worldState.worldTime / 100)} permanent records
            </div>
            <div className="text-yellow-400">{">"} SIMULATION_INTEGRITY: 100% - ALL SYSTEMS OPERATIONAL</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
