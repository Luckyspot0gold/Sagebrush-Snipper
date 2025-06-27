interface AvalancheNetworkConfig {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

interface AvalancheConnectionResult {
  isConnected: boolean
  address?: string
  balance?: string
  error?: string
  chainId?: string
  networkName?: string
}

export class AvalancheIntegration {
  private readonly avalancheMainnet: AvalancheNetworkConfig = {
    chainId: "0xA86A", // 43114 in hex
    chainName: "Avalanche C-Chain",
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
          error: "No Ethereum wallet detected. Please install MetaMask or Core Wallet.",
        }
      }

      const ethereum = (window as any).ethereum

      // Request account access
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        })

        if (!accounts || accounts.length === 0) {
          return {
            isConnected: false,
            error: "No accounts found. Please unlock your wallet.",
          }
        }

        // Check current network
        const currentChainId = await ethereum.request({
          method: "eth_chainId",
        })

        // Switch to Avalanche if not already connected
        if (currentChainId !== this.avalancheMainnet.chainId) {
          try {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: this.avalancheMainnet.chainId }],
            })
          } catch (switchError: any) {
            // If network doesn't exist, add it
            if (switchError.code === 4902) {
              try {
                await ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [this.avalancheMainnet],
                })
              } catch (addError: any) {
                return {
                  isConnected: false,
                  error: `Failed to add Avalanche network: ${addError.message}`,
                }
              }
            } else {
              return {
                isConnected: false,
                error: `Failed to switch to Avalanche network: ${switchError.message}`,
              }
            }
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
          chainId: this.avalancheMainnet.chainId,
          networkName: this.avalancheMainnet.chainName,
        }
      } catch (requestError: any) {
        // Handle user rejection (code 4001)
        if (requestError.code === 4001) {
          return {
            isConnected: false,
            error: "User rejected the connection request.",
          }
        }

        return {
          isConnected: false,
          error: `Connection failed: ${requestError.message}`,
        }
      }
    } catch (error: any) {
      console.error("Avalanche integration error:", error)
      return {
        isConnected: false,
        error: `Unexpected error: ${error.message}`,
      }
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        throw new Error("No Ethereum wallet detected")
      }

      const balance = await (window as any).ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })

      return (Number.parseInt(balance, 16) / 1e18).toFixed(4)
    } catch (error: any) {
      console.error("Failed to get balance:", error)
      throw error
    }
  }

  async getCurrentNetwork(): Promise<{ chainId: string; isAvalanche: boolean }> {
    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        throw new Error("No Ethereum wallet detected")
      }

      const chainId = await (window as any).ethereum.request({
        method: "eth_chainId",
      })

      return {
        chainId,
        isAvalanche: chainId === this.avalancheMainnet.chainId,
      }
    } catch (error: any) {
      console.error("Failed to get current network:", error)
      throw error
    }
  }
}

// Export singleton instance
export const avalancheIntegration = new AvalancheIntegration()
