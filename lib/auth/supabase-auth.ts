"use client"

import { neon } from "@neondatabase/serverless"
import { useUserProfileStore } from "@/lib/stores/user-profile-store"

const sql = neon(process.env.DATABASE_URL!)

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
      const result = await sql`
        INSERT INTO users (id, email, username, avatar_url, wallet_address, provider, created_at)
        VALUES (${userData.id}, ${userData.email}, ${userData.username}, ${userData.avatar_url}, ${userData.wallet_address}, ${userData.provider}, NOW())
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          username = EXCLUDED.username,
          avatar_url = EXCLUDED.avatar_url,
          wallet_address = EXCLUDED.wallet_address,
          updated_at = NOW()
        RETURNING *
      `
      return { success: true, user: result[0] }
    } catch (error) {
      console.error("Create user error:", error)
      return { success: false, error }
    }
  }

  async getUserById(userId: string) {
    try {
      const result = await sql`
        SELECT * FROM users WHERE id = ${userId}
      `
      return result[0] || null
    } catch (error) {
      console.error("Get user error:", error)
      return null
    }
  }

  async updateUserProfile(userId: string, updates: any) {
    try {
      const result = await sql`
        UPDATE users 
        SET ${sql(updates)}, updated_at = NOW()
        WHERE id = ${userId}
        RETURNING *
      `
      return { success: true, user: result[0] }
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

  async signOut() {
    try {
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
}

export const wyoAuth = new WyoVerseAuth()

export function useAuth() {
  return {
    signInWithWallet: wyoAuth.signInWithWallet,
    signOut: wyoAuth.signOut,
    getCurrentSession: wyoAuth.getCurrentSession,
    createUser: wyoAuth.createUser,
    getUserById: wyoAuth.getUserById,
    updateProfile: wyoAuth.updateUserProfile,
  }
}
