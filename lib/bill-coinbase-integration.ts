import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Initialize Coinbase connection
const coinbase = new CoinbaseWallet({
  appName: "Bar Keep Bill",
  appLogoUrl: "https://cryptoclashers.games/bill-logo.png",
  jsonRpcUrl: `https://mainnet.base.org`,
})

export interface PortfolioInsight {
  portfolioSnapshot: any
  billAdvice: string
  riskScore: number
  topOpportunities: string[]
  whiskeyWisdom: string
}

// Main integration function
export async function getBillInsights(userId: string): Promise<PortfolioInsight> {
  try {
    // 1. Fetch portfolio data (mock for now - replace with real Coinbase API)
    const portfolio = await fetchPortfolioData(userId)

    // 2. Get market context from our database
    const marketContext = await sql`
      SELECT * 
      FROM market_data 
      WHERE timestamp > NOW() - INTERVAL '1 hour'
      ORDER BY timestamp DESC
      LIMIT 1
    `

    // 3. Generate Bill-style advice
    return {
      portfolioSnapshot: portfolio,
      billAdvice: generateSaloonAdvice(portfolio, marketContext[0]),
      riskScore: calculateRiskScore(portfolio),
      topOpportunities: findMarketOpportunities(marketContext[0]),
      whiskeyWisdom: getRandomWhiskeyWisdom(),
    }
  } catch (error) {
    console.error("Yeehaw! We got a problem:", error)
    return {
      portfolioSnapshot: {},
      billAdvice: "Bill's still soberin' up... try again later, partner!",
      riskScore: 0.5,
      topOpportunities: [],
      whiskeyWisdom: "Sometimes the best trade is no trade at all.",
    }
  }
}

// Mock portfolio data (replace with real Coinbase API)
async function fetchPortfolioData(userId: string) {
  return {
    totalValue: 5420.5,
    assets: [
      { name: "Bitcoin", symbol: "BTC", value: 2500.0, change_24h: 3.2, percentage: 46.1 },
      { name: "Ethereum", symbol: "ETH", value: 1800.0, change_24h: -1.5, percentage: 33.2 },
      { name: "Solana", symbol: "SOL", value: 1120.5, change_24h: 5.7, percentage: 20.7 },
    ],
  }
}

// Bill's signature advice generator
function generateSaloonAdvice(portfolio: any, market: any): string {
  const whiskeyWisdom = [
    "That portfolio's tighter than a drum!",
    "I've seen tumbleweeds with more movement than this!",
    "You're sittin' prettier than a two-dollar pistol!",
    "Diversify or die, partner!",
    "That's steadier than my aim after one whiskey!",
    "Hot diggity! That's what I call a winning hand!",
  ]

  const randomWisdom = whiskeyWisdom[Math.floor(Math.random() * whiskeyWisdom.length)]
  const topAsset = portfolio.assets?.sort((a: any, b: any) => b.value - a.value)[0]

  if (!topAsset) return `${randomWisdom} But I can't see your holdings clearly through this whiskey haze...`

  const sentiment = market?.sentiment || "neutral"
  const advice = topAsset.change_24h > 0 ? "keep ridin' high" : "buckle up for turbulence"

  return `Well howdy partner! ${randomWisdom} Your ${topAsset.name} holdings are lookin' 
          stronger than moonshine. With ${sentiment} sentiment in the saloon, 
          I'd reckon ${advice}. That ${topAsset.change_24h > 0 ? "green" : "red"} you're seein' 
          tells a story worth hearin'!`
}

function calculateRiskScore(portfolio: any): number {
  if (!portfolio.assets) return 0.5

  const volatilityScore =
    portfolio.assets.reduce((acc: number, asset: any) => {
      return acc + Math.abs(asset.change_24h) / 100
    }, 0) / portfolio.assets.length

  return Math.min(Math.max(volatilityScore, 0), 1)
}

function findMarketOpportunities(market: any): string[] {
  return [
    "STONES token showing unusual volume - might be worth a gander",
    "Land parcels in Sector 7 are heating up faster than a branding iron",
    "That Tatonka coin's been as quiet as a church mouse - could be ready to stampede",
    "Base chain activity suggests something big brewing in the digital territory",
  ]
}

function getRandomWhiskeyWisdom(): string {
  const wisdom = [
    "A wise cowboy never puts all his gold in one saddlebag.",
    "The market's like a wild mustang - respect it, but don't fear it.",
    "In crypto, like poker, know when to hold 'em and when to fold 'em.",
    "The best time to buy is when others are sellin' their boots.",
    "Patience, partner. Rome wasn't built in a day, and neither was a fortune.",
  ]

  return wisdom[Math.floor(Math.random() * wisdom.length)]
}

export { coinbase }
