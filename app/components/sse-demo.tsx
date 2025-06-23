"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DataPoint {
  id: string
  value: number
  timestamp: number
}

export default function ServerSentEventsDemo() {
  const [data, setData] = useState<DataPoint[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [eventSource, setEventSource] = useState<EventSource | null>(null)

  const connect = () => {
    if (eventSource) return

    // Mock SSE endpoint - in production, replace with your actual SSE endpoint
    const es = new EventSource("/api/sse-demo")

    es.onopen = () => {
      setIsConnected(true)
    }

    es.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data)
        setData((prev) => [...prev.slice(-19), newData]) // Keep last 20 points
      } catch (error) {
        console.error("Error parsing SSE data:", error)
      }
    }

    es.onerror = () => {
      setIsConnected(false)
      es.close()
      setEventSource(null)
    }

    setEventSource(es)
  }

  const disconnect = () => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
      setIsConnected(false)
    }
  }

  useEffect(() => {
    return () => {
      eventSource?.close()
    }
  }, [eventSource])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Badge variant={isConnected ? "default" : "secondary"}>{isConnected ? "Connected" : "Disconnected"}</Badge>
        <div className="flex gap-2">
          <Button onClick={connect} disabled={isConnected}>
            Start Stream
          </Button>
          <Button onClick={disconnect} disabled={!isConnected}>
            Stop Stream
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
        {data.length === 0 ? (
          <p className="text-gray-500 text-center">No data received yet...</p>
        ) : (
          <div className="space-y-2">
            {data.map((point) => (
              <div key={point.id} className="flex justify-between items-center p-2 bg-white rounded border">
                <div className="font-mono text-lg">{point.value.toFixed(2)}</div>
                <div className="text-sm text-gray-500">{new Date(point.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          Latest value: <span className="font-bold">{data[data.length - 1]?.value.toFixed(2)}</span>
        </div>
      )}
    </div>
  )
}
