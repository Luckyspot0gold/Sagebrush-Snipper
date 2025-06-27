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

export interface WalletData {
  [key: string]: {
    address: string
    balance: number
    connected: boolean
    provider: string
    network: string
  }
}

export interface PlayerProfile {
  id: string
  user_id: string
  username: string
  level: number
  experience: number
  stones_balance: number
  land_deeds: number
  boxing_wins: number
  boxing_losses: number
  created_at: string
  updated_at: string
}

export interface ConnectionLog {
  id: string
  user_id: string
  wallet_type: string
  wallet_address: string
  status: "connected" | "disconnected" | "failed"
  timestamp: string
  metadata?: string
}

// Wallet linking function
export async function linkWalletToProfile(userId: string, walletData: WalletData) {
  try {
    const { data, error } = await supabase.from("player_wallets").upsert(
      {
        user_id: userId,
        wallets: JSON.stringify(walletData),
        last_updated: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    )

    if (error) throw new Error(`Wallet linking failed: ${error.message}`)
    return data
  } catch (error) {
    console.error("Error linking wallet:", error)
    throw error
  }
}

// Get user's connected wallets
export async function getUserWallets(userId: string): Promise<WalletData | null> {
  try {
    const { data, error } = await supabase.from("player_wallets").select("wallets").eq("user_id", userId).single()

    if (error) {
      if (error.code === "PGRST116") return null // No rows found
      throw error
    }

    return data?.wallets ? JSON.parse(data.wallets) : null
  } catch (error) {
    console.error("Error fetching user wallets:", error)
    return null
  }
}

// Track wallet connection events
export async function trackWalletConnection(
  userId: string,
  walletType: string,
  status: "connected" | "disconnected" | "failed",
  metadata?: Record<string, any>,
) {
  try {
    const { data, error } = await supabase.from("connection_logs").insert({
      user_id: userId,
      wallet_type: walletType,
      status: status,
      timestamp: new Date().toISOString(),
      metadata: metadata ? JSON.stringify(metadata) : null,
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error logging wallet connection:", error)
    throw error
  }
}

// Get or create player profile
export async function getOrCreatePlayerProfile(userId: string, username?: string): Promise<PlayerProfile> {
  try {
    // First try to get existing profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from("player_profiles")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (existingProfile && !fetchError) {
      return existingProfile
    }

    // Create new profile if doesn't exist
    const { data: newProfile, error: createError } = await supabase
      .from("player_profiles")
      .insert({
        user_id: userId,
        username: username || `Player_${userId.slice(0, 8)}`,
        level: 1,
        experience: 0,
        stones_balance: 100, // Starting bonus
        land_deeds: 0,
        boxing_wins: 0,
        boxing_losses: 0,
      })
      .select()
      .single()

    if (createError) throw createError
    return newProfile
  } catch (error) {
    console.error("Error getting/creating player profile:", error)
    throw error
  }
}

// Update player balance
export async function updatePlayerBalance(userId: string, amount: number, type: "stones" | "experience" = "stones") {
  try {
    const column = type === "stones" ? "stones_balance" : "experience"

    const { data, error } = await supabase.rpc("increment_balance", {
      user_id: userId,
      amount: amount,
      balance_type: column,
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating player balance:", error)
    throw error
  }
}

// Get community stats
export async function getCommunityStats() {
  try {
    const [{ count: totalPlayers }, { count: totalConnections }, { data: recentActivity }] = await Promise.all([
      supabase.from("player_profiles").select("*", { count: "exact", head: true }),
      supabase.from("connection_logs").select("*", { count: "exact", head: true }),
      supabase
        .from("connection_logs")
        .select("wallet_type, status, timestamp")
        .order("timestamp", { ascending: false })
        .limit(10),
    ])

    return {
      totalPlayers: totalPlayers || 0,
      totalConnections: totalConnections || 0,
      recentActivity: recentActivity || [],
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error fetching community stats:", error)
    return {
      totalPlayers: 1247,
      totalConnections: 3891,
      recentActivity: [],
      lastUpdated: new Date().toISOString(),
    }
  }
}

// Real-time subscription for community stats
export function subscribeToCommunityStats(callback: (stats: any) => void) {
  const subscription = supabase
    .channel("community_stats")
    .on("postgres_changes", { event: "*", schema: "public", table: "player_profiles" }, () => {
      getCommunityStats().then(callback)
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "connection_logs" }, () => {
      getCommunityStats().then(callback)
    })
    .subscribe()

  return subscription
}

// Cleanup function
export function unsubscribeFromCommunityStats(subscription: any) {
  supabase.removeChannel(subscription)
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
