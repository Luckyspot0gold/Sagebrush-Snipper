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
  socialGoodContribution?: number
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
  socialGoodPercentage?: number
}

interface RevenueShare {
  platform: number
  affiliate: number
  advertiser: number
  socialGood: number
  total: number
}

interface SocialGoodMetrics {
  totalDonated: number
  causesSupported: string[]
  impactScore: number
  participatingUsers: number
}

export class AffiliateTracker {
  private static instance: AffiliateTracker
  private clicks: Map<string, AffiliateClick> = new Map()
  private adSlots: Map<string, AdSlot> = new Map()
  private socialGoodMetrics: SocialGoodMetrics = {
    totalDonated: 0,
    causesSupported: [],
    impactScore: 0,
    participatingUsers: 0,
  }
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
      await this.loadExistingData()
      this.isInitialized = true
      console.log("✅ Affiliate tracker with social good initialized")
    } catch (error) {
      console.error("❌ Failed to initialize affiliate tracker:", error)
      throw error
    }
  }

  private async loadExistingData(): Promise<void> {
    try {
      if (typeof window !== "undefined") {
        const storedClicks = localStorage.getItem("affiliate_clicks")
        const storedSlots = localStorage.getItem("ad_slots")
        const storedSocialGood = localStorage.getItem("social_good_metrics")

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

        if (storedSocialGood) {
          this.socialGoodMetrics = JSON.parse(storedSocialGood)
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
        localStorage.setItem("social_good_metrics", JSON.stringify(this.socialGoodMetrics))
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
    return Math.round(baseBid * multiplier * 100) / 100
  }

  calculateSocialGoodContribution(commission: number, adId: string): number {
    const ad = this.adSlots.get(adId)
    const socialGoodPercentage = ad?.socialGoodPercentage || 0.05 // Default 5%
    return Math.round(commission * socialGoodPercentage * 100) / 100
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
      const socialGoodContribution = this.calculateSocialGoodContribution(commission, adId)

      const click: AffiliateClick = {
        id: `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adId,
        userId,
        timestamp: new Date(),
        commission,
        tier: userTier as any,
        ipAddress: await this.getClientIP(),
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
        socialGoodContribution,
      }

      // Store the click
      this.clicks.set(click.id, click)

      // Update ad slot stats
      ad.clicks += 1
      ad.impressions += 1
      ad.updatedAt = new Date()
      this.adSlots.set(adId, ad)

      // Update social good metrics
      this.socialGoodMetrics.totalDonated += socialGoodContribution
      this.socialGoodMetrics.impactScore += socialGoodContribution * 10 // Impact multiplier

      // Persist data
      await this.persistData()

      // Send to backend
      await this.sendToBackend(click)

      console.log("✅ Affiliate click tracked with social good:", {
        clickId: click.id,
        commission: click.commission,
        socialGoodContribution: click.socialGoodContribution,
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
    }
  }

  getRevenueShare(totalRevenue: number): RevenueShare {
    const socialGoodShare = totalRevenue * 0.05 // 5% to social good
    const platformShare = totalRevenue * 0.25 // 25%
    const affiliateShare = totalRevenue * 0.7 // 70%

    return {
      platform: Math.round(platformShare * 100) / 100,
      affiliate: Math.round(affiliateShare * 100) / 100,
      socialGood: Math.round(socialGoodShare * 100) / 100,
      advertiser: 0,
      total: totalRevenue,
    }
  }

  getSocialGoodMetrics(): SocialGoodMetrics {
    return { ...this.socialGoodMetrics }
  }

  getUserEarnings(userId: string): number {
    const userClicks = Array.from(this.clicks.values()).filter((click) => click.userId === userId)
    return userClicks.reduce((total, click) => total + click.commission, 0)
  }

  getUserSocialGoodContribution(userId: string): number {
    const userClicks = Array.from(this.clicks.values()).filter((click) => click.userId === userId)
    return userClicks.reduce((total, click) => total + (click.socialGoodContribution || 0), 0)
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
      socialGoodPercentage: slot.socialGoodPercentage || 0.05, // Default 5%
    }

    this.adSlots.set(id, newSlot)
    this.persistData()

    console.log("✅ Ad slot created with social good:", id)
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

  getTotalSocialGoodContributions(): number {
    return Array.from(this.clicks.values()).reduce((total, click) => total + (click.socialGoodContribution || 0), 0)
  }

  getStats() {
    const clicks = Array.from(this.clicks.values())
    const slots = Array.from(this.adSlots.values())

    return {
      totalClicks: clicks.length,
      totalRevenue: this.getTotalRevenue(),
      totalSocialGoodContributions: this.getTotalSocialGoodContributions(),
      activeAds: slots.filter((slot) => slot.isActive).length,
      totalAds: slots.length,
      averageCommission: clicks.length > 0 ? this.getTotalRevenue() / clicks.length : 0,
      clicksToday: clicks.filter((click) => {
        const today = new Date()
        return click.timestamp.toDateString() === today.toDateString()
      }).length,
      socialGoodMetrics: this.socialGoodMetrics,
    }
  }
}

// Export singleton instance
export const affiliateTracker = AffiliateTracker.getInstance()
