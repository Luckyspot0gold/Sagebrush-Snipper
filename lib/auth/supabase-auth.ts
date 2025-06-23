"use client"

import { createClient } from "@supabase/supabase-js"
import { useUserProfileStore } from "@/lib/stores/user-profile-store"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface AuthProvider {
  name: string
  icon: string
  color: string
  provider: "github" | "google" | "discord"
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
]

class WyoVerseAuth {
  async signInWithProvider(provider: "github" | "google" | "discord") {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: provider === "github" ? "read:user user:email" : undefined,
        },
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error("Auth error:", error)
      return { success: false, error }
    }
  }

  async signInWithWallet(walletAddress: string, signature: string) {
    try {
      // Custom wallet authentication logic
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${walletAddress}@wyoverse.wallet`,
        password: signature,
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error("Wallet auth error:", error)
      return { success: false, error }
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Clear user profile store
      useUserProfileStore.getState().setProfile(null)

      return { success: true }
    } catch (error) {
      console.error("Sign out error:", error)
      return { success: false, error }
    }
  }

  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error("Get user error:", error)
      return null
    }
  }

  async updateProfile(updates: any) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error("Update profile error:", error)
      return { success: false, error }
    }
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export const wyoAuth = new WyoVerseAuth()

// Hook for using authentication
export function useAuth() {
  return {
    signIn: wyoAuth.signInWithProvider,
    signInWithWallet: wyoAuth.signInWithWallet,
    signOut: wyoAuth.signOut,
    getCurrentUser: wyoAuth.getCurrentUser,
    updateProfile: wyoAuth.updateProfile,
    onAuthStateChange: wyoAuth.onAuthStateChange,
  }
}
