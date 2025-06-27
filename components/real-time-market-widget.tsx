"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, RefreshCw, Wifi, WifiOff, Thermometer, Wind } from "lucide-react"

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  is_live: boolean
  last_updated: string
}

interface WeatherData {
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  location: string
  lastUpdated: string
}

export function RealTimeMarketWidget() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch crypto data
      const cryptoResponse = await fetch("/api/crypto-data-enhanced", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })

      if (cryptoResponse.ok) {
        const cryptoResult = await cryptoResponse.json()
        if (cryptoResult.success && cryptoResult.data.length > 0) {
          setCryptoData(cryptoResult.data.slice(0, 4)) // Show top 4
          setIsLive(cryptoResult.is_live)
          setLastUpdated(cryptoResult.timestamp)
        }
      }

      // Fetch weather data
      const weatherResponse = await fetch("/api/weather", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })

      if (weatherResponse.ok) {
        const weatherResult = await weatherResponse.json()
        if (weatherResult.success) {
          setWeatherData(weatherResult.data)
        }
      }
    } catch (error) {
      console.error("Failed to fetch real-time data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Update every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      {/* Weather Widget */}
      <Card className="border-2 border-black">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold flex items-center gap-1">
              <Thermometer className="h-4 w-4" />
              FRONTIER WEATHER
            </h4>
            <Button variant="ghost" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {weatherData ? (
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{weatherData.temperature}°F</div>
              <div className="text-sm font-medium">{weatherData.condition}</div>
              <div className="text-xs mt-1 text-gray-600">{weatherData.description}</div>

              <div className="flex justify-between items-center mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <Wind className="h-3 w-3" />
                  {weatherData.windSpeed} mph
                </div>
                <div>💧 {weatherData.humidity}%</div>
              </div>

              <div className="text-xs mt-2 text-gray-500">Updated: {formatTime(weatherData.lastUpdated)}</div>
            </div>
          ) : (
            <div className="text-center text-sm text-gray-500">Loading weather...</div>
          )}
        </CardContent>
      </Card>

      {/* Live Market Data */}
      <Card className="border-2 border-black">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold">LIVE MARKET REPORT</h4>
            <div className="flex items-center gap-2">
              {isLive ? (
                <>
                  <Wifi className="h-3 w-3 text-green-500" />
                  <Badge className="bg-green-500 text-white text-xs animate-pulse">🔴 LIVE</Badge>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-red-500" />
                  <Badge className="bg-red-500 text-white text-xs">OFFLINE</Badge>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {cryptoData.length > 0 ? (
              cryptoData.map((crypto) => (
                <div key={crypto.id} className="flex justify-between items-center p-2 bg-amber-50 rounded border">
                  <div>
                    <div className="font-medium">{crypto.name}</div>
                    <div className="text-gray-500">({crypto.symbol})</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatPrice(crypto.current_price)}</div>
                    <div
                      className={`flex items-center justify-end gap-1 text-xs ${
                        crypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {crypto.price_change_percentage_24h.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">Loading market data...</div>
            )}
          </div>

          {lastUpdated && (
            <div className="text-xs text-gray-500 mt-3 text-center border-t pt-2">
              Last updated: {formatTime(lastUpdated)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
