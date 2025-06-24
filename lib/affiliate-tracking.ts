interface AffiliateClick {
  id: string
  adId: string
  userId: string
  timestamp: Date
  commission: number
  tier: "bronze" | "silver" | "gold" | "platinum"
  referralCode?: string
  ipAddress?: string
  userAgent?: string
}

interface AdSlot {
  id: string
  position: "sidebar" | "header" | "footer" | "inline"
  currentBid: number
  advertiser: string
  destinationUrl: string
  commissionRate: number
  isActive: boolean
  impressions: number
  clicks: number
  createdAt: Date
  updatedAt: Date
}

interface RevenueShare {
  platform: number
  affiliate: number
  advertiser: number
  total: number
}

export class AffiliateTracker {
  private static instance: AffiliateTracker
  private clicks: Map<string, AffiliateClick> = new Map()
  private adSlots: Map<string, AdSlot> = new Map()
  private isInitialized = false

  static getInstance(): AffiliateTracker {
    if (!AffiliateTracker.instance) {
      AffiliateTracker.instance = new AffiliateTracker()
    }
    return AffiliateTracker.instance
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Load existing data from database/localStorage
      await this.loadExistingData()
      this.isInitialized = true
      console.log("✅ Affiliate tracker initialized")
    } catch (error) {
      console.error("❌ Failed to initialize affiliate tracker:", error)
      throw error
    }
  }

  private async loadExistingData(): Promise<void> {
    try {
      // In a real app, this would load from your database
      // For now, we'll use localStorage as a fallback
      if (typeof window !== "undefined") {
        const storedClicks = localStorage.getItem("affiliate_clicks")
        const storedSlots = localStorage.getItem("ad_slots")

        if (storedClicks) {
          const clicks = JSON.parse(storedClicks)
          clicks.forEach((click: any) => {
            this.clicks.set(click.id, {
              ...click,
              timestamp: new Date(click.timestamp),
            })
          })
        }

        if (storedSlots) {
          const slots = JSON.parse(storedSlots)
          slots.forEach((slot: any) => {
            this.adSlots.set(slot.id, {
              ...slot,
              createdAt: new Date(slot.createdAt),
              updatedAt: new Date(slot.updatedAt),
            })
          })
        }
      }
    } catch (error) {
      console.warn("Could not load existing affiliate data:", error)
    }
  }

  private async persistData(): Promise<void> {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("affiliate_clicks", JSON.stringify(Array.from(this.clicks.values())))
        localStorage.setItem("ad_slots", JSON.stringify(Array.from(this.adSlots.values())))
      }
    } catch (error) {
      console.warn("Could not persist affiliate data:", error)
    }
  }

  calculateCommission(adId: string, userTier: string): number {
    const ad = this.adSlots.get(adId)
    if (!ad) {
      console.warn(`Ad slot ${adId} not found`)
      return 0
    }

    const baseBid = ad.currentBid
    const tierMultipliers = {
      bronze: 0.05, // 5%
      silver: 0.08, // 8%
      gold: 0.12, // 12%
      platinum: 0.15, // 15%
    }

    const multiplier = tierMultipliers[userTier as keyof typeof tierMultipliers] || 0.05
    return Math.round(baseBid * multiplier * 100) / 100 // Round to 2 decimal places
  }

  async trackClick(adId: string, userId: string, userTier = "bronze"): Promise<string> {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const ad = this.adSlots.get(adId)
      if (!ad) {
        throw new Error(`Ad slot ${adId} not found`)
      }

      if (!ad.isActive) {
        throw new Error(`Ad slot ${adId} is not active`)
      }

      const commission = this.calculateCommission(adId, userTier)

      const click: AffiliateClick = {
        id: `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adId,
        userId,
        timestamp: new Date(),
        commission,
        tier: userTier as any,
        ipAddress: await this.getClientIP(),
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      }

      // Store the click
      this.clicks.set(click.id, click)

      // Update ad slot stats
      ad.clicks += 1
      ad.impressions += 1
      ad.updatedAt = new Date()
      this.adSlots.set(adId, ad)

      // Persist data
      await this.persistData()

      // In a real app, you'd also send this to your backend
      await this.sendToBackend(click)

      console.log("✅ Affiliate click tracked:", {
        clickId: click.id,
        commission: click.commission,
        tier: click.tier,
      })

      return ad.destinationUrl
    } catch (error) {
      console.error("❌ Failed to track affiliate click:", error)
      throw error
    }
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()
      return data.ip
    } catch (error) {
      console.warn("Could not get client IP:", error)
      return "unknown"
    }
  }

  private async sendToBackend(click: AffiliateClick): Promise<void> {
    try {
      const response = await fetch("/api/affiliate/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(click),
      })

      if (!response.ok) {
        throw new Error(`Backend tracking failed: ${response.statusText}`)
      }
    } catch (error) {
      console.warn("Could not send click to backend:", error)
      // Don't throw here - we still want to track locally
    }
  }

  getRevenueShare(totalRevenue: number): RevenueShare {
    const platformShare = totalRevenue * 0.3 // 30%
    const affiliateShare = totalRevenue * 0.7 // 70%

    return {
      platform: Math.round(platformShare * 100) / 100,
      affiliate: Math.round(affiliateShare * 100) / 100,
      advertiser: 0, // Advertiser pays, doesn't receive
      total: totalRevenue,
    }
  }

  getUserEarnings(userId: string): number {
    const userClicks = Array.from(this.clicks.values()).filter((click) => click.userId === userId)
    return userClicks.reduce((total, click) => total + click.commission, 0)
  }

  addAdSlot(slot: Omit<AdSlot, "id" | "impressions" | "clicks" | "createdAt" | "updatedAt">): string {
    const id = `ad_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date()

    const newSlot: AdSlot = {
      ...slot,
      id,
      impressions: 0,
      clicks: 0,
      createdAt: now,
      updatedAt: now,
    }

    this.adSlots.set(id, newSlot)
    this.persistData()

    console.log("✅ Ad slot created:", id)
    return id
  }

  getAdSlot(id: string): AdSlot | undefined {
    return this.adSlots.get(id)
  }

  getAllAdSlots(): AdSlot[] {
    return Array.from(this.adSlots.values())
  }

  getActiveAdSlots(): AdSlot[] {
    return Array.from(this.adSlots.values()).filter((slot) => slot.isActive)
  }

  getClickHistory(limit = 50): AffiliateClick[] {
    return Array.from(this.clicks.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  }

  getTotalRevenue(): number {
    return Array.from(this.clicks.values()).reduce((total, click) => total + click.commission, 0)
  }

  getStats() {
    const clicks = Array.from(this.clicks.values())
    const slots = Array.from(this.adSlots.values())

    return {
      totalClicks: clicks.length,
      totalRevenue: this.getTotalRevenue(),
      activeAds: slots.filter((slot) => slot.isActive).length,
      totalAds: slots.length,
      averageCommission: clicks.length > 0 ? this.getTotalRevenue() / clicks.length : 0,
      clicksToday: clicks.filter((click) => {
        const today = new Date()
        return click.timestamp.toDateString() === today.toDateString()
      }).length,
    }
  }
}

// Export singleton instance
export const affiliateTracker = AffiliateTracker.getInstance()
