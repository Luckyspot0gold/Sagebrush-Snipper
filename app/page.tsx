"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import WebSocketDemo from "./components/websocket-demo"
import ServerSentEventsDemo from "./components/sse-demo"
import PollingDemo from "./components/polling-demo"

export default function RealTimeDataPage() {
  const [activeDemo, setActiveDemo] = useState<"websocket" | "sse" | "polling">("websocket")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Real-Time Data Updates</h1>
        <p className="text-gray-600">Choose a method to see real-time data in action</p>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant={activeDemo === "websocket" ? "default" : "outline"} onClick={() => setActiveDemo("websocket")}>
          WebSocket
        </Button>
        <Button variant={activeDemo === "sse" ? "default" : "outline"} onClick={() => setActiveDemo("sse")}>
          Server-Sent Events
        </Button>
        <Button variant={activeDemo === "polling" ? "default" : "outline"} onClick={() => setActiveDemo("polling")}>
          Polling
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeDemo === "websocket" && "WebSocket Real-Time Updates"}
            {activeDemo === "sse" && "Server-Sent Events"}
            {activeDemo === "polling" && "Polling Updates"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeDemo === "websocket" && <WebSocketDemo />}
          {activeDemo === "sse" && <ServerSentEventsDemo />}
          {activeDemo === "polling" && <PollingDemo />}
        </CardContent>
      </Card>
    </div>
  )
}
