// Frontier Trader API Integration
export interface TradeExecutionResult {
  success: boolean
  transactionId: string
  executedPrice: number
  fees: number
  timestamp: Date
}

export interface MarketOrderbook {
  bids: Array<{ price: number; quantity: number }>
  asks: Array<{ price: number; quantity: number }>
  spread: number
}

export class FrontierTraderAPI {
  private baseUrl: string
  private apiKey: string

  constructor(apiKey: string) {
    this.baseUrl = process.env.NEXT_PUBLIC_FRONTIER_TRADER_API || "https://api.frontiertrader.io"
    this.apiKey = apiKey
  }

  async getMarketData(symbol: string) {
    try {
      const response = await fetch(`${this.baseUrl}/market/${symbol}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })
      return await response.json()
    } catch (error) {
      console.error("Failed to fetch market data:", error)
      return null
    }
  }

  async executeTrade(
    symbol: string,
    side: "buy" | "sell",
    quantity: number,
    orderType: "market" | "limit" = "market",
    price?: number,
  ): Promise<TradeExecutionResult> {
    try {
      const response = await fetch(`${this.baseUrl}/trade/execute`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol,
          side,
          quantity,
          orderType,
          price,
        }),
      })

      const result = await response.json()

      return {
        success: result.success,
        transactionId: result.transactionId,
        executedPrice: result.executedPrice,
        fees: result.fees,
        timestamp: new Date(result.timestamp),
      }
    } catch (error) {
      console.error("Trade execution failed:", error)
      return {
        success: false,
        transactionId: "",
        executedPrice: 0,
        fees: 0,
        timestamp: new Date(),
      }
    }
  }

  async getOrderbook(symbol: string): Promise<MarketOrderbook | null> {
    try {
      const response = await fetch(`${this.baseUrl}/orderbook/${symbol}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })
      return await response.json()
    } catch (error) {
      console.error("Failed to fetch orderbook:", error)
      return null
    }
  }

  async getPortfolio() {
    try {
      const response = await fetch(`${this.baseUrl}/portfolio`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })
      return await response.json()
    } catch (error) {
      console.error("Failed to fetch portfolio:", error)
      return null
    }
  }
}

// Export singleton instance
export const frontierTraderAPI = new FrontierTraderAPI(process.env.NEXT_PUBLIC_FRONTIER_TRADER_API_KEY || "")
