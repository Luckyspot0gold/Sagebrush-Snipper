"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, TrendingUp, Users, Database, Target } from "lucide-react"

interface RevenueStream {
  name: string
  amount: number
  growth: number
  color: string
}

interface AffiliateStats {
  totalCommissions: number
  activeReferrals: number
  conversionRate: number
  topPerformers: Array<{ name: string; earnings: number }>
}

export function BillRevenueDashboard() {
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>([
    { name: "Premium Subscriptions", amount: 12450, growth: 23.5, color: "#3b82f6" },
    { name: "Transaction Fees", amount: 8920, growth: 18.2, color: "#10b981" },
    { name: "Data Licensing", amount: 5680, growth: 45.8, color: "#f59e0b" },
    { name: "Affiliate Commissions", amount: 3240, growth: 12.1, color: "#8b5cf6" },
  ])

  const [affiliateStats, setAffiliateStats] = useState<AffiliateStats>({
    totalCommissions: 3240,
    activeReferrals: 156,
    conversionRate: 12.8,
    topPerformers: [
      { name: "CryptoMike", earnings: 450 },
      { name: "DiamondHands", earnings: 380 },
      { name: "MoonRider", earnings: 320 },
    ],
  })

  const [monthlyData] = useState([
    { month: "Jan", revenue: 15420, users: 1200, dataLicense: 2800 },
    { month: "Feb", revenue: 18650, users: 1450, dataLicense: 3200 },
    { month: "Mar", revenue: 22180, users: 1680, dataLicense: 4100 },
    { month: "Apr", revenue: 26340, users: 1920, dataLicense: 5200 },
    { month: "May", revenue: 30290, users: 2180, dataLicense: 5680 },
  ])

  const totalRevenue = revenueStreams.reduce((sum, stream) => sum + stream.amount, 0)

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="border-4 border-black shadow-lg mb-6">
        <CardHeader className="border-b-2 border-black bg-gradient-to-r from-green-100 to-emerald-100">
          <CardTitle className="text-3xl font-serif flex items-center gap-2">
            <DollarSign className="h-8 w-8 text-green-600" />
            Bill's Revenue Empire
            <DollarSign className="h-8 w-8 text-green-600" />
          </CardTitle>
          <CardDescription className="text-lg font-serif">
            "Money talks, but data whispers the real secrets, partner!"
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-2 border-green-300 bg-green-50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm font-serif">Total Monthly Revenue</div>
                <div className="text-xs text-green-600">+24.3% from last month</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-300 bg-blue-50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2,180</div>
                <div className="text-sm font-serif">Active Subscribers</div>
                <div className="text-xs text-blue-600">+18.5% growth</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-300 bg-yellow-50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">$5,680</div>
                <div className="text-sm font-serif">Data License Revenue</div>
                <div className="text-xs text-yellow-600">+45.8% growth</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-300 bg-purple-50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm font-serif">Affiliate Partners</div>
                <div className="text-xs text-purple-600">12.8% conversion</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="revenue" className="font-serif">
                <TrendingUp className="h-4 w-4 mr-2" />
                Revenue Streams
              </TabsTrigger>
              <TabsTrigger value="growth" className="font-serif">
                <Target className="h-4 w-4 mr-2" />
                Growth Analytics
              </TabsTrigger>
              <TabsTrigger value="affiliates" className="font-serif">
                <Users className="h-4 w-4 mr-2" />
                Affiliate Program
              </TabsTrigger>
              <TabsTrigger value="data" className="font-serif">
                <Database className="h-4 w-4 mr-2" />
                Data Monetization
              </TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-2 border-gray-300">
                  <CardHeader>
                    <CardTitle className="font-serif">Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {revenueStreams.map((stream, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-serif text-sm">{stream.name}</span>
                            <div className="text-right">
                              <div className="font-bold">${stream.amount.toLocaleString()}</div>
                              <div className={`text-xs ${stream.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                                +{stream.growth}%
                              </div>
                            </div>
                          </div>
                          <Progress value={(stream.amount / totalRevenue) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-300">
                  <CardHeader>
                    <CardTitle className="font-serif">Revenue Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={revenueStreams}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {revenueStreams.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="growth">
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="font-serif">Monthly Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Total Revenue" />
                      <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} name="Active Users" />
                      <Line
                        type="monotone"
                        dataKey="dataLicense"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        name="Data License"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="affiliates">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-2 border-purple-300 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="font-serif">Affiliate Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-serif">Total Commissions</span>
                        <span className="font-bold">${affiliateStats.totalCommissions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-serif">Active Referrals</span>
                        <span className="font-bold">{affiliateStats.activeReferrals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-serif">Conversion Rate</span>
                        <span className="font-bold">{affiliateStats.conversionRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-300 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="font-serif">Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {affiliateStats.topPerformers.map((performer, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{index + 1}</Badge>
                            <span className="font-serif">{performer.name}</span>
                          </div>
                          <span className="font-bold text-purple-600">${performer.earnings}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="data">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-2 border-yellow-300 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="font-serif">Data Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded border">
                        <div className="font-serif font-bold">Saloon Mood Index</div>
                        <div className="text-sm text-gray-600">Real-time crypto sentiment</div>
                        <div className="text-right font-bold text-yellow-600">$2,400/month</div>
                      </div>
                      <div className="p-3 bg-white rounded border">
                        <div className="font-serif font-bold">Land Rush Heatmap</div>
                        <div className="text-sm text-gray-600">NFT demand visualization</div>
                        <div className="text-right font-bold text-yellow-600">$1,800/month</div>
                      </div>
                      <div className="p-3 bg-white rounded border">
                        <div className="font-serif font-bold">Whiskey & Worry Report</div>
                        <div className="text-sm text-gray-600">Market fear/greed indicator</div>
                        <div className="text-right font-bold text-yellow-600">$1,480/month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-300 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="font-serif">API Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-serif">Monthly API Calls</span>
                          <span className="font-bold">847,230</span>
                        </div>
                        <Progress value={84.7} className="h-2" />
                        <div className="text-xs text-gray-600 mt-1">84.7% of limit</div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-serif">Revenue per Call</span>
                          <span className="font-bold">$0.0067</span>
                        </div>
                        <div className="text-xs text-gray-600">Average across all endpoints</div>
                      </div>
                      <div className="p-3 bg-white rounded border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">$5,680</div>
                          <div className="text-sm font-serif">Total API Revenue</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
