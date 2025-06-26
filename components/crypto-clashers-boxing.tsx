"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins } from "lucide-react"

interface BoxingStats {
  playerHealth: number
  opponentHealth: number
  round: number
  score: number
  tokensEarned: number
}

interface Fighter {
  name: string
  image: string
  power: number
  speed: number
  defense: number
}

const FIGHTERS: Fighter[] = [
  { name: "Crypto Wolf", image: "/images/wolf-vs-bear-boxing.jpeg", power: 85, speed: 90, defense: 75 },
  { name: "Bitcoin Bull", image: "/images/bull-vs-bear-bully.jpeg", power: 95, speed: 70, defense: 85 },
  { name: "Ethereum Bear", image: "/images/bears-boxing-arena.jpeg", power: 80, speed: 85, defense: 90 },
]

export function CryptoClashersBoxing() {
  const [gameState, setGameState] = useState<"menu" | "fighting" | "victory" | "defeat">("menu")
  const [stats, setStats] = useState<BoxingStats>({
    playerHealth: 100,
    opponentHealth: 100,
    round: 1,
    score: 0,
    tokensEarned: 0,
  })
  const [selectedFighter, setSelectedFighter] = useState<Fighter>(FIGHTERS[0])
  const [opponent, setOpponent] = useState<Fighter>(FIGHTERS[1])
  const [isAttacking, setIsAttacking] = useState(false)
  const [combatLog, setCombatLog] = useState<string[]>([])
  const gameRef = useRef<HTMLDivElement>(null)

  const startFight = () => {
    setGameState("fighting")
    setStats({
      playerHealth: 100,
      opponentHealth: 100,
      round: 1,
      score: 0,
      tokensEarned: 0,
    })
    setCombatLog(["🥊 Fight begins! May the best fighter win!"])
  }

  const executeAttack = async (attackType: "jab" | "hook" | "uppercut") => {
    if (isAttacking || gameState !== "fighting") return

    if (!selectedFighter || !opponent) {
      console.error("Missing fighter data")
      return
    }

    if (stats.playerHealth <= 0 || stats.opponentHealth <= 0) {
      console.warn("Game already ended")
      return
    }

    setIsAttacking(true)

    // Calculate damage based on attack type and fighter stats
    const baseDamage = {
      jab: 15,
      hook: 25,
      uppercut: 35,
    }[attackType]

    const damage = Math.floor(baseDamage * (selectedFighter.power / 100) * (0.8 + Math.random() * 0.4))
    const opponentDamage = Math.floor(20 * (opponent.power / 100) * (0.7 + Math.random() * 0.6))

    // Player attacks first
    const newOpponentHealth = Math.max(0, stats.opponentHealth - damage)
    setCombatLog((prev) => [...prev, `💥 You land a ${attackType} for ${damage} damage!`])

    setStats((prev) => ({
      ...prev,
      opponentHealth: newOpponentHealth,
      score: prev.score + damage,
    }))

    // Check if opponent is defeated
    if (newOpponentHealth <= 0) {
      const tokensEarned = Math.floor(50 + stats.score / 10)
      setStats((prev) => ({ ...prev, tokensEarned }))
      setGameState("victory")
      setCombatLog((prev) => [...prev, `🏆 Victory! You earned ${tokensEarned} STONES tokens!`])

      // Mint NFT reward
      await mintBoxingNFT(tokensEarned)

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
      }))

      // Check if player is defeated
      if (newPlayerHealth <= 0) {
        setGameState("defeat")
        setCombatLog((prev) => [...prev, "💀 Defeat! Better luck next time, partner!"])
      }

      setIsAttacking(false)
    }, 1000)
  }

  const mintBoxingNFT = async (tokensEarned: number) => {
    try {
      if (!selectedFighter || !opponent) {
        console.warn("Missing fighter or opponent data for NFT minting")
        return
      }

      const response = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "boxing_victory",
          fighter: selectedFighter.name,
          opponent: opponent.name,
          tokensEarned,
          timestamp: Date.now(),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        setCombatLog((prev) => [...prev, `🎖️ Victory NFT minted! TX: ${result.txHash?.slice(0, 10)}...`])
      } else {
        throw new Error(result.error || "NFT minting failed")
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
    <Card className="border-4 border-black shadow-lg max-w-4xl mx-auto">
      <CardHeader className="border-b-2 border-black bg-red-900 text-white">
        <CardTitle className="text-2xl font-serif text-center">🥊 CRYPTO CLASHERS BOXING ARENA 🥊</CardTitle>
      </CardHeader>

      <CardContent className="p-6" ref={gameRef}>
        {gameState === "menu" && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-serif mb-4">Choose Your Fighter</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FIGHTERS.map((fighter, index) => (
                  <div
                    key={fighter.name}
                    className={`border-2 p-4 rounded cursor-pointer transition-all ${
                      selectedFighter.name === fighter.name
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedFighter(fighter)}
                  >
                    <img
                      src={fighter.image || "/placeholder.svg"}
                      alt={fighter.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h4 className="font-serif font-bold">{fighter.name}</h4>
                    <div className="text-sm space-y-1">
                      <div>Power: {fighter.power}</div>
                      <div>Speed: {fighter.speed}</div>
                      <div>Defense: {fighter.defense}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button onClick={startFight} className="frontier-button font-serif text-lg px-8 py-3">
                🥊 Enter the Ring!
              </Button>
            </div>
          </div>
        )}

        {gameState === "fighting" && (
          <div className="space-y-6">
            {/* Health Bars */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif font-bold mb-2">{selectedFighter.name}</h3>
                <Progress value={stats.playerHealth} className="h-4 mb-2" />
                <div className="text-sm text-center">{stats.playerHealth}/100 HP</div>
              </div>
              <div>
                <h3 className="font-serif font-bold mb-2">{opponent.name}</h3>
                <Progress value={stats.opponentHealth} className="h-4 mb-2" />
                <div className="text-sm text-center">{stats.opponentHealth}/100 HP</div>
              </div>
            </div>

            {/* Fighting Arena */}
            <div className="bg-gray-800 rounded-lg p-6 text-center relative overflow-hidden">
              <div className="grid grid-cols-2 gap-8 items-center">
                <div className={`transition-transform ${isAttacking ? "scale-110" : "scale-100"}`}>
                  <img
                    src={selectedFighter.image || "/placeholder.svg"}
                    alt={selectedFighter.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-blue-500"
                  />
                </div>
                <div>
                  <img
                    src={opponent.image || "/placeholder.svg"}
                    alt={opponent.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Attack Buttons */}
            <div className="flex justify-center gap-4">
              <Button onClick={() => executeAttack("jab")} disabled={isAttacking} className="frontier-button">
                👊 Jab (15 dmg)
              </Button>
              <Button onClick={() => executeAttack("hook")} disabled={isAttacking} className="frontier-button">
                🤜 Hook (25 dmg)
              </Button>
              <Button onClick={() => executeAttack("uppercut")} disabled={isAttacking} className="frontier-button">
                ⬆️ Uppercut (35 dmg)
              </Button>
            </div>

            {/* Combat Log */}
            <div className="bg-gray-100 rounded p-4 h-32 overflow-y-auto">
              <h4 className="font-serif font-bold mb-2">Combat Log:</h4>
              {combatLog.map((log, index) => (
                <div key={index} className="text-sm font-serif">
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

            <h3 className="text-2xl font-serif">{gameState === "victory" ? "VICTORY!" : "DEFEAT!"}</h3>

            {gameState === "victory" && (
              <div className="space-y-2">
                <Badge variant="default" className="text-lg p-2">
                  <Coins className="h-4 w-4 mr-2" />
                  {stats.tokensEarned} STONES Earned!
                </Badge>
                <div className="text-sm font-serif text-gray-600">Victory NFT has been minted to your wallet!</div>
              </div>
            )}

            <Button onClick={resetGame} className="frontier-button font-serif">
              🔄 Fight Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
