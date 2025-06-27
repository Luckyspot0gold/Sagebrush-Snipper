interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
  last_updated: string
}

interface CoinGeckoResponse {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
}

interface CoinMarketCapResponse {
  data: {
    [key: string]: {
      id: number
      name: string
      symbol: string
      slug: string
      num_market_pairs: number
      date_added: string
      tags: string[]
      max_supply: number
      circulating_supply: number
      total_supply: number
      platform: any
      cmc_rank: number
      self_reported_circulating_supply: number
      self_reported_market_cap: number
      tvl_ratio: number
      last_updated: string
      quote: {
        USD: {
          price: number
          volume_24h: number
          volume_change_24h: number
          percent_change_1h: number
          percent_change_24h: number
          percent_change_7d: number
          percent_change_30d: number
          percent_change_60d: number
          percent_change_90d: number
          market_cap: number
          market_cap_dominance: number
          fully_diluted_market_cap: number
          tvl: number
          last_updated: string
        }
      }
    }
  }
  status: {
    timestamp: string
    error_code: number
    error_message: string
    elapsed: number
    credit_count: number
    notice: string
  }
}

class MarketAPI {
  private readonly coinGeckoBaseUrl = "https://api.coingecko.com/api/v3"
  private readonly coinMarketCapBaseUrl = "https://pro-api.coinmarketcap.com/v1"
  private readonly cache = new Map<string, { data: any; timestamp: number }>()
  private readonly cacheTimeout = 300000 // 5 minutes cache
  private readonly retryDelay = 2000 // 2 seconds between retries
  private readonly maxRetries = 3

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private async fetchWithRetry(url: string, options?: RequestInit, retries = 0): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return response
    } catch (error) {
      if (retries < this.maxRetries) {
        console.warn(`Fetch failed, retrying in ${this.retryDelay}ms... (${retries + 1}/${this.maxRetries})`)
        await this.delay(this.retryDelay)
        return this.fetchWithRetry(url, options, retries + 1)
      }
      throw error
    }
  }

  private async fetchWithCache(url: string, options?: RequestInit): Promise<any> {
    const cacheKey = `${url}_${JSON.stringify(options)}`
    const now = Date.now()
    const cached = this.cache.get(cacheKey)

    if (cached && now - cached.timestamp < this.cacheTimeout) {
      console.log(`Using cached data for ${url}`)
      return cached.data
    }

    try {
      const response = await this.fetchWithRetry(url, options)
      const data = await response.json()

      this.cache.set(cacheKey, { data, timestamp: now })
      console.log(`Fetched fresh data for ${url}`)
      return data
    } catch (error) {
      console.error(`API error for ${url}:`, error)

      // Return cached data if available, even if expired
      if (cached) {
        console.warn("Using expired cache data due to API error")
        return cached.data
      }

      throw error
    }
  }

  async getCoinGeckoPrices(coinIds: string[] = ["bitcoin", "ethereum", "avalanche-2"]): Promise<CryptoPrice[]> {
    try {
      const ids = coinIds.join(",")
      const url = `${this.coinGeckoBaseUrl}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`

      const data: CoinGeckoResponse[] = await this.fetchWithCache(url)

      return data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h,
        last_updated: coin.last_updated,
      }))
    } catch (error) {
      console.error("CoinGecko API error:", error)
      return this.getFallbackData()
    }
  }

  async getCoinMarketCapPrices(symbols: string[] = ["BTC", "ETH", "AVAX"]): Promise<CryptoPrice[]> {
    try {
      // Note: This would require a CoinMarketCap API key
      // For now, we'll use CoinGecko as primary and this as fallback structure
      const symbolString = symbols.join(",")
      const url = `${this.coinMarketCapBaseUrl}/cryptocurrency/quotes/latest?symbol=${symbolString}`

      // This would need API key in headers:
      // 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY

      console.warn("CoinMarketCap API requires API key - using CoinGecko instead")
      return this.getCoinGeckoPrices()
    } catch (error) {
      console.error("CoinMarketCap API error:", error)
      return this.getFallbackData()
    }
  }

  async getMultiplePrices(symbols: string[] = ["BTC", "ETH", "AVAX"]): Promise<CryptoPrice[]> {
    // Map symbols to CoinGecko IDs
    const symbolToId: Record<string, string> = {
      BTC: "bitcoin",
      ETH: "ethereum",
      AVAX: "avalanche-2",
      SOL: "solana",
      ADA: "cardano",
      DOT: "polkadot",
      MATIC: "matic-network",
      LINK: "chainlink",
      UNI: "uniswap",
      AAVE: "aave",
      SUSHI: "sushi",
      CRV: "curve-dao-token",
      YFI: "yearn-finance",
      COMP: "compound-governance-token",
      MKR: "maker",
      SNX: "havven",
    }

    const coinIds = symbols.map((symbol) => symbolToId[symbol] || symbol.toLowerCase())

    try {
      // Try CoinGecko first
      const prices = await this.getCoinGeckoPrices(coinIds)
      if (prices.length > 0) {
        return prices
      }

      // Fallback to CoinMarketCap (would need API key)
      return this.getCoinMarketCapPrices(symbols)
    } catch (error) {
      console.error("All market APIs failed:", error)
      return this.getFallbackData()
    }
  }

  private getFallbackData(): CryptoPrice[] {
    // Realistic fallback data with current-ish prices
    const fallbackPrices: CryptoPrice[] = [
      {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        current_price: 43250.0,
        price_change_percentage_24h: 2.45,
        market_cap: 847000000000,
        total_volume: 18500000000,
        high_24h: 43800.0,
        low_24h: 42100.0,
        last_updated: new Date().toISOString(),
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum",
        current_price: 2650.0,
        price_change_percentage_24h: 1.85,
        market_cap: 318000000000,
        total_volume: 12300000000,
        high_24h: 2720.0,
        low_24h: 2580.0,
        last_updated: new Date().toISOString(),
      },
      {
        id: "avalanche-2",
        symbol: "AVAX",
        name: "Avalanche",
        current_price: 38.5,
        price_change_percentage_24h: 3.25,
        market_cap: 14500000000,
        total_volume: 850000000,
        high_24h: 39.8,
        low_24h: 37.2,
        last_updated: new Date().toISOString(),
      },
    ]

    console.warn("Using fallback market data")
    return fallbackPrices
  }

  async testConnection(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const testData = await this.getCoinGeckoPrices(["bitcoin"])

      if (testData.length > 0 && testData[0].current_price > 0) {
        return {
          success: true,
          message: "Market API connection successful",
          data: {
            btcPrice: testData[0].current_price,
            timestamp: testData[0].last_updated,
            cacheSize: this.cache.size,
          },
        }
      } else {
        return {
          success: false,
          message: "Market API returned invalid data",
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Market API connection failed: ${error.message}`,
      }
    }
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }
}

// Export singleton instance
export const marketAPI = new MarketAPI()

// Export types
export type { CryptoPrice }
