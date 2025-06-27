import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Server-side client for admin operations
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY!, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Wallet linking function
export async function linkWalletToProfile(userId: string, walletData: any) {
  try {
    const { data, error } = await supabase.from("player_wallets").upsert({
      user_id: userId,
      wallets: JSON.stringify(walletData),
      last_updated: new Date().toISOString(),
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Wallet linking failed:", error)
    throw new Error("Failed to link wallet to profile")
  }
}

// Track wallet connections
export async function trackWalletConnection(userId: string, provider: string, status: string) {
  try {
    const { data, error } = await supabase.from("connection_logs").insert({
      user_id: userId,
      wallet_type: provider,
      status: status,
      timestamp: new Date().toISOString(),
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Failed to track wallet connection:", error)
  }
}

// Health check function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("health_check").select("*").limit(1)

    return { success: !error, error: error?.message }
  } catch (error) {
    return { success: false, error: "Connection failed" }
  }
}
