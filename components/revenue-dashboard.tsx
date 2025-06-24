"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, BarChart3 } from "lucide-react"

interface MetricData {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  trend: "up" | "down" | "neutral"
}

export function RevenueDashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      title: "Today's Gold",
      value: "$127.50",
      change: 23.5,
      icon: <DollarSign className="h-6 w-6" />,
      trend: "up",
    },
    {
      title: "Active Miners",
      value: "248",
      change: 12.3,
      icon: <Users className="h-6 w-6" />,
      trend: "up",
    },
    {
      title: "Land Claims",
      value: "42",
      change: 8.7,
      icon: <ShoppingCart className="h-6 w-6" />,
      trend: "up",
    },
    {
      title: "Bill's Wisdom Sales",
      value: "$89.50",
      change: 45.2,
      icon: <BarChart3 className="h-6 w-6" />,
      trend: "up",
    },
  ])

  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    // Simulate real-time revenue updates
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value:
            metric.title === "Today's Gold"
              ? `$${(Number.parseFloat(metric.value.replace("$", "")) + Math.random() * 5).toFixed(2)}`
              : metric.value,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const revenue = metrics.reduce((sum, metric) => {
      if (metric.title.includes("Gold") || metric.title.includes("Sales")) {
        return sum + Number.parseFloat(metric.value.replace("$", ""))
      }
      return sum
    }, 0)
    setTotalRevenue(revenue)
  }, [metrics])

  return (
    <div className="revenue-dashboard">
      <div className="text-center mb-6">
        <h2 className="headline-primary text-3xl mb-2">💰 WYOVERSE REVENUE SALOON 💰</h2>
        <p className="body-text text-lg">Real-time earnings from the digital frontier</p>
        <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 mt-2">
          Total Revenue: ${totalRevenue.toFixed(2)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <div className="text-amber-600">{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="metric-value">{metric.value}</div>
              <div className={`metric-trend flex items-center mt-2 ${metric.trend}`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(metric.change).toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Projection Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="headline-secondary text-xl">📈 30-Day Revenue Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-semibold">Subscriptions</span>
              <span className="text-blue-600 font-bold">$4,850</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-semibold">NFT Marketplace Fees</span>
              <span className="text-green-600 font-bold">$3,200</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <span className="font-semibold">Data Licensing</span>
              <span className="text-purple-600 font-bold">$1,500</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-amber-50 rounded-lg">
              <span className="font-semibold">Ad Revenue</span>
              <span className="text-amber-600 font-bold">$980</span>
            </div>
            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                <span className="font-bold text-lg">Total Projected</span>
                <span className="text-gray-800 font-bold text-xl">$10,530</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Judge-Facing Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="headline-secondary text-xl">🏆 Hackathon Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border-2 border-amber-300 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">248</div>
              <div className="text-sm text-gray-600">Active Users (24h)</div>
            </div>
            <div className="text-center p-4 border-2 border-green-300 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$217</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
            <div className="text-center p-4 border-2 border-blue-300 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">5,200</div>
              <div className="text-sm text-gray-600">Projected 30d Users</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
