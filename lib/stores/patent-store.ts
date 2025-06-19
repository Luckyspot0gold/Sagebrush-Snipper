"use client"

import { create } from "zustand"
import type { Patent } from "@/lib/types"

interface PatentState {
  patents: Patent[]
}

export const usePatentStore = create<PatentState>(() => ({
  patents: [
    {
      id: "WV2025-1",
      title: "Geo-Financial Engine",
      description: "System for linking geographical locations to financial assets in a virtual world",
      claims: [
        "Method for tokenizing virtual land with real-world coordinates",
        "System for generating value based on virtual land usage",
        "Process for transferring ownership of virtual land via blockchain",
      ],
      filingDate: "2025-01-15",
      status: "granted",
    },
    {
      id: "WV2025-2",
      title: "Real-Time Market Volatility-Driven Game Mechanics",
      description:
        "System where cryptocurrency price movements directly affect in-game character statistics and world events",
      claims: [
        "System where crypto price swings directly alter in-game character stats",
        "Method for converting trading volume to virtual terrain deformation",
        "Oracle-triggered events based on market conditions",
      ],
      filingDate: "2025-02-28",
      status: "pending",
    },
    {
      id: "WV2025-3",
      title: "Quantum-Resistant Land Deed System",
      description: "Post-quantum cryptographic method for securing virtual land ownership records",
      claims: [
        "Method for securing virtual land deeds against quantum computing attacks",
        "System for verifying land ownership using lattice-based cryptography",
        "Process for transferring land deeds with quantum-resistant signatures",
      ],
      filingDate: "2025-03-10",
      status: "pending",
    },
  ],
}))
