import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://muqonovfliktsugrlaxj.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseKey) {
  throw new Error("Missing Supabase anon key")
}

// Client-side Supabase client (singleton pattern)
export const supabase = createClient(supabaseUrl, supabaseKey)

// Server-side Supabase client with service role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          username: string
          avatar_url: string | null
          wallet_address: string | null
          provider: string
          stones_balance: number
          tatonka_balance: number
          artifact_balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          username: string
          avatar_url?: string | null
          wallet_address?: string | null
          provider: string
          stones_balance?: number
          tatonka_balance?: number
          artifact_balance?: number
        }
        Update: {
          email?: string | null
          username?: string
          avatar_url?: string | null
          wallet_address?: string | null
          stones_balance?: number
          tatonka_balance?: number
          artifact_balance?: number
        }
      }
      user_assets: {
        Row: {
          id: number
          user_id: string
          asset_type: string
          asset_id: string
          asset_name: string | null
          asset_image: string | null
          rarity: string | null
          acquired_at: string
        }
        Insert: {
          user_id: string
          asset_type: string
          asset_id: string
          asset_name?: string | null
          asset_image?: string | null
          rarity?: string | null
        }
        Update: {
          asset_name?: string | null
          asset_image?: string | null
          rarity?: string | null
        }
      }
      marketplace_listings: {
        Row: {
          id: number
          seller_id: string
          asset_id: string
          asset_type: string
          price: number
          currency: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          seller_id: string
          asset_id: string
          asset_type: string
          price: number
          currency?: string
          status?: string
        }
        Update: {
          price?: number
          currency?: string
          status?: string
        }
      }
      game_scores: {
        Row: {
          id: number
          user_id: string
          game_type: string
          score: number
          metadata: any
          achieved_at: string
        }
        Insert: {
          user_id: string
          game_type: string
          score: number
          metadata?: any
        }
        Update: {
          score?: number
          metadata?: any
        }
      }
      user_achievements: {
        Row: {
          id: number
          user_id: string
          achievement_type: string
          achievement_name: string
          description: string | null
          earned_at: string
        }
        Insert: {
          user_id: string
          achievement_type: string
          achievement_name: string
          description?: string | null
        }
        Update: {
          description?: string | null
        }
      }
    }
  }
}
