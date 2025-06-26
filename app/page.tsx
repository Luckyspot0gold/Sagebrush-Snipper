"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Boxer {
  id: string
  x: number
  y: number
  width: number
  height: number
  health: number
  maxHealth: number
  isAttacking: boolean
  attackCooldown: number
  hitboxActive: boolean
  facing: "left" | "right"
  stunned: boolean
  velocity: { x: number; y: number }
}

interface HitEffect {
  id: string
  x: number
  y: number
  damage: number
  timestamp: number
}

export default function BoxingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const keysPressed = useRef<Set<string>>(new Set())

  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameOver">("menu")
  const [winner, setWinner] = useState<string | null>(null)

  const [player1, setPlayer1] = useState<Boxer>({
    id: "player1",
    x: 100,
    y: 200,
    width: 60,
    height: 80,
    health: 100,
    maxHealth: 100,
    isAttacking: false,
    attackCooldown: 0,
    hitboxActive: false,
    facing: "right",
    stunned: false,
    velocity: { x: 0, y: 0 },
  })

  const [player2, setPlayer2] = useState<Boxer>({
    id: "player2",
    x: 640,
    y: 200,
    width: 60,
    height: 80,
    health: 100,
    maxHealth: 100,
    isAttacking: false,
    attackCooldown: 0,
    hitboxActive: false,
    facing: "left",
    stunned: false,
    velocity: { x: 0, y: 0 },
  })

  const [hitEffects, setHitEffects] = useState<HitEffect[]>([])

  // Collision detection function
  const checkCollision = (
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number },
  ) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    )
  }

  // Get attack hitbox for a boxer
  const getAttackHitbox = (boxer: Boxer) => {
    const hitboxWidth = 40
    const hitboxHeight = 30
    const hitboxX = boxer.facing === "right" ? boxer.x + boxer.width : boxer.x - hitboxWidth
    const hitboxY = boxer.y + 20

    return { x: hitboxX, y: hitboxY, width: hitboxWidth, height: hitboxHeight }
  }

  // Handle attack logic
  const handleAttack = useCallback((attacker: Boxer, defender: Boxer) => {
    if (!attacker.hitboxActive || defender.stunned) return { attacker, defender, hit: false }

    const attackHitbox = getAttackHitbox(attacker)
    const defenderHitbox = { x: defender.x, y: defender.y, width: defender.width, height: defender.height }

    if (checkCollision(attackHitbox, defenderHitbox)) {
      const damage = Math.floor(Math.random() * 15) + 10 // 10-25 damage
      const newHealth = Math.max(0, defender.health - damage)

      // Add hit effect
      setHitEffects((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          x: defender.x + defender.width / 2,
          y: defender.y + defender.height / 2,
          damage,
          timestamp: Date.now(),
        },
      ])

      // Knockback effect
      const knockbackForce = 15
      const knockbackX = attacker.facing === "right" ? knockbackForce : -knockbackForce

      return {
        attacker: { ...attacker, hitboxActive: false },
        defender: {
          ...defender,
          health: newHealth,
          stunned: true,
          velocity: { x: knockbackX, y: -5 },
        },
        hit: true,
      }
    }

    return { attacker, defender, hit: false }
  }, [])

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState !== "playing") return

    setPlayer1((prev) => {
      const newPlayer = { ...prev }

      // Handle movement
      if (keysPressed.current.has("a") || keysPressed.current.has("A")) {
        newPlayer.x = Math.max(0, newPlayer.x - 5)
        newPlayer.facing = "left"
      }
      if (keysPressed.current.has("d") || keysPressed.current.has("D")) {
        newPlayer.x = Math.min(740, newPlayer.x + 5)
        newPlayer.facing = "right"
      }

      // Handle attack
      if (
        (keysPressed.current.has(" ") || keysPressed.current.has("Space")) &&
        newPlayer.attackCooldown <= 0 &&
        !newPlayer.stunned
      ) {
        newPlayer.isAttacking = true
        newPlayer.hitboxActive = true
        newPlayer.attackCooldown = 30 // 30 frames cooldown
      }

      // Update timers
      if (newPlayer.attackCooldown > 0) newPlayer.attackCooldown--
      if (newPlayer.isAttacking && newPlayer.attackCooldown <= 20) {
        newPlayer.isAttacking = false
        newPlayer.hitboxActive = false
      }
      if (newPlayer.stunned && newPlayer.attackCooldown <= 10) {
        newPlayer.stunned = false
      }

      // Apply velocity (knockback)
      newPlayer.x += newPlayer.velocity.x
      newPlayer.y += newPlayer.velocity.y

      // Friction and bounds
      newPlayer.velocity.x *= 0.8
      newPlayer.velocity.y *= 0.8
      newPlayer.x = Math.max(0, Math.min(740, newPlayer.x))
      newPlayer.y = Math.max(150, Math.min(250, newPlayer.y))

      return newPlayer
    })

    setPlayer2((prev) => {
      const newPlayer = { ...prev }

      // Handle movement
      if (keysPressed.current.has("ArrowLeft")) {
        newPlayer.x = Math.max(0, newPlayer.x - 5)
        newPlayer.facing = "left"
      }
      if (keysPressed.current.has("ArrowRight")) {
        newPlayer.x = Math.min(740, newPlayer.x + 5)
        newPlayer.facing = "right"
      }

      // Handle attack
      if (keysPressed.current.has("Enter") && newPlayer.attackCooldown <= 0 && !newPlayer.stunned) {
        newPlayer.isAttacking = true
        newPlayer.hitboxActive = true
        newPlayer.attackCooldown = 30
      }

      // Update timers
      if (newPlayer.attackCooldown > 0) newPlayer.attackCooldown--
      if (newPlayer.isAttacking && newPlayer.attackCooldown <= 20) {
        newPlayer.isAttacking = false
        newPlayer.hitboxActive = false
      }
      if (newPlayer.stunned && newPlayer.attackCooldown <= 10) {
        newPlayer.stunned = false
      }

      // Apply velocity
      newPlayer.x += newPlayer.velocity.x
      newPlayer.y += newPlayer.velocity.y

      // Friction and bounds
      newPlayer.velocity.x *= 0.8
      newPlayer.velocity.y *= 0.8
      newPlayer.x = Math.max(0, Math.min(740, newPlayer.x))
      newPlayer.y = Math.max(150, Math.min(250, newPlayer.y))

      return newPlayer
    })

    // Check for attacks
    setPlayer1((p1) => {
      setPlayer2((p2) => {
        const result1 = handleAttack(p1, p2)
        const result2 = handleAttack(result1.defender, result1.attacker)

        const finalP1 = result2.defender.id === "player1" ? result2.defender : result2.attacker
        const finalP2 = result2.defender.id === "player2" ? result2.defender : result2.attacker

        // Check for game over
        if (finalP1.health <= 0) {
          setWinner("Player 2")
          setGameState("gameOver")
        } else if (finalP2.health <= 0) {
          setWinner("Player 1")
          setGameState("gameOver")
        }

        return finalP2
      })
      return p1
    })

    // Clean up old hit effects
    setHitEffects((prev) => prev.filter((effect) => Date.now() - effect.timestamp < 1000))
  }, [gameState, handleAttack])

  // Render function
  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw ring
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 3
    ctx.strokeRect(50, 150, 700, 200)

    // Draw center line
    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(400, 150)
    ctx.lineTo(400, 350)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw Player 1
    ctx.fillStyle = player1.stunned ? "#ff6b6b" : "#4ecdc4"
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height)

    // Draw Player 1 attack hitbox
    if (player1.hitboxActive) {
      const hitbox = getAttackHitbox(player1)
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
      ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height)
    }

    // Draw Player 2
    ctx.fillStyle = player2.stunned ? "#ff6b6b" : "#45b7d1"
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height)

    // Draw Player 2 attack hitbox
    if (player2.hitboxActive) {
      const hitbox = getAttackHitbox(player2)
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
      ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height)
    }

    // Draw hit effects
    hitEffects.forEach((effect) => {
      const age = Date.now() - effect.timestamp
      const opacity = Math.max(0, 1 - age / 1000)

      ctx.fillStyle = `rgba(255, 255, 0, ${opacity})`
      ctx.font = "bold 20px Arial"
      ctx.textAlign = "center"
      ctx.fillText(`-${effect.damage}`, effect.x, effect.y - age / 20)
    })

    // Draw health bars
    const barWidth = 200
    const barHeight = 20

    // Player 1 health bar
    ctx.fillStyle = "#333"
    ctx.fillRect(50, 50, barWidth, barHeight)
    ctx.fillStyle = "#4ecdc4"
    ctx.fillRect(50, 50, (player1.health / player1.maxHealth) * barWidth, barHeight)
    ctx.strokeStyle = "#fff"
    ctx.strokeRect(50, 50, barWidth, barHeight)

    // Player 2 health bar
    ctx.fillStyle = "#333"
    ctx.fillRect(550, 50, barWidth, barHeight)
    ctx.fillStyle = "#45b7d1"
    ctx.fillRect(550, 50, (player2.health / player2.maxHealth) * barWidth, barHeight)
    ctx.strokeStyle = "#fff"
    ctx.strokeRect(550, 50, barWidth, barHeight)

    // Draw player labels
    ctx.fillStyle = "#fff"
    ctx.font = "16px Arial"
    ctx.textAlign = "left"
    ctx.fillText("Player 1", 50, 45)
    ctx.textAlign = "right"
    ctx.fillText("Player 2", 750, 45)
  }, [player1, player2, hitEffects])

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key)
      keysPressed.current.add(e.code)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
      keysPressed.current.delete(e.code)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Game loop effect
  useEffect(() => {
    if (gameState === "playing") {
      const loop = () => {
        gameLoop()
        render()
        animationRef.current = requestAnimationFrame(loop)
      }
      animationRef.current = requestAnimationFrame(loop)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState, gameLoop, render])

  const startGame = () => {
    setGameState("playing")
    setPlayer1((prev) => ({ ...prev, health: 100 }))
    setPlayer2((prev) => ({ ...prev, health: 100 }))
    setWinner(null)
    setHitEffects([])
  }

  const resetGame = () => {
    setGameState("menu")
    setPlayer1((prev) => ({
      ...prev,
      x: 100,
      y: 200,
      health: 100,
      isAttacking: false,
      attackCooldown: 0,
      hitboxActive: false,
      stunned: false,
      velocity: { x: 0, y: 0 },
    }))
    setPlayer2((prev) => ({
      ...prev,
      x: 640,
      y: 200,
      health: 100,
      isAttacking: false,
      attackCooldown: 0,
      hitboxActive: false,
      stunned: false,
      velocity: { x: 0, y: 0 },
    }))
    setWinner(null)
    setHitEffects([])
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Boxing Game</h1>

        <canvas ref={canvasRef} width={800} height={400} className="border border-gray-600 bg-gray-900 mb-4" />

        <div className="flex justify-center gap-4 mb-4">
          {gameState === "menu" && (
            <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700">
              Start Game
            </Button>
          )}

          {gameState === "playing" && (
            <Button onClick={() => setGameState("paused")} className="bg-yellow-600 hover:bg-yellow-700">
              Pause
            </Button>
          )}

          {gameState === "paused" && (
            <>
              <Button onClick={() => setGameState("playing")} className="bg-green-600 hover:bg-green-700">
                Resume
              </Button>
              <Button onClick={resetGame} className="bg-red-600 hover:bg-red-700">
                Reset
              </Button>
            </>
          )}

          {gameState === "gameOver" && (
            <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">
              Play Again
            </Button>
          )}
        </div>

        {gameState === "gameOver" && winner && (
          <div className="text-center text-2xl font-bold text-yellow-400 mb-4">🏆 {winner} Wins! 🏆</div>
        )}

        <div className="text-white text-sm space-y-2">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-cyan-400">Player 1 Controls:</h3>
              <p>A/D - Move Left/Right</p>
              <p>Space - Punch</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-400">Player 2 Controls:</h3>
              <p>←/→ - Move Left/Right</p>
              <p>Enter - Punch</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
