import { NextResponse } from "next/server"
import { enhancedCoinbaseAPI } from "@/lib/coinbase-api-enhanced"

export async function GET() {
  try {
    console.log("🚀 Fetching real-time crypto data from Coinbase...")

    // Fetch real-time data from enhanced Coinbase API
    const products = await enhancedCoinbaseAPI.getProducts()

    if (!products || products.length === 0) {
      throw new Error("No products received from Coinbase API")
    }

    console.log(`📊 Received ${products.length} products from Coinbase`)

    // Transform Coinbase data to our format with real-time prices
    const cryptoData = await Promise.all(
      products.slice(0, 40).map(async (product) => {
        try {
          // Get real-time ticker data
          const ticker = await enhancedCoinbaseAPI.getProductTicker(product.product_id)

          // Get candlestick data for RSI calculation
          const candles = await enhancedCoinbaseAPI.getProductCandles(product.product_id)

          // Calculate current price from ticker or product data
          const currentPrice = ticker?.price ? Number.parseFloat(ticker.price) : Number.parseFloat(product.price)

          // Extract prices for RSI calculation
          const prices = candles.map((candle) => Number.parseFloat(candle.close))
          const rsi = enhancedCoinbaseAPI.calculateRSI(prices)

          // Generate price history from recent candles
          const priceHistory = candles.slice(-24).map((candle, index) => ({
            time: `${23 - index}h`,
            price: Number.parseFloat(candle.close),
          }))

          // Transform candles for frontend
          const candlestickData = candles.slice(-7).map((candle, index) => ({
            time: `Day ${index + 1}`,
            open: Number.parseFloat(candle.open),
            high: Number.parseFloat(candle.high),
            low: Number.parseFloat(candle.low),
            close: Number.parseFloat(candle.close),
            volume: Number.parseFloat(candle.volume),
          }))

          // Calculate 24h high/low from recent data
          const recent24h = prices.slice(-24)
          const high24h = Math.max(...recent24h)
          const low24h = Math.min(...recent24h)

          // Calculate market cap (estimated)
          const estimatedSupply = getEstimatedSupply(product.base_currency_id)
          const marketCap = currentPrice * estimatedSupply

          return {
            id: product.base_currency_id.toLowerCase(),
            name: product.base_name,
            symbol: product.base_currency_id,
            current_price: currentPrice,
            price_change_percentage_24h: Number.parseFloat(product.price_percentage_change_24h || "0"),
            market_cap: marketCap,
            total_volume: Number.parseFloat(product.volume_24h || "0"),
            high_24h: high24h,
            low_24h: low24h,
            price_history: priceHistory,
            rsi: rsi,
            candlestick: candlestickData,
            last_updated: new Date().toISOString(),
            source: "Coinbase Pro API",
            is_live: true,
          }
        } catch (error) {
          console.error(`❌ Error processing ${product.product_id}:`, error)
          return null
        }
      }),
    )

    // Filter out failed requests
    const validData = cryptoData.filter((data) => data !== null)

    console.log(`✅ Successfully processed ${validData.length} cryptocurrencies`)

    return NextResponse.json({
      success: true,
      data: validData,
      timestamp: new Date().toISOString(),
      source: "Coinbase Pro API - Real-time",
      total_processed: validData.length,
      is_live: true,
    })
  } catch (error) {
    console.error("💥 Crypto data API error:", error)

    // Return fallback data with clear indication
    const fallbackData = getFallbackCryptoData()

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        data: fallbackData,
        timestamp: new Date().toISOString(),
        source: "Fallback Data - API Unavailable",
        total_processed: fallbackData.length,
        is_live: false,
      },
      { status: 200 },
    )
  }
}

function getEstimatedSupply(symbol: string): number {
  // Estimated circulating supplies for major cryptocurrencies
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
    ATOM: 400000000,
    ALGO: 10000000000,
    FTM: 3000000000,
    NEAR: 1000000000,
    LUNA: 1000000000,
    ICP: 500000000,
    HBAR: 50000000000,
    EGLD: 30000000,
    XTZ: 1000000000,
    THETA: 1000000000,
    VET: 86000000000,
    FIL: 400000000,
    SAND: 3000000000,
    MANA: 2000000000,
    AXS: 270000000,
    ENJ: 1000000000,
    GALA: 50000000000,
    IMX: 2000000000,
    FLOW: 1400000000,
  }

  return supplies[symbol] || 1000000000 // Default 1B if unknown
}

function getFallbackCryptoData() {
  const cryptos = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", basePrice: 67234 },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", basePrice: 3456 },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", basePrice: 32.15 },
    { id: "solana", name: "Solana", symbol: "SOL", basePrice: 156.78 },
    { id: "cardano", name: "Cardano", symbol: "ADA", basePrice: 0.45 },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", basePrice: 6.78 },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", basePrice: 14.23 },
    { id: "polygon", name: "Polygon", symbol: "MATIC", basePrice: 0.89 },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", basePrice: 89.45 },
    { id: "uniswap", name: "Uniswap", symbol: "UNI", basePrice: 7.12 },
  ]

  return cryptos.map((crypto) => {
    const priceChange = (Math.random() - 0.5) * 20
    const currentPrice = crypto.basePrice * (1 + priceChange / 100)
    const rsi = 30 + Math.random() * 40

    const priceHistory = Array.from({ length: 24 }, (_, i) => ({
      time: `${23 - i}h`,
      price: currentPrice * (1 + (Math.random() - 0.5) * 0.1),
    }))

    const candlestick = Array.from({ length: 7 }, (_, i) => {
      const basePrice = currentPrice * (1 + (Math.random() - 0.5) * 0.2)
      const high = basePrice * (1 + Math.random() * 0.05)
      const low = basePrice * (1 - Math.random() * 0.05)
      const open = basePrice * (1 + (Math.random() - 0.5) * 0.02)
      const close = basePrice * (1 + (Math.random() - 0.5) * 0.02)

      return {
        time: `Day ${i + 1}`,
        open,
        high: Math.max(high, open, close),
        low: Math.min(low, open, close),
        close,
        volume: Math.random() * 1000000,
      }
    })

    return {
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      current_price: currentPrice,
      price_change_percentage_24h: priceChange,
      market_cap: currentPrice * Math.random() * 1000000000,
      total_volume: currentPrice * Math.random() * 100000000,
      high_24h: currentPrice * 1.1,
      low_24h: currentPrice * 0.9,
      price_history: priceHistory,
      rsi,
      candlestick,
      last_updated: new Date().toISOString(),
      source: "Fallback Data",
      is_live: false,
    }
  })
}
