"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, Trophy, Coins, Zap } from "lucide-react"
import { walletToNFTFlow, type WalletUser, type BoxingNFT } from "@/lib/blockchain/wallet-integration"
import { CryptoClashersBoxingEnhanced } from "./crypto-clashers-boxing-enhanced"

export function WalletBoxingIntegration() {
  const [user, setUser] = useState<WalletUser | null>(null)
  const [userNFTs, setUserNFTs] = useState<BoxingNFT[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [showBoxing, setShowBoxing] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected")

  const connectWallet = async () => {
    setIsConnecting(true)
    setConnectionStatus("connecting")

    try {
      const result = await walletToNFTFlow.connectWalletAndCreateUser()

      if (result.success && result.user) {
        setUser(result.user)
        setConnectionStatus("connected")

        // Load user's NFTs
        const nfts = await walletToNFTFlow.getUserNFTs(result.user.walletAddress)
        setUserNFTs(nfts)
      } else {
        setConnectionStatus("disconnected")
        alert(`Connection failed: ${result.error}`)
      }
    } catch (error: any) {
      setConnectionStatus("disconnected")
      alert(`Connection error: ${error.message}`)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleBoxingVictory = async (fighter: string, opponent: string, tokensEarned: number) => {
    if (!user) return

    try {
      const result = await walletToNFTFlow.recordBoxingMatch(user.walletAddress, fighter, opponent, true, tokensEarned)

      if (result.success && result.nft) {
        // Update user NFTs
        setUserNFTs((prev) => [result.nft!, ...prev])

        // Refresh user data
        const updatedResult = await walletToNFTFlow.connectWalletAndCreateUser()
        if (updatedResult.success && updatedResult.user) {
          setUser(updatedResult.user)
        }
      }
    } catch (error) {
      console.error("Failed to record boxing victory:", error)
    }
  }

  const calculateWinRate = () => {
    if (!user || user.fightRecord.totalFights === 0) return 0
    return Math.round((user.fightRecord.wins / user.fightRecord.totalFights) * 100)
  }

  return (
    <div className="newspaper-article">
      <div className="newspaper-article-inner">
        <h2 className="newspaper-section-title">🥊 FRONTIER BOXING ARENA 🥊</h2>
        <p className="newspaper-paragraph text-center">
          Connect your wallet, fight for glory, and earn exclusive NFT rewards!
        </p>

        {connectionStatus === "disconnected" && (
          <Card className="border-4 border-black shadow-lg">
            <CardHeader className="border-b-2 border-black bg-gradient-to-r from-blue-900 to-purple-900 text-white">
              <CardTitle className="text-2xl font-serif text-center">Connect Your Wallet</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-6xl">🤠</div>
              <p className="text-lg font-serif">
                Welcome to the WyoVerse Boxing Arena! Connect your crypto wallet to start fighting and earning NFT
                rewards.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✅ Fight legendary opponents</p>
                <p>✅ Earn victory NFTs</p>
                <p>✅ Build your fighter reputation</p>
                <p>✅ Collect rare boxing memorabilia</p>
              </div>
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="frontier-button font-serif text-lg px-8 py-4"
              >
                <Wallet className="h-5 w-5 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            </CardContent>
          </Card>
        )}

        {connectionStatus === "connecting" && (
          <Card className="border-4 border-black shadow-lg">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-4xl animate-spin">⚡</div>
              <h3 className="text-xl font-serif">Connecting to the Frontier...</h3>
              <Progress value={66} className="w-full" />
              <p className="text-sm text-gray-600">Verifying wallet ownership and creating your pioneer profile...</p>
            </CardContent>
          </Card>
        )}

        {connectionStatus === "connected" && user && !showBoxing && (
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card className="border-4 border-black shadow-lg">
              <CardHeader className="border-b-2 border-black bg-gradient-to-r from-green-900 to-blue-900 text-white">
                <CardTitle className="text-xl font-serif flex items-center justify-between">
                  <span>🤠 {user.username}</span>
                  <Badge className="bg-green-500 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{user.balance} AVAX</div>
                    <div className="text-sm text-gray-600">Wallet Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {user.fightRecord.wins}-{user.fightRecord.losses}
                    </div>
                    <div className="text-sm text-gray-600">Fight Record</div>
                    <div className="text-xs text-gray-500">{calculateWinRate()}% Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{user.nftCount}</div>
                    <div className="text-sm text-gray-600">Victory NFTs</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button onClick={() => setShowBoxing(true)} className="frontier-button font-serif text-lg px-8 py-3">
                    🥊 Enter Boxing Arena
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* NFT Collection */}
            {userNFTs.length > 0 && (
              <Card className="border-4 border-black shadow-lg">
                <CardHeader className="border-b-2 border-black bg-gradient-to-r from-purple-900 to-pink-900 text-white">
                  <CardTitle className="text-xl font-serif flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Victory NFT Collection
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userNFTs.slice(0, 6).map((nft) => (
                      <div key={nft.id} className="border-2 border-gray-300 rounded-lg p-4">
                        <div className="text-center space-y-2">
                          <div className="text-4xl">🏆</div>
                          <h4 className="font-serif font-bold text-sm">{nft.metadata.name}</h4>
                          <div className="text-xs space-y-1">
                            <div>
                              <strong>Fighter:</strong> {nft.fighter}
                            </div>
                            <div>
                              <strong>Opponent:</strong> {nft.opponent}
                            </div>
                            <div className="flex items-center justify-center">
                              <Coins className="h-3 w-3 mr-1" />
                              {nft.tokensEarned} tokens
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Token #{nft.tokenId}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  {userNFTs.length > 6 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" className="font-serif">
                        View All {userNFTs.length} NFTs
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {showBoxing && user && (
          <div className="space-y-4">
            <div className="text-center">
              <Button onClick={() => setShowBoxing(false)} variant="outline" className="font-serif">
                ← Back to Profile
              </Button>
            </div>
            <CryptoClashersBoxingEnhanced onVictory={handleBoxingVictory} />
          </div>
        )}
      </div>
    </div>
  )
}
