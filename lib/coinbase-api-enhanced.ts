interface CryptoPrice {
  symbol: string
  price: number
  change24h?: number
  volume24h?: number
  marketCap?: number
  lastUpdated: string
}

interface CoinbaseTickerResponse {
  price: string
  volume_24h: string
  price_change_24h: string
}

interface CoinbaseSpotPrice {
  data: {
    base: string
    currency: string
    amount: string
  }
}

interface CoinbaseExchangeRates {
  data: {
    currency: string
    rates: Record<string, string>
  }
}

class CoinbaseAPI {
  private readonly baseUrl = "https://api.coinbase.com/v2"
  private readonly proUrl = "https://api.exchange.coinbase.com"
  private readonly cache = new Map<string, { data: any; timestamp: number }>()
  private readonly cacheTimeout = 60000 // 1 minute cache

  private async fetchWithCache(url: string): Promise<any> {
    const now = Date.now()
    const cached = this.cache.get(url)

    if (cached && now - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      this.cache.set(url, { data, timestamp: now })
      return data
    } catch (error) {
      console.error(`Coinbase API error for ${url}:`, error)

      // Return cached data if available, even if expired
      if (cached) {
        console.warn("Using expired cache data due to API error")
        return cached.data
      }

      throw error
    }
  }

  async getCryptoPrice(symbol: string): Promise<CryptoPrice | null> {
    try {
      const url = `${this.proUrl}/products/${symbol}-USD/ticker`
      const proResponse = await fetch(url)
      if (proResponse.ok) {
        const data: CoinbaseTickerResponse = await proResponse.json()
        return {
          symbol: symbol.toUpperCase(),
          price: Number.parseFloat(data.price),
          change24h: Number.parseFloat(data.price_change_24h || "0"),
          volume24h: Number.parseFloat(data.volume_24h || "0"),
          marketCap: undefined, // Will calculate separately
          lastUpdated: new Date().toISOString(),
        }
      }

      // Fallback to regular Coinbase API
      const spotUrl = `${this.baseUrl}/prices/${symbol}-USD/spot`
      const spotResponse: CoinbaseSpotPrice = await this.fetchWithCache(spotUrl)

      return {
        symbol: symbol.toUpperCase(),
        price: Number.parseFloat(spotResponse.data.amount),
        change24h: undefined, // Simulated for fallback
        volume24h: undefined,
        marketCap: undefined,
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

  async getExchangeRates(baseCurrency = "USD"): Promise<Record<string, number>> {
    try {
      const url = `${this.baseUrl}/exchange-rates?currency=${baseCurrency}`
      const response: CoinbaseExchangeRates = await this.fetchWithCache(url)

      const rates: Record<string, number> = {}
      Object.entries(response.data.rates).forEach(([currency, rate]) => {
        rates[currency] = Number.parseFloat(rate)
      })

      return rates
    } catch (error) {
      console.error("Error fetching exchange rates:", error)
      return {}
    }
  }

  async getCryptoPriceWithDetails(symbol: string): Promise<CryptoPrice | null> {
    try {
      // Get spot price
      const spotPrice = await this.getCryptoPrice(symbol)
      if (!spotPrice) return null

      // Try to get additional data from exchange rates
      const rates = await this.getExchangeRates()

      return {
        ...spotPrice,
        // Add any additional data available from rates
        marketCap: rates[`${symbol}MC`] || undefined,
        volume24h: rates[`${symbol}V`] || undefined,
      }
    } catch (error) {
      console.error(`Error fetching detailed ${symbol} data:`, error)
      return null
    }
  }

  // Test connection to Coinbase API
  async testConnection(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const testPrice = await this.getCryptoPrice("BTC")

      if (testPrice && testPrice.price > 0) {
        return {
          success: true,
          message: "Coinbase API connection successful",
          data: {
            btcPrice: testPrice.price,
            timestamp: testPrice.lastUpdated,
            cacheSize: this.cache.size,
          },
        }
      } else {
        return {
          success: false,
          message: "Coinbase API returned invalid data",
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Coinbase API connection failed: ${error.message}`,
      }
    }
  }

  // Clear cache (useful for testing)
  clearCache(): void {
    this.cache.clear()
  }

  // Get cache stats
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }
}

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

// Export singleton instance
export const coinbaseAPI = new CoinbaseAPI()
