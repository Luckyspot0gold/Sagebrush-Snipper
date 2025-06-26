// Enhanced Coinbase API with real-time WebSocket integration
interface CoinbaseProduct {
  product_id: string
  price: string
  price_percentage_change_24h: string
  volume_24h: string
  volume_percentage_change_24h: string
  base_increment: string
  quote_increment: string
  quote_min_size: string
  quote_max_size: string
  base_min_size: string
  base_max_size: string
  base_name: string
  quote_name: string
  watched: boolean
  is_disabled: boolean
  new: boolean
  status: string
  cancel_only: boolean
  limit_only: boolean
  post_only: boolean
  trading_disabled: boolean
  auction_mode: boolean
  product_type: string
  quote_currency_id: string
  base_currency_id: string
  mid_market_price: string
}

interface CoinbaseCandle {
  start: string
  low: string
  high: string
  open: string
  close: string
  volume: string
}

interface CoinbaseApiResponse<T> {
  data: T
  pagination?: {
    ending_before: string
    starting_after: string
    limit: number
    order: string
    previous_uri: string
    next_uri: string
  }
}

interface CoinbaseWebSocketMessage {
  type: string
  product_id: string
  price: string
  time: string
  sequence: number
  best_bid: string
  best_ask: string
}

class EnhancedCoinbaseAPI {
  private baseUrl = "https://api.exchange.coinbase.com"
  private wsUrl = "wss://ws-feed.exchange.coinbase.com"
  private apiKey: string
  private apiSecret: string
  private passphrase: string
  private ws: WebSocket | null = null
  private priceCache = new Map<string, any>()
  private subscribers = new Set<(data: any) => void>()

  constructor() {
    this.apiKey = process.env.COINBASE_API_KEY || ""
    this.apiSecret = process.env.COINBASE_API_SECRET || ""
    this.passphrase = process.env.COINBASE_PASSPHRASE || ""
  }

  private async makeRequest<T>(endpoint: string, method = "GET"): Promise<T> {
    const timestamp = Date.now() / 1000
    const message = timestamp + method + endpoint

    // Create signature using HMAC SHA256
    const signature = await this.createSignature(message)

    const headers = {
      "CB-ACCESS-KEY": this.apiKey,
      "CB-ACCESS-SIGN": signature,
      "CB-ACCESS-TIMESTAMP": timestamp.toString(),
      "CB-ACCESS-PASSPHRASE": this.passphrase,
      "Content-Type": "application/json",
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers,
        next: { revalidate: 10 }, // Cache for 10 seconds for real-time feel
      })

