"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RealTimeMarketWidget } from "./real-time-market-widget"
import { Heart, ExternalLink, Bird, Leaf } from "lucide-react"

export function NewspaperFrontPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Newspaper Header */}
            <div className="text-center border-b-4 border-amber-800 pb-4">
              <div className="text-xs mb-2 text-amber-700">ESTABLISHED 1880 • WYOMING TERRITORY</div>
              <h1 className="text-5xl font-bold text-amber-900 mb-2 font-serif newspaper-header">
                THE WYOVERSE PIONEER
              </h1>
              <div className="flex justify-between items-center text-sm text-amber-700">
                <span>VOL. 144, NO. 365</span>
                <span className="font-semibold">DIGITAL FRONTIER EDITION</span>
                <span>{currentDate}</span>
              </div>
            </div>

            {/* Lead Story */}
            <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-amber-900 font-serif">
                  STONE'S MECHANICAL BULL MASTERY SHOCKS CHEYENNE FRONTIER DAYS
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className="bg-red-600 text-white">BREAKING NEWS</Badge>
                  <Badge className="bg-blue-600 text-white">EXCLUSIVE</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src="/images/mechwolfClutch.jpeg"
                      alt="Stone in cyberpunk garage preparing for mechanical bull"
                      className="w-full h-64 object-cover rounded-lg border-2 border-amber-300 shadow-lg"
                    />
                    <p className="text-xs text-center mt-2 italic text-amber-700">
                      Stone prepares his ride in the neon-lit cyberpunk garage before conquering the mechanical bull
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-amber-800 leading-relaxed text-lg">
                      In a spectacular display of frontier grit meets modern technology, legendary rider Stone dominated
                      the mechanical bull competition at this year's Cheyenne Frontier Days celebration, setting a new
                      record with an 8-minute ride.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      The cyberpunk-themed garage provided the perfect backdrop for Stone's preparation, complete with
                      neon lighting and high-tech equipment that would make any frontier mechanic proud.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      "Never seen anything like it," said Marshal Bill, local barkeep and rodeo expert. "That boy's got
                      more balance than a Swiss timepiece and twice the determination of a Wyoming mustang."
                    </p>
                    <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
                      <p className="text-sm text-amber-800 font-semibold">
                        🏆 NEW RECORD: 8 minutes, 47 seconds - Previous record: 3 minutes, 12 seconds
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 newspaper-column text-sm text-amber-800 leading-relaxed">
                  <p>
                    The mechanical bull challenge has become a centerpiece of the modern Cheyenne Frontier Days,
                    blending traditional rodeo skills with cutting-edge technology. Stone's performance drew cheers from
                    thousands of spectators who witnessed his record-breaking ride that lasted nearly nine minutes.
                  </p>

                  <p>
                    The cyberpunk garage where Stone prepared has become a symbol of the new frontier - where
                    traditional Western values meet futuristic innovation. The neon-lit workspace features
                    state-of-the-art tools and equipment that help modern cowboys maintain their edge in an increasingly
                    digital world.
                  </p>

                  <p>
                    Event organizers report this was the largest crowd ever assembled for the mechanical bull
                    competition, with visitors traveling from across the digital frontier to witness the spectacle. The
                    combination of traditional rodeo skills and modern technology continues to draw new audiences to
                    frontier events, bridging generations of Western heritage.
                  </p>

                  <p>
                    Stone's victory adds another chapter to the growing legend of WyoVerse champions who bridge the gap
                    between the old West and the digital age. His preparation in the cyberpunk garage has inspired a new
                    generation of frontier riders to embrace both tradition and innovation, proving that the spirit of
                    the frontier lives on in the digital realm.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Stories */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bear Boxing Story */}
              <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-amber-900 font-serif">
                    EPIC BEAR BOXING MATCH DRAWS RECORD CROWD
                  </CardTitle>
                  <Badge className="w-fit bg-green-600 text-white">SPORTS</Badge>
                </CardHeader>
                <CardContent>
                  <img
                    src="/images/bears-boxing-arena-crowd.jpeg"
                    alt="Two bears boxing in arena with massive crowd"
                    className="w-full h-48 object-cover rounded-lg border border-amber-300 mb-3"
                  />
                  <p className="text-sm text-amber-800 leading-relaxed">
                    The Crypto Clashers Boxing Arena witnessed its largest crowd ever as two heavyweight bears faced off
                    in an epic showdown. The match, sponsored by LuckyspotOgold Games, showcased the future of
                    blockchain-powered entertainment with real-time market integration.
                  </p>
                  <div className="mt-3 p-2 bg-green-100 rounded border border-green-300">
                    <p className="text-xs text-green-800 font-semibold">
                      🥊 Next Fight: Wolf vs Tiger - Saturday 8PM MST
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Celtic Wolf Mandala */}
              <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-100">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-purple-900 font-serif">
                    CELTIC WOLF MANDALA BREAKS AUCTION RECORDS
                  </CardTitle>
                  <Badge className="w-fit bg-purple-600 text-white">ART</Badge>
                </CardHeader>
                <CardContent>
                  <img
                    src="/images/wolfirishscotishposter.png"
                    alt="Celtic Wolf Mandala"
                    className="w-full h-48 object-cover rounded-lg border border-purple-300 mb-3"
                  />
                  <p className="text-sm text-purple-800 leading-relaxed">
                    The legendary Celtic Wolf Mandala discovered in the digital mines has shattered all previous auction
                    records, selling for 2.5 AVAX to a private collector from the Venice AI district. The intricate
                    artwork features golden scrollwork and mystical symbols.
                  </p>
                  <div className="mt-3 p-2 bg-purple-100 rounded border border-purple-300">
                    <p className="text-xs text-purple-800 font-semibold">💎 Final Bid: 2.5 AVAX (~$80 USD)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conservation & Environmental Section */}
            <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-800 font-serif flex items-center gap-2">
                  <Bird className="h-6 w-6" />
                  FRONTIER CONSERVATION INITIATIVE
                  <Badge className="bg-green-600 text-white">URGENT</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-white p-4 rounded-lg border border-green-300 mb-4">
                      <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        Help Birds Through Climate Change
                      </h3>
                      <p className="text-sm text-green-700 mb-3">
                        The Wyoming frontier has always been home to magnificent bird species. Now, climate change
                        threatens their survival. Join the WyoVerse community in supporting bird conservation efforts.
                      </p>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        onClick={() => window.open("https://act.audubon.org/a/jun-2025-a", "_blank")}
                      >
                        <Bird className="h-4 w-4" />
                        Stand Up for Birds w/ @audubonsociety
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-300">
                      <h4 className="font-semibold text-blue-800 mb-2">Wyoming Bird Species at Risk:</h4>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>🦅 Greater Sage-Grouse</li>
                        <li>🦆 Trumpeter Swan</li>
                        <li>🦅 Bald Eagle</li>
                        <li>🐦 Mountain Plover</li>
                        <li>🦅 Ferruginous Hawk</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <img
                      src="/placeholder.svg?height=200&width=300&text=Wyoming+Birds"
                      alt="Wyoming birds in natural habitat"
                      className="w-full h-48 object-cover rounded-lg border border-green-300 mb-3"
                    />
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-300">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-1">
                        <Leaf className="h-4 w-4" />
                        WyoVerse Conservation Pledge:
                      </h4>
                      <p className="text-xs text-yellow-700">
                        For every NFT minted and every game played, WyoVerse donates to bird conservation efforts. Our
                        digital frontier supports the real frontier's wildlife.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-green-700 font-medium">
                    🌍 Together, we can preserve Wyoming's natural heritage for future generations
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Games & Entertainment Section */}
            <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-800 font-serif flex items-center gap-2">
                  🎮 GAMES & ENTERTAINMENT
                  <Badge className="bg-blue-600 text-white">LuckyspotOgold</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-white p-4 rounded-lg border border-blue-300">
                    <img
                      src="/images/cryptoclasherboxingposter.jpg"
                      alt="Crypto Clashers Boxing"
                      className="w-full h-32 object-cover rounded-lg border border-blue-300 mb-2"
                    />
                    <h4 className="font-semibold text-blue-800">CRYPTO CLASHERS BOXING</h4>
                    <p className="text-xs text-blue-700 mb-2">Epic bull vs bear combat with arms & gloves!</p>
                    <Badge className="bg-red-500 text-white text-xs">NEW: ARM SYSTEM</Badge>
                  </div>
                  <div className="text-center bg-white p-4 rounded-lg border border-blue-300">
                    <img
                      src="/images/cryptoclasherwcarsposter.jpg"
                      alt="Racing Circuit"
                      className="w-full h-32 object-cover rounded-lg border border-blue-300 mb-2"
                    />
                    <h4 className="font-semibold text-blue-800">RACING CIRCUIT</h4>
                    <p className="text-xs text-blue-700 mb-2">High-speed blockchain racing!</p>
                    <Badge className="bg-green-500 text-white text-xs">LIVE NOW</Badge>
                  </div>
                  <div className="text-center bg-white p-4 rounded-lg border border-blue-300">
                    <img
                      src="/images/clutchonhorse.webp"
                      alt="Clutch Chronicles"
                      className="w-full h-32 object-cover rounded-lg border border-blue-300 mb-2"
                    />
                    <h4 className="font-semibold text-blue-800">CLUTCH CHRONICLES</h4>
                    <p className="text-xs text-blue-700 mb-2">Cyberpunk frontier adventures!</p>
                    <Badge className="bg-purple-500 text-white text-xs">UPDATED</Badge>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open("https://github.com/LuckyspotOgold", "_blank")}
                  >
                    🎮 Play All Games at LuckyspotOgold@github
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Good Network */}
            <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-800 font-serif flex items-center gap-2">
                  💚 SOCIAL GOOD NETWORK
                  <Badge className="bg-purple-600 text-white">Active</Badge>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">SocialGood.inc</h4>
                    <p className="text-xs text-purple-700 mb-2">Shop & donate automatically</p>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                      onClick={() =>
                        window.open(
                          "https://go.socialgood.inc/?adj_redirect=https%3A%2F%2Fsocialgood.inc%2Fapp%2F1%2F&adj_t=1gbx67rh&adj_deeplink_js=1&referralCode=SVJDQ6",
                          "_blank",
                        )
                      }
                    >
                      Join SVJDQ6
                    </Button>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">DeSo Blockchain</h4>
                    <p className="text-xs text-purple-700 mb-2">Decentralized social platform</p>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                      onClick={() => window.open("https://docs.deso.org/", "_blank")}
                    >
                      Connect
                    </Button>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Temu Network</h4>
                    <p className="text-xs text-purple-700 mb-2">Shop with codes: frp288931</p>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                      onClick={() => window.open("https://temu.to/m/u7wq0kfazcq", "_blank")}
                    >
                      Shop Now
                    </Button>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center justify-center gap-1">
                      <Bird className="h-4 w-4" />
                      Audubon Society
                    </h4>
                    <p className="text-xs text-purple-700 mb-2">Help birds through climate change</p>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white w-full"
                      onClick={() => window.open("https://act.audubon.org/a/jun-2025-a", "_blank")}
                    >
                      Save Birds
                    </Button>
                  </div>
                </div>
                <div className="text-center mt-4 text-sm text-purple-700">
                  <div className="flex justify-center items-center gap-6 flex-wrap">
                    <span>💚 $3,247 donated today</span>
                    <span>🌍 1,834 lives impacted</span>
                    <span>🐦 247 birds protected</span>
                    <span>🤝 5% of every click helps</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aerial Frontier Days */}
            <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-amber-900 font-serif">
                  AERIAL PHOTOGRAPHY CAPTURES FRONTIER DAYS SPECTACLE
                </CardTitle>
                <Badge className="w-fit bg-amber-600 text-white">PHOTOGRAPHY</Badge>
              </CardHeader>
              <CardContent>
                <img
                  src="/images/arialcheyennerodeo.png"
                  alt="Aerial view of Cheyenne Frontier Days"
                  className="w-full h-64 object-cover rounded-lg border border-amber-300 mb-4"
                />
                <p className="text-amber-800 leading-relaxed">
                  Stunning aerial photography captured the essence of Cheyenne Frontier Days, showing thousands of
                  digital pioneers gathering to celebrate Wyoming's rich heritage in the metaverse. The event featured
                  traditional rodeo competitions, mechanical bull challenges, and cutting-edge technology
                  demonstrations.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-amber-100 p-2 rounded border border-amber-300">
                    <div className="font-bold text-amber-900">15,000+</div>
                    <div className="text-xs text-amber-700">Attendees</div>
                  </div>
                  <div className="bg-amber-100 p-2 rounded border border-amber-300">
                    <div className="font-bold text-amber-900">47</div>
                    <div className="text-xs text-amber-700">Events</div>
                  </div>
                  <div className="bg-amber-100 p-2 rounded border border-amber-300">
                    <div className="font-bold text-amber-900">$2.3M</div>
                    <div className="text-xs text-amber-700">Economic Impact</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 space-y-4">
            <RealTimeMarketWidget />

            {/* Classifieds */}
            <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-amber-900">FRONTIER CLASSIFIEDS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-xs">
                  <div className="border-b border-amber-300 pb-2">
                    <div className="font-bold text-amber-900">MECHANICAL BULL TRAINING</div>
                    <div className="text-amber-700">Learn from Stone himself! Cyberpunk garage sessions available.</div>
                    <div className="text-amber-600">Contact: stone@wyoverse.com</div>
                  </div>
                  <div className="border-b border-amber-300 pb-2">
                    <div className="font-bold text-amber-900">CRYPTO MINING EQUIPMENT</div>
                    <div className="text-amber-700">High-grade digital pickaxes and quantum shovels.</div>
                    <div className="text-amber-600">Contact: Prospector Pete</div>
                  </div>
                  <div className="border-b border-amber-300 pb-2">
                    <div className="font-bold text-amber-900">BIRD WATCHING TOURS</div>
                    <div className="text-amber-700">Support conservation while exploring Wyoming wildlife.</div>
                    <div className="text-amber-600">Audubon Society Certified</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-900">AFFILIATE OPPORTUNITIES</div>
                    <div className="text-amber-700">Join our social good network. Earn while helping others!</div>
                    <div className="text-amber-600">Multiple platforms available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-amber-800 text-center text-sm text-amber-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="font-bold text-amber-900">THE WYOVERSE PIONEER</div>
              <div>Published daily in the Digital Frontier</div>
              <div>Real-time crypto data via Coinbase API</div>
            </div>
            <div>
              <div className="font-bold text-amber-900">SOCIAL GOOD NETWORK</div>
              <div>SocialGood.inc • DeSo • Temu • Audubon</div>
              <div>5% of earnings support community causes</div>
            </div>
            <div>
              <div className="font-bold text-amber-900">CONSERVATION PARTNERS</div>
              <div>Audubon Society • Wyoming Wildlife</div>
              <div>Protecting birds through climate change</div>
            </div>
            <div>
              <div className="font-bold text-amber-900">POWERED BY</div>
              <div>LuckyspotOgold@github</div>
              <div>Stone's Mechanical Bull Academy</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-amber-300">
            <p className="text-xs">
              © 2024 WyoVerse Pioneer. All rights reserved. • Supporting bird conservation since 1880 • Digital
              frontier, real impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
