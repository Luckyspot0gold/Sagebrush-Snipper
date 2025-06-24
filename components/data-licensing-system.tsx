"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, TrendingUp, MapPin, Brain, Download, FileText, DollarSign } from "lucide-react"

interface DataProduct {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  icon: React.ReactNode
  sampleData: any
}

const dataProducts: DataProduct[] = [
  {
    id: "1",
    name: "Saloon Mood Index",
    description: "Real-time sentiment analysis across crypto/gaming communities",
    price: 150,
    features: [
      "Hourly sentiment updates",
      "Asset-specific mood tracking",
      "Social media integration",
      "Confidence scoring",
      "Historical data (30 days)",
    ],
    icon: <BarChart3 className="h-6 w-6" />,
    sampleData: {
      overall_sentiment: 0.72,
      btc_sentiment: 0.68,
      eth_sentiment: 0.75,
      confidence: 0.89,
    },
  },
  {
    id: "2",
    name: "Land Rush Heatmap",
    description: "NFT parcel demand visualization and valuation metrics",
    price: 200,
    features: [
      "Real-time demand tracking",
      "Price prediction models",
      "Location-based analytics",
      "Ownership patterns",
      "Investment opportunities",
    ],
    icon: <MapPin className="h-6 w-6" />,
    sampleData: {
      hot_zones: ["Crypto Canyon", "Digital Desert"],
      avg_price_change: "+15.3%",
      total_transactions: 1247,
    },
  },
  {
    id: "3",
    name: "Whiskey & Worry Report",
    description: "Proprietary market fear/greed indicators",
    price: 300,
    features: [
      "Fear/Greed index",
      "Market volatility predictions",
      "Risk assessment tools",
      "Portfolio optimization",
      "Weekly market outlook",
    ],
    icon: <TrendingUp className="h-6 w-6" />,
    sampleData: {
      fear_greed_index: 65,
      market_outlook: "Cautiously Optimistic",
      volatility_score: 0.42,
    },
  },
  {
    id: "4",
    name: "Frontier Fortune Insights",
    description: "Predictive analytics on emerging opportunities",
    price: 500,
    features: [
      "AI-powered predictions",
      "Emerging trend detection",
      "Investment recommendations",
      "Risk-adjusted returns",
      "Custom alerts",
    ],
    icon: <Brain className="h-6 w-6" />,
    sampleData: {
      top_opportunities: ["STONES", "TATONKA"],
      success_rate: "78%",
      avg_return: "+24.5%",
    },
  },
]

export function DataLicensingSystem() {
  const [selectedProduct, setSelectedProduct] = useState<DataProduct | null>(null)
  const [licenseForm, setLicenseForm] = useState({
    company: "",
    email: "",
    use_case: "",
    duration: "12",
  })

  const handleLicenseRequest = async (product: DataProduct) => {
    // Here you would integrate with your licensing system
    console.log("License request for:", product.name, licenseForm)
    alert(`License request submitted for ${product.name}! Bill will be in touch within 24 hours.`)
  }

  return (
    <div className="data-licensing p-6 bg-gradient-to-b from-slate-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-lg border-4 border-slate-700 shadow-lg">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">📊 WYOVERSE DATA LICENSING 📊</h1>
          <p className="text-lg font-serif text-slate-700">
            "Premium frontier intelligence for institutional partners"
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Badge className="bg-blue-600 text-white font-serif">
              <FileText className="h-4 w-4 mr-1" />
              Enterprise Grade
            </Badge>
            <Badge className="bg-green-600 text-white font-serif">
              <DollarSign className="h-4 w-4 mr-1" />
              Revenue Sharing Available
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="products" className="font-serif">
              Data Products
            </TabsTrigger>
            <TabsTrigger value="samples" className="font-serif">
              Sample Data
            </TabsTrigger>
            <TabsTrigger value="license" className="font-serif">
              License Agreement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataProducts.map((product) => (
                <Card key={product.id} className="border-4 border-slate-600 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-slate-100 to-gray-200 border-b-2 border-slate-600">
                    <div className="flex items-center gap-3">
                      {product.icon}
                      <div>
                        <CardTitle className="font-serif text-xl">{product.name}</CardTitle>
                        <CardDescription className="font-serif">{product.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-700">${product.price}</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-serif">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="font-serif" onClick={() => setSelectedProduct(product)}>
                        <Download className="h-4 w-4 mr-1" />
                        Sample Data
                      </Button>
                      <Button
                        className="bg-slate-700 hover:bg-slate-800 font-serif"
                        onClick={() => handleLicenseRequest(product)}
                      >
                        Request License
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="samples">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataProducts.map((product) => (
                <Card key={product.id} className="border-2 border-slate-400">
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      {product.icon}
                      {product.name} - Sample
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto">
                      {JSON.stringify(product.sampleData, null, 2)}
                    </pre>
                    <Button className="mt-4 w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Full Sample
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="license">
            <Card className="border-4 border-slate-600">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Data License Agreement</CardTitle>
                <CardDescription className="font-serif">
                  Complete this form to request a custom data licensing agreement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-serif font-medium mb-2">Company Name</label>
                    <Input
                      placeholder="Your Company Name"
                      value={licenseForm.company}
                      onChange={(e) => setLicenseForm({ ...licenseForm, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif font-medium mb-2">Contact Email</label>
                    <Input
                      type="email"
                      placeholder="contact@company.com"
                      value={licenseForm.email}
                      onChange={(e) => setLicenseForm({ ...licenseForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-serif font-medium mb-2">Use Case Description</label>
                  <Textarea
                    placeholder="Describe how you plan to use the data..."
                    rows={4}
                    value={licenseForm.use_case}
                    onChange={(e) => setLicenseForm({ ...licenseForm, use_case: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif font-medium mb-2">License Duration (months)</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={licenseForm.duration}
                    onChange={(e) => setLicenseForm({ ...licenseForm, duration: e.target.value })}
                  >
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="custom">Custom duration</option>
                  </select>
                </div>

                <div className="bg-amber-50 border border-amber-300 rounded p-4">
                  <h3 className="font-serif font-bold mb-2">License Terms Summary:</h3>
                  <ul className="text-sm space-y-1 font-serif">
                    <li>• Non-exclusive worldwide license</li>
                    <li>• API access with rate limiting</li>
                    <li>• Revenue sharing on profits generated</li>
                    <li>• 30-day termination notice</li>
                    <li>• Confidentiality and non-resale clauses</li>
                  </ul>
                </div>

                <Button
                  className="w-full bg-slate-700 hover:bg-slate-800 font-serif text-lg py-3"
                  onClick={() => handleLicenseRequest(selectedProduct || dataProducts[0])}
                >
                  Submit License Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
