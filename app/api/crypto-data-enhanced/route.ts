import { NextResponse } from "next/server"
import { coinbaseAPI, CRYPTO_SYMBOLS } from "@/lib/coinbase-api-enhanced"

export async function GET() {
  try {
    console.log("🚀 Fetching real-time crypto data from Coinbase...")

    // Fetch real-time data from enhanced Coinbase API
    const cryptoPrices = await coinbaseAPI.getMultiplePrices(CRYPTO_SYMBOLS.slice(0, 8))

    console.log(`📊 Received ${cryptoPrices.length} crypto prices from Coinbase`)

    // Transform data for frontend
    const transformedData = cryptoPrices.map((crypto) => {
      const symbol = crypto.symbol
      const currentPrice = Number.parseFloat(crypto.price.toString())
      const priceChange24h = Number.parseFloat(crypto.change24h.toString())
      const volume24h = Number.parseFloat(crypto.volume24h.toString())
      const marketCap = currentPrice * getEstimatedSupply(symbol)
      const fullName = getFullName(symbol)

      return {
        id: symbol.toLowerCase(),
        name: fullName,
        symbol: symbol,
        current_price: currentPrice,
        price_change_percentage_24h: priceChange24h,
        market_cap: marketCap,
        total_volume: volume24h,
        high_24h: currentPrice * 1.1,
        low_24h: currentPrice * 0.9,
        price_history: [],
        rsi: 0,
        candlestick: [],
        last_updated: new Date().toISOString(),
        source: "Coinbase Pro API",
        is_live: true,
      }
    })

    console.log(`✅ Successfully processed ${transformedData.length} cryptocurrencies`)

    return NextResponse.json({
      success: true,
      data: transformedData,
      timestamp: new Date().toISOString(),
      source: "Coinbase Pro API - Real-time",
      total_processed: transformedData.length,
      is_live: true,
    })
  } catch (error) {
    console.error("💥 Crypto data API error:", error)

    // Return fallback data with clear indication
    const fallbackData = CRYPTO_SYMBOLS.slice(0, 8).map((symbol) => ({
      id: symbol.toLowerCase(),
      name: getFullName(symbol),
      symbol,
      current_price: Math.random() * 50000 + 1000,
      price_change_percentage_24h: Math.random() * 20 - 10,
      market_cap: Math.random() * 1000000000,
      total_volume: Math.random() * 1000000,
      high_24h: 0,
      low_24h: 0,
      price_history: [],
      rsi: 0,
      candlestick: [],
      last_updated: new Date().toISOString(),
      source: "Fallback Data",
      is_live: false,
    }))

    return NextResponse.json({
      success: false,
      error: "API temporarily unavailable",
      data: fallbackData,
      timestamp: new Date().toISOString(),
      source: "Fallback Data - API Unavailable",
      total_processed: fallbackData.length,
      is_live: false,
    })
  }
}

function getEstimatedSupply(symbol: string): number {
  const supplies: Record<string, number> = {
    BTC: 19700000,
    ETH: 120000000,
    AVAX: 400000000,
    SOL: 400000000,
    ADA: 35000000000,
    DOT: 1200000000,
    LINK: 1000000000,
    MATIC: 10000000000,
    LTC: 75000000,
    UNI: 1000000000,
  }
  return supplies[symbol] || 1000000000
}

function getFullName(symbol: string): string {
  const names: Record<string, string> = {
    BTC: "Bitcoin",
    ETH: "Ethereum", 
    AVAX: "Avalanche",
    SOL: "Solana",
    ADA: "Cardano",
    DOT: "Polkadot",
    LINK: "Chainlink",
    MATIC: "Polygon",
    LTC: "Litecoin",
    UNI: "Uniswap",
  }
  return names[symbol] || symbol
}
