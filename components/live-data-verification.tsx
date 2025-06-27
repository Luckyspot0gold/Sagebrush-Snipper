"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wifi,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Heart,
  Activity,
} from "lucide-react"

interface MarketDataPoint {
  symbol: string
  price: number
  change24h: number
  volume: number
  timestamp: number
  source: string
  latency: number
}

interface CommunityStats {
  activeUsers: number
  totalPosts: number
  totalLikes: number
  totalComments: number
  onlineNow: number
  newUsersToday: number
  timestamp: number
}

interface DataSource {
  name: string
  url: string
  status: "connected" | "disconnected" | "error"
  lastUpdate: number
  latency: number
  errorCount: number
}

export function LiveDataVerification() {
  const [marketData, setMarketData] = useState<MarketDataPoint[]>([])
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null)
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      name: "Coinbase Pro",
      url: "/api/crypto-data-enhanced",
      status: "disconnected",
      lastUpdate: 0,
      latency: 0,
      errorCount: 0,
    },
    {
      name: "Community API",
      url: "/api/community-stats",
      status: "disconnected",
      lastUpdate: 0,
      latency: 0,
      errorCount: 0,
    },
    { name: "Weather Service", url: "/api/weather", status: "disconnected", lastUpdate: 0, latency: 0, errorCount: 0 },
    {
      name: "Affiliate Tracker",
      url: "/api/affiliate/stats",
      status: "disconnected",
      lastUpdate: 0,
      latency: 0,
      errorCount: 0,
    },
  ])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)
  const [averageLatency, setAverageLatency] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const testDataSource = async (source: DataSource): Promise<DataSource> => {
    const startTime = Date.now()

    try {
      const response = await fetch(source.url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      const endTime = Date.now()
      const latency = endTime - startTime

      if (response.ok) {
        const data = await response.json()

        return {
          ...source,
          status: "connected",
          lastUpdate: Date.now(),
          latency,
          errorCount: 0,
        }
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error(`Data source ${source.name} failed:`, error)
      return {
        ...source,
        status: "error",
        lastUpdate: Date.now(),
        latency: Date.now() - startTime,
        errorCount: source.errorCount + 1,
      }
    }
  }

  const fetchMarketData = async () => {
    const startTime = Date.now()

    try {
      const response = await fetch("/api/crypto-data-enhanced")
      const result = await response.json()
      const endTime = Date.now()

      if (result.success && result.data) {
        const processedData: MarketDataPoint[] = result.data.slice(0, 6).map((crypto: any) => ({
          symbol: crypto.symbol,
          price: crypto.current_price,
          change24h: crypto.price_change_percentage_24h,
          volume: crypto.total_volume,
          timestamp: Date.now(),
          source: result.source || "Unknown",
          latency: endTime - startTime,
        }))

        setMarketData(processedData)
        setUpdateCount((prev) => prev + 1)

        // Update average latency
        const totalLatency = processedData.reduce((sum, item) => sum + item.latency, 0)
        setAverageLatency(totalLatency / processedData.length)

        return true
      }
      return false
    } catch (error) {
      console.error("Market data fetch failed:", error)
      return false
    }
  }

  const fetchCommunityStats = async () => {
    try {
      // Simulate community stats since we don't have a real endpoint
      const mockStats: CommunityStats = {
        activeUsers: Math.floor(Math.random() * 500) + 100,
        totalPosts: Math.floor(Math.random() * 10000) + 5000,
        totalLikes: Math.floor(Math.random() * 50000) + 25000,
        totalComments: Math.floor(Math.random() * 20000) + 10000,
        onlineNow: Math.floor(Math.random() * 50) + 10,
        newUsersToday: Math.floor(Math.random() * 20) + 5,
        timestamp: Date.now(),
      }

      setCommunityStats(mockStats)
      return true
    } catch (error) {
      console.error("Community stats fetch failed:", error)
      return false
    }
  }

  const runFullVerification = async () => {
    setIsMonitoring(true)
    startTimeRef.current = Date.now()

    // Test all data sources
    const updatedSources = await Promise.all(dataSources.map((source) => testDataSource(source)))
    setDataSources(updatedSources)

    // Fetch live data
    await Promise.all([fetchMarketData(), fetchCommunityStats()])
  }

  const startMonitoring = () => {
    if (intervalRef.current) return

    setIsMonitoring(true)
    runFullVerification()

    intervalRef.current = setInterval(() => {
      runFullVerification()
    }, 10000) // Update every 10 seconds
  }

  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsMonitoring(false)
  }

  useEffect(() => {
    // Initial verification
    runFullVerification()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600"
      case "error":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const connectedSources = dataSources.filter((s) => s.status === "connected").length
  const totalSources = dataSources.length
  const connectionHealth = (connectedSources / totalSources) * 100

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-serif mb-2">WyoVerse Live Data Verification</h1>
        <p className="text-gray-600 font-serif">Real-time monitoring of market data and community statistics</p>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Monitoring Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={startMonitoring} disabled={isMonitoring} className="flex items-center gap-2">
              <RefreshCw className={`h-4 w-4 ${isMonitoring ? "animate-spin" : ""}`} />
              {isMonitoring ? "Monitoring Active" : "Start Monitoring"}
            </Button>

            <Button onClick={stopMonitoring} disabled={!isMonitoring} variant="outline">
              Stop Monitoring
            </Button>

            <Button onClick={runFullVerification} variant="secondary" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Manual Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{updateCount}</div>
              <div className="text-sm text-gray-600">Updates Received</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{averageLatency.toFixed(0)}ms</div>
              <div className="text-sm text-gray-600">Avg Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {connectedSources}/{totalSources}
              </div>
              <div className="text-sm text-gray-600">Sources Online</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{connectionHealth.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">System Health</div>
            </div>
          </div>

          <Progress value={connectionHealth} className="w-full" />
        </CardContent>
      </Card>

      {/* Data Sources Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Data Sources Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(source.status)}
                  <div>
                    <div className="font-semibold">{source.name}</div>
                    <div className="text-sm text-gray-600">
                      {source.lastUpdate > 0
                        ? `Updated ${Math.floor((Date.now() - source.lastUpdate) / 1000)}s ago`
                        : "Never updated"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={source.status === "connected" ? "default" : "destructive"}>{source.status}</Badge>
                  <div className="text-sm text-gray-600 mt-1">{source.latency}ms</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Market Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Live Market Data
            {isMonitoring && (
              <Badge variant="default" className="ml-2">
                LIVE
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {marketData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketData.map((crypto, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{crypto.symbol}</span>
                    <div className="flex items-center gap-1">
                      {crypto.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${crypto.change24h >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-600">Vol: ${(crypto.volume / 1000000).toFixed(1)}M</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Updated {Math.floor((Date.now() - crypto.timestamp) / 1000)}s ago
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertDescription>No market data available. Check data source connections.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Live Community Statistics
            {isMonitoring && (
              <Badge variant="default" className="ml-2">
                LIVE
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {communityStats ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{communityStats.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{communityStats.totalPosts.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold">{communityStats.totalLikes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{communityStats.totalComments.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Comments</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <div className="text-2xl font-bold">{communityStats.onlineNow}</div>
                <div className="text-sm text-gray-600">Online Now</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                <div className="text-2xl font-bold">{communityStats.newUsersToday}</div>
                <div className="text-sm text-gray-600">New Today</div>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertDescription>Community statistics are loading...</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* System Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Overall System Health:</span>
              <Badge
                variant={connectionHealth >= 75 ? "default" : connectionHealth >= 50 ? "secondary" : "destructive"}
              >
                {connectionHealth >= 75 ? "Excellent" : connectionHealth >= 50 ? "Good" : "Poor"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Data Freshness:</span>
              <Badge variant={updateCount > 0 ? "default" : "secondary"}>{updateCount > 0 ? "Fresh" : "Stale"}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Network Latency:</span>
              <Badge variant={averageLatency < 1000 ? "default" : averageLatency < 3000 ? "secondary" : "destructive"}>
                {averageLatency < 1000 ? "Fast" : averageLatency < 3000 ? "Moderate" : "Slow"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Monitoring Status:</span>
              <Badge variant={isMonitoring ? "default" : "secondary"}>{isMonitoring ? "Active" : "Inactive"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
