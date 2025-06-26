#!/usr/bin/env node

/**
 * WyoVerse Affiliate Activation Script
 * Integrates SocialGood.inc, DeSo, and Temu affiliate programs
 */

const fs = require("fs")
const path = require("path")

class AffiliateActivator {
  constructor() {
    this.affiliateLinks = {
      socialGood: {
        url: "https://go.socialgood.inc/?adj_redirect=https%3A%2F%2Fsocialgood.inc%2Fapp%2F1%2F&adj_t=1gbx67rh&adj_deeplink_js=1&referralCode=SVJDQ6",
        name: "SocialGood.inc",
        description: "Earn while shopping for social good causes",
        commission: 0.05,
        category: "social_good",
      },
      deso: {
        url: "https://docs.deso.org/",
        name: "DeSo Blockchain",
        description: "Decentralized social blockchain platform",
        commission: 0.03,
        category: "blockchain",
      },
      temuMain: {
        url: "https://temu.to/m/u7wq0kfazcq",
        name: "Temu Shopping",
        description: "Hot deals and amazing discounts",
        commission: 0.08,
        category: "shopping",
        searchCode: "frp288931",
      },
      temuApp: {
        url: "https://app.temu.com/m/qqmjtu4t3jr",
        name: "Temu App",
        description: "Direct app access with exclusive deals",
        commission: 0.08,
        category: "shopping",
      },
      temuEarn: {
        url: "https://temu.to/m/uk5c470tnv3",
        name: "Temu Earn Together",
        description: "Earn with friends program",
        commission: 0.08,
        category: "shopping",
        inviteCode: "inv961284",
      },
    }

    this.socialGoodPercentage = 0.05 // 5% to social causes
  }

  activate() {
    console.log("🚀 Activating WyoVerse Affiliate Program...\n")

    const config = {
      timestamp: new Date().toISOString(),
      program: "WyoVerse Social Good Affiliate Network",
      version: "1.0.0",
      status: "active",
      affiliateLinks: this.affiliateLinks,
      socialGoodPercentage: this.socialGoodPercentage,
      totalLinks: Object.keys(this.affiliateLinks).length,
      categories: this.getCategories(),
      commissionRates: this.getCommissionRates(),
      specialCodes: this.getSpecialCodes(),
    }

    // Save configuration
    const configPath = path.join(process.cwd(), "affiliate-config.json")
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

    // Generate affiliate tracking code
    this.generateTrackingCode()

    // Display activation summary
    this.displaySummary(config)

    console.log("✅ Affiliate program successfully activated!")
    console.log(`📁 Configuration saved to: ${configPath}`)

    return config
  }

  getCategories() {
    const categories = {}
    Object.values(this.affiliateLinks).forEach((link) => {
      if (!categories[link.category]) {
        categories[link.category] = []
      }
      categories[link.category].push(link.name)
    })
    return categories
  }

  getCommissionRates() {
    const rates = {}
    Object.entries(this.affiliateLinks).forEach(([key, link]) => {
      rates[key] = link.commission
    })
    return rates
  }

  getSpecialCodes() {
    const codes = {}
    Object.entries(this.affiliateLinks).forEach(([key, link]) => {
      if (link.searchCode) codes[`${key}_search`] = link.searchCode
      if (link.inviteCode) codes[`${key}_invite`] = link.inviteCode
    })
    return codes
  }

  generateTrackingCode() {
    const trackingCode = `
// WyoVerse Affiliate Tracking Code
class WyoVerseAffiliateTracker {
  constructor() {
    this.baseUrl = '/api/affiliate/track';
    this.socialGoodRate = ${this.socialGoodPercentage};
  }

  async trackClick(affiliateId, userId, userTier = 'bronze') {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affiliateId,
          userId,
          userTier,
          timestamp: new Date().toISOString(),
          socialGoodEnabled: true
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Affiliate click tracked:', result);
        if (result.socialGoodContribution > 0) {
          console.log('💚 Social good contribution:', result.socialGoodContribution);
        }
      }

      return result.destinationUrl;
    } catch (error) {
      console.error('❌ Affiliate tracking failed:', error);
      return null;
    }
  }
}

// Export for use in components
export const wyoVerseTracker = new WyoVerseAffiliateTracker();
`

    const trackingPath = path.join(process.cwd(), "lib", "wyoverse-affiliate-tracker.js")
    fs.writeFileSync(trackingPath, trackingCode)
    console.log(`📊 Tracking code generated: ${trackingPath}`)
  }

  displaySummary(config) {
    console.log("\n📋 AFFILIATE PROGRAM SUMMARY")
    console.log("═".repeat(50))
    console.log(`📅 Activated: ${new Date(config.timestamp).toLocaleString()}`)
    console.log(`🔗 Total Links: ${config.totalLinks}`)
    console.log(`💚 Social Good Rate: ${(config.socialGoodPercentage * 100).toFixed(1)}%`)

    console.log("\n🏷️ CATEGORIES:")
    Object.entries(config.categories).forEach(([category, links]) => {
      console.log(`   ${category}: ${links.join(", ")}`)
    })

    console.log("\n💰 COMMISSION RATES:")
    Object.entries(config.commissionRates).forEach(([key, rate]) => {
      const link = config.affiliateLinks[key]
      console.log(`   ${link.name}: ${(rate * 100).toFixed(1)}%`)
    })

    console.log("\n🎯 SPECIAL CODES:")
    Object.entries(config.specialCodes).forEach(([key, code]) => {
      console.log(`   ${key}: ${code}`)
    })

    console.log("\n🌟 FEATURED PROGRAMS:")
    console.log("   • SocialGood.inc - Shop for social impact")
    console.log("   • DeSo Blockchain - Decentralized social media")
    console.log("   • Temu Shopping - Deals with social contribution")

    console.log("\n💡 USAGE INSTRUCTIONS:")
    console.log('   1. Use search code "frp288931" in Temu app for 30% off')
    console.log('   2. Use invite code "inv961284" to earn together')
    console.log("   3. All affiliate earnings contribute 5% to social causes")
    console.log("   4. Track performance in WyoVerse affiliate dashboard")
  }
}

// Run activation if called directly
if (require.main === module) {
  const activator = new AffiliateActivator()
  activator.activate()
}

module.exports = AffiliateActivator
