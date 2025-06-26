"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Coins, Volume2, VolumeX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFrontierAudio } from "@/lib/frontier-audio-system"

interface Fighter {
  name: string
  health: number
  maxHealth: number
  power: number
  speed: number
  defense: number
  image: string
  specialMove: string
}

interface GameState {
  player: Fighter
  opponent: Fighter
  isPlaying: boolean
  round: number
  tokensEarned: number
  combo: number
  gameMode: "krypto-ko" | "crypto-clashers" | "merged"
}

const KRYPTO_KO_FIGHTERS: Fighter[] = [
  {
    name: "Bitcoin Bull",
    health: 100,
    maxHealth: 100,
    power: 25,
    speed: 15,
    defense: 20,
    image: "/images/bull-vs-bear-bully.jpeg",
    specialMove: "Lightning Strike",
  },
  {
    name: "Ethereum Eagle",
    health: 100,
    maxHealth: 100,
    power: 22,
    speed: 25,
    defense: 18,
    image: "/images/crypto-clashers-fighter.png",
    specialMove: "Smart Contract Slam",
  },
]

const CRYPTO_CLASHERS_FIGHTERS: Fighter[] = [
  {
    name: "Crypto Wolf",
    health: 100,
    maxHealth: 100,
    power: 28,
    speed: 22,
    defense: 15,
    image: "/images/wolf-vs-bear-boxing.jpeg",
    specialMove: "Pack Attack",
  },
  {
    name: "Bear Market",
    health: 100,
    maxHealth: 100,
    power: 30,
    speed: 12,
    defense: 25,
    image: "/images/bears-boxing-arena.jpeg",
    specialMove: "Market Crash",
  },
]

