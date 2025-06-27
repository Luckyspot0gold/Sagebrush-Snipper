"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Zap, TrendingUp, ExternalLink } from "lucide-react"
import Link from "next/link"

export function NewspaperFrontPage() {
  return (
    <div className="newspaper-bg min-h-screen">
      {/* Masthead */}
      <div className="border-b-4 border-black bg-red-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl font-serif font-bold headline-primary mb-2">THE WYOVERSE PIONEER</h1>
            <div className="flex justify-between items-center text-lg font-serif">
              <span>ESTABLISHED 2024</span>
              <span>DIGITAL FRONTIER EDITION</span>
              <span>PRICE: FREE</span>
            </div>
            <div className="text-center mt-2 text-xl">
              "All the News That's Fit to Mine" • {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Headlines Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Story */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black">
                <CardTitle className="text-3xl font-serif headline-primary">
                  🏆 CRYPTO CLASHERS CHAMPIONSHIP BEGINS
                </CardTitle>
                <div className="text-sm font-serif text-muted-foreground">By Bar Keep Bill • Sports Editor</div>
              </CardHeader>
              <CardContent className="p-6 newspaper-article-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <img
                      src="/images/crypto-clashers-fighter.png"
                      alt="Crypto Clashers Fighter"
                      className="w-full h-48 object-cover border-2 border-black"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-serif text-lg leading-relaxed">
                      The most anticipated digital boxing tournament of the year kicks off this week as fighters from
                      across the blockchain battle for supremacy in the ring.
                    </p>
                    <p className="font-serif">
                      Bitcoin Bull faces off against Ethereum Eagle in tonight's main event, with the winner advancing
                      to face the mysterious Dogecoin Desperado.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-black">
                        Boxing
                      </Badge>
                      <Badge variant="outline" className="border-black">
                        Crypto
                      </Badge>
                      <Badge variant="outline" className="border-black">
                        Gaming
                      </Badge>
                    </div>
                    <Link href="/boxing-arena">
                      <Button className="frontier-button">
                        Enter the Arena <Zap className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="text-xl font-serif headline-secondary">⚡ WIND ENERGY BOOM CONTINUES</CardTitle>
                </CardHeader>
                <CardContent className="p-4 newspaper-article-inner">
                  <img
                    src="/images/wind-energy-wyoming.png"
                    alt="Wyoming Wind Farm"
                    className="w-full h-32 object-cover border-2 border-black mb-3"
                  />
                  <p className="font-serif text-sm">
                    Wyoming's renewable energy sector shows record growth as new wind farms come online across the
                    state.
                  </p>
                  <Link href="/energy" className="text-blue-600 hover:underline font-serif text-sm">
                    Read More →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="text-xl font-serif headline-secondary">🎮 NEW GAMES PORTAL LAUNCHED</CardTitle>
                </CardHeader>
                <CardContent className="p-4 newspaper-article-inner">
                  <img
                    src="/images/crypto-classic.png"
                    alt="Gaming Portal"
                    className="w-full h-32 object-cover border-2 border-black mb-3"
                  />
                  <p className="font-serif text-sm">
                    Discover exciting new games including Crypto Classic and Digital Rodeo in our expanded gaming
                    section.
                  </p>
                  <Link href="/games" className="text-blue-600 hover:underline font-serif text-sm">
                    Play Now →
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Social Good Network Section */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-green-100">
                <CardTitle className="text-2xl font-serif headline-primary text-green-800">
                  🌍 SOCIAL GOOD NETWORK
                </CardTitle>
                <div className="text-sm font-serif text-green-600">Community Impact & Environmental Action</div>
              </CardHeader>
              <CardContent className="p-6 newspaper-article-inner">
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-serif font-bold text-lg text-green-800 mb-2">
                      🦅 HELP BIRDS THROUGH CLIMATE CHANGE
                    </h3>
                    <p className="font-serif text-sm mb-3">
                      Join the WyoVerse community in supporting bird conservation efforts. Climate change is affecting
                      migration patterns and habitats across our region.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm">Stand up for birds with @audubonsociety</span>
                      <a
                        href="https://act.audubon.org/a/jun-2025-a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:underline font-serif text-sm"
                      >
                        Take Action <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <Separator className="border-green-200" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-green-800 mb-2">Community Initiatives</h4>
                      <ul className="space-y-1 text-sm font-serif">
                        <li>• Wildlife habitat restoration</li>
                        <li>• Renewable energy advocacy</li>
                        <li>• Educational outreach programs</li>
                        <li>• Conservation partnerships</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-green-800 mb-2">Get Involved</h4>
                      <ul className="space-y-1 text-sm font-serif">
                        <li>• Join local conservation groups</li>
                        <li>• Participate in citizen science</li>
                        <li>• Support eco-friendly businesses</li>
                        <li>• Share awareness on social media</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Watch */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-yellow-100">
                <CardTitle className="text-xl font-serif headline-secondary">📈 MARKET WATCH</CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-sm">BTC/USD</span>
                    <span className="font-mono text-green-600">$45,230</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-sm">ETH/USD</span>
                    <span className="font-mono text-green-600">$2,890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-sm">CLASH Token</span>
                    <span className="font-mono text-blue-600">$0.45</span>
                  </div>
                  <Separator />
                  <Link href="/market" className="block">
                    <Button variant="outline" size="sm" className="w-full border-black bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Full Market
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black">
                <CardTitle className="text-xl font-serif headline-secondary">🗺️ EXPLORE WYOVERSE</CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/games">
                    <Button variant="outline" size="sm" className="w-full border-black text-xs bg-transparent">
                      🎮 Games
                    </Button>
                  </Link>
                  <Link href="/mining">
                    <Button variant="outline" size="sm" className="w-full border-black text-xs bg-transparent">
                      ⛏️ Mining
                    </Button>
                  </Link>
                  <Link href="/land-deeds">
                    <Button variant="outline" size="sm" className="w-full border-black text-xs bg-transparent">
                      🏞️ Land
                    </Button>
                  </Link>
                  <Link href="/store">
                    <Button variant="outline" size="sm" className="w-full border-black text-xs bg-transparent">
                      🛒 Store
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button variant="outline" size="sm" className="w-full border-black text-xs bg-transparent">
                      👥 Community
                    </Button>
                  </Link>
                  <Link href="/education">
                    <Button variant="outline" size="sm" className="w-full border-black text-xs bg-transparent">
                      📚 Learn
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Other Games Advertisement */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-purple-100">
                <CardTitle className="text-xl font-serif headline-secondary text-purple-800">
                  🎯 MORE GAMES ON GITHUB
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-3">
                  <div className="text-center">
                    <img
                      src="/images/crypto-classic-cover.png"
                      alt="Crypto Game"
                      className="w-full h-24 object-cover border-2 border-black mb-2"
                    />
                    <h3 className="font-serif font-bold text-purple-800">CRYPTO ADVENTURES</h3>
                    <p className="font-serif text-xs text-purple-600 mb-2">
                      Discover more exciting games from LuckyspotOgold
                    </p>
                  </div>
                  <a
                    href="https://github.com/LuckyspotOgold"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit GitHub
                    </Button>
                  </a>
                  <div className="text-xs font-serif text-center text-purple-600">
                    Check out our Crypto game and other projects!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Events */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black">
                <CardTitle className="text-xl font-serif headline-secondary">🌤️ FRONTIER FORECAST</CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-sm">Today</span>
                    <span className="font-serif text-sm">Sunny, 72°F</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-sm">Tomorrow</span>
                    <span className="font-serif text-sm">Partly Cloudy, 68°F</span>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-sm">Upcoming Events:</h4>
                    <div className="text-xs font-serif space-y-1">
                      <div>• Digital Rodeo - This Weekend</div>
                      <div>• Mining Competition - Next Week</div>
                      <div>• Community Meetup - Friday 7PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t-4 border-black pt-4">
          <div className="text-center font-serif text-sm text-muted-foreground">
            <p>The WyoVerse Pioneer • Digital Frontier's Most Trusted News Source</p>
            <p className="mt-1">"Bringing you the latest from the blockchain frontier since 2024"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewspaperFrontPage
