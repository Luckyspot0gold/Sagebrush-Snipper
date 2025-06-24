import { NewspaperLayout } from "@/components/newspaper-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, Trophy, Users, Zap } from "lucide-react"
import Image from "next/image"

export default function RacingCircuitPage() {
  return (
    <NewspaperLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="headline-primary text-4xl mb-2">🏁 CRYPTO CLASHERS RACING CIRCUIT 🏁</h1>
          <p className="body-text text-lg">8 in the Gate - Where Speed Meets Market Volatility</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">Live Race Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 mb-4">
                <Image
                  src="/images/crypto-clashers-racing-poster.png"
                  alt="Racing Circuit"
                  fill
                  className="object-cover border-2 border-black rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Zap className="h-16 w-16 mx-auto mb-2" />
                    <p className="font-serif text-xl">Race Starting Soon...</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className="bg-blue-500 text-white">NEXT RACE: 2:30</Badge>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>892 racers</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-100 border-2 border-blue-300 rounded">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="font-bold">SPEED BOOST</div>
                    <div className="text-sm">BTC +2.1%</div>
                  </div>
                  <div className="text-center p-3 bg-purple-100 border-2 border-purple-300 rounded">
                    <div className="text-2xl mb-1">🚀</div>
                    <div className="font-bold">TURBO MODE</div>
                    <div className="text-sm">ETH +4.3%</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="https://github.com/Luckyspot0gold/Crypto_Clashers_Racing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full newspaper-button">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Source Code
                    </Button>
                  </a>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    Join Race
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">Race Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "SpeedDemon", time: "1:23.45", earnings: "$156.80" },
                  { rank: 2, name: "CryptoRacer", time: "1:24.12", earnings: "$134.20" },
                  { rank: 3, name: "TurboTrader", time: "1:24.89", earnings: "$112.60" },
                  { rank: 4, name: "VelocityViper", time: "1:25.34", earnings: "$98.40" },
                  { rank: 5, name: "RocketRider", time: "1:25.67", earnings: "$87.20" },
                ].map((racer) => (
                  <div key={racer.rank} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center font-bold text-white">
                        {racer.rank}
                      </div>
                      <div>
                        <div className="font-bold font-serif">{racer.name}</div>
                        <div className="text-sm text-gray-600">{racer.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{racer.earnings}</div>
                      <div className="text-xs text-gray-500">prize</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-4 border-black bg-blue-50">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="headline-secondary text-xl mb-2">Ready to Race?</h3>
            <p className="body-text mb-4">
              Experience high-speed racing where cryptocurrency market movements determine your vehicle's performance.
              The more volatile the market, the faster you go!
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="newspaper-button">Select Vehicle</Button>
              <Button variant="outline" className="border-black">
                View Track Records
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewspaperLayout>
  )
}
