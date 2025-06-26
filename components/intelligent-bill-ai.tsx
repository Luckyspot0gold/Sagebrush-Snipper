"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function IntelligentBill() {
  const [reply, setReply] = useState<string | null>(null)

  function askBill() {
    setReply("Howdy partner! I'm Bill, your AI bartender. How can I help you today?")
  }

  return (
    <div className="space-y-4">
      <Button onClick={askBill}>Talk to Bill</Button>
      {reply && <p className="rounded-md border p-3">{reply}</p>}
    </div>
  )
}
