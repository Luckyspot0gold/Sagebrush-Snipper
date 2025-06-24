#!/usr/bin/env node

const { createClient } = require("@supabase/supabase-js")

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY,
)

async function activateAffiliates() {
  console.log("🚀 Activating affiliate tracking system...")

  try {
    // Create affiliate_clicks table
    const { error: clicksError } = await supabase.rpc("create_affiliate_clicks_table")
    if (clicksError && !clicksError.message.includes("already exists")) {
      throw clicksError
    }

    // Create ad_slots table
    const { error: slotsError } = await supabase.rpc("create_ad_slots_table")
    if (slotsError && !slotsError.message.includes("already exists")) {
      throw slotsError
    }

    // Insert default ad slots
    const defaultSlots = [
      {
        position: "sidebar",
        current_bid: 50,
        advertiser: "Available",
        destination_url: "#",
        commission_rate: 0.05,
        is_active: false,
      },
      {
        position: "header",
        current_bid: 100,
        advertiser: "Available",
        destination_url: "#",
        commission_rate: 0.08,
        is_active: false,
      },
      {
        position: "footer",
        current_bid: 25,
        advertiser: "Available",
        destination_url: "#",
        commission_rate: 0.05,
        is_active: false,
      },
    ]

    const { error: insertError } = await supabase.from("ad_slots").upsert(defaultSlots)
    if (insertError) throw insertError

    console.log("✅ Affiliate tracking system activated successfully!")
    console.log("📊 Default ad slots created")
    console.log("🎯 Ready for advertiser bids")

    // Test affiliate tracking
    console.log("🧪 Testing affiliate tracking...")
    const testClick = {
      ad_id: "test_ad_123",
      user_id: "test_user_456",
      commission: 2.5,
      tier: "silver",
      timestamp: new Date().toISOString(),
    }

    const { error: testError } = await supabase.from("affiliate_clicks").insert([testClick])
    if (testError) throw testError

    console.log("✅ Affiliate tracking test successful!")
    console.log("💰 Commission tracking: $2.50")

    process.exit(0)
  } catch (error) {
    console.error("❌ Affiliate activation failed:", error.message)
    process.exit(1)
  }
}

// Run the activation
activateAffiliates()
