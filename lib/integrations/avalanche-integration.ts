interface AvalancheConfig {
  rpcUrl: string
  chainId: number
  networkName: string
}

interface WalletConnection {
  address: string
  balance: string
  isConnected: boolean
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (accounts: string[]) => void) => void
      removeListener: (event: string, callback: (accounts: string[]) => void) => void
    }
  }
}

export class AvalancheIntegration {
  private config: AvalancheConfig
  private connection: WalletConnection | null = null

  constructor() {
    this.config = {
      rpcUrl: process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114, // Avalanche C-Chain
      networkName: "Avalanche",
    }
  }

  async connectWallet(): Promise<WalletConnection> {
    try {
      if (typeof window === "undefined") {
        throw new Error("Window object not available")
      }

      if (!window.ethereum) {
        throw new Error("MetaMask not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet.")
      }

      // Switch to Avalanche network
      await this.switchToAvalanche()

      // Get balance with error handling
      let balance = "0"
      try {
        const balanceHex = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })
        balance = this.formatBalance(balanceHex)
      } catch (balanceError) {
        console.warn("Could not fetch balance:", balanceError)
        balance = "0.0000"
      }

      this.connection = {
        address: accounts[0],
        balance,
        isConnected: true,
      }

      // Listen for account changes
      this.setupEventListeners()

      return this.connection
    } catch (error: any) {
      console.error("Avalanche wallet connection failed:", error)
      throw new Error(`Wallet connection failed: ${error.message}`)
    }
  }

  private setupEventListeners(): void {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        this.disconnect()
      } else if (this.connection) {
        this.connection.address = accounts[0]
        // Refresh balance
        this.refreshBalance()
      }
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
  }

  private async refreshBalance(): Promise<void> {
    if (!this.connection || !window.ethereum) return

    try {
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [this.connection.address, "latest"],
      })
      this.connection.balance = this.formatBalance(balanceHex)
    } catch (error) {
      console.warn("Could not refresh balance:", error)
    }
  }

  private async switchToAvalanche(): Promise<void> {
    if (!window.ethereum) {
      throw new Error("MetaMask not available")
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${this.config.chainId.toString(16)}` }],
      })
    } catch (switchError: any) {
      // Chain not added to wallet
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${this.config.chainId.toString(16)}`,
                chainName: this.config.networkName,
                rpcUrls: [this.config.rpcUrl],
                nativeCurrency: {
                  name: "AVAX",
                  symbol: "AVAX",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://snowtrace.io/"],
              },
            ],
          })
        } catch (addError) {
          throw new Error("Failed to add Avalanche network to wallet")
        }
      } else {
        throw new Error(`Failed to switch to Avalanche network: ${switchError.message}`)
      }
    }
  }

  private formatBalance(hexBalance: string): string {
    try {
      const balance = Number.parseInt(hexBalance, 16)
      if (isNaN(balance)) return "0.0000"
      return (balance / Math.pow(10, 18)).toFixed(4)
    } catch (error) {
      console.warn("Could not format balance:", error)
      return "0.0000"
    }
  }

  getConnection(): WalletConnection | null {
    return this.connection
  }

  disconnect(): void {
    this.connection = null
    // Remove event listeners if needed
    if (window.ethereum && window.ethereum.removeListener) {
      // Clean up listeners
    }
  }

  isConnected(): boolean {
    return this.connection?.isConnected ?? false
  }
}

// Singleton instance
export const avalancheIntegration = new AvalancheIntegration()
