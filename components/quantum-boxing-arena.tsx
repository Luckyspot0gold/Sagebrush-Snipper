"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Shield,
  Cpu,
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CombatMove {
  type: "jab" | "hook" | "uppercut" | "dodge" | "special" | "ko"
  damage: number
  cryptoToken: "BTC" | "ETH" | "AVAX" | "SOL" | "LINK" | "WYO"
  marketCondition: "bullish" | "bearish" | "volatile" | "stable"
  wyomingLegal: boolean
}

interface BoxerStats {
  name: string
  health: number
  energy: number
  cryptoToken: string
  marketSentiment: number
  koCount: number
  sprite: string
}

interface QuantumVerification {
  veniceAI: boolean
  quantumLayers: boolean
  wyomingCompliance: boolean
  aleoProofs: boolean
  undeadEncryption: boolean
  overallScore: number
}

const cryptoBoxers: BoxerStats[] = [
  {
    name: "BTC Miner",
    health: 100,
    energy: 100,
    cryptoToken: "BTC",
    marketSentiment: 0.8,
    koCount: 0,
    sprite: "/images/crypto-clashers-fighter.png",
  },
  {
    name: "ETH Guardian",
    health: 100,
    energy: 100,
    cryptoToken: "ETH",
    marketSentiment: 0.7,
    koCount: 0,
    sprite: "/images/crypto-clashers-fighter.png",
  },
  {
    name: "AVAX Ranger",
    health: 100,
    energy: 100,
    cryptoToken: "AVAX",
    marketSentiment: 0.6,
    koCount: 0,
    sprite: "/images/crypto-clashers-fighter.png",
  },
  {
    name: "SOL Cowboy",
    health: 100,
    energy: 100,
    cryptoToken: "SOL",
    marketSentiment: 0.5,
    koCount: 0,
    sprite: "/images/crypto-clashers-fighter.png",
  },
  {
    name: "LINK Oracle",
    health: 100,
    energy: 100,
    cryptoToken: "LINK",
    marketSentiment: 0.9,
    koCount: 0,
    sprite: "/images/crypto-clashers-fighter.png",
  },
  {
    name: "WYO Rancher",
    health: 100,
    energy: 100,
    cryptoToken: "WYO",
    marketSentiment: 1.0,
    koCount: 0,
    sprite: "/images/crypto-clashers-fighter.png",
  },
]

const marketConditions = ["bullish", "bearish", "volatile", "stable"] as const

