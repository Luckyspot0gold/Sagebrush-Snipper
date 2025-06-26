import { type NextRequest, NextResponse } from "next/server"

interface MintRequest {
  type: "boxing_victory" | "trading_milestone" | "land_deed"
  fighter?: string
  opponent?: string
  tokensEarned?: number
  timestamp: number
  metadata?: Record<string, any>
}

interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{ trait_type: string; value: string | number }>
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    let mintData: MintRequest
    try {
      mintData = await request.json()
    } catch (parseError) {
      return NextResponse.json({ success: false, error: "Invalid JSON in request body" }, { status: 400 })
    }

    // Validate required fields
    if (!mintData.type || !mintData.timestamp) {
      return NextResponse.json({ success: false, error: "Type and timestamp are required" }, { status: 400 })
    }

    // Validate timestamp
    if (typeof mintData.timestamp !== "number" || mintData.timestamp <= 0) {
      return NextResponse.json({ success: false, error: "Invalid timestamp" }, { status: 400 })
    }

    // Generate NFT metadata based on type
    const metadata = generateNFTMetadata(mintData)
    if (!metadata) {
      return NextResponse.json({ success: false, error: "Failed to generate NFT metadata" }, { status: 500 })
    }

    // Simulate minting process
    const result = await simulateMinting(metadata)

    return NextResponse.json({
      success: true,
      txHash: result.txHash,
      nftId: result.nftId,
      metadata: metadata,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("NFT minting failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error during NFT minting",
      },
      { status: 500 },
    )
  }
}

function generateNFTMetadata(mintData: MintRequest): NFTMetadata | null {
  try {
    const baseMetadata: NFTMetadata = {
      name: "",
      description: "",
      image: "",
      attributes: [],
    }

    switch (mintData.type) {
      case "boxing_victory":
        if (!mintData.fighter || !mintData.opponent) {
          console.error("Fighter and opponent required for boxing victory NFT")
          return null
        }

        return {
          ...baseMetadata,
          name: "Crypto Clashers Champion",
          description: `Victory in the boxing arena! ${mintData.fighter} defeated ${mintData.opponent}`,
          image: "/images/boxing-champion-nft.png",
          attributes: [
            { trait_type: "Fighter", value: mintData.fighter },
            { trait_type: "Opponent", value: mintData.opponent },
            { trait_type: "Tokens Earned", value: mintData.tokensEarned || 0 },
            { trait_type: "Victory Date", value: new Date(mintData.timestamp).toISOString() },
            { trait_type: "Rarity", value: (mintData.tokensEarned || 0) > 100 ? "Legendary" : "Common" },
          ],
        }

      case "trading_milestone":
        return {
          ...baseMetadata,
          name: "Frontier Trading Master",
          description: "Achieved significant trading milestone in the WyoVerse",
          image: "/images/trading-master-nft.png",
          attributes: [
            { trait_type: "Achievement", value: "Trading Milestone" },
            { trait_type: "Date", value: new Date(mintData.timestamp).toISOString() },
            { trait_type: "Tokens Earned", value: mintData.tokensEarned || 0 },
          ],
        }

      case "land_deed":
        return {
          ...baseMetadata,
          name: "Wyoming Territory Land Deed",
          description: "Official land ownership certificate in the digital frontier",
          image: "/images/land-deed-nft.png",
          attributes: [
            { trait_type: "Achievement", value: "Land Ownership" },
            { trait_type: "Date", value: new Date(mintData.timestamp).toISOString() },
          ],
        }

      default:
        console.error("Unknown NFT type:", mintData.type)
        return null
    }
  } catch (error) {
    console.error("Failed to generate NFT metadata:", error)
    return null
  }
}

async function simulateMinting(metadata: NFTMetadata) {
  try {
    // Simulate blockchain transaction delay
    const delay = Math.random() * 3000 + 1000 // 1-4 seconds
    await new Promise((resolve) => setTimeout(resolve, delay))

    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`
    const nftId = Math.floor(Math.random() * 10000) + 1

    return { txHash, nftId }
  } catch (error) {
    console.error("NFT minting simulation failed:", error)
    throw new Error("NFT minting simulation failed")
  }
}
