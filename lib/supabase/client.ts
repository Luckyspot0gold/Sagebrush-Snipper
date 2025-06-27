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

// Enhanced client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY!, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Wallet linking function
export async function linkWalletToProfile(userId: string, walletData: any) {
  const { data, error } = await supabase.from("player_wallets").upsert({
    user_id: userId,
    wallets: JSON.stringify(walletData),
    last_updated: new Date().toISOString(),
  })

  if (error) throw new Error("Wallet linking failed: " + error.message)
  return data
}

// Track wallet connections
export async function trackWalletConnection(userId: string, walletType: string, address: string) {
  const { data, error } = await supabase.from("connection_logs").insert({
    user_id: userId,
    wallet_type: walletType,
    wallet_address: address,
    status: "connected",
    timestamp: new Date().toISOString(),
  })

  if (error) throw new Error("Failed to track connection: " + error.message)
  return data
}

// Get user profile with wallets
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select(`
      *,
      player_wallets (*)
    `)
    .eq("id", userId)
    .single()

  if (error) throw new Error("Failed to get user profile: " + error.message)
  return data
}

// Update user balance
export async function updateUserBalance(userId: string, amount: number, currency: string) {
  const { data, error } = await supabase.rpc("increment_balance", {
    user_id: userId,
    amount: amount,
    currency: currency,
  })

  if (error) throw new Error("Failed to update balance: " + error.message)
  return data
}
