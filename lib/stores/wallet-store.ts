"use client"

import { create } from "zustand"

interface WalletState {
  walletAddress: string | null
  walletBalance: number
  isConnecting: boolean

  // Methods
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  walletAddress: null,
  walletBalance: 0,
  isConnecting: false,

  connectWallet: async () => {
    set({ isConnecting: true })

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a mock wallet address
      const mockAddress = "0x" + Math.random().toString(16).substring(2, 14) + "..."

      set({
        walletAddress: mockAddress,
        walletBalance: 1000,
        isConnecting: false,
      })

      // This would be replaced with actual wallet connection code
      // For example, using ethers.js or web3.js to connect to MetaMask
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      set({ isConnecting: false })
    }
  },

  disconnectWallet: () => {
    set({
      walletAddress: null,
      walletBalance: 0,
    })
  },
}))
