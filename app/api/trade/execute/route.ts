import { type NextRequest, NextResponse } from "next/server"

interface TradeData {
  asset: string
  amount: number
  wallet: string
  tradeType: "buy" | "sell"
}

interface MarketData {
  currentPrice: number
  volume24h: number
  priceChange24h: number
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let tradeData: TradeData
    try {
      tradeData = await request.json()
    } catch (parseError) {
      return NextResponse.json({ success: false, error: "Invalid JSON in request body" }, { status: 400 })
    }

    // Validate required fields
    const { asset, amount, wallet, tradeType } = tradeData

    if (!asset || typeof asset !== "string") {
      return NextResponse.json({ success: false, error: "Asset is required and must be a string" }, { status: 400 })
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ success: false, error: "Amount must be a positive number" }, { status: 400 })
    }

    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json({ success: false, error: "Wallet address is required" }, { status: 400 })
    }

    if (!tradeType || !["buy", "sell"].includes(tradeType)) {
      return NextResponse.json({ success: false, error: "Trade type must be 'buy' or 'sell'" }, { status: 400 })
    }

    // 1. Get market data
    const marketData = await getMarketData(asset)
    if (!marketData) {
      return NextResponse.json({ success: false, error: "Market data not available for this asset" }, { status: 404 })
    }

    // 2. Calculate trade details
    const tradeDetails = calculateTrade(tradeData, marketData)

    // 3. Execute trade simulation
    const result = await executeTrade(tradeDetails)

    return NextResponse.json({
      success: true,
      txHash: result.txHash,
      amountOut: result.amountOut,
      priceImpact: result.priceImpact,
      gasUsed: result.gasUsed,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Trade execution failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error during trade execution",
      },
      { status: 500 },
    )
  }
}

async function getMarketData(asset: string): Promise<MarketData | null> {
  try {
    // In production, fetch from real API with proper error handling
    const mockData: Record<string, MarketData> = {
      STONES: { currentPrice: 0.25, volume24h: 150000, priceChange24h: 5.2 },
      GOLD: { currentPrice: 1850.5, volume24h: 2500000, priceChange24h: -1.8 },
      SILVER: { currentPrice: 24.75, volume24h: 500000, priceChange24h: 2.1 },
      AVAX: { currentPrice: 35.8, volume24h: 45000000, priceChange24h: 8.5 },
    }

    const data = mockData[asset.toUpperCase()]
    return data || null
  } catch (error) {
    console.error("Failed to get market data:", error)
    return null
  }
}

function calculateTrade(tradeData: TradeData, marketData: MarketData) {
  const slippageTolerance = 0.05 // 5%
  const amountOut = tradeData.amount * marketData.currentPrice
  const minAmountOut = amountOut * (1 - slippageTolerance)

  return {
    ...tradeData,
    amountOut: Number(amountOut.toFixed(6)),
    minAmountOut: Number(minAmountOut.toFixed(6)),
    priceImpact: Number(((tradeData.amount / marketData.volume24h) * 100).toFixed(4)),
    estimatedGas: 0.002, // AVAX
  }
}

async function executeTrade(tradeDetails: any) {
  try {
    // Simulate blockchain transaction
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 1000))

    return {
      txHash,
      amountOut: tradeDetails.amountOut,
      priceImpact: tradeDetails.priceImpact,
      gasUsed: tradeDetails.estimatedGas,
    }
  } catch (error) {
    console.error("Trade execution simulation failed:", error)
    throw new Error("Trade execution failed")
  }
}
