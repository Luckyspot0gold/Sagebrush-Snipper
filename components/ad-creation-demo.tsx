"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, Target, TrendingUp, CheckCircle } from "lucide-react"
import { affiliateTracker } from "@/lib/affiliate-tracking"

interface AdSlot {
  id: string
  advertiser: string
  destinationUrl: string
  currentBid: number
  commissionRate: number
  position: string
  adContent: string
  status: "active" | "pending" | "rejected"
  createdAt: Date
}

export function AdCreationDemo() {
  const [newAd, setNewAd] = useState({
    advertiser: "",
    destinationUrl: "",
    currentBid: 0,
    commissionRate: 5,
    position: "sidebar",
    adContent: "",
  })

  const [createdAds, setCreatedAds] = useState<AdSlot[]>([
    {
      id: "ad_001",
      advertiser: "Frontier Trading Co.",
      destinationUrl: "https://frontier-trading.com",
      currentBid: 150,
      commissionRate: 8,
      position: "sidebar",
      adContent: "Premium frontier supplies! Boots, hats, and more!",
      status: "active",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "ad_002",
      advertiser: "Wyoming Gold Rush Tours",
      destinationUrl: "https://wyoming-tours.com",
      currentBid: 200,
      commissionRate: 12,
      position: "header",
      adContent: "Experience the gold rush! Historical tours available.",
      status: "active",
      createdAt: new Date("2024-01-10"),
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleCreateAd = async () => {
    if (!newAd.advertiser || !newAd.destinationUrl || newAd.currentBid <= 0) {
      alert("Please fill in all required fields!")
      return
    }

    setIsCreating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const adId = `ad_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const createdAd: AdSlot = {
      id: adId,
      advertiser: newAd.advertiser,
      destinationUrl: newAd.destinationUrl,
      currentBid: newAd.currentBid,
      commissionRate: newAd.commissionRate,
      position: newAd.position,
      adContent: newAd.adContent,
      status: "pending",
      createdAt: new Date(),
    }

    setCreatedAds([createdAd, ...createdAds])

    // Track in affiliate system
    affiliateTracker.addAdSlot({
      position: newAd.position as any,
      currentBid: newAd.currentBid,
      advertiser: newAd.advertiser,
      destinationUrl: newAd.destinationUrl,
      commissionRate: newAd.commissionRate / 100,
      isActive: false, // Pending approval
    })

    setIsCreating(false)
    setShowSuccess(true)

    // Reset form
    setNewAd({
      advertiser: "",
      destinationUrl: "",
      currentBid: 0,
      commissionRate: 5,
      position: "sidebar",
      adContent: "",
    })

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalRevenue = createdAds.reduce((sum, ad) => sum + ad.currentBid, 0)
  const activeAds = createdAds.filter((ad) => ad.status === "active").length

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold headline-primary">🎯 Ad Creation System Demo</h1>
        <p className="text-lg text-gray-600 mt-2">Create and manage your frontier advertising empire</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Success! Your ad has been created and is pending approval.</span>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ad Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground">From {createdAds.length} ad slots</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAds}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {createdAds.length > 0
                ? (createdAds.reduce((sum, ad) => sum + ad.commissionRate, 0) / createdAds.length).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Affiliate rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Ad Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl headline-secondary flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Create New Ad Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Advertiser Name *</label>
                <Input
                  value={newAd.advertiser}
                  onChange={(e) => setNewAd({ ...newAd, advertiser: e.target.value })}
                  placeholder="e.g., Frontier Trading Co."
                  className="frontier-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Destination URL *</label>
                <Input
                  value={newAd.destinationUrl}
                  onChange={(e) => setNewAd({ ...newAd, destinationUrl: e.target.value })}
                  placeholder="https://your-business.com"
                  className="frontier-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bid Amount ($) *</label>
                  <Input
                    type="number"
                    value={newAd.currentBid}
                    onChange={(e) => setNewAd({ ...newAd, currentBid: Number(e.target.value) })}
                    placeholder="100"
                    min="1"
                    className="frontier-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                  <Select
                    value={newAd.commissionRate.toString()}
                    onValueChange={(value) => setNewAd({ ...newAd, commissionRate: Number(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5% - Bronze Tier</SelectItem>
                      <SelectItem value="8">8% - Silver Tier</SelectItem>
                      <SelectItem value="12">12% - Gold Tier</SelectItem>
                      <SelectItem value="15">15% - Platinum Tier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ad Position</label>
                <Select value={newAd.position} onValueChange={(value) => setNewAd({ ...newAd, position: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sidebar">Sidebar (Wanted Poster)</SelectItem>
                    <SelectItem value="header">Header Banner</SelectItem>
                    <SelectItem value="footer">Footer Strip</SelectItem>
                    <SelectItem value="inline">Inline Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ad Content</label>
                <Textarea
                  value={newAd.adContent}
                  onChange={(e) => setNewAd({ ...newAd, adContent: e.target.value })}
                  placeholder="Write your frontier-style ad copy here..."
                  className="frontier-input"
                  rows={3}
                />
              </div>

              <Button onClick={handleCreateAd} disabled={isCreating} className="w-full frontier-button">
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Ad Slot...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Create Ad Slot
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Ads List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl headline-secondary">Existing Ad Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {createdAds.map((ad) => (
                <div key={ad.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{ad.advertiser}</h4>
                      <p className="text-sm text-gray-600">{ad.adContent || "No content provided"}</p>
                    </div>
                    <Badge className={getStatusColor(ad.status)}>{ad.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Bid:</span> ${ad.currentBid}
                    </div>
                    <div>
                      <span className="font-medium">Commission:</span> {ad.commissionRate}%
                    </div>
                    <div>
                      <span className="font-medium">Position:</span> {ad.position}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {ad.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 break-all">
                    <span className="font-medium">URL:</span> {ad.destinationUrl}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl headline-secondary">Ad Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="wanted-theme p-4 max-w-sm">
              <div className="wanted-header text-center mb-4">
                <h3 className="text-lg font-bold">FRONTIER BUSINESS</h3>
              </div>
              <div className="wanted-poster">
                <div className="bounty">${newAd.currentBid || 0}</div>
                <div className="text-center">
                  <h4 className="font-bold">{newAd.advertiser || "Your Business"}</h4>
                  <p className="text-sm mt-2">{newAd.adContent || "Your ad content will appear here..."}</p>
                  <Button className="mt-3 frontier-button text-xs">Visit Now</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
