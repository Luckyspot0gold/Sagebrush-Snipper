"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { ExternalLink, Play, Trophy, Users, Zap, Gamepad2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Game = {
  id: string
  title: string
  subtitle: string
  description: string
  category: "boxing" | "racing" | "trading" | "rodeo"
  status: "live" | "beta" | "coming-soon"
  image: string
  url: string
  features: string[]
  players: number
  rewards: string
}

const games: Game[] = [
  {
    id: "crypto-clashers-boxing",
    title: "Crypto Clashers",
    subtitle: "KryptO Boxing",
    description:
      "Battle in the digital ring with market-driven fighters. Bulls vs Bears in epic boxing matches where market volatility determines fighter strength and abilities.",
    category: "boxing",
    status: "live",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoclasherboxingposter.jpg-ohRGClzi9a58dAT0C2eBn8w5aDOR7g.jpeg",
    url: "https://boxing.crypto-clashers.games",
    features: ["Real-time Market Integration", "NFT Fighters", "Tournament Mode", "Staking Rewards"],
    players: 15420,
    rewards: "Up to 500 STONES per match",
  },
  {
    id: "crypto-classic-racing",
    title: "Crypto Classic",
    subtitle: "8 in the Gate",
    description:
      "Horse racing powered by blockchain technology. Bet on your favorite crypto-themed horses and experience the thrill of the track with real market data influencing race outcomes.",
    category: "racing",
    status: "live",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoclasherwcarsposter.jpg-0nnGL4RaNIFloUUC1cdsn0GDa31YE2.jpeg",
    url: "https://racing.crypto-clashers.games",
    features: ["Live Horse Racing", "Crypto Betting", "Breeding System", "Track Ownership"],
    players: 8750,
    rewards: "Daily racing dividends",
  },
  {
    id: "frontier-trader",
    title: "Frontier Trader",
    subtitle: "Wyoming Trading Post",
    description:
      "Navigate the digital frontier as a crypto trader in the old west. Manage resources, trade with NPCs, and build your trading empire across the Wyoming territory.",
    category: "trading",
    status: "beta",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/frontiertraderposter.jpg-qkFwH7ktU7ngpOes7GOZJg2ivot7wr.jpeg",
    url: "https://warroom.crypto-clashers.games",
    features: ["Resource Management", "NPC Trading", "Territory Expansion", "Market Simulation"],
    players: 3200,
    rewards: "Territory ownership NFTs",
  },
  {
    id: "wyoverse-rodeo",
    title: "WyoVerse Rodeo",
    subtitle: "Digital Bull Riding",
    description:
      "Ride the market volatility with cryptocurrency-themed bulls. Use patent-driven metrics to master the art of digital bull riding in this unique rodeo experience.",
    category: "rodeo",
    status: "live",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wyoversestonewanted.png-gWcFPItXcdecffyj0LbzPUcKyLcXlT.jpeg",
    url: "/digital-rodeo",
    features: ["Patent Metrics", "Bull Customization", "Leaderboards", "Special Moves"],
    players: 12100,
    rewards: "Rodeo championship tokens",
  },
]

const tournaments = [
  {
    name: "Cheyenne Frontier Days Championship",
    game: "All Games",
    prize: "10,000 STONES",
    date: "July 22-31, 2024",
    participants: 50000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arialcheyennerodeo-ZhM5k3peZKJQIuvYvyx3nje6bSjYUq.png",
  },
  {
    name: "Bull vs Bear Ultimate Showdown",
    game: "Crypto Clashers",
    prize: "5,000 STONES",
    date: "Every Weekend",
    participants: 2500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoclasherboxingposter.jpg-ohRGClzi9a58dAT0C2eBn8w5aDOR7g.jpeg",
  },
  {
    name: "Derby Stakes Classic",
    game: "Crypto Classic Racing",
    prize: "Premium Horse NFT",
    date: "Monthly",
    participants: 1200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/purple%26blueracehorseimg-PrC2qt3HCGBX57lvnCJt7XcQy11ryf.png",
  },
]

