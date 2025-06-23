"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  text: string
  timestamp: number
  type: "user" | "system"
}

export default function WebSocketDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("disconnected")
  const [inputValue, setInputValue] = useState("")
  const wsRef = useRef<WebSocket | null>(null)

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    setConnectionStatus("connecting")

    // Using a mock WebSocket server for demo
    // In production, replace with your actual WebSocket URL
    wsRef.current = new WebSocket("wss://echo.websocket.org/")

    wsRef.current.onopen = () => {
      setConnectionStatus("connected")
      addMessage("Connected to WebSocket server", "system")
    }

    wsRef.current.onmessage = (event) => {
      addMessage(`Echo: ${event.data}`, "system")
    }

    wsRef.current.onclose = () => {
      setConnectionStatus("disconnected")
      addMessage("Disconnected from server", "system")
    }

    wsRef.current.onerror = () => {
      setConnectionStatus("disconnected")
      addMessage("Connection error occurred", "system")
    }
  }

  const disconnect = () => {
    wsRef.current?.close()
  }

  const sendMessage = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN && inputValue.trim()) {
      wsRef.current.send(inputValue)
      addMessage(inputValue, "user")
      setInputValue("")
    }
  }

  const addMessage = (text: string, type: "user" | "system") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
      type,
    }
    setMessages((prev) => [...prev.slice(-9), newMessage]) // Keep last 10 messages
  }

  useEffect(() => {
    return () => {
      wsRef.current?.close()
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>{connectionStatus}</Badge>
        <div className="flex gap-2">
          <Button onClick={connect} disabled={connectionStatus === "connected"}>
            Connect
          </Button>
          <Button onClick={disconnect} disabled={connectionStatus === "disconnected"}>
            Disconnect
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet...</p>
        ) : (
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-2 rounded ${message.type === "user" ? "bg-blue-100 ml-8" : "bg-green-100 mr-8"}`}
              >
                <div className="text-sm font-medium">{message.type === "user" ? "You" : "System"}</div>
                <div>{message.text}</div>
                <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-md"
          disabled={connectionStatus !== "connected"}
        />
        <Button onClick={sendMessage} disabled={connectionStatus !== "connected"}>
          Send
        </Button>
      </div>
    </div>
  )
}
