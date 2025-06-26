"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins } from "lucide-react"
import Image from "next/image"

interface BoxingStats {
  playerHealth: number
  opponentHealth: number
  round: number
  score: number
  tokensEarned: number
  combo: number
  powerLevel: number
}

interface KryptoFighter {
  id: string
  name: string
  image: string
  power: number
  speed: number
  defense: number
  special: string
  marketTicker: string
  currentPrice: number
  priceChange: number
}

const KRYPTO_FIGHTERS: KryptoFighter[] = [
  {
    id: "bitcoin-bull",
    name: "Bitcoin Bull",
    image: "/images/bull-vs-bear-bully.jpeg",
    power: 95,
    speed: 70,
    defense: 85,
    special: "Lightning Strike",
    marketTicker: "BTC",
    currentPrice: 43250.0,
    priceChange: 2.3,
  },
  {
    id: "ethereum-bear",
    name: "Ethereum Bear",
    image: "/images/bears-boxing-arena.jpeg",
    power: 80,
    speed: 85,
    defense: 90,
    special: "Smart Contract Slam",
    marketTicker: "ETH",
    currentPrice: 2650.0,
    priceChange: -1.8,
  },
  {
    id: "crypto-wolf",
    name: "Crypto Wolf",
    image: "/images/wolf-vs-bear-boxing.jpeg",
    power: 85,
    speed: 90,
    defense: 75,
    special: "Pack Attack",
    marketTicker: "DOGE",
    currentPrice: 0.08,
    priceChange: 5.2,
  },
  {
    id: "wyoming-warrior",
    name: "Wyoming Warrior",
    image: "/images/crypto-clashers-fighter.png",
    power: 88,
    speed: 82,
    defense: 88,
    special: "Frontier Fury",
    marketTicker: "WYO",
    currentPrice: 1.25,
    priceChange: 12.5,
  },
]

