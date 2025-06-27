interface MarketData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  volume_24h: number
  last_updated: string
}

interface CacheEntry {
  data: MarketData[]
  timestamp: number
}

class MarketAPIService {
  private cache: CacheEntry | null = null
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
  private readonly RETRY_ATTEMPTS = 3
  private readonly RETRY_DELAY = 2000 // 2 seconds

  private fallbackData: MarketData[] = [
    {
      id: "avalanche-2",
      name: "Avalanche",
      symbol: "AVAX",
      current_price: 42.85,
      price_change_percentage_24h: 2.34,
      market_cap: 16800000000,
      volume_24h: 890000000,
      last_updated: new Date().toISOString(),
    },
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      current_price: 67500,
      price_change_percentage_24h: 1.25,
      market_cap: 1330000000000,
      volume_24h: 28000000000,
      last_updated: new Date().toISOString(),
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      current_price: 3850,
      price_change_percentage_24h: -0.85,
      market_cap: 463000000000,
      volume_24h: 15000000000,
      last_updated: new Date().toISOString(),
    },
    {
      id: "deso",
      name: "DeSo",
      symbol: "DESO",
      current_price: 8.45,
      price_change_percentage_24h: 5.67,
      market_cap: 125000000,
      volume_24h: 2500000,
      last_updated: new Date().toISOString(),
    },
  ]

  private isCacheValid(): boolean {
    if (!this.cache) return false
    return Date.now() - this.cache.timestamp < this.CACHE_DURATION
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private async fetchFromCoinGecko(): Promise<MarketData[]> {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,avalanche-2,deso&order=market_cap_desc&per_page=10&page=1&sparkline=false",
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    return await response.json()
  }

  private async fetchFromCoinMarketCap(): Promise<MarketData[]> {
    const apiKey = process.env.COINMARKETCAP_API_KEY
    if (!apiKey) {
      throw new Error("CoinMarketCap API key not configured")
    }

    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform CoinMarketCap data to our format
    return data.data.map((coin: any) => ({
      id: coin.slug,
      name: coin.name,
      symbol: coin.symbol.toLowerCase(),
      current_price: coin.quote.USD.price,
      price_change_percentage_24h: coin.quote.USD.percent_change_24h,
      market_cap: coin.quote.USD.market_cap,
      volume_24h: coin.quote.USD.volume_24h,
      last_updated: coin.last_updated,
    }))
  }

  private async fetchWithRetry(): Promise<MarketData[]> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.RETRY_ATTEMPTS; attempt++) {
      try {
        console.log(`Market API attempt ${attempt}/${this.RETRY_ATTEMPTS}`)

        // Try CoinGecko first (no API key required)
        try {
          const data = await this.fetchFromCoinGecko()
          console.log("Successfully fetched from CoinGecko")
          return data
        } catch (geckoError) {
          console.warn("CoinGecko failed:", geckoError)

          // Try CoinMarketCap as fallback
          try {
            const data = await this.fetchFromCoinMarketCap()
            console.log("Successfully fetched from CoinMarketCap")
            return data
          } catch (cmcError) {
            console.warn("CoinMarketCap failed:", cmcError)
            lastError = cmcError as Error
          }
        }

        if (attempt < this.RETRY_ATTEMPTS) {
          console.log(`Waiting ${this.RETRY_DELAY}ms before retry...`)
          await this.delay(this.RETRY_DELAY)
        }
      } catch (error) {
        lastError = error as Error
        console.error(`Attempt ${attempt} failed:`, error)

        if (attempt < this.RETRY_ATTEMPTS) {
          await this.delay(this.RETRY_DELAY)
        }
      }
    }

    throw lastError || new Error("All market API attempts failed")
  }

  async getMarketData(): Promise<MarketData[]> {
    // Return cached data if valid
    if (this.isCacheValid() && this.cache) {
      console.log("Returning cached market data")
      return this.cache.data
    }

    try {
      console.log("Fetching fresh market data...")
      const data = await this.fetchWithRetry()

      // Update cache
      this.cache = {
        data,
        timestamp: Date.now(),
      }

      console.log("Market data fetched and cached successfully")
      return data
    } catch (error) {
      console.error("All market API attempts failed, using fallback data:", error)

      // Use cached data if available, even if expired
      if (this.cache) {
        console.log("Using expired cache as fallback")
        return this.cache.data
      }

      // Use hardcoded fallback data
      console.log("Using hardcoded fallback data")
      return this.fallbackData
    }
  }

  async getSpecificCoin(coinId: string): Promise<MarketData | null> {
    const data = await this.getMarketData()
    return data.find((coin) => coin.id === coinId || coin.symbol === coinId.toLowerCase()) || null
  }
}

export const marketAPI = new MarketAPIService()
export type { MarketData }
