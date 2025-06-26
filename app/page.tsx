import { NewspaperLayout } from "@/components/newspaper-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Zap, Trophy, Pickaxe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WyoVersePioneerHomePage() {
  return (
    <NewspaperLayout>
      <div className="space-y-8">
        {/* Main Headline */}
        <div className="text-center border-4 border-black p-6 bg-yellow-50">
          <h1 className="headline-primary text-5xl mb-4">🤠 WYOVERSE PIONEER 🤠</h1>
          <p className="headline-secondary text-2xl mb-4">"Digital Frontier Where Land Builds Champions"</p>
          <p className="body-text text-lg">
            Established 1852 • Now Serving Digital Prospectors • Est. Daily Circulation: 50,000
          </p>
        </div>

        {/* Core Game Loop */}
        <Card className="border-4 border-black bg-green-50">
          <CardHeader>
            <CardTitle className="headline-secondary text-center text-3xl">
              ⚡ THE PIONEER'S PATH TO PROSPERITY ⚡
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="text-center p-4 bg-amber-100 border-2 border-amber-400 rounded">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-amber-700" />
                <h3 className="font-bold">1. CLAIM LAND</h3>
                <p className="text-sm">Stake your territory</p>
              </div>

              <div className="text-center">
                <div className="text-4xl">→</div>
              </div>

              <div className="text-center p-4 bg-blue-100 border-2 border-blue-400 rounded">
                <Pickaxe className="h-12 w-12 mx-auto mb-2 text-blue-700" />
                <h3 className="font-bold">2. MINE RESOURCES</h3>
                <p className="text-sm">Generate STONES</p>
              </div>

              <div className="text-center">
                <div className="text-4xl">→</div>
              </div>

              <div className="text-center p-4 bg-red-100 border-2 border-red-400 rounded">
                <Trophy className="h-12 w-12 mx-auto mb-2 text-red-700" />
                <h3 className="font-bold">3. UPGRADE GEAR</h3>
                <p className="text-sm">Better boxing gloves</p>
              </div>

              <div className="text-center">
                <div className="text-4xl">→</div>
              </div>

              <div className="text-center p-4 bg-purple-100 border-2 border-purple-400 rounded">
                <Zap className="h-12 w-12 mx-auto mb-2 text-purple-700" />
                <h3 className="font-bold">4. WIN FIGHTS</h3>
                <p className="text-sm">Earn $AVAX rewards</p>
              </div>
            </div>

            <div className="text-center mt-6">
              <Badge className="text-lg px-6 py-2 bg-gold text-black">
                💰 Complete the loop to multiply your earnings! 💰
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Features - Focused on Boxing + Bill */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Boxing Arena */}
          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary text-2xl">🥊 CRYPTO CLASHERS BOXING ARENA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 mb-4">
                <Image
                  src="/images/crypto-clashers-fighter.png"
                  alt="Boxing Champion"
                  fill
                  className="object-cover border-2 border-black rounded"
                />
              </div>
              <p className="body-text mb-4">
                Step into the ring where market volatility powers your punches! Use STONES from your land to upgrade
                gloves and dominate opponents.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Active Fighters:</span>
                  <Badge>1,247</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Daily Prize Pool:</span>
                  <Badge className="bg-green-500 text-white">500 AVAX</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Your Land Bonus:</span>
                  <Badge className="bg-blue-500 text-white">+25% Power</Badge>
                </div>
              </div>
              <Link href="/boxing-arena">
                <Button className="w-full newspaper-button text-lg">Enter the Ring</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Bar Keep Bill AI */}
          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary text-2xl">🤠 BAR KEEP BILL'S SALOON</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 mb-4 bg-amber-100 border-2 border-amber-300 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🤠</div>
                  <p className="font-serif text-lg">"Howdy, Partner!"</p>
                </div>
              </div>
              <p className="body-text mb-4">
                Get personalized trading advice from Bill, powered by fine-tuned AI that analyzes your wallet and land
                holdings for maximum profit.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>AI Conversations:</span>
                  <Badge>12,847</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <Badge className="bg-green-500 text-white">87%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Revenue Generated:</span>
                  <Badge className="bg-gold text-black">$2,347.50</Badge>
                </div>
              </div>
              <Link href="/saloon">
                <Button className="w-full newspaper-button text-lg">Visit Bill's Saloon</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Land Management Hub */}
        <Card className="border-4 border-black bg-amber-50">
          <CardHeader>
            <CardTitle className="headline-secondary text-center text-3xl">🏔️ WYOMING TERRITORY LAND OFFICE 🏔️</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="headline-secondary text-xl mb-2">Available Claims</h3>
                <div className="text-4xl mb-2">2,847</div>
                <p className="body-text">Prime digital acres ready for staking</p>
              </div>
              <div className="text-center">
                <h3 className="headline-secondary text-xl mb-2">Daily STONES Production</h3>
                <div className="text-4xl mb-2">156,000</div>
                <p className="body-text">Generated by active landowners</p>
              </div>
              <div className="text-center">
                <h3 className="headline-secondary text-xl mb-2">Boxing Upgrades</h3>
                <div className="text-4xl mb-2">847</div>
                <p className="body-text">Gloves enhanced this week</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link href="/land-deeds">
                <Button className="newspaper-button text-xl px-8 py-3">Stake Your Claim Today!</Button>
              </Link>
            </div>
          </CardContent>
        </div>

        {/* Live Stats Ticker */}
        <div className="border-4 border-black bg-black text-yellow-400 p-4">
          <div className="flex items-center justify-center space-x-8 text-lg font-mono">
            <div>🥊 LIVE FIGHTS: 23</div>
            <div>💰 AVAX EARNED: 1,247.50</div>
            <div>🏔️ STONES MINED: 45,678</div>
            <div>🤠 BILL ACTIVE: YES</div>
          </div>
        </div>
      </div>
    </NewspaperLayout>
  )
}
