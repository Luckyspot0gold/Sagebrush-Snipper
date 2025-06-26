interface CoinbaseProduct {
  product_id: string
  price: string
  price_percentage_change_24h: string
  volume_24h: string
  base_currency_id: string
  base_name: string
  quote_currency_id: string
}

interface CoinbaseTicker {
  product_id: string
  price: string
  size: string
  bid: string
  ask: string
  volume: string
  time: string
}

interface CoinbaseCandle {
  timestamp: string
  low: string
  high: string
  open: string
  close: string
  volume: string
}

class EnhancedCoinbaseAPI {
  private baseUrl = "https://api.exchange.coinbase.com"
  private proBaseUrl = "https://api.pro.coinbase.com"

  async getProducts(): Promise<CoinbaseProduct[]> {
    try {
      // Try Coinbase Advanced Trade API first
      const response = await fetch(`${this.baseUrl}/products`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "WyoVerse/1.0",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Coinbase API error: ${response.status}`)
      }

      const data = await response.json()

      // Filter for USD pairs and active products
      const usdProducts =
        data.products?.filter(
          (product: any) =>
            product.quote_currency_id === "USD" && product.status === "online" && product.trading_disabled === false,
        ) || []

      return usdProducts.map((product: any) => ({
        product_id: product.product_id,
        price: product.price || "0",
        price_percentage_change_24h: product.price_percentage_change_24h || "0",
        volume_24h: product.volume_24h || "0",
        base_currency_id: product.base_currency_id,
        base_name: product.base_display_name || product.base_currency_id,
        quote_currency_id: product.quote_currency_id,
      }))
    } catch (error) {
      console.error("Coinbase products API error:", error)

      // Fallback to Pro API
      try {
        const proResponse = await fetch(`${this.proBaseUrl}/products`, {
          headers: {
            Accept: "application/json",
            "User-Agent": "WyoVerse/1.0",
          },
          cache: "no-store",
        })

        if (proResponse.ok) {
          const proData = await proResponse.json()
          return proData
            .filter((product: any) => product.quote_currency === "USD")
            .map((product: any) => ({
              product_id: product.id,
              price: "0",
              price_percentage_change_24h: "0",
              volume_24h: product.volume_24h || "0",
              base_currency_id: product.base_currency,
              base_name: product.display_name || product.base_currency,
              quote_currency_id: product.quote_currency,
            }))
        }
      } catch (proError) {
        console.error("Coinbase Pro API also failed:", proError)
      }

      throw error
    }
  }

  async getProductTicker(productId: string): Promise<CoinbaseTicker | null> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}/ticker`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "WyoVerse/1.0",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        return null
      }

      return await response.json()
    } catch (error) {
      console.error(`Ticker error for ${productId}:`, error)
      return null
    }
  }

  async getProductCandles(productId: string, granularity = 3600): Promise<CoinbaseCandle[]> {
    try {
      const end = new Date()
      const start = new Date(end.getTime() - 24 * 60 * 60 * 1000) // 24 hours ago

      const response = await fetch(
        `${this.baseUrl}/products/${productId}/candles?start=${start.toISOString()}&end=${end.toISOString()}&granularity=${granularity}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "WyoVerse/1.0",
          },
          cache: "no-store",
        },
      )

      if (!response.ok) {
        return []
      }

      const data = await response.json()

      // Coinbase returns [timestamp, low, high, open, close, volume]
      return data.map((candle: number[]) => ({
        timestamp: new Date(candle[0] * 1000).toISOString(),
        low: candle[1].toString(),
        high: candle[2].toString(),
        open: candle[3].toString(),
        close: candle[4].toString(),
        volume: candle[5].toString(),
      }))
    } catch (error) {
      console.error(`Candles error for ${productId}:`, error)
      return []
    }
  }

  calculateRSI(prices: number[], period = 14): number {
    if (prices.length < period + 1) return 50

    let gains = 0
    let losses = 0

    // Calculate initial average gain and loss
    for (let i = 1; i <= period; i++) {
      const change = prices[i] - prices[i - 1]
      if (change > 0) {
        gains += change
      } else {
        losses += Math.abs(change)
      }
    }

    let avgGain = gains / period
    let avgLoss = losses / period

    // Calculate RSI for remaining periods
    for (let i = period + 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1]
      const gain = change > 0 ? change : 0
      const loss = change < 0 ? Math.abs(change) : 0

      avgGain = (avgGain * (period - 1) + gain) / period
      avgLoss = (avgLoss * (period - 1) + loss) / period
    }

    if (avgLoss === 0) return 100
    const rs = avgGain / avgLoss
    return 100 - 100 / (1 + rs)
  }

  // Get real-time price using multiple endpoints
  async getRealTimePrice(symbol: string): Promise<number> {
    const productId = `${symbol}-USD`

    try {
      // Try ticker first
      const ticker = await this.getProductTicker(productId)
      if (ticker && ticker.price) {
        return Number.parseFloat(ticker.price)
      }

      // Fallback to products endpoint
      const products = await this.getProducts()
      const product = products.find((p) => p.product_id === productId)
      if (product && product.price) {
        return Number.parseFloat(product.price)
      }

      return 0
    } catch (error) {
      console.error(`Real-time price error for ${symbol}:`, error)
      return 0
    }
  }
}

export const enhancedCoinbaseAPI = new EnhancedCoinbaseAPI()
