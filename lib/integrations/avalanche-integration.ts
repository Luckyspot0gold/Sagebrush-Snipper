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
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask not installed")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found")
      }

      // Switch to Avalanche network
      await this.switchToAvalanche()

      // Get balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      this.connection = {
        address: accounts[0],
        balance: this.formatBalance(balance),
        isConnected: true,
      }

      return this.connection
    } catch (error) {
      console.error("Avalanche wallet connection failed:", error)
      throw error
    }
  }

  private async switchToAvalanche(): Promise<void> {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${this.config.chainId.toString(16)}` }],
      })
    } catch (switchError: any) {
      // Chain not added to wallet
      if (switchError.code === 4902) {
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
      } else {
        throw switchError
      }
    }
  }

  private formatBalance(hexBalance: string): string {
    const balance = Number.parseInt(hexBalance, 16)
    return (balance / Math.pow(10, 18)).toFixed(4)
  }

  getConnection(): WalletConnection | null {
    return this.connection
  }

  disconnect(): void {
    this.connection = null
  }
}

// Singleton instance
export const avalancheIntegration = new AvalancheIntegration()
