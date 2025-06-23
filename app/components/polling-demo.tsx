"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface StockPrice {
  symbol: string
  price: number
  change: number
  timestamp: number
}

export default function PollingDemo() {
  const [stocks, setStocks] = useState<StockPrice[]>([])
  const [isPolling, setIsPolling] = useState(false)
  const [interval, setInterval] = useState(2000) // 2 seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const mockStocks = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]

  const fetchData = async () => {
    // Mock API call - replace with your actual API endpoint
    const mockData: StockPrice[] = mockStocks.map((symbol) => ({
      symbol,
      price: 100 + Math.random() * 200,
      change: (Math.random() - 0.5) * 10,
      timestamp: Date.now(),
    }))

    setStocks(mockData)
  }

  const startPolling = () => {
    if (intervalRef.current) return

    setIsPolling(true)
    fetchData() // Initial fetch

    intervalRef.current = setInterval(fetchData, interval)
  }

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPolling(false)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isPolling) {
      stopPolling()
      startPolling()
    }
  }, [interval])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <Badge variant={isPolling ? "default" : "secondary"}>{isPolling ? "Polling Active" : "Polling Stopped"}</Badge>

        <div className="flex gap-2">
          <Button onClick={startPolling} disabled={isPolling}>
            Start Polling
          </Button>
          <Button onClick={stopPolling} disabled={!isPolling}>
            Stop Polling
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Interval:</label>
          <select
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value={1000}>1s</option>
            <option value={2000}>2s</option>
            <option value={5000}>5s</option>
            <option value={10000}>10s</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        {stocks.length === 0 ? (
          <p className="text-gray-500 text-center">No data loaded yet...</p>
        ) : (
          <div className="grid gap-3">
            {stocks.map((stock) => (
              <div key={stock.symbol} className="flex justify-between items-center p-3 bg-white rounded border">
                <div className="font-bold text-lg">{stock.symbol}</div>
                <div className="text-right">
                  <div className="font-mono text-lg">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </div>
                </div>
                <div className="text-xs text-gray-500">{new Date(stock.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
