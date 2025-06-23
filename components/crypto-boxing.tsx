"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const fighters = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", power: 95, speed: 70, emoji: "₿", color: "orange" },
  { id: "eth", name: "Ethereum", symbol: "ETH", power: 85, speed: 80, emoji: "⟠", color: "blue" },
  { id: "sol", name: "Solana", symbol: "SOL", power: 75, speed: 95, emoji: "◎", color: "purple" },
  { id: "ada", name: "Cardano", symbol: "ADA", power: 70, speed: 85, emoji: "₳", color: "green" },
]

export function CryptoBoxing() {
  const [fighter1, setFighter1] = useState(null)
  const [fighter2, setFighter2] = useState(null)
  const [fighting, setFighting] = useState(false)
  const [winner, setWinner] = useState(null)
  const [fighter1Health, setFighter1Health] = useState(100)
  const [fighter2Health, setFighter2Health] = useState(100)

  const startFight = () => {
    if (!fighter1 || !fighter2) return

    setFighting(true)
    setWinner(null)
    setFighter1Health(100)
    setFighter2Health(100)

    const fightInterval = setInterval(() => {
      setFighter1Health((prev) => {
        const damage = Math.random() * 20
        const newHealth = Math.max(0, prev - damage)
        if (newHealth === 0) {
          clearInterval(fightInterval)
          setWinner(fighter2)
          setFighting(false)
        }
        return newHealth
      })

      setFighter2Health((prev) => {
        const damage = Math.random() * 20
        const newHealth = Math.max(0, prev - damage)
        if (newHealth === 0) {
          clearInterval(fightInterval)
          setWinner(fighter1)
          setFighting(false)
        }
        return newHealth
      })
    }, 500)

    setTimeout(() => {
      clearInterval(fightInterval)
      if (!winner) {
        setWinner(fighter1Health > fighter2Health ? fighter1 : fighter2)
        setFighting(false)
      }
    }, 10000)
  }

  const resetFight = () => {
    setFighter1(null)
    setFighter2(null)
    setWinner(null)
    setFighter1Health(100)
    setFighter2Health(100)
    setFighting(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-800 mb-2">CryptoClashers Arena</h2>
        <p className="text-amber-600">Choose your fighters and watch them battle!</p>
      </div>

      {/* Fighter Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fighters.map((fighter) => (
          <Card
            key={fighter.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              fighter1?.id === fighter.id || fighter2?.id === fighter.id ? "ring-2 ring-amber-500" : ""
            }`}
            onClick={() => {
              if (!fighter1) {
                setFighter1(fighter)
              } else if (!fighter2 && fighter1.id !== fighter.id) {
                setFighter2(fighter)
              }
            }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-4xl mb-2">{fighter.emoji}</div>
              <h3 className="font-bold">{fighter.name}</h3>
              <p className="text-sm text-gray-600">{fighter.symbol}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Power</span>
                  <span>{fighter.power}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Speed</span>
                  <span>{fighter.speed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Battle Arena */}
      {fighter1 && fighter2 && (
        <Card className="bg-gradient-to-r from-red-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-center">Battle Arena</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-6xl mb-2">{fighter1.emoji}</div>
                <h3 className="font-bold">{fighter1.name}</h3>
                <Progress value={fighter1Health} className="w-32 mt-2" />
                <p className="text-sm mt-1">{Math.round(fighter1Health)}% HP</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                {fighting && <Badge variant="destructive">FIGHTING!</Badge>}
                {winner && (
                  <Badge variant="default" className="bg-green-600">
                    {winner.name} WINS!
                  </Badge>
                )}
              </div>

              <div className="text-center">
                <div className="text-6xl mb-2">{fighter2.emoji}</div>
                <h3 className="font-bold">{fighter2.name}</h3>
                <Progress value={fighter2Health} className="w-32 mt-2" />
                <p className="text-sm mt-1">{Math.round(fighter2Health)}% HP</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={startFight} disabled={fighting || winner} className="bg-red-600 hover:bg-red-700">
                {fighting ? "Fighting..." : "START FIGHT!"}
              </Button>
              <Button onClick={resetFight} variant="outline">
                Reset Arena
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wyoming Land Buff System */}
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🏔️ Wyoming Land Buffs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700 mb-4">Own Wyoming land deeds to unlock fighter bonuses!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-2">⛰️</div>
              <h4 className="font-semibold">Mountain Power</h4>
              <p className="text-xs text-gray-600">+15% Attack Damage</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-2">🌪️</div>
              <h4 className="font-semibold">Prairie Speed</h4>
              <p className="text-xs text-gray-600">+20% Attack Speed</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-2">🦬</div>
              <h4 className="font-semibold">Bison Endurance</h4>
              <p className="text-xs text-gray-600">+25% Health</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
