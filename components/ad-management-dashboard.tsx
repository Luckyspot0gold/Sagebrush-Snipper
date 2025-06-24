"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Users, Target } from "lucide-react"
import { affiliateTracker } from "@/lib/affiliate-tracking"
import { paymentSystem } from "@/lib/payment-integrations"

export function AdManagementDashboard() {
  const [newAd, setNewAd] = useState({
    advertiser: "",
    destinationUrl: "",
    currentBid: 0,
    commissionRate: 5,
  })

  const handleCreateAd = () => {
    const adId = affiliateTracker.addAdSlot({
      position: "sidebar",
      currentBid: newAd.currentBid,
      advertiser: newAd.advertiser,
      destinationUrl: newAd.destinationUrl,
      commissionRate: newAd.commissionRate / 100,
      isActive: true,
    })

    console.log("Created ad slot:", adId)

    // Reset form
    setNewAd({
      advertiser: "",
      destinationUrl: "",
      currentBid: 0,
      commissionRate: 5,
    })
  }

  const revenueShare = affiliateTracker.getRevenueShare(1000) // Example $1000
  const activeProviders = paymentSystem.getActiveProviders()
  const neededIntegrations = paymentSystem.getNeededIntegrations()

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold headline-primary">Ad Management Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Manage your frontier advertising empire</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Share (30%)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueShare.platform.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Platform commission</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affiliate Share (70%)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueShare.affiliate.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Affiliate earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Integrations Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl headline-secondary">Active Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeProviders.map((provider) => (
                <div key={provider.name} className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">{provider.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{(provider.commissionRate * 100).toFixed(1)}%</Badge>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl headline-secondary">Needed Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {neededIntegrations.map((integration) => (
                <div key={integration} className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">{integration}</span>
                  <Badge variant="outline">Pending</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Ad */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl headline-secondary">Create New Ad Slot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Advertiser Name</label>
              <Input
                value={newAd.advertiser}
                onChange={(e) => setNewAd({ ...newAd, advertiser: e.target.value })}
                placeholder="e.g., Frontier Trading Co."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Destination URL</label>
              <Input
                value={newAd.destinationUrl}
                onChange={(e) => setNewAd({ ...newAd, destinationUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current Bid ($)</label>
              <Input
                type="number"
                value={newAd.currentBid}
                onChange={(e) => setNewAd({ ...newAd, currentBid: Number(e.target.value) })}
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
              <Input
                type="number"
                min="5"
                max="15"
                value={newAd.commissionRate}
                onChange={(e) => setNewAd({ ...newAd, commissionRate: Number(e.target.value) })}
                placeholder="5"
              />
            </div>
          </div>
          <Button onClick={handleCreateAd} className="mt-4 frontier-button">
            Create Ad Slot
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