export function EnhancedCryptoClashersBoxing() {
  const [gameState, setGameState] = useState<GameState>({
    player: KRYPTO_KO_FIGHTERS[0],
    opponent: CRYPTO_CLASHERS_FIGHTERS[0],
    isPlaying: false,
    round: 1,
    tokensEarned: 0,
    combo: 0,
    gameMode: "merged",
  })

  const [isAttacking, setIsAttacking] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const { toast } = useToast()
  const { playSuccess, playWarning, startAmbient, stopAmbient } = useFrontierAudio()

  // Sound effects
  const playPunchSound = () => {
    if (soundEnabled) {
      const audio = new Audio("/sounds/punch-hit.mp3")
      audio.volume = volume
      audio.play().catch(() => {})
    }
  }

  const playBellSound = () => {
    if (soundEnabled) {
      const audio = new Audio("/sounds/boxing-bell.mp3")
      audio.volume = volume
      audio.play().catch(() => {})
    }
  }

  const playVictorySound = () => {
    if (soundEnabled) {
      playSuccess()
    }
  }

  const startGame = () => {
    playBellSound()
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      player: { ...prev.player, health: prev.player.maxHealth },
      opponent: { ...prev.opponent, health: prev.opponent.maxHealth },
      combo: 0,
    }))

    // Start opponent AI with enhanced behavior
    gameLoopRef.current = setInterval(
      () => {
        const attackChance = Math.random()
        if (attackChance > 0.65) {
          // 35% chance opponent attacks
          opponentAttack()
        }
      },
      1800 + Math.random() * 1000,
    ) // Variable timing
  }

  const executeAttack = async (attackType: "jab" | "hook" | "uppercut" | "special") => {
    if (!gameState.isPlaying || isAttacking) return

    setIsAttacking(true)
    playPunchSound()

    // Enhanced damage calculation
    const baseDamage = {
      jab: 12,
      hook: 20,
      uppercut: 28,
      special: 35,
    }[attackType]

    const criticalHit = Math.random() < 0.15 // 15% crit chance
    const damage = Math.floor(
      baseDamage * (gameState.player.power / 100) * (0.8 + Math.random() * 0.4) * (criticalHit ? 1.5 : 1),
    )

    // Combo system
    const newCombo = gameState.combo + 1
    const comboDamage = Math.floor(damage * (1 + newCombo * 0.1))

    const newOpponentHealth = Math.max(0, gameState.opponent.health - comboDamage)

    setGameState((prev) => ({
      ...prev,
      opponent: { ...prev.opponent, health: newOpponentHealth },
      combo: newCombo,
    }))

    // Visual feedback
    if (criticalHit) {
      toast({
        title: "CRITICAL HIT!",
        description: `${comboDamage} damage dealt!`,
        duration: 1500,
      })
    }

    // Check for victory
    if (newOpponentHealth <= 0) {
      await handleVictory()
      setIsAttacking(false)
      return
    }

    setTimeout(() => setIsAttacking(false), 600)
  }

  const opponentAttack = () => {
    if (!gameState.isPlaying) return

    const damage = Math.floor(gameState.opponent.power * (0.7 + Math.random() * 0.6) * (gameState.opponent.power / 100))

    const newPlayerHealth = Math.max(0, gameState.player.health - damage)

    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, health: newPlayerHealth },
      combo: 0, // Reset combo on taking damage
    }))

    if (newPlayerHealth <= 0) {
      handleDefeat()
    }
  }

  const handleVictory = async () => {
    const baseTokens = 50
    const roundBonus = gameState.round * 10
    const comboBonus = gameState.combo * 5
    const tokensWon = baseTokens + roundBonus + comboBonus

    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      tokensEarned: prev.tokensEarned + tokensWon,
      round: prev.round + 1,
    }))

    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
    }

    playVictorySound()
    toast({
      title: "🏆 VICTORY!",
      description: `You earned ${tokensWon} CLASH tokens! (Combo: ${gameState.combo}x)`,
      duration: 3000,
    })

    // Mint victory NFT
    await mintVictoryNFT(tokensWon)
  }

  const handleDefeat = () => {
    setGameState((prev) => ({ ...prev, isPlaying: false, combo: 0 }))

    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
    }

    playWarning()
    toast({
      title: "💀 DEFEATED!",
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
          combo: gameState.combo,
          gameMode: gameState.gameMode,
          timestamp: Date.now(),
        }),
      })

      const result = await response.json()
      if (result.success) {
        toast({
          title: "🎖️ NFT MINTED!",
          description: `Victory NFT created: ${result.nftId}`,
          duration: 2000,
        })
      }
    } catch (error) {
      console.error("NFT minting failed:", error)
    }
  }

  const switchFighter = (fighter: Fighter) => {
    if (!gameState.isPlaying) {
      setGameState((prev) => ({
        ...prev,
        player: { ...fighter, health: fighter.maxHealth },
      }))
    }
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    if (!soundEnabled) {
      startAmbient()
    } else {
      stopAmbient()
    }
  }

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [])

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <Card className="border-4 border-black shadow-lg max-w-6xl mx-auto newspaper-article">
        <CardHeader className="border-b-2 border-black bg-red-900 text-white newspaper-article-inner">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-serif headline-primary text-white">
                🥊 CRYPTO CLASHERS BOXING ARENA 🥊
              </CardTitle>
              <CardDescription className="text-lg font-serif text-gray-200">
                Merged Krypto KO & Crypto Clashers Championship
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={toggleSound} className="text-white hover:bg-white/20">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 newspaper-article-inner">
          {/* Game Stats */}
          <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
            <div className="flex gap-4">
              <Badge variant="outline" className="text-lg px-3 py-1 border-black">
                Round {gameState.round}
              </Badge>
              <Badge variant="outline" className="text-lg px-3 py-1 border-black">
                Combo: {gameState.combo}x
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-mono text-xl">{gameState.tokensEarned} CLASH</span>
            </div>
          </div>

          {/* Fighter Selection */}
          {!gameState.isPlaying && (
            <div className="mb-6 border-4 border-black p-4">
              <h3 className="text-xl font-serif headline-secondary mb-4 text-center">Choose Your Fighter</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...KRYPTO_KO_FIGHTERS, ...CRYPTO_CLASHERS_FIGHTERS].map((fighter, index) => (
                  <div
                    key={fighter.name}
                    className={`border-2 p-3 rounded cursor-pointer transition-all ${
                      gameState.player.name === fighter.name
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    onClick={() => switchFighter(fighter)}
                  >
                    <img
                      src={fighter.image || "/placeholder.svg"}
                      alt={fighter.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <h4 className="font-serif font-bold text-sm">{fighter.name}</h4>
                    <div className="text-xs space-y-1">
                      <div>Power: {fighter.power}</div>
                      <div>Speed: {fighter.speed}</div>
                      <div>Defense: {fighter.defense}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fighting Arena */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Player */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="font-bold text-xl text-blue-600 headline-secondary">{gameState.player.name}</h3>
                <div
                  className={`w-40 h-40 mx-auto bg-blue-100 rounded-lg flex items-center justify-center transition-transform ${
                    isAttacking ? "scale-110 rotate-3" : "scale-100"
                  }`}
                >
                  <img
                    src={gameState.player.image || "/placeholder.svg"}
                    alt={gameState.player.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-serif">
                  <span>Health</span>
                  <span>
                    {gameState.player.health}/{gameState.player.maxHealth}
                  </span>
                </div>
                <Progress
                  value={(gameState.player.health / gameState.player.maxHealth) * 100}
                  className="h-4 border border-black"
                />
              </div>
            </div>

            {/* VS Divider */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-4xl font-bold text-muted-foreground headline-primary">VS</div>
            </div>

            {/* Opponent */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="font-bold text-xl text-red-600 headline-secondary">{gameState.opponent.name}</h3>
                <div className="w-40 h-40 mx-auto bg-red-100 rounded-lg flex items-center justify-center">
                  <img
                    src={gameState.opponent.image || "/placeholder.svg"}
                    alt={gameState.opponent.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-serif">
                  <span>Health</span>
                  <span>
                    {gameState.opponent.health}/{gameState.opponent.maxHealth}
                  </span>
                </div>
                <Progress
                  value={(gameState.opponent.health / gameState.opponent.maxHealth) * 100}
                  className="h-4 border border-black"
                />
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="text-center space-y-4">
            {!gameState.isPlaying ? (
              <Button
                onClick={startGame}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-serif text-xl px-8 py-4"
              >
                <Zap className="mr-2 h-5 w-5" />
                START FIGHT!
              </Button>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => executeAttack("jab")}
                  disabled={isAttacking}
                  className="frontier-button font-serif"
                >
                  👊 JAB (12 dmg)
                </Button>
                <Button
                  onClick={() => executeAttack("hook")}
                  disabled={isAttacking}
                  className="frontier-button font-serif"
                >
                  🤜 HOOK (20 dmg)
                </Button>
                <Button
                  onClick={() => executeAttack("uppercut")}
                  disabled={isAttacking}
                  className="frontier-button font-serif"
                >
                  ⬆️ UPPERCUT (28 dmg)
                </Button>
                <Button
                  onClick={() => executeAttack("special")}
                  disabled={isAttacking}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-serif"
                >
                  ⚡ {gameState.player.specialMove} (35 dmg)
                </Button>
              </div>
            )}
          </div>

          {/* Game Instructions */}
          <div className="text-center text-sm text-muted-foreground mt-6 font-serif border-t-2 border-black pt-4">
            <p>
              🥊 Enhanced boxing with combo system, critical hits, and special moves! Win fights to earn CLASH tokens
              and mint victory NFTs.
            </p>
            <p className="mt-2">
              💡 Build combos for bonus damage • 15% critical hit chance • Special moves deal massive damage
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
