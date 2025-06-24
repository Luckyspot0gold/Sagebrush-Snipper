import { NewspaperLayout } from "@/components/newspaper-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, Trophy, Users } from "lucide-react"
import Image from "next/image"

export default function BoxingArenaPage() {
  return (
    <NewspaperLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="headline-primary text-4xl mb-2">🥊 CRYPTO CLASHERS BOXING ARENA 🥊</h1>
          <p className="body-text text-lg">Where Market Volatility Meets Combat Sports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">Live Arena</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 mb-4">
                <Image
                  src="/images/crypto-clashers-fighter.png"
                  alt="Boxing Arena"
                  fill
                  className="object-cover border-2 border-black rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-2" />
                    <p className="font-serif text-xl">Arena Loading...</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className="bg-green-500 text-white">LIVE</Badge>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>1,247 watching</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-red-100 border-2 border-red-300 rounded">
                    <div className="text-2xl mb-1">🐻</div>
                    <div className="font-bold">BEAR</div>
                    <div className="text-sm">Market Down 3.2%</div>
                  </div>
                  <div className="text-center p-3 bg-green-100 border-2 border-green-300 rounded">
                    <div className="text-2xl mb-1">🐂</div>
                    <div className="font-bold">BULL</div>
                    <div className="text-sm">Market Up 1.8%</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="https://github.com/Luckyspot0gold/Crypto_Clashers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full newspaper-button">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Source Code
                    </Button>
                  </a>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    Enter Arena
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">Tournament Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "CryptoPuncher", wins: 47, earnings: "$234.50" },
                  { rank: 2, name: "BlockchainBrawler", wins: 42, earnings: "$198.20" },
                  { rank: 3, name: "DigitalDemolisher", wins: 38, earnings: "$167.80" },
                  { rank: 4, name: "TokenTerror", wins: 35, earnings: "$145.60" },
                  { rank: 5, name: "CoinCrusher", wins: 31, earnings: "$123.40" },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <div className="font-bold font-serif">{player.name}</div>
                        <div className="text-sm text-gray-600">{player.wins} wins</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{player.earnings}</div>
                      <div className="text-xs text-gray-500">earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-4 border-black bg-yellow-50">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <h3 className="headline-secondary text-xl mb-2">Ready to Fight?</h3>
            <p className="body-text mb-4">
              Join the arena where crypto market movements determine the power of your punches. Real-time price data
              drives every match!
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="newspaper-button">Create Fighter</Button>
              <Button variant="outline" className="border-black">
                Watch Live Stream
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewspaperLayout>
  )
}
