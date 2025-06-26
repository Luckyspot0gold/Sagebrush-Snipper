"use client"

import { supabase, supabaseAdmin } from "@/lib/supabase/client"
import { useUserProfileStore } from "@/lib/stores/user-profile-store"
import type { Database } from "@/lib/supabase/client"

type User = Database["public"]["Tables"]["users"]["Row"]

export interface AuthProvider {
  name: string
  icon: string
  color: string
  provider: "github" | "google" | "discord" | "wallet"
}

export const authProviders: AuthProvider[] = [
  {
    name: "GitHub",
    icon: "🐙",
    color: "#333",
    provider: "github",
  },
  {
    name: "Google",
    icon: "🔍",
    color: "#4285f4",
    provider: "google",
  },
  {
    name: "Discord",
    icon: "🎮",
    color: "#5865f2",
    provider: "discord",
  },
  {
    name: "Crypto Wallet",
    icon: "🪙",
    color: "#f7931a",
    provider: "wallet",
  },
]

class WyoVerseAuth {
  async createUser(userData: {
    id: string
    email?: string
    username: string
    avatar_url?: string
    wallet_address?: string
    provider: string
  }) {
    try {
      const { data, error } = await supabaseAdmin
        .from("users")
        .upsert({
          id: userData.id,
          email: userData.email,
          username: userData.username,
          avatar_url: userData.avatar_url,
          wallet_address: userData.wallet_address,
          provider: userData.provider,
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, user: data }
    } catch (error) {
      console.error("Create user error:", error)
      return { success: false, error }
    }
  }

  async getUserById(userId: string) {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

      if (error && error.code !== "PGRST116") throw error
      return data
    } catch (error) {
      console.error("Get user error:", error)
      return null
    }
  }

  async updateUserProfile(userId: string, updates: Partial<User>) {
    try {
      const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

      if (error) throw error
      return { success: true, user: data }
    } catch (error) {
      console.error("Update profile error:", error)
      return { success: false, error }
    }
  }

  async signInWithWallet(walletAddress: string, signature: string) {
    try {
      // Verify signature here (implement your signature verification logic)
      const userId = `wallet_${walletAddress}`

      let user = await this.getUserById(userId)

      if (!user) {
        const createResult = await this.createUser({
          id: userId,
          username: `Pioneer_${walletAddress.slice(-6)}`,
          wallet_address: walletAddress,
          provider: "wallet",
        })
        user = createResult.user
      }

      // Store session in localStorage (you might want to use a more secure method)
      localStorage.setItem(
        "wyoverse_session",
        JSON.stringify({
          userId: user.id,
          walletAddress,
          loginTime: Date.now(),
        }),
      )

      useUserProfileStore.getState().setProfile(user)
      return { success: true, user }
    } catch (error) {
      console.error("Wallet auth error:", error)
      return { success: false, error }
    }
  }

  async signInWithProvider(provider: "github" | "google" | "discord") {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error("OAuth sign in error:", error)
      return { success: false, error }
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      localStorage.removeItem("wyoverse_session")
      useUserProfileStore.getState().setProfile(null)
      return { success: true }
    } catch (error) {
      console.error("Sign out error:", error)
      return { success: false, error }
    }
  }

  getCurrentSession() {
    try {
      const session = localStorage.getItem("wyoverse_session")
      return session ? JSON.parse(session) : null
    } catch (error) {
      return null
    }
  }

  // Real-time subscription for user updates
  subscribeToUserUpdates(userId: string, callback: (user: User) => void) {
    return supabase
      .channel(`user_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${userId}`,
        },
        (payload) => callback(payload.new as User),
      )
      .subscribe()
  }
}

export const wyoAuth = new WyoVerseAuth()

export function useAuth() {
  return {
    signInWithWallet: wyoAuth.signInWithWallet,
    signInWithProvider: wyoAuth.signInWithProvider,
    signOut: wyoAuth.signOut,
    getCurrentSession: wyoAuth.getCurrentSession,
    createUser: wyoAuth.createUser,
    getUserById: wyoAuth.getUserById,
    updateProfile: wyoAuth.updateUserProfile,
    subscribeToUserUpdates: wyoAuth.subscribeToUserUpdates,
  }
}