export function CryptoClashersBoxingEnhanced() {
  const [gameState, setGameState] = useState<"menu" | "fighting" | "victory" | "defeat">("menu")
  const [stats, setStats] = useState<BoxingStats>({
    playerHealth: 100,
    opponentHealth: 100,
    round: 1,
    score: 0,
    tokensEarned: 0,
    combo: 0,
    powerLevel: 100,
  })
  const [selectedFighter, setSelectedFighter] = useState<KryptoFighter>(KRYPTO_FIGHTERS[0])
  const [opponent, setOpponent] = useState<KryptoFighter>(KRYPTO_FIGHTERS[1])
  const [isAttacking, setIsAttacking] = useState(false)
  const [combatLog, setCombatLog] = useState<string[]>([])
  const [marketData, setMarketData] = useState<any>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  // Simulate real-time market data affecting fighter power
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData({
        btc: 43250 + (Math.random() - 0.5) * 1000,
        eth: 2650 + (Math.random() - 0.5) * 100,
        doge: 0.08 + (Math.random() - 0.5) * 0.01,
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const startKryptoFight = () => {
    setGameState("fighting")
    setStats({
      playerHealth: 100,
      opponentHealth: 100,
      round: 1,
      score: 0,
      tokensEarned: 0,
      combo: 0,
      powerLevel: 100,
    })
    setCombatLog([`🥊 ${selectedFighter.name} vs ${opponent.name} - Fight begins!`])
  }

  const executeKryptoAttack = async (attackType: "jab" | "hook" | "uppercut" | "special") => {
    if (isAttacking || gameState !== "fighting") return

    setIsAttacking(true)

    // Market-influenced damage calculation
    const marketMultiplier = selectedFighter.priceChange > 0 ? 1.2 : 0.8
    const baseDamage = {
      jab: 15,
      hook: 25,
      uppercut: 35,
      special: 50,
    }[attackType]

    const damage = Math.floor(
      baseDamage * (selectedFighter.power / 100) * marketMultiplier * (0.8 + Math.random() * 0.4),
    )

    const opponentDamage = Math.floor(20 * (opponent.power / 100) * (0.7 + Math.random() * 0.6))

    // Player attacks first
    const newOpponentHealth = Math.max(0, stats.opponentHealth - damage)
    const newCombo = stats.combo + 1

    setCombatLog((prev) => [
      ...prev,
      `💥 ${selectedFighter.name} lands a ${attackType} for ${damage} damage! (${selectedFighter.marketTicker} ${selectedFighter.priceChange > 0 ? "📈" : "📉"})`,
    ])

    setStats((prev) => ({
      ...prev,
      opponentHealth: newOpponentHealth,
      score: prev.score + damage,
      combo: newCombo,
      powerLevel: Math.min(100, prev.powerLevel + 5),
    }))

    // Check if opponent is defeated
    if (newOpponentHealth <= 0) {
      const tokensEarned = Math.floor(50 + stats.score / 10 + newCombo * 5)
      setStats((prev) => ({ ...prev, tokensEarned }))
      setGameState("victory")
      setCombatLog((prev) => [
        ...prev,
        `🏆 VICTORY! ${selectedFighter.name} wins!`,
        `💰 Earned ${tokensEarned} KRYPTO tokens!`,
        `🎖️ ${newCombo}-hit combo bonus!`,
      ])

      await mintKryptoNFT(tokensEarned, newCombo)
      setIsAttacking(false)
      return
    }

    // Opponent counter-attacks
    setTimeout(() => {
      const newPlayerHealth = Math.max(0, stats.playerHealth - opponentDamage)
      setCombatLog((prev) => [...prev, `🔥 ${opponent.name} counters for ${opponentDamage} damage!`])

      setStats((prev) => ({
        ...prev,
        playerHealth: newPlayerHealth,
        combo: 0, // Reset combo on taking damage
      }))

      if (newPlayerHealth <= 0) {
        setGameState("defeat")
        setCombatLog((prev) => [...prev, "💀 Defeat! The market has spoken!"])
      }

      setIsAttacking(false)
    }, 1000)
  }

  const mintKryptoNFT = async (tokensEarned: number, combo: number) => {
    try {
      const response = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "krypto_boxing_victory",
          fighter: selectedFighter.name,
          opponent: opponent.name,
          tokensEarned,
          combo,
          marketData: {
            ticker: selectedFighter.marketTicker,
            priceChange: selectedFighter.priceChange,
          },
          timestamp: Date.now(),
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setCombatLog((prev) => [...prev, `🎖️ Victory NFT minted! TX: ${result.txHash?.slice(0, 10)}...`])
      }
    } catch (error: any) {
      console.error("NFT minting failed:", error)
      setCombatLog((prev) => [...prev, `⚠️ NFT minting failed: ${error.message}`])
    }
  }

  const resetGame = () => {
    setGameState("menu")
    setCombatLog([])
  }

  return (
    <div className="newspaper-article">
      <div className="newspaper-article-inner">
        <h2 className="newspaper-section-title">🥊 KRYPTO BOXING ARENA 🥊</h2>
        <p className="newspaper-paragraph text-center">
          Where Market Volatility Meets Combat Sports - Real-time crypto prices power your punches!
        </p>

        <Card className="border-4 border-black shadow-lg">
          <CardHeader className="border-b-2 border-black bg-gradient-to-r from-red-900 to-yellow-900 text-white">
            <CardTitle className="text-2xl font-serif text-center">CRYPTO CLASHERS: KRYPTO EDITION</CardTitle>
            {marketData && (
              <div className="flex justify-center gap-4 text-sm">
                <span>BTC: ${marketData.btc?.toFixed(0)}</span>
                <span>ETH: ${marketData.eth?.toFixed(0)}</span>
                <span>DOGE: ${marketData.doge?.toFixed(3)}</span>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-6" ref={gameRef}>
            {gameState === "menu" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-serif mb-4">Choose Your Krypto Fighter</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {KRYPTO_FIGHTERS.map((fighter) => (
                      <div
                        key={fighter.id}
                        className={`border-2 p-4 rounded cursor-pointer transition-all ${
                          selectedFighter.id === fighter.id
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-300 hover:border-gray-500"
                        }`}
                        onClick={() => setSelectedFighter(fighter)}
                      >
                        <div className="relative h-32 mb-2">
                          <Image
                            src={fighter.image || "/placeholder.svg"}
                            alt={fighter.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <h4 className="font-serif font-bold">{fighter.name}</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Power:</span>
                            <span>{fighter.power}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Speed:</span>
                            <span>{fighter.speed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Defense:</span>
                            <span>{fighter.defense}</span>
                          </div>
                          <div className="text-xs bg-gray-100 p-1 rounded">
                            {fighter.marketTicker}: ${fighter.currentPrice}
                            <span className={fighter.priceChange > 0 ? "text-green-600" : "text-red-600"}>
                              {fighter.priceChange > 0 ? " ↗" : " ↘"} {Math.abs(fighter.priceChange)}%
                            </span>
                          </div>
                          <div className="text-xs italic">{fighter.special}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={startKryptoFight} className="frontier-button font-serif text-lg px-8 py-3">
                    🥊 Enter the Krypto Ring!
                  </Button>
                </div>
              </div>
            )}

            {gameState === "fighting" && (
              <div className="space-y-6">
                {/* Enhanced Health Bars with Market Info */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-serif font-bold">{selectedFighter.name}</h3>
                      <Badge className="bg-blue-500 text-white">{selectedFighter.marketTicker}</Badge>
                    </div>
                    <Progress value={stats.playerHealth} className="h-4 mb-2" />
                    <div className="text-sm text-center">{stats.playerHealth}/100 HP</div>
                    <div className="text-xs text-center">Combo: {stats.combo}x</div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-serif font-bold">{opponent.name}</h3>
                      <Badge className="bg-red-500 text-white">{opponent.marketTicker}</Badge>
                    </div>
                    <Progress value={stats.opponentHealth} className="h-4 mb-2" />
                    <div className="text-sm text-center">{stats.opponentHealth}/100 HP</div>
                  </div>
                </div>

                {/* Enhanced Fighting Arena */}
                <div className="bg-gradient-to-br from-gray-900 via-red-900 to-yellow-900 rounded-lg p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="relative grid grid-cols-2 gap-8 items-center">
                    <div className={`transition-all duration-300 ${isAttacking ? "scale-110 rotate-12" : "scale-100"}`}>
                      <Image
                        src={selectedFighter.image || "/placeholder.svg"}
                        alt={selectedFighter.name}
                        width={128}
                        height={128}
                        className="object-cover rounded-full mx-auto border-4 border-blue-500"
                      />
                      <div className="text-white text-sm mt-2">{selectedFighter.special}</div>
                    </div>
                    <div>
                      <Image
                        src={opponent.image || "/placeholder.svg"}
                        alt={opponent.name}
                        width={128}
                        height={128}
                        className="object-cover rounded-full mx-auto border-4 border-red-500"
                      />
                      <div className="text-white text-sm mt-2">{opponent.special}</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Attack Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button onClick={() => executeKryptoAttack("jab")} disabled={isAttacking} className="frontier-button">
                    👊 Jab
                    <br />
                    <span className="text-xs">(15 dmg)</span>
                  </Button>
                  <Button
                    onClick={() => executeKryptoAttack("hook")}
                    disabled={isAttacking}
                    className="frontier-button"
                  >
                    🤜 Hook
                    <br />
                    <span className="text-xs">(25 dmg)</span>
                  </Button>
                  <Button
                    onClick={() => executeKryptoAttack("uppercut")}
                    disabled={isAttacking}
                    className="frontier-button"
                  >
                    ⬆️ Uppercut
                    <br />
                    <span className="text-xs">(35 dmg)</span>
                  </Button>
                  <Button
                    onClick={() => executeKryptoAttack("special")}
                    disabled={isAttacking || stats.powerLevel < 50}
                    className="frontier-button bg-yellow-600 hover:bg-yellow-700"
                  >
                    ⚡ Special
                    <br />
                    <span className="text-xs">(50 dmg)</span>
                  </Button>
                </div>

                {/* Power Level Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-serif">Special Power</span>
                    <span className="text-sm">{stats.powerLevel}/100</span>
                  </div>
                  <Progress value={stats.powerLevel} className="h-2" />
                </div>

                {/* Enhanced Combat Log */}
                <div className="bg-gray-100 rounded p-4 h-40 overflow-y-auto">
                  <h4 className="font-serif font-bold mb-2">Combat Log:</h4>
                  {combatLog.map((log, index) => (
                    <div key={index} className="text-sm font-serif mb-1">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(gameState === "victory" || gameState === "defeat") && (
              <div className="text-center space-y-6">
                <div className={`text-6xl ${gameState === "victory" ? "text-yellow-500" : "text-red-500"}`}>
                  {gameState === "victory" ? "🏆" : "💀"}
                </div>

                <h3 className="text-2xl font-serif">
                  {gameState === "victory" ? "KRYPTO VICTORY!" : "MARKET DEFEAT!"}
                </h3>

                {gameState === "victory" && (
                  <div className="space-y-2">
                    <Badge variant="default" className="text-lg p-2">
                      <Coins className="h-4 w-4 mr-2" />
                      {stats.tokensEarned} KRYPTO Earned!
                    </Badge>
                    <div className="text-sm font-serif text-gray-600">
                      Victory NFT minted with {stats.combo}x combo bonus!
                    </div>
                    <div className="text-xs text-gray-500">
                      Market performance: {selectedFighter.marketTicker} {selectedFighter.priceChange > 0 ? "📈" : "📉"}{" "}
                      {Math.abs(selectedFighter.priceChange)}%
                    </div>
                  </div>
                )}

                <Button onClick={resetGame} className="frontier-button font-serif">
                  🔄 Fight Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
