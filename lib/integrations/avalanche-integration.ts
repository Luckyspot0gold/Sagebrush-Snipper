export interface AvalancheConnectionResult {
  isConnected: boolean
  address?: string
  balance?: string
  chainId?: string
  error?: string
}

export interface NetworkInfo {
  chainId: string
  networkName: string
  rpcUrl: string
  blockExplorerUrl: string
}

export class AvalancheIntegration {
  private readonly AVALANCHE_MAINNET_PARAMS = {
    chainId: "0xA86A", // 43114 in hex
    chainName: "Avalanche Mainnet C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io/"],
  }

  async connectWallet(): Promise<AvalancheConnectionResult> {
    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        return {
          isConnected: false,
          error: "No Web3 wallet detected. Please install MetaMask or another Web3 wallet.",
        }
      }

      const ethereum = (window as any).ethereum

      // Check if already connected to Avalanche
      const chainId = await ethereum.request({ method: "eth_chainId" })

      // If not on Avalanche, try to switch
      if (chainId !== this.AVALANCHE_MAINNET_PARAMS.chainId) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: this.AVALANCHE_MAINNET_PARAMS.chainId }],
          })
        } catch (switchError: any) {
          // If the chain hasn't been added to the wallet, add it
          if (switchError.code === 4902) {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [this.AVALANCHE_MAINNET_PARAMS],
            })
          } else {
            throw switchError
          }
        }
      }

      // Request account access
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        return {
          isConnected: false,
          error: "No accounts found. Please connect your wallet.",
        }
      }

      // Get balance
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      const avaxBalance = (Number.parseInt(balance, 16) / 1e18).toFixed(4)

      return {
        isConnected: true,
        address: accounts[0],
        balance: avaxBalance,
        chainId: this.AVALANCHE_MAINNET_PARAMS.chainId,
      }
    } catch (error: any) {
      console.error("Avalanche connection error:", error)
      return {
        isConnected: false,
        error: error.message || "Failed to connect to Avalanche network",
      }
    }
  }

  async getNetworkInfo(): Promise<NetworkInfo> {
    return {
      chainId: this.AVALANCHE_MAINNET_PARAMS.chainId,
      networkName: this.AVALANCHE_MAINNET_PARAMS.chainName,
      rpcUrl: this.AVALANCHE_MAINNET_PARAMS.rpcUrls[0],
      blockExplorerUrl: this.AVALANCHE_MAINNET_PARAMS.blockExplorerUrls[0],
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        throw new Error("No Web3 wallet detected")
      }

      const ethereum = (window as any).ethereum
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })

      return (Number.parseInt(balance, 16) / 1e18).toFixed(4)
    } catch (error: any) {
      console.error("Error getting balance:", error)
      throw error
    }
  }

  async getCurrentNetwork(): Promise<string> {
    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        throw new Error("No Web3 wallet detected")
      }

      const ethereum = (window as any).ethereum
      const chainId = await ethereum.request({ method: "eth_chainId" })

      return chainId === this.AVALANCHE_MAINNET_PARAMS.chainId
        ? "Avalanche Mainnet C-Chain"
        : `Unknown Network (${chainId})`
    } catch (error: any) {
      console.error("Error getting network:", error)
      throw error
    }
  }
}

// Export singleton instance
export const avalancheIntegration = new AvalancheIntegration()
