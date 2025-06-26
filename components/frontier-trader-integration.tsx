"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { frontierTraderAPI } from "@/lib/frontier-trader-api"

export function FrontierTraderIntegration() {
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")
  const [portfolioData, setPortfolioData] = useState<any>(null)

  useEffect(() => {
    // Test connection to Frontier Trader API
    const testConnection = async () => {
      try {
        const portfolio = await frontierTraderAPI.getPortfolio()
        if (portfolio) {
          setPortfolioData(portfolio)
          setConnectionStatus("connected")
        } else {
          setConnectionStatus("error")
        }
      } catch (error) {
        setConnectionStatus("error")
      }
    }

    testConnection()
  }, [])

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  return (
    <Card className="border-4 border-black">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🔗 Frontier Trader Integration</span>
          <Badge className={getStatusColor()}>{connectionStatus.toUpperCase()}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {connectionStatus === "connected" && portfolioData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold">${portfolioData.totalBalance?.toFixed(2) || "0.00"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">24h P&L</p>
                <p
                  className={`text-2xl font-bold ${(portfolioData.dailyPnL || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ${portfolioData.dailyPnL?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
            <Button className="w-full">Open Frontier Trader Dashboard</Button>
          </div>
        ) : connectionStatus === "error" ? (
          <div className="text-center space-y-4">
            <p className="text-red-600">Failed to connect to Frontier Trader API</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-yellow-600">Connecting to Frontier Trader...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
