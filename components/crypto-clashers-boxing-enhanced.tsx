"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Trophy, Coins } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Fighter {
  name: string
  health: number
  maxHealth: number
  power: number
  image: string
}

interface GameState {
  player: Fighter
  opponent: Fighter
  isPlaying: boolean
  round: number
  tokensEarned: number
}

export function CryptoClashersBoxingEnhanced() {
  const [gameState, setGameState] = useState<GameState>({
    player: {
      name: "Crypto Crusher",
      health: 100,
      maxHealth: 100,
      power: 20,
      image: "/images/crypto-clashers-fighter.png",
    },
    opponent: {
      name: "Bear Market",
      health: 100,
      maxHealth: 100,
      power: 15,
      image: "/images/bears-boxing-arena.jpeg",
    },
    isPlaying: false,
    round: 1,
    tokensEarned: 0,
  })

  const [isAttacking, setIsAttacking] = useState(false)
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const { toast } = useToast()

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      player: { ...prev.player, health: prev.player.maxHealth },
      opponent: { ...prev.opponent, health: prev.opponent.maxHealth },
    }))

    // Start opponent AI
    gameLoopRef.current = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance opponent attacks
        opponentAttack()
      }
    }, 2000)
  }

  const playerAttack = async () => {
    if (!gameState.isPlaying || isAttacking) return

    setIsAttacking(true)

    // Calculate damage
    const damage = gameState.player.power + Math.floor(Math.random() * 10)

    setGameState((prev) => ({
      ...prev,
      opponent: {
        ...prev.opponent,
        health: Math.max(0, prev.opponent.health - damage),
      },
    }))

    // Check for victory
    if (gameState.opponent.health - damage <= 0) {
      await handleVictory()
    }

    setTimeout(() => setIsAttacking(false), 500)
  }

  const opponentAttack = () => {
    if (!gameState.isPlaying) return

    const damage = gameState.opponent.power + Math.floor(Math.random() * 8)

    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        health: Math.max(0, prev.player.health - damage),
      },
    }))

    // Check for defeat
    if (gameState.player.health - damage <= 0) {
      handleDefeat()
    }
  }

  const handleVictory = async () => {
    const tokensWon = 50 + gameState.round * 10

    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      tokensEarned: prev.tokensEarned + tokensWon,
      round: prev.round + 1,
    }))

    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
    }

    toast({
      title: "Victory!",
      description: `You earned ${tokensWon} CLASH tokens!`,
    })

    // Mint victory NFT (simulated)
    await mintVictoryNFT(tokensWon)
  }

  const handleDefeat = () => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
    }))

    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
    }

    toast({
      title: "Defeated!",
      description: "Better luck next time, fighter!",
      variant: "destructive",
    })
  }

  const mintVictoryNFT = async (tokensEarned: number) => {
    try {
      const response = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "boxing_victory",
          fighter: gameState.player.name,
          opponent: gameState.opponent.name,
          tokensEarned,
          timestamp: Date.now(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "NFT Minted!",
          description: `Victory NFT created: ${result.nftId}`,
        })
      }
    } catch (error) {
      console.error("NFT minting failed:", error)
    }
  }

  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, health: prev.player.maxHealth },
      opponent: { ...prev.opponent, health: prev.opponent.maxHealth },
      isPlaying: false,
      round: 1,
    }))
  }

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Crypto Clashers Boxing Arena
        </CardTitle>
        <CardDescription>Fight your way to crypto glory and earn CLASH tokens!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Game Stats */}
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-lg px-3 py-1">
            Round {gameState.round}
          </Badge>
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="font-mono">{gameState.tokensEarned} CLASH</span>
          </div>
        </div>

        {/* Fighters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player */}
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="font-bold text-lg text-blue-600">{gameState.player.name}</h3>
              <div className="w-32 h-32 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🥊</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Health</span>
                <span>
                  {gameState.player.health}/{gameState.player.maxHealth}
                </span>
              </div>
              <Progress value={(gameState.player.health / gameState.player.maxHealth) * 100} className="h-3" />
            </div>
          </div>

          {/* VS Divider */}
          <div className="hidden md:flex items-center justify-center">
            <div className="text-2xl font-bold text-muted-foreground">VS</div>
          </div>

          {/* Opponent */}
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="font-bold text-lg text-red-600">{gameState.opponent.name}</h3>
              <div className="w-32 h-32 mx-auto bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🐻</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Health</span>
                <span>
                  {gameState.opponent.health}/{gameState.opponent.maxHealth}
                </span>
              </div>
              <Progress value={(gameState.opponent.health / gameState.opponent.maxHealth) * 100} className="h-3" />
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4">
          {!gameState.isPlaying ? (
            <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
              <Zap className="mr-2 h-4 w-4" />
              Start Fight
            </Button>
          ) : (
            <Button onClick={playerAttack} disabled={isAttacking} size="lg" className="bg-red-600 hover:bg-red-700">
              {isAttacking ? "Punching..." : "PUNCH!"}
            </Button>
          )}

          <Button onClick={resetGame} variant="outline" size="lg">
            Reset Game
          </Button>
        </div>

        {/* Game Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Click PUNCH to attack! Win fights to earn CLASH tokens and mint victory NFTs.</p>
        </div>
      </CardContent>
    </Card>
  )
}
