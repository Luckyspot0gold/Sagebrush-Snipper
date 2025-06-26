"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RealTimeMarketWidget } from "@/components/real-time-market-widget"

export function NewspaperFrontPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-amber-50 min-h-screen">
      {/* Newspaper Header */}
      <div className="text-center border-b-4 border-black pb-4 mb-6">
        <div className="text-xs mb-2">ESTABLISHED 1880 • WYOMING TERRITORY</div>
        <h1 className="text-6xl font-bold font-serif mb-2">THE WYOVERSE PIONEER</h1>
        <div className="flex justify-between items-center text-sm">
          <div>VOL. 144, NO. 365</div>
          <div className="font-bold">DIGITAL FRONTIER EDITION</div>
          <div>{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8">
          {/* Lead Story */}
          <div className="mb-6">
            <h2 className="text-4xl font-bold font-serif mb-2 border-b-2 border-black pb-1">
              STONE CONQUERS MECHANICAL BULL AT CHEYENNE FRONTIER DAYS
            </h2>
            <p className="text-sm italic mb-3">Legendary rider showcases skills in epic cyberpunk garage showdown</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-2">
                <img
                  src="/images/mechwolfClutch.jpeg"
                  alt="Stone in Cyberpunk Garage"
                  className="w-full h-48 object-cover border-2 border-black"
                />
                <p className="text-xs text-center mt-1 italic">
                  Stone prepares his ride in the neon-lit garage before the mechanical bull challenge
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-bold">BREAKING NEWS</p>
                <p>
                  In a spectacular display of frontier grit meets modern technology, legendary rider Stone dominated the
                  mechanical bull competition at this year's Cheyenne Frontier Days celebration.
                </p>
                <p>
                  The cyberpunk-themed garage provided the perfect backdrop for Stone's preparation, complete with neon
                  lighting and high-tech equipment that would make any frontier mechanic proud.
                </p>
                <p>
                  "Never seen anything like it," said Marshal Bill, local barkeep and rodeo expert. "That boy's got more
                  balance than a Swiss timepiece and twice the determination."
                </p>
              </div>
            </div>

            <div className="columns-3 gap-4 text-sm text-justify">
              <p>
                The mechanical bull challenge has become a centerpiece of the modern Cheyenne Frontier Days, blending
                traditional rodeo skills with cutting-edge technology. Stone's performance drew cheers from thousands of
                spectators who witnessed his record-breaking 8-minute ride.
              </p>

              <p>
                The cyberpunk garage where Stone prepared has become a symbol of the new frontier - where traditional
                Western values meet futuristic innovation. The neon-lit workspace features state-of-the-art tools and
                equipment that help modern cowboys maintain their edge.
              </p>

              <p>
                Event organizers report this was the largest crowd ever assembled for the mechanical bull competition,
                with visitors traveling from across the digital frontier to witness the spectacle. The combination of
                traditional rodeo skills and modern technology continues to draw new audiences to frontier events.
              </p>

              <p>
                Stone's victory adds another chapter to the growing legend of WyoVerse champions who bridge the gap
                between the old West and the digital age. His preparation in the cyberpunk garage has inspired a new
                generation of frontier riders to embrace both tradition and innovation.
              </p>
            </div>
          </div>

          {/* Secondary Stories */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-2xl font-bold font-serif mb-2 border-b border-black">
                CRYPTO CLASHERS ARENA PACKED FOR BEAR VS BEAR SHOWDOWN
              </h3>
              <img
                src="/images/bears-boxing-arena-crowd.jpeg"
                alt="Bears Boxing in Arena"
                className="w-full h-32 object-cover border border-black mb-2"
              />
              <p className="text-sm">
                The Crypto Clashers Boxing Arena witnessed an unprecedented bear vs bear match that had the crowd on
                their feet. Two massive grizzlies faced off in the ring, showcasing the raw power and skill that has
                made the arena famous across the frontier.
              </p>
              <p className="text-xs mt-2 italic">Full coverage on Sports Section, Page 3</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-serif mb-2 border-b border-black">
                CELTIC WOLF MANDALA BREAKS AUCTION RECORDS
              </h3>
              <img
                src="/images/wolfirishscotishposter.png"
                alt="Celtic Wolf Mandala"
                className="w-full h-32 object-cover border border-black mb-2"
              />
              <p className="text-sm">
                The legendary Celtic Wolf Mandala discovered in the digital mines has shattered all previous auction
                records, selling for 2.5 AVAX to a private collector from the Venice AI district.
              </p>
              <p className="text-xs mt-2 italic">Art Gallery coverage on Page 4</p>
            </div>
          </div>

          {/* Historical Feature */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold font-serif mb-2 border-b border-black">
              AERIAL PHOTOGRAPHY CAPTURES FRONTIER DAYS SPECTACLE
            </h3>
            <img
              src="/images/arialcheyennerodeo.png"
              alt="Aerial view of Cheyenne Frontier Days"
              className="w-full h-40 object-cover border border-black mb-2"
            />
            <p className="text-sm">
              Stunning aerial photography reveals the massive scale of this year's Cheyenne Frontier Days celebration.
              The event drew record crowds to witness traditional rodeo events, mechanical bull competitions, and the
              latest in frontier technology demonstrations.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Real-time Weather and Market Data */}
          <RealTimeMarketWidget />

          {/* Social Good Affiliate Section */}
          <Card className="border-2 border-black bg-gradient-to-r from-green-100 to-blue-100">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">💚 SOCIAL GOOD NETWORK</h4>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-xs font-bold">EARN WHILE HELPING OTHERS</div>
                  <div className="text-xs">5% of all earnings support social causes</div>
                </div>

                <div className="space-y-2">
                  <Button
                    size="sm"
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    onClick={() =>
                      window.open(
                        "https://go.socialgood.inc/?adj_redirect=https%3A%2F%2Fsocialgood.inc%2Fapp%2F1%2F&adj_t=1gbx67rh&adj_deeplink_js=1&referralCode=SVJDQ6",
                        "_blank",
                      )
                    }
                  >
                    💚 SocialGood.inc
                  </Button>

                  <Button
                    size="sm"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => window.open("https://docs.deso.org/", "_blank")}
                  >
                    🔗 DeSo Blockchain
                  </Button>

                  <Button
                    size="sm"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => window.open("https://temu.to/m/u7wq0kfazcq", "_blank")}
                  >
                    🛍️ Temu Deals (frp288931)
                  </Button>
                </div>

                <div className="text-xs text-center text-gray-600">
                  <div>Total Donated: $1,247.85</div>
                  <div>Lives Impacted: 261</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LuckyspotOgold Games */}
          <Card className="border-2 border-black bg-yellow-100">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">🎮 LUCKYSPOTOGOLD GAMES</h4>
              <div className="space-y-3">
                <div className="text-center">
                  <img
                    src="/images/cryptoclasherboxingposter.jpg"
                    alt="Crypto Clashers Boxing"
                    className="w-full h-20 object-cover border border-black mb-1"
                  />
                  <div className="text-xs font-bold">CRYPTO CLASHERS BOXING</div>
                  <div className="text-xs">Epic bear vs bear combat!</div>
                </div>

                <div className="text-center">
                  <img
                    src="/images/cryptoclasherwcarsposter.jpg"
                    alt="Racing Circuit"
                    className="w-full h-20 object-cover border border-black mb-1"
                  />
                  <div className="text-xs font-bold">RACING CIRCUIT</div>
                  <div className="text-xs">High-speed blockchain racing!</div>
                </div>

                <div className="text-center">
                  <img
                    src="/images/clutchonhorse.webp"
                    alt="Clutch Chronicles"
                    className="w-full h-20 object-cover border border-black mb-1"
                  />
                  <div className="text-xs font-bold">CLUTCH CHRONICLES</div>
                  <div className="text-xs">Cyberpunk frontier adventures!</div>
                </div>

                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => window.open("https://github.com/LuckyspotOgold", "_blank")}
                >
                  🎮 Play All Games!
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Classifieds */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">CLASSIFIEDS</h4>
              <div className="space-y-2 text-xs">
                <div className="border-b pb-1">
                  <strong>MECHANICAL BULL TRAINING</strong>
                  <br />
                  Learn from Stone himself! Cyberpunk garage sessions available.
                </div>
                <div className="border-b pb-1">
                  <strong>CRYPTO MINING EQUIPMENT</strong>
                  <br />
                  High-grade digital pickaxes and quantum shovels. Contact Prospector Pete.
                </div>
                <div className="border-b pb-1">
                  <strong>NEON GARAGE RENTALS</strong>
                  <br />
                  Cyberpunk-themed workspaces for frontier mechanics and riders.
                </div>
                <div>
                  <strong>AFFILIATE OPPORTUNITIES</strong>
                  <br />
                  Join our social good network. Earn while helping others!
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t-2 border-black text-center text-xs">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <strong>THE WYOVERSE PIONEER</strong>
            <br />
            Published daily in the Digital Frontier
            <br />
            Real-time crypto data via Coinbase API
          </div>
          <div>
            <strong>SOCIAL GOOD NETWORK</strong>
            <br />
            SocialGood.inc • DeSo • Temu Affiliates
            <br />
            5% of earnings support community causes
          </div>
          <div>
            <strong>POWERED BY</strong>
            <br />
            LuckyspotOgold@github
            <br />
            Stone's Mechanical Bull Academy
          </div>
        </div>
      </div>
    </div>
  )
}
