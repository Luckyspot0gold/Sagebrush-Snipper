"use client"

import { useState, useEffect, useRef } from "react"
import { useSpring, animated, useSpringValue } from "@react-spring/web"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useMarketStore } from "@/lib/stores/market-store"
import { useFrontierAudio } from "@/lib/frontier-audio-system"
import { useFrontierSpeech } from "@/hooks/use-frontier-speech"
import { Volume2, VolumeX, Coffee, Star, Sparkles } from "lucide-react"

interface ParticleEffect {
  id: string
  x: number
  y: number
  opacity: number
  size: number
  type: "smoke" | "dust" | "sparkle"
}

export function BillEnhancedAvatar() {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<ParticleEffect[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState([30])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { marketMood, marketSentiment, assets } = useMarketStore()
  const { playWelcome, playSuccess, startAmbient, stopAmbient, toggle, setVolume: setAudioVolume } = useFrontierAudio()
  const { generateDialogue, getRandomGreeting } = useFrontierSpeech()

  // Enhanced entrance animation
  const avatarSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0px) scale(1)" : "translateX(100px) scale(0.8)",
    config: { tension: 120, friction: 14 },
  })

  // Breathing animation for Bill
  const breathingScale = useSpringValue(1, {
    config: { duration: 3000 },
    loop: { reverse: true },
  })

  useEffect(() => {
    breathingScale.start({ to: 1.05 })
  }, [breathingScale])

  // Initialize Bill
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      playWelcome()
      startAmbient()
      generateParticles()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Particle system
  const generateParticles = () => {
    const newParticles: ParticleEffect[] = []

    // Cigar smoke particles
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: `smoke-${i}`,
        x: 60 + Math.random() * 10,
        y: 30 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.3,
        size: 2 + Math.random() * 3,
        type: "smoke",
      })
    }

    // Dust motes
    for (let i = 0; i < 5; i++) {
      newParticles.push({
        id: `dust-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.2,
        size: 1 + Math.random() * 2,
        type: "dust",
      })
    }

    setParticles(newParticles)
  }

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            y: particle.y - 1,
            opacity: particle.opacity * 0.98,
            x: particle.x + (Math.random() - 0.5) * 0.5,
          }))
          .filter((p) => p.opacity > 0.05),
      )

      // Add new particles occasionally
      if (Math.random() < 0.3) {
        generateParticles()
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Handle sound toggle
  const handleSoundToggle = () => {
    const newState = toggle()
    setSoundEnabled(newState)
    if (!newState) {
      stopAmbient()
    } else {
      startAmbient()
    }
  }

  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    setAudioVolume(newVolume[0] / 100)
  }

  // Get Bill's current mood emoji
  const getBillMoodEmoji = () => {
    if (marketSentiment > 0.5) return "🤠"
    if (marketSentiment < -0.3) return "😟"
    return "🧔"
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <animated.div style={avatarSpring}>
        <Card className="border-4 border-amber-800 bg-gradient-to-br from-amber-50 to-amber-100 shadow-2xl max-w-sm relative overflow-hidden">
          {/* Particle Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            width={300}
            height={200}
            style={{
              background: particles
                .map(
                  (p) =>
                    `radial-gradient(circle at ${p.x}% ${p.y}%, rgba(139,69,19,${p.opacity}) ${p.size}px, transparent ${p.size + 2}px)`,
                )
                .join(", "),
            }}
          />

          <div className="p-4 relative z-10">
            {/* Bill's Enhanced Avatar */}
            <div className="flex items-start gap-3 mb-3">
              <animated.div style={{ transform: breathingScale.to((s) => `scale(${s})`) }} className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 border-3 border-amber-800 flex items-center justify-center text-3xl shadow-lg">
                  {getBillMoodEmoji()}
                </div>

                {/* Cigar smoke effect */}
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-gray-400 rounded-full opacity-30 animate-pulse"></div>
                </div>

                {/* Market mood indicator */}
                <div className="absolute -bottom-2 -right-2">
                  <Badge
                    className={`text-xs ${
                      marketSentiment > 0.3 ? "bg-green-500" : marketSentiment < -0.3 ? "bg-red-500" : "bg-yellow-500"
                    }`}
                  >
                    {marketMood}
                  </Badge>
                </div>
              </animated.div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-amber-900 font-serif text-lg">Bar Keep Bill</h3>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleSoundToggle}
                      className="h-6 w-6 p-0 hover:bg-amber-200"
                    >
                      {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsVisible(false)}
                      className="h-6 w-6 p-0 hover:bg-amber-200"
                    >
                      ×
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-amber-700 font-serif mb-2">Est. 1852 • Frontier Market Wisdom</p>

                {/* Volume Control */}
                {soundEnabled && (
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-3 w-3 text-amber-600" />
                    <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={5} className="flex-1" />
                    <span className="text-xs text-amber-600">{volume[0]}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Speech Bubble */}
            <div className="bg-white border-3 border-amber-800 rounded-lg p-3 relative shadow-inner">
              {/* Speech bubble arrows */}
              <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
              <div className="absolute -left-3 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-amber-800"></div>

              <div className="space-y-2">
                <p className="font-serif text-sm font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  {getRandomGreeting()}
                </p>

                <p className="font-serif text-xs text-gray-700 leading-relaxed">
                  "Market's feeling {marketMood.toLowerCase()} today, partner.
                  {marketSentiment > 0.3
                    ? " Folks are mighty optimistic!"
                    : marketSentiment < -0.3
                      ? " People are being cautious."
                      : " Steady as she goes."}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <Button
                    size="sm"
                    onClick={() => playSuccess()}
                    className="bg-amber-700 hover:bg-amber-800 text-white font-serif text-xs"
                  >
                    <Coffee className="w-3 h-3 mr-1" />
                    Ask for Wisdom
                  </Button>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(marketSentiment * 5) + 3 ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bill's Journal Entry */}
            <div className="mt-3 text-center">
              <p className="text-xs text-amber-600 font-serif italic">
                "Been keepin' records since the Gold Rush. Trust the process, partner."
              </p>
            </div>
          </div>
        </Card>
      </animated.div>
    </div>
  )
}
