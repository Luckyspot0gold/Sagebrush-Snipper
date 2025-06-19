"use client"

import { useMarketStore } from "@/lib/stores/market-store"
import { Progress } from "@/components/ui/progress"

export function MarketSentiment() {
  const { marketSentiment } = useMarketStore()

  // Convert from -1.0 to 1.0 range to 0 to 100 range
  const sentimentPercentage = ((marketSentiment + 1) / 2) * 100

  // Determine color based on sentiment
  const getColor = () => {
    if (sentimentPercentage > 60) return "bg-green-500"
    if (sentimentPercentage < 40) return "bg-red-500"
    return "bg-yellow-500"
  }

  return (
    <div className="space-y-2">
      <div className="text-2xl font-bold">{sentimentPercentage.toFixed(0)}%</div>
      <Progress value={sentimentPercentage} className="h-2" indicatorClassName={getColor()} />
      <p className="text-xs text-muted-foreground">
        {sentimentPercentage > 60
          ? "Bullish sentiment"
          : sentimentPercentage < 40
            ? "Bearish sentiment"
            : "Neutral sentiment"}
      </p>
    </div>
  )
}