export function QuantumBoxingArena() {
  const [boxer1, setBoxer1] = useState<BoxerStats>(cryptoBoxers[0])
  const [boxer2, setBoxer2] = useState<BoxerStats>(cryptoBoxers[1])
  const [currentMarket, setCurrentMarket] = useState<(typeof marketConditions)[number]>("volatile")
  const [combatLog, setCombatLog] = useState<string[]>([])
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false)
  const [currentStrategy, setCurrentStrategy] = useState<CombatMove[]>([])
  const [quantumVerification, setQuantumVerification] = useState<QuantumVerification | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [veniceAIResponse, setVeniceAIResponse] = useState("")
  const [quantumSignature, setQuantumSignature] = useState("")
  const { toast } = useToast()

  const combatLogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll combat log
    if (combatLogRef.current) {
      combatLogRef.current.scrollTop = combatLogRef.current.scrollHeight
    }
  }, [combatLog])

  useEffect(() => {
    // Run initial quantum verification
    verifyQuantumIntegration()
  }, [])

  const addToCombatLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setCombatLog((prev) => [...prev, `[${timestamp}] ${message}`])
  }

  const verifyQuantumIntegration = async () => {
    setIsVerifying(true)
    addToCombatLog("🔍 Verifying Venice AI quantum integration...")

    try {
      const response = await fetch("/api/venice-quantum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_integration" }),
      })

      const data = await response.json()

      if (data.success) {
        setQuantumVerification(data.verification)
        addToCombatLog(`✅ Quantum verification complete: ${data.verification.overallScore}%`)

        if (data.verification.overallScore >= 80) {
          addToCombatLog("🏆 All quantum systems operational - ready for combat!")
        } else {
          addToCombatLog("⚠️ Some quantum systems need attention")
        }
      } else {
        addToCombatLog("❌ Quantum verification failed")
      }
    } catch (error) {
      addToCombatLog("❌ Quantum verification error")
      console.error("Quantum verification error:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const generateCombatStrategy = async () => {
    setIsGeneratingStrategy(true)
    addToCombatLog(`🧠 Venice AI generating strategy for ${boxer1.name} vs ${boxer2.name}...`)

    try {
      const response = await fetch("/api/venice-quantum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_strategy",
          cryptoToken: boxer1.cryptoToken,
          marketCondition: currentMarket,
          opponentToken: boxer2.cryptoToken,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCurrentStrategy(data.strategy)
        addToCombatLog(`✅ Venice AI strategy generated: ${data.strategy.length} moves`)

        // Display strategy
        data.strategy.forEach((move: CombatMove, index: number) => {
          addToCombatLog(
            `   ${index + 1}. ${move.type.toUpperCase()} - ${move.damage} damage ${move.wyomingLegal ? "✅" : "❌"}`,
          )
        })

        toast({
          title: "🧠 Venice AI Strategy Generated",
          description: `${data.strategy.length} moves for ${currentMarket} market`,
        })
      } else {
        addToCombatLog("❌ Strategy generation failed")
      }
    } catch (error) {
      addToCombatLog("❌ Strategy generation error")
      console.error("Strategy generation error:", error)
    } finally {
      setIsGeneratingStrategy(false)
    }
  }

  const executeCombatMove = async (move: CombatMove) => {
    addToCombatLog(`⚔️ Executing ${move.type} with ${move.damage} damage...`)

    try {
      // Validate move with Venice AI
      const response = await fetch("/api/venice-quantum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "validate_move",
          moveData: move,
        }),
      })

      const data = await response.json()

      if (data.success && data.valid) {
        // Apply damage
        const newHealth = Math.max(0, boxer2.health - move.damage)
        setBoxer2((prev) => ({ ...prev, health: newHealth }))

        addToCombatLog(`✅ ${move.type} validated by Wyoming DAO`)
        addToCombatLog(`💥 ${boxer2.name} takes ${move.damage} damage (Health: ${newHealth})`)

        if (newHealth <= 0) {
          addToCombatLog(`🏆 KO! ${boxer1.name} wins!`)
          setBoxer1((prev) => ({ ...prev, koCount: prev.koCount + 1 }))

          toast({
            title: "🥊 KNOCKOUT!",
            description: `${boxer1.name} defeats ${boxer2.name}!`,
          })
        }
      } else {
        addToCombatLog(`❌ Move rejected: ${data.message}`)
      }
    } catch (error) {
      addToCombatLog("❌ Move execution error")
      console.error("Move execution error:", error)
    }
  }

  const testQuantumEncryption = async () => {
    addToCombatLog("🔐 Testing 5-layer Undead$stackerS encryption...")

    try {
      const testData = `Combat data: ${boxer1.name} vs ${boxer2.name} at ${new Date().toISOString()}`

      const response = await fetch("/api/venice-quantum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "encrypt_data",
          data: testData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        addToCombatLog("✅ Data encrypted with 5 quantum layers")
        addToCombatLog(`🔐 Encrypted length: ${data.encrypted.length} characters`)

        toast({
          title: "🔐 Quantum Encryption Complete",
          description: "Data secured with Undead$stackerS system",
        })
      } else {
        addToCombatLog("❌ Encryption failed")
      }
    } catch (error) {
      addToCombatLog("❌ Encryption error")
      console.error("Encryption error:", error)
    }
  }

  const generateHackathonSignature = async () => {
    addToCombatLog("🏆 Generating hackathon submission signature...")

    try {
      const response = await fetch("/api/venice-quantum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "hackathon_signature" }),
      })

      const data = await response.json()

      if (data.success) {
        setQuantumSignature(data.signature)
        addToCombatLog(`✅ Hackathon signature: ${data.signature.substring(0, 16)}...`)

        toast({
          title: "🏆 Hackathon Signature Generated",
          description: "Ready for submission!",
        })
      } else {
        addToCombatLog("❌ Signature generation failed")
      }
    } catch (error) {
      addToCombatLog("❌ Signature generation error")
      console.error("Signature generation error:", error)
    }
  }

  const resetMatch = () => {
    setBoxer1({ ...cryptoBoxers[0] })
    setBoxer2({ ...cryptoBoxers[1] })
    setCombatLog([])
    setCurrentStrategy([])
    addToCombatLog("🔄 Match reset - ready for new combat!")
  }

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />
  }

  const getMarketIcon = (market: string) => {
    switch (market) {
      case "bullish":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "bearish":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      case "volatile":
        return <Activity className="w-4 h-4 text-orange-600" />
      default:
        return <Target className="w-4 h-4 text-blue-600" />
    }
  }

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="border-4 border-black shadow-lg mb-6 newspaper-article">
          <CardHeader className="border-b-2 border-black bg-gradient-to-r from-purple-900 to-blue-900 text-white">
            <CardTitle className="text-3xl font-serif headline-primary text-white">⚡ Quantum Boxing Arena</CardTitle>
            <CardDescription className="text-lg font-serif text-gray-200">
              Venice AI + 5-Layer Quantum Encryption + Wyoming Compliance
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Boxers */}
          <div className="space-y-6">
            {/* Boxer 1 */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="newspaper-article-inner">
                <CardTitle className="text-xl font-serif headline-secondary flex items-center">
                  <img src={boxer1.sprite || "/placeholder.svg"} alt={boxer1.name} className="w-8 h-8 mr-2" />
                  {boxer1.name}
                </CardTitle>
                <Badge className="w-fit">{boxer1.cryptoToken}</Badge>
              </CardHeader>
              <CardContent className="newspaper-article-inner">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Health</span>
                      <span>{boxer1.health}/100</span>
                    </div>
                    <Progress value={boxer1.health} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Energy</span>
                      <span>{boxer1.energy}/100</span>
                    </div>
                    <Progress value={boxer1.energy} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>KO Count:</span>
                    <span className="font-bold">{boxer1.koCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Market Sentiment:</span>
                    <span className="font-bold">{(boxer1.marketSentiment * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Boxer 2 */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="newspaper-article-inner">
                <CardTitle className="text-xl font-serif headline-secondary flex items-center">
                  <img src={boxer2.sprite || "/placeholder.svg"} alt={boxer2.name} className="w-8 h-8 mr-2" />
                  {boxer2.name}
                </CardTitle>
                <Badge className="w-fit">{boxer2.cryptoToken}</Badge>
              </CardHeader>
              <CardContent className="newspaper-article-inner">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Health</span>
                      <span>{boxer2.health}/100</span>
                    </div>
                    <Progress value={boxer2.health} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Energy</span>
                      <span>{boxer2.energy}/100</span>
                    </div>
                    <Progress value={boxer2.energy} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>KO Count:</span>
                    <span className="font-bold">{boxer2.koCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Market Sentiment:</span>
                    <span className="font-bold">{(boxer2.marketSentiment * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Conditions */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="newspaper-article-inner">
                <CardTitle className="text-lg font-serif headline-secondary">Market Conditions</CardTitle>
              </CardHeader>
              <CardContent className="newspaper-article-inner">
                <div className="grid grid-cols-2 gap-2">
                  {marketConditions.map((market) => (
                    <Button
                      key={market}
                      variant={currentMarket === market ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentMarket(market)}
                      className="flex items-center gap-2"
                    >
                      {getMarketIcon(market)}
                      {market}
                    </Button>
                  ))}
                </div>
                <div className="mt-3 text-sm text-center">
                  Current: <Badge>{currentMarket}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Combat Arena */}
          <div className="space-y-6">
            {/* Quantum Verification Status */}
            {quantumVerification && (
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="newspaper-article-inner">
                  <CardTitle className="text-lg font-serif headline-secondary flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Quantum Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="newspaper-article-inner">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Venice AI:</span>
                      {getStatusIcon(quantumVerification.veniceAI)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quantum Layers:</span>
                      {getStatusIcon(quantumVerification.quantumLayers)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Wyoming Compliance:</span>
                      {getStatusIcon(quantumVerification.wyomingCompliance)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Aleo Proofs:</span>
                      {getStatusIcon(quantumVerification.aleoProofs)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Undead Encryption:</span>
                      {getStatusIcon(quantumVerification.undeadEncryption)}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between items-center font-bold">
                        <span>Overall Score:</span>
                        <span className="text-lg">{quantumVerification.overallScore}%</span>
                      </div>
                      <Progress value={quantumVerification.overallScore} className="h-2 mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Combat Controls */}
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="newspaper-article-inner">
                <CardTitle className="text-lg font-serif headline-secondary">Combat Controls</CardTitle>
              </CardHeader>
              <CardContent className="newspaper-article-inner">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={generateCombatStrategy}
                    disabled={isGeneratingStrategy}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isGeneratingStrategy ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Venice AI Strategy
                      </>
                    )}
                  </Button>

                  <Button onClick={verifyQuantumIntegration} disabled={isVerifying} variant="outline">
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Verify Quantum
                      </>
                    )}
                  </Button>

                  <Button onClick={testQuantumEncryption} variant="outline">
                    <Cpu className="w-4 h-4 mr-2" />
                    Test Encryption
                  </Button>

                  <Button onClick={generateHackathonSignature} variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    Hackathon Sig
                  </Button>

                  <Button onClick={resetMatch} variant="destructive" className="col-span-2">
                    Reset Match
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Strategy */}
            {currentStrategy.length > 0 && (
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="newspaper-article-inner">
                  <CardTitle className="text-lg font-serif headline-secondary">Venice AI Strategy</CardTitle>
                </CardHeader>
                <CardContent className="newspaper-article-inner">
                  <div className="space-y-2">
                    {currentStrategy.map((move, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{index + 1}.</span>
                          <span className="uppercase">{move.type}</span>
                          <Badge variant={move.wyomingLegal ? "default" : "destructive"}>
                            {move.wyomingLegal ? "Legal" : "Illegal"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{move.damage} dmg</span>
                          <Button size="sm" onClick={() => executeCombatMove(move)} disabled={!move.wyomingLegal}>
                            Execute
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Combat Log */}
          <div className="space-y-6">
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="newspaper-article-inner">
                <CardTitle className="text-lg font-serif headline-secondary">Combat Log</CardTitle>
              </CardHeader>
              <CardContent className="newspaper-article-inner">
                <div
                  ref={combatLogRef}
                  className="h-96 overflow-y-auto bg-black text-green-400 p-3 rounded font-mono text-xs"
                >
                  {combatLog.length === 0 ? (
                    <div className="text-gray-500">Combat log will appear here...</div>
                  ) : (
                    combatLog.map((log, index) => (
                      <div key={index} className="mb-1">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quantum Signature */}
            {quantumSignature && (
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="newspaper-article-inner">
                  <CardTitle className="text-lg font-serif headline-secondary">Hackathon Signature</CardTitle>
                </CardHeader>
                <CardContent className="newspaper-article-inner">
                  <div className="font-mono text-xs break-all bg-gray-100 p-3 rounded border">{quantumSignature}</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Quantum-secured submission signature for hackathon verification
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Venice AI Response */}
            {veniceAIResponse && (
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="newspaper-article-inner">
                  <CardTitle className="text-lg font-serif headline-secondary">Bar Keep Bill Says</CardTitle>
                </CardHeader>
                <CardContent className="newspaper-article-inner">
                  <div className="italic text-sm bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                    "{veniceAIResponse}"
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <Card className="border-4 border-black shadow-lg mt-6 newspaper-article">
          <CardContent className="p-4 newspaper-article-inner">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <Badge className="bg-purple-600">Venice AI Quantum Enhanced</Badge>
                <Badge className="bg-blue-600">5-Layer Encryption</Badge>
                <Badge className="bg-green-600">Wyoming Compliant</Badge>
                <Badge className="bg-orange-600">Aleo ZK Proofs</Badge>
              </div>
              <div className="text-gray-600">Ready for Hackathon Submission • {new Date().toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default QuantumBoxingArena
