"use client"

import { useMarketStore } from "@/lib/stores/market-store"
import { Progress } from "@/components/ui/progress"

export function MarketVolume() {
  const { marketVolume } = useMarketStore()

  // Convert from 0.0 to 1.0 range to 0 to 100 range
  const volumePercentage = marketVolume * 100

  return (
    <div className="space-y-2">
      <div className="text-2xl font-bold">{volumePercentage.toFixed(0)}%</div>
      <Progress value={volumePercentage} className="h-2" />
      <p className="text-xs text-muted-foreground">
        {volumePercentage > 70
          ? "High trading volume"
          : volumePercentage < 30
            ? "Low trading volume"
            : "Moderate trading volume"}
      </p>
    </div>
  )
}
