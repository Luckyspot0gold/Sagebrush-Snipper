"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetList } from "@/components/asset-list"
import { MarketChart } from "@/components/market-chart"
import { MarketVolume } from "@/components/market-volume"
import { MarketSentiment } from "@/components/market-sentiment"
import { useMarketStore } from "@/lib/stores/market-store"

export function MarketOverview() {
  const { initializeMarket, updateMarketConditions } = useMarketStore()

  useEffect(() => {
    initializeMarket()

    // Simulate market updates
    const interval = setInterval(() => {
      updateMarketConditions()
    }, 5000)

    return () => clearInterval(interval)
  }, [initializeMarket, updateMarketConditions])

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="assets">Assets</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketSentiment />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketVolume />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+0 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$425.00</div>
              <p className="text-xs text-muted-foreground">+5.2% since last week</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <MarketChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Assets</CardTitle>
              <CardDescription>Your WyoVerse asset portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <AssetList />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="assets" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>All Assets</CardTitle>
            <CardDescription>Complete list of available assets in WyoVerse</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetList showAll />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Market Analytics</CardTitle>
            <CardDescription>Advanced market metrics and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Advanced analytics coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
