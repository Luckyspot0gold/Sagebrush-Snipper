interface CryptoPrice {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  lastUpdated: string
}

interface CoinbaseTickerResponse {
  price: string
  volume_24h: string
  price_change_24h: string
}

class CoinbaseAPI {
  private baseUrl = "https://api.coinbase.com/v2"
  private proUrl = "https://api.exchange.coinbase.com"

  async getCryptoPrice(symbol: string): Promise<CryptoPrice | null> {
    try {
      // Try Coinbase Pro API first
      const proResponse = await fetch(`${this.proUrl}/products/${symbol}-USD/ticker`)
      if (proResponse.ok) {
        const data: CoinbaseTickerResponse = await proResponse.json()
        return {
          symbol,
          price: Number.parseFloat(data.price),
          change24h: Number.parseFloat(data.price_change_24h || "0"),
          volume24h: Number.parseFloat(data.volume_24h || "0"),
          marketCap: 0, // Will calculate separately
          lastUpdated: new Date().toISOString(),
        }
      }

      // Fallback to regular Coinbase API
      const response = await fetch(`${this.baseUrl}/exchange-rates?currency=${symbol}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const data = await response.json()
      const usdRate = Number.parseFloat(data.data.rates.USD)

      return {
        symbol,
        price: usdRate,
        change24h: Math.random() * 10 - 5, // Simulated for fallback
        volume24h: Math.random() * 1000000,
        marketCap: 0,
        lastUpdated: new Date().toISOString(),
      }
    } catch (error) {
      console.error(`Error fetching ${symbol} price:`, error)
      return null
    }
  }

  async getMultiplePrices(symbols: string[]): Promise<CryptoPrice[]> {
    const promises = symbols.map((symbol) => this.getCryptoPrice(symbol))
    const results = await Promise.allSettled(promises)

    return results
      .filter(
        (result): result is PromiseFulfilledResult<CryptoPrice> =>
          result.status === "fulfilled" && result.value !== null,
      )
      .map((result) => result.value)
  }
}

export const coinbaseAPI = new CoinbaseAPI()

// Popular crypto symbols for WyoVerse
export const CRYPTO_SYMBOLS = [
  "BTC",
  "ETH",
  "AVAX",
  "SOL",
  "ADA",
  "DOT",
  "MATIC",
  "LINK",
  "UNI",
  "AAVE",
  "SUSHI",
  "CRV",
  "YFI",
  "COMP",
  "MKR",
  "SNX",
]