export function GamesPortal() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const { toast } = useToast()

  const handlePlayGame = (game: Game) => {
    if (game.status === "coming-soon") {
      toast({
        title: "Coming Soon!",
        description: `${game.title} will be available soon. Sign up for notifications!`,
      })
    } else {
      window.open(game.url, "_blank")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800 border-green-300"
      case "beta":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "coming-soon":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      {/* Featured Games Grid */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            FEATURED GAMING EXPERIENCES
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {games.map((game) => (
              <div key={game.id} className="border-4 border-black p-1">
                <div className="border-2 border-black p-4 bg-white">
                  <div className="relative h-64 mb-4">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      fill
                      className="object-cover border-2 border-black"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getStatusColor(game.status)} font-serif`}>
                        {game.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold font-serif">{game.title}</h3>
                      <p className="text-lg font-serif italic">{game.subtitle}</p>
                    </div>

                    <p className="text-sm font-serif leading-tight">{game.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="font-serif">{game.players.toLocaleString()} players</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span className="font-serif">{game.rewards}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {game.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 border border-black font-serif">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Button
                      onClick={() => handlePlayGame(game)}
                      className="w-full bg-black text-white hover:bg-gray-800 font-serif"
                      disabled={game.status === "coming-soon"}
                    >
                      {game.status === "coming-soon" ? (
                        "Coming Soon"
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Play Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournament Section */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            UPCOMING TOURNAMENTS & EVENTS
          </h2>

          <div className="space-y-4">
            {tournaments.map((tournament, index) => (
              <div key={index} className="border-4 border-black p-1">
                <div className="border-2 border-black p-4 bg-white">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={tournament.image || "/placeholder.svg"}
                        alt={tournament.name}
                        fill
                        className="object-cover border border-black"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold font-serif">{tournament.name}</h3>
                      <p className="text-sm font-serif text-gray-600">{tournament.game}</p>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-serif font-medium">Prize Pool:</span>
                          <p className="font-serif">{tournament.prize}</p>
                        </div>
                        <div>
                          <span className="font-serif font-medium">Date:</span>
                          <p className="font-serif">{tournament.date}</p>
                        </div>
                        <div>
                          <span className="font-serif font-medium">Participants:</span>
                          <p className="font-serif">{tournament.participants.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" className="font-serif border-black">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Categories */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            GAME CATEGORIES
          </h2>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="font-serif">
                All Games
              </TabsTrigger>
              <TabsTrigger value="boxing" className="font-serif">
                Boxing
              </TabsTrigger>
              <TabsTrigger value="racing" className="font-serif">
                Racing
              </TabsTrigger>
              <TabsTrigger value="trading" className="font-serif">
                Trading
              </TabsTrigger>
              <TabsTrigger value="rodeo" className="font-serif">
                Rodeo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                ))}
              </div>
            </TabsContent>

            {["boxing", "racing", "trading", "rodeo"].map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {games
                    .filter((game) => game.category === category)
                    .map((game) => (
                      <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* War Room Section */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            WAR ROOM COMMAND CENTER
          </h2>

          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4 bg-white">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold font-serif">Hackathon Dashboard & AI Agent Console</h3>
                <p className="font-serif text-gray-600">Monitor live deployments and manage AI trading agents</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="text-center p-3 border border-black">
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-serif font-medium">Live Monitoring</h4>
                  <p className="text-sm font-serif">Real-time deployment status</p>
                </div>
                <div className="text-center p-3 border border-black">
                  <Gamepad2 className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-serif font-medium">AI Agents</h4>
                  <p className="text-sm font-serif">Automated trading bots</p>
                </div>
                <div className="text-center p-3 border border-black">
                  <Trophy className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-serif font-medium">Hackathons</h4>
                  <p className="text-sm font-serif">Competition tracking</p>
                </div>
              </div>

              <div className="text-center">
                <Link href="https://warroom.crypto-clashers.games" target="_blank">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-serif">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Enter War Room
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GameCard({ game, onPlay }: { game: Game; onPlay: (game: Game) => void }) {
  return (
    <div className="border-2 border-black p-2 bg-white">
      <div className="relative h-32 mb-2">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover border border-black"
        />
      </div>
      <h3 className="font-serif font-medium text-sm">{game.title}</h3>
      <p className="font-serif text-xs text-gray-600 mb-2">{game.subtitle}</p>
      <Button
        onClick={() => onPlay(game)}
        size="sm"
        className="w-full text-xs font-serif"
        disabled={game.status === "coming-soon"}
      >
        {game.status === "coming-soon" ? "Soon" : "Play"}
      </Button>
    </div>
  )
}
