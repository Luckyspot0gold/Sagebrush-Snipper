import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { adId, userId, commission, tier, referralCode, ipAddress, userAgent } = body

    // Validate required fields
    if (!adId || !userId || commission === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert click record
    const { data, error } = await supabase
      .from("affiliate_clicks")
      .insert([
        {
          ad_id: adId,
          user_id: userId,
          commission: Number.parseFloat(commission),
          tier: tier || "bronze",
          referral_code: referralCode,
          ip_address: ipAddress,
          user_agent: userAgent,
          timestamp: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
    }

    // Update ad slot statistics
    const { error: updateError } = await supabase.rpc("increment_ad_stats", {
      ad_id: adId,
    })

    if (updateError) {
      console.warn("Failed to update ad stats:", updateError)
    }

    return NextResponse.json(
      {
        success: true,
        clickId: data[0]?.id,
        commission: Number.parseFloat(commission),
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    )
  } catch (error) {
    console.error("Affiliate tracking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
