export interface Asset {
  name: string
  price: number
  initialPrice: number
  volatility: number
  priceChange: number
}

export interface MarketHistoryPoint {
  timestamp: number
  [assetName: string]: number
}

export type MarketMood = "Bullish" | "Bearish" | "Volatile" | "Idle"

export interface LandDeed {
  id: string
  name: string
  location: string
  size: number
  price: number
  owner?: string
  description: string
  coordinates: {
    x: number
    y: number
  }
  resources?: string[]
  isAvailable: boolean
  lastSalePrice?: number
  appreciationRate?: number
}

export interface Patent {
  id: string
  title: string
  inventor: string
  description: string
  filingDate: string
  status: "pending" | "approved" | "rejected"
  category: string
  value: number
  royaltyRate?: number
}

export interface GameStats {
  totalGamesPlayed: number
  favoriteGame: string
  achievements: string[]
  level: number
  experience: number
}

export interface UserProfile {
  id: string
  username: string
  email: string
  walletAddress?: string
  avatar: string
  bio: string
  location: string
  joinDate: string
  gameStats: GameStats
  preferences: {
    notifications: boolean
    publicProfile: boolean
    showRealName: boolean
  }
}

export interface DialogueOption {
  text: string
  action: string
  consequence?: string
}

export interface NPCDialogue {
  id: string
  npcName: string
  greeting: string
  options: DialogueOption[]
  mood: "friendly" | "gruff" | "excited" | "concerned"
}

export interface TradeData {
  asset: string
  amount: number
  wallet: string
  tradeType: "buy" | "sell"
  timestamp: number
}

export interface BoxingMatch {
  id: string
  fighter1: string
  fighter2: string
  winner?: string
  rounds: number
  tokensEarned: number
  timestamp: number
}

export interface RacingResult {
  id: string
  racer: string
  position: number
  time: number
  tokensEarned: number
  timestamp: number
}
