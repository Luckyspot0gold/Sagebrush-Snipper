"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wifi, WifiOff, RefreshCw, Thermometer, Wind } from 'lucide-react'

interface CryptoPrice {
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  volume24h: number
  marketCap: number
  last_updated: string
}

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  windDirection: string
  lastUpdated: string
}

export function RealTimeMarketWidget() {
  const [cryptoData, setCryptoData] = useState<CryptoPrice[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchCryptoData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/crypto-data-enhanced", {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      const result = await response.json()

      if (result.success) {
        setCryptoData(result.data)
        setIsOnline(true)
      } else {
        setCryptoData(result.data) // Fallback data
        setIsOnline(false)
      }
      setLastUpdate(new Date().toLocaleTimeString())
    } catch (error) {
      console.error("Failed to fetch crypto data:", error)
      setIsOnline(false)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("/api/weather", {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      const result = await response.json()

      if (result.success) {
        setWeatherData(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchCryptoData()
    fetchWeatherData()

    // Set up intervals for real-time updates
    const cryptoInterval = setInterval(fetchCryptoData, 30000) // 30 seconds
    const weatherInterval = setInterval(fetchWeatherData, 30000) // 30 seconds

    return () => {
      clearInterval(cryptoInterval)
      clearInterval(weatherInterval)
    }
  }, [])

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
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
      {weatherData && (
        <Card className="bg-gradient-to-br from-blue-50 to-sky-100 border-sky-200 border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-sky-800 flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              FRONTIER WEATHER
              <Badge variant="outline" className="text-xs bg-sky-100">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-sky-900">{weatherData.temperature}°F</div>
            <div className="text-sm font-medium text-sky-700">{weatherData.condition}</div>
            <div className="text-xs text-sky-600 mt-1">Perfect weather for crypto mining and digital prospecting</div>
            
            <div className="flex justify-between items-center mt-3 text-xs text-sky-700">
              <div className="flex items-center gap-1">
                <Wind className="h-3 w-3" />
                {weatherData.windSpeed} mph {weatherData.windDirection}
              </div>
              <div>💧 {weatherData.humidity}%</div>
            </div>

            <div className="text-xs mt-2 text-sky-600 text-center">
              Updated: {formatTime(weatherData.lastUpdated)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Market Report */}
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-amber-800 flex items-center gap-2">
            📊 MARKET REPORT
            <div className="flex items-center gap-1">
              {isOnline ? <Wifi className="h-3 w-3 text-green-600" /> : <WifiOff className="h-3 w-3 text-red-600" />}
              <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                {isOnline ? "🔴 Live" : "Offline"}
              </Badge>
              {isLoading && <RefreshCw className="h-3 w-3 animate-spin text-amber-600" />}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {cryptoData.slice(0, 4).map((crypto) => (
            <div key={crypto.symbol} className="flex items-center justify-between p-2 bg-white rounded border border-amber-200">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-amber-900 text-sm">{crypto.symbol}</span>
                <div className="flex items-center gap-1">
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs font-medium ${crypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatChange(crypto.price_change_percentage_24h)}
                  </span>
                </div>
              </div>
              <span className="font-bold text-amber-900 text-sm">{formatPrice(crypto.current_price)}</span>
            </div>
          ))}
          {lastUpdate && (
            <div className="text-xs text-amber-600 mt-2 pt-2 border-t border-amber-200 text-center">
              Last updated: {lastUpdate}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
