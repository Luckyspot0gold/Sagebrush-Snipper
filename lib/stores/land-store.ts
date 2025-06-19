"use client"

import { create } from "zustand"
import type { LandDeed } from "@/lib/types"

interface LandState {
  landDeeds: LandDeed[]
  availableLand: LandDeed[]

  // Methods
  mintLandDeed: (deed: LandDeed) => void
}

export const useLandStore = create<LandState>((set) => ({
  landDeeds: [],
  availableLand: [
    {
      id: "plot-1",
      name: "Canyon Bluff",
      description: "A dry, sun-beaten acre of the Wyoverse.",
      coordinates: "43.0731° N, 107.2903° W",
      owner: "",
      size: "1.0",
      attributes: {
        water: "low",
        mining_rights: "granted",
      },
    },
    {
      id: "plot-2",
      name: "River Bend",
      description: "A lush plot with access to fresh water.",
      coordinates: "43.1021° N, 107.3103° W",
      owner: "",
      size: "2.5",
      attributes: {
        water: "high",
        mining_rights: "restricted",
      },
    },
    {
      id: "plot-3",
      name: "Gold Ridge",
      description: "Rumored to have valuable minerals beneath.",
      coordinates: "43.0831° N, 107.2703° W",
      owner: "",
      size: "1.5",
      attributes: {
        water: "low",
        mining_rights: "granted",
      },
    },
    {
      id: "plot-4",
      name: "Prairie View",
      description: "Wide open spaces with a view of the mountains.",
      coordinates: "43.0631° N, 107.2503° W",
      owner: "",
      size: "3.0",
      attributes: {
        water: "medium",
        mining_rights: "granted",
      },
    },
    {
      id: "plot-5",
      name: "Aspen Grove",
      description: "Beautiful stand of aspen trees with seasonal water.",
      coordinates: "43.0931° N, 107.2803° W",
      owner: "",
      size: "2.0",
      attributes: {
        water: "medium",
        mining_rights: "restricted",
      },
    },
  ],

  mintLandDeed: (deed: LandDeed) => {
    set((state) => {
      // Remove from available land
      const updatedAvailableLand = state.availableLand.filter((plot) => plot.id !== deed.id)

      // Add to owned deeds with owner info
      const newDeed = {
        ...deed,
        owner: "current-user", // In a real app, this would be the wallet address
      }

      return {
        availableLand: updatedAvailableLand,
        landDeeds: [...state.landDeeds, newDeed],
      }
    })
  },
}))
