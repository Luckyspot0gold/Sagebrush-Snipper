// Market Types
export type MarketMood = "Bullish" | "Bearish" | "Volatile" | "Idle"

export interface Asset {
  name: string
  price: number
  initialPrice: number
  volatility: number
  priceChange: number
}

export interface MarketHistoryPoint {
  timestamp: number
  [key: string]: number
}

// Land Deed Types
export interface LandDeed {
  id: string
  name: string
  description: string
  coordinates: string
  owner: string
  size: string
  attributes: {
    water: "low" | "medium" | "high"
    mining_rights: "granted" | "restricted" | "none"
  }
}

// Patent Types
export interface Patent {
  id: string
  title: string
  description: string
  claims: string[]
  filingDate: string
  status: "pending" | "granted" | "rejected"
}
