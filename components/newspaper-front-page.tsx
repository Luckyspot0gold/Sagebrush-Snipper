"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react"
import Image from "next/image"

export function NewspaperFrontPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Newspaper Header */}
        <Card className="border-4 border-black shadow-lg mb-6 newspaper-article">
          <CardHeader className="text-center border-b-4 border-black bg-amber-900 text-white newspaper-article-inner">
            <div className="space-y-2">
              <CardTitle className="text-6xl font-serif headline-primary tracking-wider">
                THE WYOVERSE PIONEER
              </CardTitle>
              <CardDescription className="text-2xl font-serif text-amber-200">
                "All the News That's Fit to Mine" • Est. 1852 • Digital Frontier Edition
              </CardDescription>
              <div className="flex justify-between items-center text-lg font-serif text-amber-300">
                <span>{currentDate}</span>
                <span>Vol. 172, No. 47</span>
                <span>Price: 2 STONES</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Story Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Lead Story */}
            <Card className="border-4 border-black newspaper-article">
              <CardContent className="p-6 newspaper-article-inner">
                <div className="space-y-4">
                  <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold headline-primary mb-2">
                      LEGENDARY CELTIC WOLF MANDALA DISCOVERED IN DIGITAL FRONTIER
                    </h1>
                    <p className="text-lg font-serif text-gray-600 italic">
                      Rare NFT Artifact Combines Ancient Celtic Traditions with Modern Blockchain Technology
                    </p>
                  </div>

                  <div className="relative">
                    <Image
                      src="/images/wolfirishscotishposter.png"
                      alt="Celtic Wolf Mandala"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover rounded border-2 border-black"
                    />
                    <Badge className="absolute bottom-2 right-2 bg-yellow-500 text-black font-serif">
                      LEGENDARY NFT
                    </Badge>
                  </div>

                  <div className="columns-2 gap-6 font-serif text-justify leading-relaxed">
                    <p className="mb-4">
                      <span className="text-6xl font-bold float-left mr-2 leading-none">I</span>n a remarkable discovery
                      that has sent shockwaves through the digital frontier, archaeologists working with Venice AI
                      Studios have uncovered what appears to be the most significant Celtic-inspired NFT artifact ever
                      found in the WyoVerse.
                    </p>

                    <p className="mb-4">
                      The intricate mandala, featuring a majestic wolf surrounded by ornate purple and gold scrollwork,
                      represents a perfect fusion of ancient Celtic spiritual traditions and cutting-edge blockchain
                      technology. Experts believe this piece could revolutionize our understanding of digital heritage
                      preservation.
                    </p>

                    <p className="mb-4">
                      "This is unprecedented," declared Dr. Sarah McKenzie, Chief Digital Archaeologist at the WyoVerse
                      Historical Society. "The level of detail and spiritual significance embedded in this NFT suggests
                      it was created by master artisans who understood both ancient Celtic symbolism and modern
                      cryptographic principles."
                    </p>

                    <p>
                      The artifact is currently valued at 2.5 AVAX and has already received over 847 likes from the
                      frontier community. Plans are underway to display it permanently in the WyoVerse Art Gallery,
                      where it will serve as a bridge between our ancestral past and digital future.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Stories Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Crypto Clashers Story */}
              <Card className="border-2 border-black newspaper-article">
                <CardContent className="p-4 newspaper-article-inner">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-serif font-bold headline-secondary">
                      CRYPTO CLASHERS TOURNAMENT DRAWS RECORD CROWDS
                    </h2>

                    <Image
                      src="/images/cryptoclasherboxingposter.jpg"
                      alt="Crypto Clashers Boxing"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded border border-black"
                    />

                    <p className="font-serif text-sm text-justify leading-relaxed">
                      The latest Crypto Clashers Boxing championship, developed by the innovative team at
                      LuckyspotOgold@github, has shattered attendance records with over 10,000 spectators witnessing the
                      epic bull vs bear showdown in the digital arena.
                    </p>

                    <div className="bg-blue-50 p-2 rounded border">
                      <p className="text-xs font-serif text-blue-800">
                        <strong>PLAY NOW:</strong> Experience the revolutionary GameFi boxing experience
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Historical Discovery */}
              <Card className="border-2 border-black newspaper-article">
                <CardContent className="p-4 newspaper-article-inner">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-serif font-bold headline-secondary">
                      FRONTIER ENCAMPMENT PHOTOGRAPHS SURFACE
                    </h2>

                    <Image
                      src="/images/weirdC.H.F.D.img.png"
                      alt="Historical Frontier Encampment"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded border border-black"
                    />

                    <p className="font-serif text-sm text-justify leading-relaxed">
                      Rare sepia-toned photographs documenting authentic Native American frontier life have been
                      discovered in the Venice Historical Archives. These images provide unprecedented insight into
                      1880s Wyoming territorial life.
                    </p>

                    <p className="font-serif text-xs text-gray-600 italic">
                      "These photographs are invaluable historical documents," notes territorial historian Prof. James
                      Whitehorse.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cheyenne Frontier Days Coverage */}
            <Card className="border-2 border-black newspaper-article">
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-4">
                  <h2 className="text-3xl font-serif font-bold headline-secondary text-center">
                    CHEYENNE FRONTIER DAYS: SPECTACULAR AERIAL COVERAGE
                  </h2>

                  <Image
                    src="/images/arialcheyennerodeo.png"
                    alt="Cheyenne Frontier Days Aerial View"
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover rounded border-2 border-black"
                  />

                  <div className="columns-2 gap-4 font-serif text-sm text-justify leading-relaxed">
                    <p>
                      Our exclusive aerial photography captures the magnificent scale of this year's Cheyenne Frontier
                      Days celebration. Thousands of visitors from across the territory gathered to witness authentic
                      rodeo competition, traditional crafts, and frontier entertainment.
                    </p>

                    <p>
                      The event featured championship bronc riding, cattle roping competitions, and traditional Native
                      American cultural demonstrations. Local merchants reported record sales of frontier goods and
                      authentic Wyoming crafts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* LuckyspotOgold Games Advertisement */}
            <Card className="border-4 border-red-600 bg-gradient-to-b from-red-100 to-yellow-100 newspaper-article">
              <CardHeader className="text-center bg-red-800 text-white border-b-2 border-red-600">
                <CardTitle className="text-xl font-serif">🎮 FEATURED GAMES</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-serif font-bold text-red-800">LuckyspotOgold@github</h3>
                    <p className="text-sm font-serif text-red-700">Revolutionary GameFi Experiences</p>
                  </div>

                  <div className="space-y-3">
                    <div className="border border-red-300 rounded p-2">
                      <Image
                        src="/images/cryptoclasherwcarsposter.jpg"
                        alt="Crypto Clashers Racing"
                        width={200}
                        height={120}
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                      <h4 className="font-serif font-bold text-sm">Crypto Clashers Racing</h4>
                      <p className="text-xs font-serif">High-speed blockchain racing action!</p>
                    </div>

                    <div className="border border-red-300 rounded p-2">
                      <Image
                        src="/images/cryptoclasherboxingposter.jpg"
                        alt="Crypto Clashers Boxing"
                        width={200}
                        height={120}
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                      <h4 className="font-serif font-bold text-sm">Crypto Clashers Boxing</h4>
                      <p className="text-xs font-serif">Epic bull vs bear combat!</p>
                    </div>
                  </div>

                  <Button className="w-full frontier-button font-serif text-sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Play Now on GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Market Report */}
            <Card className="border-2 border-black newspaper-article">
              <CardHeader className="bg-blue-800 text-white border-b-2 border-black">
                <CardTitle className="text-lg font-serif text-center">📊 MARKET & WEATHER</CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm mb-1">Crypto Markets</h4>
                    <div className="text-xs font-serif space-y-1">
                      <div className="flex justify-between">
                        <span>AVAX:</span>
                        <span className="text-green-600">$42.50 ↑</span>
                      </div>
                      <div className="flex justify-between">
                        <span>STONES:</span>
                        <span className="text-red-600">$2.47 ↓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TATONKA:</span>
                        <span className="text-green-600">$0.85 ↑</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-serif font-bold text-sm mb-1">Territory Weather</h4>
                    <p className="text-xs font-serif">
                      Clear skies, 72°F. Perfect conditions for mining and trading. Light winds from the southwest at 8
                      mph.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clutch Chronicles */}
            <Card className="border-2 border-black newspaper-article">
              <CardHeader className="bg-purple-800 text-white border-b-2 border-black">
                <CardTitle className="text-lg font-serif text-center">⚔️ CLUTCH CHRONICLES</CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-3">
                  <Image
                    src="/images/clutchonhorse.webp"
                    alt="Clutch the Armored Knight"
                    width={200}
                    height={150}
                    className="w-full h-24 object-cover rounded border border-black"
                  />

                  <h4 className="font-serif font-bold text-sm">The Armored Knight Returns</h4>

                  <p className="text-xs font-serif text-justify leading-relaxed">
                    Legendary wolf warrior Clutch has been spotted riding through the digital frontier in full battle
                    armor. Witnesses report seeing the mysterious knight-errant heading toward the eastern territories
                    on urgent business.
                  </p>

                  <Badge className="text-xs bg-purple-100 text-purple-800 font-serif">Character Spotlight</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Wanted Poster */}
            <Card className="border-2 border-black newspaper-article">
              <CardHeader className="bg-amber-800 text-white border-b-2 border-black">
                <CardTitle className="text-lg font-serif text-center">🤠 WANTED POSTER</CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-3">
                  <Image
                    src="/images/wyoversestonewanted.png"
                    alt="WyoVerse Wanted Poster"
                    width={200}
                    height={250}
                    className="w-full h-32 object-cover rounded border border-black"
                  />

                  <div className="text-center">
                    <h4 className="font-serif font-bold text-sm">DIGITAL FRONTIER MARSHAL</h4>
                    <p className="text-xs font-serif">REWARD: 100 STONES</p>
                    <p className="text-xs font-serif italic">"Wanted for bringing order to the blockchain frontier"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Local Events */}
            <Card className="border-2 border-black newspaper-article">
              <CardHeader className="bg-green-800 text-white border-b-2 border-black">
                <CardTitle className="text-lg font-serif text-center">📅 LOCAL EVENTS</CardTitle>
              </CardHeader>
              <CardContent className="p-4 newspaper-article-inner">
                <div className="space-y-2 text-xs font-serif">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-3 w-3 mt-0.5 text-green-600" />
                    <div>
                      <p className="font-bold">Tonight: Saloon Poker Tournament</p>
                      <p>Bar Keep Bill's establishment, 8 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-3 w-3 mt-0.5 text-green-600" />
                    <div>
                      <p className="font-bold">Tomorrow: Land Deed Auction</p>
                      <p>Town Square, 2 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="h-3 w-3 mt-0.5 text-green-600" />
                    <div>
                      <p className="font-bold">Weekend: Boxing Championships</p>
                      <p>Digital Arena, All Day</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="border-4 border-black mt-6 newspaper-article">
          <CardContent className="p-4 text-center newspaper-article-inner">
            <p className="font-serif text-sm text-gray-600">
              The WyoVerse Pioneer • Published by Stoneyard Gaming • "Connecting the Digital Frontier Since 1852" •
              Subscribe for 10 STONES/month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
