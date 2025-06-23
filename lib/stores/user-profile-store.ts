import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface UserProfile {
  id: string
  username: string
  email: string
  walletAddress?: string
  avatar: string
  bio: string
  location: string
  joinDate: string
  gameStats: {
    totalGamesPlayed: number
    favoriteGame: string
    achievements: string[]
    level: number
    experience: number
  }
  marketplaceConnections: {
    facebook: {
      connected: boolean
      profileId?: string
      lastSync?: string
    }
    nextdoor: {
      connected: boolean
      profileId?: string
      lastSync?: string
    }
    offerup: {
      connected: boolean
      profileId?: string
      lastSync?: string
    }
  }
  preferences: {
    notifications: boolean
    publicProfile: boolean
    showRealName: boolean
  }
}

interface UserProfileState {
  profile: UserProfile | null
  isLoading: boolean
  setProfile: (profile: UserProfile) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  connectMarketplace: (platform: keyof UserProfile["marketplaceConnections"], profileId: string) => void
  disconnectMarketplace: (platform: keyof UserProfile["marketplaceConnections"]) => void
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,

      setProfile: (profile) => set({ profile }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),

      connectMarketplace: (platform, profileId) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                marketplaceConnections: {
                  ...state.profile.marketplaceConnections,
                  [platform]: {
                    connected: true,
                    profileId,
                    lastSync: new Date().toISOString(),
                  },
                },
              }
            : null,
        })),

      disconnectMarketplace: (platform) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                marketplaceConnections: {
                  ...state.profile.marketplaceConnections,
                  [platform]: {
                    connected: false,
                    profileId: undefined,
                    lastSync: undefined,
                  },
                },
              }
            : null,
        })),
    }),
    {
      name: "wyoverse-user-profile",
    },
  ),
)
