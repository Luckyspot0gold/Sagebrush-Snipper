"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Users, Gamepad2, Coins } from "lucide-react"

interface RevenueMetric {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
  color: string
}

export function RevenueDashboard() {
  const [metrics, setMetrics] = useState<RevenueMetric[]>([
    {
      title: "Today's Gold",
      value: "$217.50",
      change: 15.2,
      trend: "up",
      icon: <DollarSign className="h-6 w-6" />,
      color: "text-green-600",
    },
    {
      title: "Active Miners",
      value: "248",
      change: 8.7,
      trend: "up",
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-600",
    },
    {
      title: "Game Revenue",
      value: "$89.30",
      change: 23.1,
      trend: "up",
      icon: <Gamepad2 className="h-6 w-6" />,
      color: "text-purple-600",
    },
    {
      title: "NFT Sales",
      value: "$156.80",
      change: -2.4,
      trend: "down",
      icon: <Coins className="h-6 w-6" />,
      color: "text-orange-600",
    },
  ])

  const [totalRevenue, setTotalRevenue] = useState(217.5)
  const [projectedRevenue] = useState(10530) // 30-day projection

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value:
            metric.title === "Today's Gold"
              ? `$${(Number.parseFloat(metric.value.replace("$", "")) + Math.random() * 2).toFixed(2)}`
              : metric.value,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      )

      setTotalRevenue((prev) => prev + Math.random() * 0.5)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Main Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-2 border-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-serif font-medium">{metric.title}</CardTitle>
              <div className={metric.color}>{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-serif">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change.toFixed(1)}%
                </span>
                <span className="ml-1">from yesterday</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Progress */}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="font-serif">Monthly Revenue Progress</CardTitle>
          <CardDescription>Current: ${totalRevenue.toFixed(2)} / Target: $1,000</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(totalRevenue / 1000) * 100} className="w-full h-4" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Started: $0</span>
            <span>Target: $1,000</span>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle className="font-serif">Revenue Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif">Subscriptions</span>
                <Badge variant="outline">$89.50</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif">Game Fees</span>
                <Badge variant="outline">$67.20</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif">NFT Commissions</span>
                <Badge variant="outline">$42.80</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif">Advertising</span>
                <Badge variant="outline">$18.00</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle className="font-serif">30-Day Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif text-green-600 mb-2">
              ${projectedRevenue.toLocaleString()}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subscriptions:</span>
                <span>$4,850</span>
              </div>
              <div className="flex justify-between">
                <span>Gaming:</span>
                <span>$3,200</span>
              </div>
              <div className="flex justify-between">
                <span>NFTs:</span>
                <span>$1,500</span>
              </div>
              <div className="flex justify-between">
                <span>Other:</span>
                <span>$980</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="font-serif">Live Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-serif">
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <span>🎮 New player joined Crypto Clashers</span>
              <span className="text-green-600">+$2.50</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span>📰 Premium subscription activated</span>
              <span className="text-blue-600">+$9.99</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
              <span>🏇 Racing tournament entry</span>
              <span className="text-purple-600">+$5.00</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
              <span>💎 Land deed purchased</span>
              <span className="text-orange-600">+$15.00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
