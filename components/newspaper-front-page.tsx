"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
          <div>DECEMBER 26, 2024</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8">
          {/* Lead Story */}
          <div className="mb-6">
            <h2 className="text-4xl font-bold font-serif mb-2 border-b-2 border-black pb-1">
              LEGENDARY CELTIC WOLF MANDALA DISCOVERED IN DIGITAL MINES
            </h2>
            <p className="text-sm italic mb-3">
              Mystical artifact valued at 2.5 AVAX draws collectors from across the frontier
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-2">
                <img
                  src="/images/wolfirishscotishposter.png"
                  alt="Celtic Wolf Mandala"
                  className="w-full h-48 object-cover border-2 border-black"
                />
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-bold">BREAKING NEWS</p>
                <p>
                  Local prospectors struck digital gold yesterday when they uncovered a legendary Celtic Wolf Mandala
                  deep in the WyoVerse mines.
                </p>
                <p>
                  The intricate artwork, featuring golden scrollwork and mystical symbols, has been authenticated by
                  Venice AI experts.
                </p>
                <p>
                  "Never seen anything like it," said Marshal Bill, local barkeep and crypto expert. "That there
                  mandala's got more detail than a Swiss pocket watch."
                </p>
              </div>
            </div>

            <div className="columns-3 gap-4 text-sm text-justify">
              <p>
                The discovery has sent shockwaves through the digital frontier community, with collectors and investors
                flocking to the WyoVerse Art Gallery to witness the legendary piece firsthand.
              </p>

              <p>
                According to gallery curator Venice AI, the mandala represents "the mystical connection between ancient
                Celtic traditions and our modern digital frontier." The piece features intricate purple and gold
                scrollwork surrounding a majestic golden wolf, all contained within traditional Celtic knotwork
                patterns.
              </p>

              <p>
                The artifact has been classified as "Legendary" rarity, making it one of only a handful of such pieces
                in existence. Early bidding has reached 2.5 AVAX, equivalent to approximately $80 at current market
                rates.
              </p>

              <p>
                "This discovery validates our belief that the digital frontier holds treasures beyond imagination,"
                stated WyoVerse Governor Lucky McGold. "We expect this to attract even more settlers to our growing
                territory."
              </p>
            </div>
          </div>

          {/* Secondary Stories */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-2xl font-bold font-serif mb-2 border-b border-black">
                CRYPTO CLASHERS TOURNAMENT DRAWS RECORD CROWDS
              </h3>
              <img
                src="/images/cryptoclasherboxingposter.jpg"
                alt="Crypto Clashers Boxing"
                className
                alt="Crypto Clashers Boxing"
                className="w-full h-32 object-cover border border-black mb-2"
              />
              <p className="text-sm">
                The epic bull vs bear showdown at the Crypto Clashers Boxing Arena drew over 10,000 spectators last
                weekend. The mountain arena echoed with cheers as fighters battled for supremacy in the ring.
              </p>
              <p className="text-xs mt-2 italic">See Sports Section for full coverage</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-serif mb-2 border-b border-black">
                RACING CIRCUIT OPENS TO GREAT FANFARE
              </h3>
              <img
                src="/images/cryptoclasherwcarsposter.jpg"
                alt="Crypto Clashers Racing"
                className="w-full h-32 object-cover border border-black mb-2"
              />
              <p className="text-sm">
                The new Crypto Clashers Racing Circuit officially opened with a spectacular sunset race featuring both
                classic and modern vehicles. High-speed blockchain racing has arrived in the territory.
              </p>
              <p className="text-xs mt-2 italic">Full story on Page 3</p>
            </div>
          </div>

          {/* Historical Feature */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold font-serif mb-2 border-b border-black">
              HISTORICAL FRONTIER ENCAMPMENT PHOTOGRAPHS SURFACE
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <img
                src="/images/weirdC.H.F.D.img.png"
                alt="Historical Encampment"
                className="w-full h-24 object-cover border border-black"
              />
              <div className="col-span-2 text-sm">
                <p>
                  Rare photographs of authentic Native American encampments have been discovered in the territorial
                  archives. These images provide invaluable insight into the real frontier days that inspire our digital
                  world.
                </p>
                <p className="mt-2">
                  The photographs show teepees, horsemen, and daily life in the original Wyoming Territory, serving as
                  historical foundation for our modern digital frontier experience.
                </p>
              </div>
            </div>
          </div>

          {/* Aerial Coverage */}
          <div>
            <h3 className="text-2xl font-bold font-serif mb-2 border-b border-black">
              CHEYENNE FRONTIER DAYS SPECTACULAR DRAWS MASSIVE CROWDS
            </h3>
            <img
              src="/images/arialcheyennerodeo.png"
              alt="Cheyenne Frontier Days Aerial"
              className="w-full h-40 object-cover border border-black mb-2"
            />
            <p className="text-sm">
              Aerial photography reveals the massive scale of this year's Cheyenne Frontier Days celebration. Thousands
              gathered to witness authentic Western events that continue to inspire our digital frontier community.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Weather */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">FRONTIER WEATHER</h4>
              <div className="text-center">
                <div className="text-2xl font-bold">32°F</div>
                <div className="text-sm">Partly Cloudy</div>
                <div className="text-xs mt-2">Perfect weather for crypto mining and digital prospecting</div>
              </div>
            </CardContent>
          </Card>

          {/* Market Report */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">MARKET REPORT</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Bitcoin (BTC)</span>
                  <span className="text-green-600">$67,234 ↑2.3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avalanche (AVAX)</span>
                  <span className="text-green-600">$32.15 ↑3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ethereum (ETH)</span>
                  <span className="text-red-600">$3,456 ↓1.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Solana (SOL)</span>
                  <span className="text-green-600">$156.78 ↑4.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LuckyspotOgold Games Advertisement */}
          <Card className="border-2 border-black bg-yellow-100">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">🎮 GAMES & ENTERTAINMENT</h4>
              <div className="space-y-3">
                <div className="text-center">
                  <img
                    src="/images/cryptoclasherboxingposter.jpg"
                    alt="Crypto Clashers"
                    className="w-full h-20 object-cover border border-black mb-1"
                  />
                  <div className="text-xs font-bold">CRYPTO CLASHERS BOXING</div>
                  <div className="text-xs">Epic bull vs bear combat!</div>
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
                  <div className="text-xs">Steampunk RPG adventures!</div>
                </div>

                <div className="text-center text-xs">
                  <strong>All games by LuckyspotOgold@github</strong>
                </div>

                <Button size="sm" className="w-full">
                  Play Now!
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wanted Poster */}
          <Card className="border-2 border-black bg-red-100">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">⚠️ WANTED ⚠️</h4>
              <img
                src="/images/wyoversestonewanted.png"
                alt="Wanted Poster"
                className="w-full h-32 object-cover border border-black mb-2"
              />
              <div className="text-center text-xs">
                <div className="font-bold">DIGITAL OUTLAWS</div>
                <div>Reward: 1000 WYO Tokens</div>
                <div className="mt-1">Report suspicious mining activity to Marshal Bill</div>
              </div>
            </CardContent>
          </Card>

          {/* Classifieds */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">CLASSIFIEDS</h4>
              <div className="space-y-2 text-xs">
                <div className="border-b pb-1">
                  <strong>MINING EQUIPMENT FOR SALE</strong>
                  <br />
                  High-grade crypto pickaxes and digital shovels. Contact Prospector Pete.
                </div>
                <div className="border-b pb-1">
                  <strong>SALOON HELP WANTED</strong>
                  <br />
                  Bar Keep Bill seeks assistant for busy frontier establishment.
                </div>
                <div className="border-b pb-1">
                  <strong>LAND DEEDS AVAILABLE</strong>
                  <br />
                  Prime digital real estate in WyoVerse. Financing available.
                </div>
                <div>
                  <strong>TRADING POST OPEN</strong>
                  <br />
                  Buy, sell, trade NFTs and crypto. Fair prices guaranteed.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Art Gallery Promotion */}
          <Card className="border-2 border-black bg-purple-100">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">🎨 ART GALLERY</h4>
              <div className="text-center text-xs">
                <img
                  src="/images/wolfirishscotishposter.png"
                  alt="Celtic Mandala"
                  className="w-full h-20 object-cover border border-black mb-2"
                />
                <div className="font-bold">LEGENDARY CELTIC MANDALA</div>
                <div>Now on display!</div>
                <div className="mt-2">
                  Visit the WyoVerse Art Gallery to view this and other exclusive NFT collections.
                </div>
                <Button size="sm" className="w-full mt-2">
                  Visit Gallery
                </Button>
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
            Subscription: 0.1 AVAX/month
          </div>
          <div>
            <strong>CONTACT INFORMATION</strong>
            <br />
            Telegraph: @WyoVersePioneer
            <br />
            Pony Express: WyoVerse Territory
          </div>
          <div>
            <strong>POWERED BY</strong>
            <br />
            LuckyspotOgold@github
            <br />
            Built with frontier spirit & modern tech
          </div>
        </div>
      </div>
    </div>
  )
}
