"use client"

import { useMarketStore } from "@/lib/stores/market-store"
import type { Asset } from "@/lib/types"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface AssetListProps {
  showAll?: boolean
  limit?: number
}

export function AssetList({ showAll = false, limit }: AssetListProps) {
  const { assets } = useMarketStore()
  const { toast } = useToast()

  const handleBuy = (asset: Asset) => {
    toast({
      title: "Purchase Initiated",
      description: `You're buying ${asset.name} at $${asset.price.toFixed(2)}`,
    })
  }

  const handleSell = (asset: Asset) => {
    toast({
      title: "Sale Initiated",
      description: `You're selling ${asset.name} at $${asset.price.toFixed(2)}`,
    })
  }

  const displayAssets = limit ? assets.slice(0, limit) : assets

  return (
    <div className="space-y-4">
      {displayAssets.map((asset) => (
        <div key={asset.name} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              {asset.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{asset.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">${asset.price.toFixed(2)}</span>
                <span className={`text-xs ${asset.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {asset.priceChange >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(asset.priceChange).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleBuy(asset)}>
              Buy
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleSell(asset)}>
              Sell
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
