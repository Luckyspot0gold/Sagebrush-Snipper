"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Volume2, VolumeX, Smartphone, Gamepad2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TouchEvent {
  type: "tap" | "swipe"
  direction?: "left" | "right" | "up" | "down"
  timestamp: number
}

export function MobileBoxingTest() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(100)
  const [opponentHealth, setOpponentHealth] = useState(100)
  const [combo, setCombo] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [touchEvents, setTouchEvents] = useState<TouchEvent[]>([])
  const [isAttacking, setIsAttacking] = useState(false)

  const ringRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const { toast } = useToast()

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isPlaying) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const deltaTime = Date.now() - touchStartRef.current.time

    // Determine if it's a tap or swipe
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < 30 && deltaTime < 300) {
      // Tap detected
      handleTap()
    } else if (distance > 50 && deltaTime < 500) {
      // Swipe detected
      const direction =
        Math.abs(deltaX) > Math.abs(deltaY) ? (deltaX > 0 ? "right" : "left") : deltaY > 0 ? "down" : "up"

      handleSwipe(direction)
    }

    touchStartRef.current = null
  }

  const handleTap = () => {
    const newEvent: TouchEvent = {
      type: "tap",
      timestamp: Date.now(),
    }
    setTouchEvents((prev) => [...prev.slice(-4), newEvent])
    executePunch("jab")
  }

  const handleSwipe = (direction: "left" | "right" | "up" | "down") => {
    const newEvent: TouchEvent = {
      type: "swipe",
      direction,
      timestamp: Date.now(),
    }
    setTouchEvents((prev) => [...prev.slice(-4), newEvent])

    switch (direction) {
      case "left":
        executePunch("hook")
        break
      case "right":
        executePunch("uppercut")
        break
      case "up":
        executePunch("special")
        break
      case "down":
        executeBlock()
        break
    }
  }

  const executePunch = (punchType: "jab" | "hook" | "uppercut" | "special") => {
    if (isAttacking) return

    setIsAttacking(true)

    const damage = {
      jab: 15,
      hook: 25,
      uppercut: 35,
      special: 50,
    }[punchType]

    const finalDamage = Math.floor(damage * (1 + combo * 0.1))
    const newOpponentHealth = Math.max(0, opponentHealth - finalDamage)

    setOpponentHealth(newOpponentHealth)
    setCombo((prev) => prev + 1)

    if (soundEnabled) {
      // Play punch sound
      const audio = new Audio("/sounds/punch.mp3")
      audio.volume = 0.5
      audio.play().catch(() => {})
    }

    toast({
      title: `${punchType.toUpperCase()}!`,
      description: `${finalDamage} damage! Combo: ${combo + 1}x`,
      duration: 1000,
    })

    setTimeout(() => setIsAttacking(false), 300)

    if (newOpponentHealth <= 0) {
      handleVictory()
    }
  }

  const executeBlock = () => {
    toast({
      title: "BLOCK!",
      description: "Defensive stance activated",
      duration: 800,
    })
  }

  const handleVictory = () => {
    setIsPlaying(false)
    toast({
      title: "🏆 VICTORY!",
      description: `You won with a ${combo}x combo!`,
      duration: 3000,
    })
  }

  const startFight = () => {
    setIsPlaying(true)
    setPlayerHealth(100)
    setOpponentHealth(100)
    setCombo(0)
    setTouchEvents([])
  }

  const resetFight = () => {
    setIsPlaying(false)
    setPlayerHealth(100)
    setOpponentHealth(100)
    setCombo(0)
    setTouchEvents([])
  }

  return (
    <div className="newspaper-bg min-h-screen p-4">
      <Card className="border-4 border-black shadow-lg max-w-4xl mx-auto newspaper-article">
        <CardHeader className="border-b-2 border-black bg-red-900 text-white">
          <CardTitle className="text-2xl font-serif headline-primary text-white flex items-center">
            <Smartphone className="mr-3 h-6 w-6" />
            MOBILE BOXING CONTROLS TEST
          </CardTitle>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="secondary" className="bg-white text-black">
              Touch Optimized
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-white hover:bg-white/20"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 newspaper-article-inner">
          {/* Game Stats */}
          <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
            <div className="flex gap-4">
              <Badge variant="outline" className="text-lg px-3 py-1 border-black">
                Combo: {combo}x
              </Badge>
              <Badge variant="outline" className="text-lg px-3 py-1 border-black">
                {isPlaying ? "FIGHTING" : "READY"}
              </Badge>
            </div>
          </div>

          {/* Health Bars */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-blue-600 headline-secondary">Player</h3>
              <Progress value={playerHealth} className="h-6 border-2 border-black" />
              <div className="text-sm font-serif">{playerHealth}/100 HP</div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-red-600 headline-secondary">Opponent</h3>
              <Progress value={opponentHealth} className="h-6 border-2 border-black" />
              <div className="text-sm font-serif">{opponentHealth}/100 HP</div>
            </div>
          </div>

          {/* Boxing Ring with Touch Controls */}
          <div className="mb-6">
            <div
              ref={ringRef}
              id="ring"
              className="relative w-full h-80 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-black rounded-lg overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "pan-y" }}
            >
              {/* Ring Canvas Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                    radial-gradient(circle at 25% 25%, #8b4513 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, #8b4513 2px, transparent 2px)
                  `,
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              {/* Fighters */}
              <div className="absolute bottom-8 left-16 w-16 h-24 bg-blue-500 rounded-lg flex items-center justify-center fighter-sprite player">
                <span className="text-white font-bold text-2xl">🥊</span>
              </div>
              <div className="absolute bottom-8 right-16 w-16 h-24 bg-red-500 rounded-lg flex items-center justify-center fighter-sprite opponent">
                <span className="text-white font-bold text-2xl">🥊</span>
              </div>

              {/* Touch Instructions */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <div className="text-center font-serif">
                    <Gamepad2 className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Touch Controls</h3>
                    <div className="text-sm space-y-1">
                      <div>👆 TAP: Quick Jab</div>
                      <div>👈 SWIPE LEFT: Hook</div>
                      <div>👉 SWIPE RIGHT: Uppercut</div>
                      <div>👆 SWIPE UP: Special Move</div>
                      <div>👇 SWIPE DOWN: Block</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Swipe Indicators */}
              {isPlaying && (
                <>
                  <div className="swipe-indicator left">👈</div>
                  <div className="swipe-indicator right">👉</div>
                </>
              )}
            </div>
          </div>

          {/* Button Controls (Fallback) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button
              onClick={() => executePunch("jab")}
              disabled={!isPlaying || isAttacking}
              className="punch-btn left-punch font-serif h-20"
            >
              👊 JAB
            </Button>
            <Button
              onClick={() => executePunch("hook")}
              disabled={!isPlaying || isAttacking}
              className="punch-btn font-serif h-20"
            >
              🤜 HOOK
            </Button>
            <Button
              onClick={() => executePunch("uppercut")}
              disabled={!isPlaying || isAttacking}
              className="punch-btn font-serif h-20"
            >
              ⬆️ UPPERCUT
            </Button>
            <Button
              onClick={() => executePunch("special")}
              disabled={!isPlaying || isAttacking}
              className="punch-btn right-punch font-serif h-20"
            >
              ⚡ SPECIAL
            </Button>
          </div>

          {/* Game Controls */}
          <div className="text-center space-y-4">
            {!isPlaying ? (
              <Button
                onClick={startFight}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-serif text-xl px-8 py-4"
              >
                START FIGHT!
              </Button>
            ) : (
              <Button
                onClick={resetFight}
                size="lg"
                variant="outline"
                className="border-black font-serif text-xl px-8 py-4 bg-transparent"
              >
                RESET FIGHT
              </Button>
            )}
          </div>

          {/* Touch Event Log */}
          <div className="mt-6 border-t-2 border-black pt-4">
            <h3 className="font-serif font-bold mb-2">Recent Touch Events:</h3>
            <div className="space-y-1 text-sm font-mono max-h-32 overflow-y-auto">
              {touchEvents.slice(-5).map((event, index) => (
                <div key={index} className="flex justify-between">
                  <span>{event.type.toUpperCase()}</span>
                  <span>{event.direction?.toUpperCase() || "N/A"}</span>
                  <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-muted-foreground mt-6 font-serif border-t-2 border-black pt-4">
            <p>📱 Optimized for mobile devices with touch controls and swipe gestures</p>
            <p className="mt-2">💡 Use touch gestures on the ring or tap the buttons below for different attacks</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MobileBoxingTest
