import { NextResponse } from "next/server"
import { coinbaseAPI } from "@/lib/coinbase-api"

export async function GET() {
  try {
    // Fetch real-time data from Coinbase
    const products = await coinbaseAPI.getProducts()

    // Transform Coinbase data to our format
    const cryptoData = await Promise.all(
      products.map(async (product) => {
        try {
          // Get candlestick data for RSI calculation
          const candles = await coinbaseAPI.getProductCandles(product.product_id)
          const prices = candles.map((candle) => Number.parseFloat(candle.close))
          const rsi = coinbaseAPI.calculateRSI(prices)

          // Generate price history from candles
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

          return {
            id: product.base_currency_id.toLowerCase(),
            name: product.base_name,
            symbol: product.base_currency_id,
            current_price: Number.parseFloat(product.price),
            price_change_percentage_24h: Number.parseFloat(product.price_percentage_change_24h),
            market_cap: Number.parseFloat(product.price) * 21000000, // Estimated
            total_volume: Number.parseFloat(product.volume_24h),
            high_24h: Math.max(...prices.slice(-24)),
            low_24h: Math.min(...prices.slice(-24)),
            price_history: priceHistory,
            rsi: rsi,
            candlestick: candlestickData,
            last_updated: new Date().toISOString(),
          }
        } catch (error) {
          console.error(`Error processing ${product.product_id}:`, error)
          return null
        }
      }),
    )

    // Filter out failed requests
    const validData = cryptoData.filter((data) => data !== null)

    return NextResponse.json({
      success: true,
      data: validData,
      timestamp: new Date().toISOString(),
      source: "Coinbase Advanced Trade API",
    })
  } catch (error) {
    console.error("Crypto data API error:", error)

    // Return fallback data
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch real-time data",
        data: getFallbackCryptoData(),
        timestamp: new Date().toISOString(),
        source: "Fallback Data",
      },
      { status: 200 },
    ) // Still return 200 to prevent UI errors
  }
}

function getFallbackCryptoData() {
  // Comprehensive fallback data for top 40 cryptocurrencies
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
    { id: "cosmos", name: "Cosmos", symbol: "ATOM", basePrice: 9.87 },
    { id: "algorand", name: "Algorand", symbol: "ALGO", basePrice: 0.23 },
    { id: "fantom", name: "Fantom", symbol: "FTM", basePrice: 0.34 },
    { id: "near", name: "NEAR Protocol", symbol: "NEAR", basePrice: 2.45 },
    { id: "terra", name: "Terra", symbol: "LUNA", basePrice: 1.23 },
    { id: "internet-computer", name: "Internet Computer", symbol: "ICP", basePrice: 12.34 },
    { id: "hedera", name: "Hedera", symbol: "HBAR", basePrice: 0.067 },
    { id: "multiversx", name: "MultiversX", symbol: "EGLD", basePrice: 45.67 },
    { id: "tezos", name: "Tezos", symbol: "XTZ", basePrice: 0.89 },
    { id: "theta", name: "Theta Network", symbol: "THETA", basePrice: 1.45 },
    { id: "vechain", name: "VeChain", symbol: "VET", basePrice: 0.023 },
    { id: "filecoin", name: "Filecoin", symbol: "FIL", basePrice: 5.67 },
    { id: "sandbox", name: "The Sandbox", symbol: "SAND", basePrice: 0.45 },
    { id: "decentraland", name: "Decentraland", symbol: "MANA", basePrice: 0.56 },
    { id: "axie-infinity", name: "Axie Infinity", symbol: "AXS", basePrice: 8.9 },
    { id: "enjin", name: "Enjin Coin", symbol: "ENJ", basePrice: 0.34 },
    { id: "gala", name: "Gala", symbol: "GALA", basePrice: 0.045 },
    { id: "immutable", name: "Immutable X", symbol: "IMX", basePrice: 1.23 },
    { id: "flow", name: "Flow", symbol: "FLOW", basePrice: 0.78 },
    { id: "wax", name: "WAX", symbol: "WAXP", basePrice: 0.067 },
    { id: "chromia", name: "Chromia", symbol: "CHR", basePrice: 0.23 },
    { id: "ultra", name: "Ultra", symbol: "UOS", basePrice: 0.12 },
    { id: "treasure", name: "Treasure", symbol: "MAGIC", basePrice: 0.89 },
    { id: "yield-guild", name: "Yield Guild Games", symbol: "YGG", basePrice: 0.45 },
    { id: "star-atlas", name: "Star Atlas", symbol: "ATLAS", basePrice: 0.0034 },
    { id: "illuvium", name: "Illuvium", symbol: "ILV", basePrice: 67.89 },
    { id: "gods-unchained", name: "Gods Unchained", symbol: "GODS", basePrice: 0.23 },
    { id: "alice", name: "My Neighbor Alice", symbol: "ALICE", basePrice: 1.45 },
    { id: "stepn", name: "STEPN", symbol: "GMT", basePrice: 0.34 },
    { id: "apecoin", name: "ApeCoin", symbol: "APE", basePrice: 1.23 },
  ]

  return cryptos.map((crypto) => {
    const priceChange = (Math.random() - 0.5) * 20
    const currentPrice = crypto.basePrice * (1 + priceChange / 100)
    const rsi = 30 + Math.random() * 40

    // Generate realistic price history
    const priceHistory = Array.from({ length: 24 }, (_, i) => ({
      time: `${23 - i}h`,
      price: currentPrice * (1 + (Math.random() - 0.5) * 0.1),
    }))

    // Generate candlestick data
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
    }
  })
}
