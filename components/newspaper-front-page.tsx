"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Calendar, MapPin, Zap, Trophy, Users, Coins } from "lucide-react"

export function NewspaperFrontPage() {
  return (
    <div className="space-y-6 newspaper-article-inner">
      {/* Main Headlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Story - Crypto Clashers Boxing */}
        <Card className="border-4 border-black newspaper-article">
          <CardHeader className="border-b-2 border-black">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-red-600 text-white">BREAKING</Badge>
              <Badge variant="outline">SPORTS</Badge>
            </div>
            <CardTitle className="headline-primary text-2xl">🥊 CRYPTO CLASHERS CHAMPIONSHIP TONIGHT!</CardTitle>
            <CardDescription className="body-text text-lg">
              Bull vs Bear Showdown at the Digital Colosseum
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="relative h-48 mb-4">
              <Image
                src="/images/crypto-clashers-fighter.png"
                alt="Crypto Clashers Boxing Championship"
                fill
                className="object-cover border-2 border-black rounded"
              />
            </div>
            <p className="body-text mb-4">
              The most anticipated boxing match of the digital frontier is set for tonight! Market volatility determines
              fighter strength in this revolutionary combat system where every punch is powered by real cryptocurrency
              movements.
            </p>
            <div className="flex gap-2">
              <Link href="/boxing-arena">
                <Button className="newspaper-button">
                  <Trophy className="h-4 w-4 mr-2" />
                  Enter Arena
                </Button>
              </Link>
              <a
                href="https://github.com/Luckyspot0gold/Crypto_Clashers_Boxing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-black">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Source
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Racing Story */}
        <Card className="border-4 border-black newspaper-article">
          <CardHeader className="border-b-2 border-black">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600 text-white">RACING</Badge>
              <Badge variant="outline">SPORTS</Badge>
            </div>
            <CardTitle className="headline-primary text-2xl">🏁 CRYPTO RACING CIRCUIT OPENS</CardTitle>
            <CardDescription className="body-text text-lg">High-Speed Trading Meets High-Octane Racing</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="relative h-48 mb-4">
              <Image
                src="/images/dogincivicvenicecc.webp"
                alt="Crypto Racing Circuit"
                fill
                className="object-cover border-2 border-black rounded"
              />
            </div>
            <p className="body-text mb-4">
              The new Crypto Racing Circuit combines the thrill of high-speed racing with cryptocurrency market
              dynamics. Racers report that market volatility directly affects their vehicle's performance, creating an
              unprecedented gaming experience.
            </p>
            <div className="flex gap-2">
              <Link href="/racing-circuit">
                <Button className="newspaper-button">
                  <Zap className="h-4 w-4 mr-2" />
                  Join Race
                </Button>
              </Link>
              <a
                href="https://github.com/Luckyspot0gold/Crypto_Clashers_Racing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-black">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Source
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="border-2 border-black" />

      {/* Secondary Stories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wyoming Pyramid Discovery */}
        <Card className="border-2 border-black newspaper-article">
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              ARCHAEOLOGY
            </Badge>
            <CardTitle className="headline-secondary text-lg">🏔️ MYSTERIOUS PYRAMID DISCOVERED</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="body-text text-sm mb-3">
              Archaeological team uncovers ancient structure in Wyoming wilderness. Local tribes claim it predates known
              civilizations.
            </p>
            <Link href="/wyoming-pyramid">
              <Button size="sm" className="newspaper-button">
                Read More
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Saloon News */}
        <Card className="border-2 border-black newspaper-article">
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              BUSINESS
            </Badge>
            <CardTitle className="headline-secondary text-lg">🍻 BILL'S SALOON RENOVATED</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="body-text text-sm mb-3">
              Bar Keep Bill unveils new bottle collection including Snipers Sarsaparilla and Buffalo Bourbon. Fresh milk
              now available for young pioneers.
            </p>
            <Link href="/saloon">
              <Button size="sm" className="newspaper-button">
                Visit Saloon
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Market Report */}
        <Card className="border-2 border-black newspaper-article">
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              MARKETS
            </Badge>
            <CardTitle className="headline-secondary text-lg">📈 FRONTIER MARKETS SURGE</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="body-text text-sm mb-3">
              Digital gold claims show unprecedented activity. Mining operations report 300% increase in productivity
              this quarter.
            </p>
            <Link href="/market">
              <Button size="sm" className="newspaper-button">
                <Coins className="h-4 w-4 mr-2" />
                View Markets
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Separator className="border-2 border-black" />

      {/* Community Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-black newspaper-article">
          <CardHeader>
            <CardTitle className="headline-secondary">📅 UPCOMING EVENTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-serif font-bold">Frontier Days Festival</p>
                  <p className="text-sm text-gray-600">July 4th - Independence Celebration</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <div>
                  <p className="font-serif font-bold">Land Deed Auction</p>
                  <p className="text-sm text-gray-600">Every Sunday at Town Square</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4" />
                <div>
                  <p className="font-serif font-bold">Community Gathering</p>
                  <p className="text-sm text-gray-600">Weekly at the Saloon</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black newspaper-article">
          <CardHeader>
            <CardTitle className="headline-secondary">🎮 GAMING DIRECTORY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/boxing-arena" className="block hover:bg-gray-100 p-2 rounded">
                <div className="flex items-center gap-2">
                  <span>🥊</span>
                  <span className="font-serif">Crypto Clashers Boxing</span>
                </div>
              </Link>
              <Link href="/racing-circuit" className="block hover:bg-gray-100 p-2 rounded">
                <div className="flex items-center gap-2">
                  <span>🏁</span>
                  <span className="font-serif">Racing Circuit</span>
                </div>
              </Link>
              <Link href="/digital-rodeo" className="block hover:bg-gray-100 p-2 rounded">
                <div className="flex items-center gap-2">
                  <span>🤠</span>
                  <span className="font-serif">Digital Rodeo</span>
                </div>
              </Link>
              <Link href="/saloon" className="block hover:bg-gray-100 p-2 rounded">
                <div className="flex items-center gap-2">
                  <span>🍻</span>
                  <span className="font-serif">Bill's Saloon</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Advertisement */}
      <div className="border-4 border-black p-4 text-center bg-yellow-100">
        <h3 className="headline-secondary text-xl mb-2">🏆 JOIN THE FRONTIER REVOLUTION! 🏆</h3>
        <p className="body-text mb-3">
          Experience the Wild West like never before with blockchain-powered gaming, real market integration, and
          authentic 1880s atmosphere.
        </p>
        <div className="flex gap-2 justify-center">
          <Link href="/games">
            <Button className="newspaper-button">Explore Games</Button>
          </Link>
          <Link href="/community">
            <Button variant="outline" className="border-black">
              Join Community
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
