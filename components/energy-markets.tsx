"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Wind,
  Fuel,
  Mountain,
  Coins,
  ExternalLink,
  AlertTriangle,
  BookOpen,
  MapPin,
} from "lucide-react"

interface CryptoAsset {
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  category: string
  description: string
}

export function EnergyMarkets() {
  const [cryptoData, setCryptoData] = useState<CryptoAsset[]>([])
  const [loading, setLoading] = useState(true)

  // Natural Resource Cryptocurrencies (Top 500 coins)
  const naturalResourceCoins: CryptoAsset[] = [
    {
      symbol: "PAXG",
      name: "PAX Gold",
      price: 2045.67,
      change24h: 1.2,
      marketCap: 580000000,
      category: "Precious Metals",
      description: "Gold-backed cryptocurrency token",
    },
    {
      symbol: "XAUT",
      name: "Tether Gold",
      price: 2043.89,
      change24h: 0.8,
      marketCap: 520000000,
      category: "Precious Metals",
      description: "Physical gold-backed digital asset",
    },
    {
      symbol: "DGX",
      name: "DigixDAO",
      price: 67.45,
      change24h: -0.5,
      marketCap: 45000000,
      category: "Precious Metals",
      description: "Ethereum-based gold tokens",
    },
    {
      symbol: "SLVR",
      name: "SilverCoin",
      price: 24.78,
      change24h: 2.1,
      marketCap: 12000000,
      category: "Precious Metals",
      description: "Silver-backed digital currency",
    },
    {
      symbol: "OIL",
      name: "PetroDollar",
      price: 78.9,
      change24h: -1.8,
      marketCap: 890000000,
      category: "Energy",
      description: "Oil-backed cryptocurrency",
    },
    {
      symbol: "NATGAS",
      name: "Natural Gas Token",
      price: 3.45,
      change24h: 4.2,
      marketCap: 156000000,
      category: "Energy",
      description: "Natural gas commodity token",
    },
    {
      symbol: "COAL",
      name: "Carbon Credit Coin",
      price: 15.67,
      change24h: -2.3,
      marketCap: 78000000,
      category: "Energy",
      description: "Coal and carbon trading token",
    },
    {
      symbol: "URAN",
      name: "Uranium Token",
      price: 89.12,
      change24h: 3.7,
      marketCap: 234000000,
      category: "Nuclear",
      description: "Uranium commodity-backed token",
    },
    {
      symbol: "LITHIUM",
      name: "Lithium Coin",
      price: 156.78,
      change24h: 5.4,
      marketCap: 345000000,
      category: "Battery Metals",
      description: "Lithium mining and trading token",
    },
    {
      symbol: "COPPER",
      name: "Copper Token",
      price: 4.23,
      change24h: 1.9,
      marketCap: 167000000,
      category: "Industrial Metals",
      description: "Copper commodity token",
    },
  ]

  useEffect(() => {
    // Simulate loading crypto data
    const timer = setTimeout(() => {
      setCryptoData(naturalResourceCoins)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(1)}B`
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(1)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="border-4 border-black shadow-lg mb-6 newspaper-article">
          <CardHeader className="border-b-2 border-black bg-yellow-600 text-white">
            <CardTitle className="text-4xl font-serif headline-primary text-white flex items-center">
              <Zap className="mr-3 h-8 w-8" />
              WYOMING ENERGY & RESOURCE MARKETS
            </CardTitle>
            <CardDescription className="text-xl font-serif text-yellow-100">
              Powering the Digital Frontier • Natural Resources & Cryptocurrency Trading
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="crypto" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 border-2 border-black">
            <TabsTrigger value="crypto" className="font-serif">
              Resource Coins
            </TabsTrigger>
            <TabsTrigger value="energy" className="font-serif">
              Energy Data
            </TabsTrigger>
            <TabsTrigger value="research" className="font-serif">
              Research
            </TabsTrigger>
            <TabsTrigger value="geological" className="font-serif">
              Geological
            </TabsTrigger>
          </TabsList>

          {/* Natural Resource Cryptocurrencies */}
          <TabsContent value="crypto" className="space-y-6">
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black">
                <CardTitle className="text-2xl font-serif headline-secondary">
                  <Coins className="inline mr-2 h-6 w-6" />
                  Natural Resource Cryptocurrencies (Top 500)
                </CardTitle>
                <CardDescription className="font-serif">
                  Commodity-backed digital assets and resource trading tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 newspaper-article-inner">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cryptoData.map((coin, index) => (
                      <div
                        key={coin.symbol}
                        className="border-2 border-gray-300 rounded-lg p-4 hover:border-yellow-500 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                              <span className="font-bold text-white text-sm">{coin.symbol.slice(0, 3)}</span>
                            </div>
                            <div>
                              <h3 className="font-serif font-bold text-lg">{coin.name}</h3>
                              <p className="text-sm text-gray-600 font-serif">{coin.description}</p>
                              <Badge variant="outline" className="mt-1 border-black text-xs">
                                {coin.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-xl font-bold">{formatPrice(coin.price)}</div>
                            <div
                              className={`flex items-center ${coin.change24h >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {coin.change24h >= 0 ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              <span className="font-mono text-sm">
                                {coin.change24h >= 0 ? "+" : ""}
                                {coin.change24h.toFixed(2)}%
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 font-mono">
                              MCap: {formatMarketCap(coin.marketCap)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Energy Data */}
          <TabsContent value="energy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="text-xl font-serif headline-secondary">
                    <Wind className="inline mr-2 h-5 w-5" />
                    Wind Energy Production
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 newspaper-article-inner">
                  <img
                    src="/images/windmillwyoig.png"
                    alt="Wyoming Wind Farm Aerial View"
                    className="w-full h-48 object-cover border-2 border-black rounded mb-4"
                  />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-serif">Current Output</span>
                      <span className="font-mono font-bold">2,847 MW</span>
                    </div>
                    <Progress value={78} className="h-3 border border-black" />
                    <div className="text-sm font-serif text-gray-600">
                      Wyoming leads the nation in wind energy capacity per capita
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="text-xl font-serif headline-secondary">
                    <Fuel className="inline mr-2 h-5 w-5" />
                    Traditional Energy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 newspaper-article-inner">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-serif">Natural Gas</span>
                        <span className="font-mono">1,234 BCF</span>
                      </div>
                      <Progress value={65} className="h-2 border border-black" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-serif">Coal Production</span>
                        <span className="font-mono">276 MT</span>
                      </div>
                      <Progress value={45} className="h-2 border border-black" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-serif">Oil Production</span>
                        <span className="font-mono">87 MB/D</span>
                      </div>
                      <Progress value={52} className="h-2 border border-black" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Research & Education */}
          <TabsContent value="research" className="space-y-6">
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-green-100">
                <CardTitle className="text-2xl font-serif headline-primary text-green-800">
                  <BookOpen className="inline mr-2 h-6 w-6" />
                  SUSTAINABLE EXTRACTION RESEARCH INITIATIVE
                </CardTitle>
                <CardDescription className="font-serif text-green-600">
                  University Partnership for Earth-Friendly Resource Extraction
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 newspaper-article-inner">
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-serif font-bold text-green-800 mb-3">
                      🌱 FRACKING ALTERNATIVES RESEARCH PROGRAM
                    </h3>
                    <p className="font-serif text-lg leading-relaxed mb-4">
                      The University of Wyoming, in partnership with WyoVerse Research Institute, is launching a
                      groundbreaking program to develop earth-friendly alternatives to traditional hydraulic fracturing
                      methods.
                    </p>
                    <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded">
                      <h4 className="font-serif font-bold text-yellow-800 mb-2">
                        📚 COURSE OFFERING: "Sustainable Resource Extraction Technologies"
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-serif">
                        <div>
                          <strong>Course Topics:</strong>
                          <ul className="mt-2 space-y-1">
                            <li>• Microseismic monitoring techniques</li>
                            <li>• Biodegradable fracking fluids</li>
                            <li>• Reduced water consumption methods</li>
                            <li>• Air quality protection protocols</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Research Focus:</strong>
                          <ul className="mt-2 space-y-1">
                            <li>• Ecosystem impact reduction</li>
                            <li>• Groundwater protection systems</li>
                            <li>• Carbon capture integration</li>
                            <li>• Community health safeguards</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="border-green-200" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-2 border-green-300">
                      <CardContent className="p-4">
                        <h4 className="font-serif font-bold text-green-800 mb-2">Research Goals</h4>
                        <ul className="text-sm font-serif space-y-1">
                          <li>• 50% reduction in water usage</li>
                          <li>• 75% decrease in chemical additives</li>
                          <li>• Zero groundwater contamination</li>
                          <li>• Minimal surface disruption</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-300">
                      <CardContent className="p-4">
                        <h4 className="font-serif font-bold text-green-800 mb-2">Industry Partners</h4>
                        <ul className="text-sm font-serif space-y-1">
                          <li>• Clean Energy Consortium</li>
                          <li>• Environmental Protection Alliance</li>
                          <li>• Sustainable Mining Initiative</li>
                          <li>• Green Technology Institute</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-300">
                      <CardContent className="p-4">
                        <h4 className="font-serif font-bold text-green-800 mb-2">Expected Outcomes</h4>
                        <ul className="text-sm font-serif space-y-1">
                          <li>• Patent-pending technologies</li>
                          <li>• Industry implementation</li>
                          <li>• Job creation in green tech</li>
                          <li>• Environmental restoration</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-serif">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Apply for Research Program
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geological Monitoring */}
          <TabsContent value="geological" className="space-y-6">
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-orange-100">
                <CardTitle className="text-2xl font-serif headline-primary text-orange-800">
                  <Mountain className="inline mr-2 h-6 w-6" />
                  YELLOWSTONE GEOLOGICAL MONITORING
                </CardTitle>
                <CardDescription className="font-serif text-orange-600">
                  Advanced Seismic & Geothermal Activity Analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 newspaper-article-inner">
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-serif font-bold text-orange-800 mb-3">
                          🌋 OLD FAITHFUL PATTERN DISRUPTION ANALYSIS
                        </h3>
                        <p className="font-serif text-lg leading-relaxed mb-4">
                          For decades, Old Faithful geyser has been as predictable as a wound clock, erupting
                          approximately every 90 minutes with remarkable consistency. However, recent monitoring data
                          indicates significant changes in eruption patterns and increased geothermal activity.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border-2 border-orange-300 p-6 rounded">
                    <h4 className="font-serif font-bold text-orange-800 mb-4 text-lg">📊 RECENT OBSERVATIONAL DATA</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-serif font-bold text-orange-700 mb-2">Eruption Frequency Changes</h5>
                        <ul className="text-sm font-serif space-y-2">
                          <li>
                            • <strong>Historical Average:</strong> 90 minutes ± 10 minutes
                          </li>
                          <li>
                            • <strong>Current Range:</strong> 65-120 minutes (highly variable)
                          </li>
                          <li>
                            • <strong>Peak Activity:</strong> 15% increase in daily eruptions
                          </li>
                          <li>
                            • <strong>Duration Changes:</strong> 20% longer eruption times
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-serif font-bold text-orange-700 mb-2">Geothermal Indicators</h5>
                        <ul className="text-sm font-serif space-y-2">
                          <li>
                            • <strong>Water Temperature:</strong> 3°F increase detected
                          </li>
                          <li>
                            • <strong>Mineral Deposits:</strong> Accelerated formation
                          </li>
                          <li>
                            • <strong>Gas Emissions:</strong> 12% increase in CO₂ levels
                          </li>
                          <li>
                            • <strong>Ground Temperature:</strong> Elevated thermal readings
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-2 border-orange-300">
                      <CardHeader className="bg-orange-100 border-b-2 border-orange-300">
                        <CardTitle className="font-serif text-orange-800">
                          <MapPin className="inline mr-2 h-5 w-5" />
                          Tectonic Plate Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <p className="font-serif text-sm">
                            Advanced seismographic monitoring suggests potential correlations between increased geyser
                            activity and subtle tectonic movements in the greater Yellowstone region.
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-serif text-sm">West Coast Plate Stress</span>
                              <Badge variant="outline" className="border-orange-400 text-orange-700">
                                Elevated
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-serif text-sm">Midwest Stability Index</span>
                              <Badge variant="outline" className="border-yellow-400 text-yellow-700">
                                Monitoring
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-serif text-sm">Magma Chamber Pressure</span>
                              <Badge variant="outline" className="border-red-400 text-red-700">
                                Increased
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-300">
                      <CardHeader className="bg-orange-100 border-b-2 border-orange-300">
                        <CardTitle className="font-serif text-orange-800">Research Implications</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <p className="font-serif text-sm">
                            These observations present unique opportunities for advancing our understanding of
                            geothermal systems and their relationship to broader geological processes.
                          </p>
                          <div className="space-y-2 text-sm font-serif">
                            <div>• Enhanced predictive modeling capabilities</div>
                            <div>• Improved geothermal energy extraction methods</div>
                            <div>• Advanced early warning systems</div>
                            <div>• Climate change impact assessment</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded">
                    <h4 className="font-serif font-bold text-blue-800 mb-2">🔬 ONGOING RESEARCH INITIATIVES</h4>
                    <p className="font-serif text-sm mb-3">
                      WyoVerse Research Institute, in collaboration with the U.S. Geological Survey, is deploying
                      advanced monitoring equipment to better understand these phenomena and their potential
                      implications for regional geological stability.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-400 text-blue-700 bg-transparent">
                        View Live Data
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-400 text-blue-700 bg-transparent">
                        Research Papers
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default EnergyMarkets
