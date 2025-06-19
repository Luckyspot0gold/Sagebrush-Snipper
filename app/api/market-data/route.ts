import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fix for Issue #12: Replace broken endpoint with working CoinGecko API
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd",
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    )

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Add timestamp for client-side tracking
    return NextResponse.json({
      timestamp: Date.now(),
      data,
    })
  } catch (error) {
    console.error("Error fetching market data:", error)

    // Return fallback data in case of error
    return NextResponse.json(
      {
        timestamp: Date.now(),
        data: {
          bitcoin: { usd: 42000 },
          ethereum: { usd: 2800 },
          solana: { usd: 120 },
        },
        error: "Failed to fetch live data, showing fallback values",
      },
      { status: 200 }, // Still return 200 to prevent UI errors
    )
  }
}
