export interface LinkStatus {
  url: string
  status: "active" | "construction" | "external" | "error"
  title: string
  description?: string
  expectedCompletion?: string
}

export const linkRegistry: Record<string, LinkStatus> = {
  // Main Navigation Links
  "/": { url: "/", status: "active", title: "Home" },
  "/games": { url: "/games", status: "active", title: "Games Portal" },
  "/market": { url: "/market", status: "active", title: "Market" },
  "/digital-rodeo": { url: "/digital-rodeo", status: "active", title: "Digital Rodeo" },
  "/land-deeds": { url: "/land-deeds", status: "active", title: "Land Deeds" },
  "/classifieds": { url: "/classifieds", status: "active", title: "Classifieds" },
  "/calendar": { url: "/calendar", status: "active", title: "Calendar" },

  // Educational Links
  "/education": { url: "/education", status: "active", title: "Education Portal" },
  "/osha": { url: "/osha", status: "active", title: "OSHA Training" },

  // Tourism & Recreation
  "/tourism": { url: "/tourism", status: "active", title: "Tourism" },
  "/parks": { url: "/parks", status: "active", title: "Parks & Recreation" },

  // Wyoming Features
  "/wyoming-pyramid": { url: "/wyoming-pyramid", status: "active", title: "Wyoming Pyramid" },
  "/wyoming-records": { url: "/wyoming-records", status: "active", title: "Wyoming Records" },
  "/native-history": { url: "/native-history", status: "active", title: "Native History" },
  "/energy": { url: "/energy", status: "active", title: "Energy Markets" },

  // Property & Assets
  "/property": { url: "/property", status: "active", title: "Property Connection" },
  "/stones": { url: "/stones", status: "active", title: "Stones & NFTs" },
  "/art": { url: "/art", status: "active", title: "Art Gallery" },

  // Community
  "/community": { url: "/community", status: "active", title: "Community" },
  "/saloon": { url: "/saloon", status: "active", title: "Saloon" },

  // Under Construction Pages
  "/mining": {
    url: "/mining",
    status: "construction",
    title: "Mining Operations",
    description: "Advanced cryptocurrency mining simulation with real-time market integration.",
    expectedCompletion: "Q2 2024",
  },
  "/explore": {
    url: "/explore",
    status: "construction",
    title: "Territory Explorer",
    description: "Interactive 3D exploration of the Wyoming digital frontier.",
    expectedCompletion: "Q2 2024",
  },
  "/store": {
    url: "/store",
    status: "construction",
    title: "General Store",
    description: "Purchase in-game items, NFTs, and exclusive WyoVerse merchandise.",
    expectedCompletion: "Q1 2024",
  },
  "/patents": {
    url: "/patents",
    status: "construction",
    title: "Patent Office",
    description: "Register and trade intellectual property in the digital frontier.",
    expectedCompletion: "Q3 2024",
  },

  // External Game Links
  "https://boxing.crypto-clashers.games": {
    url: "https://boxing.crypto-clashers.games",
    status: "external",
    title: "Crypto Clashers Boxing",
  },
  "https://racing.crypto-clashers.games": {
    url: "https://racing.crypto-clashers.games",
    status: "external",
    title: "Crypto Classic Racing",
  },
  "https://warroom.crypto-clashers.games": {
    url: "https://warroom.crypto-clashers.games",
    status: "external",
    title: "War Room Command Center",
  },
}

export function getLinkStatus(url: string): LinkStatus {
  return (
    linkRegistry[url] || {
      url,
      status: "error",
      title: "Page Not Found",
      description: "This page is still being built in Clutch's workshop.",
    }
  )
}

export function isLinkActive(url: string): boolean {
  const status = getLinkStatus(url)
  return status.status === "active"
}

export function shouldShowConstruction(url: string): boolean {
  const status = getLinkStatus(url)
  return status.status === "construction"
}
