"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Target,
  TrendingUp,
  Users,
  MousePointer,
  PieChart,
  ArrowRight,
  Gavel,
  Eye,
  BarChart3,
} from "lucide-react"

interface Advertiser {
  id: string
  name: string
  email: string
  budget: number
  status: "pending" | "approved" | "active"
}

interface AdSlot {
  id: string
  position: string
  currentBid: number
  highestBidder: string
  bids: Bid[]
  status: "auction" | "active" | "completed"
  impressions: number
  clicks: number
}

interface Bid {
  advertiserId: string
  advertiserName: string
  amount: number
  timestamp: Date
}

interface Click {
  id: string
  adId: string
  advertiserId: string
  userId: string
  timestamp: Date
  commission: number
  revenue: number
}

interface RevenueShare {
  platform: number
  affiliate: number
  advertiser: string
  totalRevenue: number
}

export function AdFlowSystem() {
  // Step 1: Advertiser Management
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([
    { id: "adv_001", name: "Frontier Trading Co.", email: "contact@frontier.com", budget: 500, status: "active" },
    { id: "adv_002", name: "Wyoming Gold Tours", email: "info@wyomingtours.com", budget: 750, status: "active" },
    { id: "adv_003", name: "Saloon Supply Co.", email: "orders@saloonsupply.com", budget: 300, status: "pending" },
  ])

  // Step 2: Ad Slot Auctions
  const [adSlots, setAdSlots] = useState<AdSlot[]>([
    {
      id: "slot_001",
      position: "Sidebar Wanted Poster",
      currentBid: 150,
      highestBidder: "Frontier Trading Co.",
      bids: [
        { advertiserId: "adv_001", advertiserName: "Frontier Trading Co.", amount: 150, timestamp: new Date() },
        { advertiserId: "adv_002", advertiserName: "Wyoming Gold Tours", amount: 125, timestamp: new Date() },
      ],
      status: "auction",
      impressions: 0,
      clicks: 0,
    },
    {
      id: "slot_002",
      position: "Header Banner",
      currentBid: 200,
      highestBidder: "Wyoming Gold Tours",
      bids: [{ advertiserId: "adv_002", advertiserName: "Wyoming Gold Tours", amount: 200, timestamp: new Date() }],
      status: "active",
      impressions: 1250,
      clicks: 45,
    },
  ])

  // Step 3: Click Tracking
  const [clicks, setClicks] = useState<Click[]>([
    {
      id: "click_001",
      adId: "slot_002",
      advertiserId: "adv_002",
      userId: "user_123",
      timestamp: new Date(),
      commission: 16,
      revenue: 200,
    },
    {
      id: "click_002",
      adId: "slot_002",
      advertiserId: "adv_002",
      userId: "user_456",
      timestamp: new Date(),
      commission: 16,
      revenue: 200,
    },
  ])

  // Step 4: Revenue Sharing
  const [revenueShares, setRevenueShares] = useState<RevenueShare[]>([
    { platform: 60, affiliate: 140, advertiser: "Wyoming Gold Tours", totalRevenue: 200 },
    { platform: 45, affiliate: 105, advertiser: "Frontier Trading Co.", totalRevenue: 150 },
  ])

  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Simulate the complete flow
  const runCompleteFlow = async () => {
    setIsProcessing(true)

    // Step 1: Advertiser submits
    setCurrentStep(1)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 2: Admin processes
    setCurrentStep(2)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 3: Auction runs
    setCurrentStep(3)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 4: Frontend displays
    setCurrentStep(4)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 5: Click tracking
    setCurrentStep(5)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 6: Revenue share
    setCurrentStep(6)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsProcessing(false)
    setCurrentStep(1)
  }

  const placeBid = (slotId: string, advertiserId: string, amount: number) => {
    setAdSlots((slots) =>
      slots.map((slot) => {
        if (slot.id === slotId) {
          const advertiser = advertisers.find((a) => a.id === advertiserId)
          const newBid: Bid = {
            advertiserId,
            advertiserName: advertiser?.name || "Unknown",
            amount,
            timestamp: new Date(),
          }

          return {
            ...slot,
            bids: [...slot.bids, newBid],
            currentBid: Math.max(slot.currentBid, amount),
            highestBidder: amount > slot.currentBid ? advertiser?.name || "Unknown" : slot.highestBidder,
          }
        }
        return slot
      }),
    )
  }

  const simulateClick = (adId: string) => {
    const slot = adSlots.find((s) => s.id === adId)
    if (!slot) return

    const newClick: Click = {
      id: `click_${Date.now()}`,
      adId,
      advertiserId: slot.highestBidder,
      userId: `user_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      commission: slot.currentBid * 0.08, // 8% commission
      revenue: slot.currentBid,
    }

    setClicks((prev) => [newClick, ...prev])

    // Update slot stats
    setAdSlots((slots) =>
      slots.map((s) => (s.id === adId ? { ...s, clicks: s.clicks + 1, impressions: s.impressions + 1 } : s)),
    )

    // Update revenue share
    const platformShare = newClick.revenue * 0.3
    const affiliateShare = newClick.revenue * 0.7

    setRevenueShares((prev) => [
      {
        platform: platformShare,
        affiliate: affiliateShare,
        advertiser: slot.highestBidder,
        totalRevenue: newClick.revenue,
      },
      ...prev,
    ])
  }

  const totalRevenue = revenueShares.reduce((sum, share) => sum + share.totalRevenue, 0)
  const totalClicks = clicks.length
  const activeAds = adSlots.filter((slot) => slot.status === "active").length

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold headline-primary">🎯 Complete Ad Flow System</h1>
        <p className="text-lg text-gray-600 mt-2">From Advertiser to Revenue Share - Full Ecosystem</p>
      </div>

      {/* Flow Visualization */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Advertising Flow Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button onClick={runCompleteFlow} disabled={isProcessing} className="frontier-button">
              {isProcessing ? "Running Flow..." : "🚀 Run Complete Flow"}
            </Button>
            <div className="text-sm text-gray-600">Current Step: {currentStep}/6</div>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-4">
            {[
              { step: 1, label: "Advertiser", icon: Users },
              { step: 2, label: "Admin Dashboard", icon: Target },
              { step: 3, label: "Ad Auction", icon: Gavel },
              { step: 4, label: "Frontend Display", icon: Eye },
              { step: 5, label: "Click Tracking", icon: MousePointer },
              { step: 6, label: "Revenue Share", icon: PieChart },
            ].map(({ step, label, icon: Icon }, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex flex-col items-center p-3 rounded-lg border-2 min-w-[120px] ${
                    currentStep === step
                      ? "border-blue-500 bg-blue-50"
                      : currentStep > step
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 mb-2 ${
                      currentStep === step ? "text-blue-600" : currentStep > step ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <span className="text-xs font-medium text-center">{label}</span>
                </div>
                {index < 5 && <ArrowRight className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" />}
              </div>
            ))}
          </div>

          {isProcessing && <Progress value={(currentStep / 6) * 100} className="mt-4" />}
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+{totalClicks} clicks tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Advertisers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{advertisers.filter((a) => a.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Out of {advertisers.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAds}</div>
            <p className="text-xs text-muted-foreground">Currently displaying</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adSlots.reduce((sum, slot) => sum + slot.impressions, 0) > 0
                ? ((totalClicks / adSlots.reduce((sum, slot) => sum + slot.impressions, 0)) * 100).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Average CTR</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Flow Steps */}
      <Tabs defaultValue="advertisers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="advertisers">1. Advertisers</TabsTrigger>
          <TabsTrigger value="dashboard">2. Dashboard</TabsTrigger>
          <TabsTrigger value="auction">3. Auction</TabsTrigger>
          <TabsTrigger value="display">4. Display</TabsTrigger>
          <TabsTrigger value="tracking">5. Tracking</TabsTrigger>
          <TabsTrigger value="revenue">6. Revenue</TabsTrigger>
        </TabsList>

        {/* Step 1: Advertisers */}
        <TabsContent value="advertisers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Step 1: Advertiser Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advertisers.map((advertiser) => (
                  <div key={advertiser.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{advertiser.name}</h4>
                      <p className="text-sm text-gray-600">{advertiser.email}</p>
                      <p className="text-sm">Budget: ${advertiser.budget}</p>
                    </div>
                    <Badge
                      className={
                        advertiser.status === "active"
                          ? "bg-green-500"
                          : advertiser.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }
                    >
                      {advertiser.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Admin Dashboard */}
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Step 2: Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Pending Approvals</h4>
                  {advertisers
                    .filter((a) => a.status === "pending")
                    .map((advertiser) => (
                      <div key={advertiser.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                        <span>{advertiser.name}</span>
                        <div className="space-x-2">
                          <Button size="sm" className="text-xs">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">System Health</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Active Campaigns:</span>
                      <span className="font-medium">{activeAds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Clicks Today:</span>
                      <span className="font-medium">{totalClicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Today:</span>
                      <span className="font-medium">${totalRevenue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Ad Slot Auction */}
        <TabsContent value="auction">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gavel className="h-5 w-5 mr-2" />
                Step 3: Ad Slot Auction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adSlots.map((slot) => (
                  <div key={slot.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{slot.position}</h4>
                        <p className="text-sm text-gray-600">Current Bid: ${slot.currentBid}</p>
                        <p className="text-sm text-gray-600">Leader: {slot.highestBidder}</p>
                      </div>
                      <Badge
                        className={
                          slot.status === "auction"
                            ? "bg-blue-500"
                            : slot.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                        }
                      >
                        {slot.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Bid History:</h5>
                      {slot.bids.map((bid, index) => (
                        <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                          <span>{bid.advertiserName}</span>
                          <span className="font-medium">${bid.amount}</span>
                        </div>
                      ))}
                    </div>

                    {slot.status === "auction" && (
                      <div className="mt-3 flex gap-2">
                        <Input type="number" placeholder="Bid amount" className="flex-1" min={slot.currentBid + 1} />
                        <Button
                          size="sm"
                          onClick={() => placeBid(slot.id, "adv_003", slot.currentBid + 25)}
                          className="frontier-button"
                        >
                          Place Bid
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Frontend Display */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Step 4: Frontend Display
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Live Ad Slots</h4>
                  {adSlots
                    .filter((slot) => slot.status === "active")
                    .map((slot) => (
                      <div key={slot.id} className="wanted-theme p-4 mb-4 max-w-sm">
                        <div className="wanted-header text-center mb-2">
                          <h3 className="text-sm font-bold">FRONTIER BUSINESS</h3>
                        </div>
                        <div className="wanted-poster">
                          <div className="bounty">${slot.currentBid}</div>
                          <div className="text-center">
                            <h4 className="font-bold text-sm">{slot.highestBidder}</h4>
                            <p className="text-xs mt-1">Premium frontier services!</p>
                            <Button
                              size="sm"
                              className="mt-2 text-xs frontier-button"
                              onClick={() => simulateClick(slot.id)}
                            >
                              Visit Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    {adSlots
                      .filter((slot) => slot.status === "active")
                      .map((slot) => (
                        <div key={slot.id} className="p-3 border rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{slot.position}</span>
                            <Badge>{slot.highestBidder}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>Impressions: {slot.impressions}</div>
                            <div>Clicks: {slot.clicks}</div>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            CTR: {slot.impressions > 0 ? ((slot.clicks / slot.impressions) * 100).toFixed(2) : 0}%
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 5: Click Tracking */}
        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MousePointer className="h-5 w-5 mr-2" />
                Step 5: Click Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Recent Clicks</h4>
                  <Button size="sm" onClick={() => simulateClick("slot_002")} className="frontier-button">
                    Simulate Click
                  </Button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {clicks.map((click) => (
                    <div key={click.id} className="flex justify-between items-center p-3 border rounded text-sm">
                      <div>
                        <div className="font-medium">User: {click.userId}</div>
                        <div className="text-gray-600">Ad: {click.adId}</div>
                        <div className="text-gray-600">{click.timestamp.toLocaleTimeString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${click.revenue}</div>
                        <div className="text-green-600">+${click.commission} commission</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 6: Revenue Share */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Step 6: Revenue Share
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Revenue Distribution</h4>
                  <div className="space-y-3">
                    {revenueShares.map((share, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{share.advertiser}</span>
                          <span className="font-bold">${share.totalRevenue}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Platform (30%):</span>
                            <span className="text-blue-600">${share.platform}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Affiliate (70%):</span>
                            <span className="text-green-600">${share.affiliate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Total Summary</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-bold">${totalRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Share:</span>
                        <span className="text-blue-600 font-medium">
                          ${revenueShares.reduce((sum, share) => sum + share.platform, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Affiliate Share:</span>
                        <span className="text-green-600 font-medium">
                          ${revenueShares.reduce((sum, share) => sum + share.affiliate, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
