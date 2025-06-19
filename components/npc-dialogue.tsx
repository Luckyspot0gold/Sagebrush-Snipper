"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMarketStore } from "@/lib/stores/market-store"
import { useLLMDialogue } from "@/lib/hooks/use-llm-dialogue"

type Message = {
  id: string
  content: string
  sender: "user" | "npc"
  timestamp: Date
}

export function NPCDialogue() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Howdy partner! Welcome to the WyoVerse Saloon. What can I help you with today?",
      sender: "npc",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const { marketMood, marketSentiment, assets } = useMarketStore()
  const { getSmartResponse, isLoading } = useLLMDialogue()

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Generate context for the LLM
    const context = {
      marketMood,
      marketSentiment,
      assets: assets.map((a) => ({
        name: a.name,
        price: a.price,
        priceChange: a.priceChange,
      })),
    }

    // Get NPC response
    const response = await getSmartResponse(input, context)

    // Add NPC message
    const npcMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: "npc",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, npcMessage])
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      <div className="flex items-center gap-2 p-4 border-b">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bartender" />
          <AvatarFallback>BT</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Bartender Bill</p>
          <p className="text-xs text-muted-foreground">WyoVerse Saloon</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about market conditions, assets, or land..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