      if (!response.ok) {
        console.warn(`Coinbase API warning: ${response.status} ${response.statusText}`)
        return this.getFallbackData() as T
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Coinbase API request failed:", error)
      return this.getFallbackData() as T
    }
  }

  private async createSignature(message: string): Promise<string> {
    try {
      const encoder = new TextEncoder()
      const keyData = encoder.encode(this.apiSecret)
      const messageData = encoder.encode(message)

      const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, [
        "sign",
      ])

      const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
      return Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    } catch (error) {
      console.error("Signature creation failed:", error)
      return ""
    }
  }

  async getProducts(): Promise<CoinbaseProduct[]> {
    try {
      const products = await this.makeRequest<CoinbaseProduct[]>("/products")

      // Filter for USD pairs and active products
      const filteredProducts = Array.isArray(products)
        ? products
            .filter(
              (product) => product.quote_currency_id === "USD" && !product.is_disabled && product.status === "online",
            )
            .slice(0, 40)
        : this.getFallbackProducts()

      return filteredProducts
    } catch (error) {
      console.error("Failed to fetch products:", error)
      return this.getFallbackProducts()
    }
  }

  async getProductTicker(productId: string): Promise<any> {
    try {
      const ticker = await this.makeRequest<any>(`/products/${productId}/ticker`)
      return ticker
    } catch (error) {
      console.error(`Failed to fetch ticker for ${productId}:`, error)
      return this.getFallbackTicker(productId)
    }
  }

  async getProductCandles(productId: string, granularity = 3600): Promise<CoinbaseCandle[]> {
    try {
      const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const end = new Date().toISOString()

      const candles = await this.makeRequest<number[][]>(
        `/products/${productId}/candles?start=${start}&end=${end}&granularity=${granularity}`,
      )

      if (Array.isArray(candles)) {
        return candles.map((candle) => ({
          start: new Date(candle[0] * 1000).toISOString(),
          low: candle[1].toString(),
          high: candle[2].toString(),
          open: candle[3].toString(),
          close: candle[4].toString(),
          volume: candle[5].toString(),
        }))
      }

      return this.getFallbackCandles()
    } catch (error) {
      console.error(`Failed to fetch candles for ${productId}:`, error)
      return this.getFallbackCandles()
    }
  }

  // WebSocket for real-time updates
  connectWebSocket(productIds: string[]) {
    if (typeof window === "undefined") return // Server-side check

    try {
      this.ws = new WebSocket(this.wsUrl)

      this.ws.onopen = () => {
        console.log("Coinbase WebSocket connected")
        const subscribeMessage = {
          type: "subscribe",
          product_ids: productIds,
          channels: ["ticker"],
        }
        this.ws?.send(JSON.stringify(subscribeMessage))
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === "ticker") {
            this.priceCache.set(data.product_id, data)
            this.notifySubscribers(data)
          }
        } catch (error) {
          console.error("WebSocket message parsing error:", error)
        }
      }

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error)
      }

      this.ws.onclose = () => {
        console.log("WebSocket disconnected, attempting to reconnect...")
        setTimeout(() => this.connectWebSocket(productIds), 5000)
      }
    } catch (error) {
      console.error("WebSocket connection failed:", error)
    }
  }

  subscribe(callback: (data: any) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  private notifySubscribers(data: any) {
    this.subscribers.forEach((callback) => callback(data))
  }

  // Calculate RSI from price data
  calculateRSI(prices: number[], period = 14): number {
    if (prices.length < period + 1) return 50

    let gains = 0
    let losses = 0

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

  private getFallbackData(): any {
    return []
  }

  private getFallbackProducts(): CoinbaseProduct[] {
    return [
      {
        product_id: "BTC-USD",
        price: "67234.50",
        price_percentage_change_24h: "2.34",
        volume_24h: "28500000000",
        volume_percentage_change_24h: "5.67",
        base_increment: "0.00000001",
        quote_increment: "0.01",
        quote_min_size: "1",
        quote_max_size: "1000000",
        base_min_size: "0.00000001",
        base_max_size: "1000",
        base_name: "Bitcoin",
        quote_name: "US Dollar",
        watched: false,
        is_disabled: false,
        new: false,
        status: "online",
        cancel_only: false,
        limit_only: false,
        post_only: false,
        trading_disabled: false,
        auction_mode: false,
        product_type: "SPOT",
        quote_currency_id: "USD",
        base_currency_id: "BTC",
        mid_market_price: "67234.50",
      },
      {
        product_id: "ETH-USD",
        price: "3456.78",
        price_percentage_change_24h: "1.23",
        volume_24h: "15000000000",
        volume_percentage_change_24h: "3.45",
        base_increment: "0.00000001",
        quote_increment: "0.01",
        quote_min_size: "1",
        quote_max_size: "1000000",
        base_min_size: "0.00000001",
        base_max_size: "1000",
        base_name: "Ethereum",
        quote_name: "US Dollar",
        watched: false,
        is_disabled: false,
        new: false,
        status: "online",
        cancel_only: false,
        limit_only: false,
        post_only: false,
        trading_disabled: false,
        auction_mode: false,
        product_type: "SPOT",
        quote_currency_id: "USD",
        base_currency_id: "ETH",
        mid_market_price: "3456.78",
      },
      {
        product_id: "AVAX-USD",
        price: "32.15",
        price_percentage_change_24h: "4.56",
        volume_24h: "500000000",
        volume_percentage_change_24h: "2.34",
        base_increment: "0.00000001",
        quote_increment: "0.01",
        quote_min_size: "1",
        quote_max_size: "1000000",
        base_min_size: "0.00000001",
        base_max_size: "1000",
        base_name: "Avalanche",
        quote_name: "US Dollar",
        watched: false,
        is_disabled: false,
        new: false,
        status: "online",
        cancel_only: false,
        limit_only: false,
        post_only: false,
        trading_disabled: false,
        auction_mode: false,
        product_type: "SPOT",
        quote_currency_id: "USD",
        base_currency_id: "AVAX",
        mid_market_price: "32.15",
      },
    ]
  }

  private getFallbackTicker(productId: string): any {
    const basePrice = productId.includes("BTC") ? 67234.5 : productId.includes("ETH") ? 3456.78 : 32.15
    return {
      price: basePrice.toString(),
      size: "1.0",
      bid: (basePrice * 0.999).toString(),
      ask: (basePrice * 1.001).toString(),
      volume: "1000000",
      time: new Date().toISOString(),
    }
  }

  private getFallbackCandles(): CoinbaseCandle[] {
    const candles: CoinbaseCandle[] = []
    let price = 67234.5

    for (let i = 0; i < 168; i++) {
      const open = price
      const volatility = 0.02 + Math.random() * 0.03
      const high = open * (1 + volatility)
      const low = open * (1 - volatility)
      const close = low + Math.random() * (high - low)
      const volume = (Math.random() * 1000000).toString()

      candles.push({
        start: new Date(Date.now() - (167 - i) * 60 * 60 * 1000).toISOString(),
        low: low.toFixed(2),
        high: high.toFixed(2),
        open: open.toFixed(2),
        close: close.toFixed(2),
        volume,
      })

      price = close
    }

    return candles
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const enhancedCoinbaseAPI = new EnhancedCoinbaseAPI()
