"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, Calendar, Star, Trophy, Coins, Gem } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DailyReward {
  day: number
  reward: string
  value: string
  icon: React.ReactNode
  claimed: boolean
  available: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
}

const DAILY_REWARDS: DailyReward[] = [
  {
    day: 1,
    reward: "Stones",
    value: "50",
    icon: <Gem className="w-6 h-6" />,
    claimed: false,
    available: true,
    rarity: "common",
  },
  {
    day: 2,
    reward: "AVAX",
    value: "5",
    icon: <Coins className="w-6 h-6" />,
    claimed: false,
    available: false,
    rarity: "common",
  },
  {
    day: 3,
    reward: "Stones",
    value: "75",
    icon: <Gem className="w-6 h-6" />,
    claimed: false,
    available: false,
    rarity: "common",
  },
  {
    day: 4,
    reward: "Boxing Gloves",
    value: "Leather",
    icon: <Trophy className="w-6 h-6" />,
    claimed: false,
    available: false,
    rarity: "rare",
  },
  {
    day: 5,
    reward: "AVAX",
    value: "10",
    icon: <Coins className="w-6 h-6" />,
    claimed: false,
    available: false,
    rarity: "rare",
  },
  {
    day: 6,
    reward: "Land Deed",
    value: "Premium",
    icon: <Star className="w-6 h-6" />,
    claimed: false,
    available: false,
    rarity: "epic",
  },
  {
    day: 7,
    reward: "Legendary Chest",
    value: "Mystery",
    icon: <Gift className="w-6 h-6" />,
    claimed: false,
    available: false,
    rarity: "legendary",
  },
]

interface LoginStreak {
  currentStreak: number
  longestStreak: number
  totalLogins: number
  lastLogin: string
}

export function DailyLoginRewards() {
  const [rewards, setRewards] = useState<DailyReward[]>(DAILY_REWARDS)
  const [streak, setStreak] = useState<LoginStreak>({
    currentStreak: 1,
    longestStreak: 7,
    totalLogins: 23,
    lastLogin: "Today",
  })
  const [showClaimAnimation, setShowClaimAnimation] = useState(false)
  const [claimedReward, setClaimedReward] = useState<DailyReward | null>(null)

  const claimReward = (day: number) => {
    const reward = rewards.find((r) => r.day === day)
    if (reward && reward.available && !reward.claimed) {
      setRewards((prev) => prev.map((r) => (r.day === day ? { ...r, claimed: true } : r)))
      setClaimedReward(reward)
      setShowClaimAnimation(true)
      setTimeout(() => setShowClaimAnimation(false), 3000)

      // Update streak
      setStreak((prev) => ({
        ...prev,
        currentStreak: Math.min(prev.currentStreak + 1, 7),
        totalLogins: prev.totalLogins + 1,
      }))
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "shadow-gray-200"
      case "rare":
        return "shadow-blue-200"
      case "epic":
        return "shadow-purple-200"
      case "legendary":
        return "shadow-yellow-200"
      default:
        return "shadow-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 font-serif">Daily Frontier Rewards</h1>
          <p className="text-lg text-amber-700 mb-4">Return each day to claim your pioneer's bounty!</p>

          {/* Streak Info */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-900">{streak.currentStreak}</div>
              <div className="text-sm text-amber-600">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-900">{streak.longestStreak}</div>
              <div className="text-sm text-amber-600">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-900">{streak.totalLogins}</div>
              <div className="text-sm text-amber-600">Total Logins</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <Progress value={(streak.currentStreak / 7) * 100} className="h-3 mb-2" />
            <p className="text-sm text-amber-600">{streak.currentStreak}/7 days to Legendary Chest</p>
          </div>
        </div>

        {/* Reward Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden transition-all duration-300 ${
                  reward.claimed
                    ? "bg-green-50 border-green-300"
                    : reward.available
                      ? `border-2 ${getRarityGlow(reward.rarity)} hover:shadow-lg cursor-pointer`
                      : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <CardHeader className="pb-2 text-center">
                  <div className="flex justify-between items-start">
                    <Badge className={`${getRarityColor(reward.rarity)} text-white text-xs`}>
                      {reward.rarity.toUpperCase()}
                    </Badge>
                    <div className="text-lg font-bold text-amber-900">Day {reward.day}</div>
                  </div>
                  <div
                    className={`mx-auto p-3 rounded-full ${
                      reward.claimed ? "bg-green-200" : reward.available ? "bg-amber-200" : "bg-gray-200"
                    }`}
                  >
                    {reward.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="font-semibold text-amber-900 mb-1">{reward.reward}</h3>
                  <p className="text-sm text-amber-700 mb-3">{reward.value}</p>

                  {reward.claimed ? (
                    <Badge className="bg-green-500 text-white">✓ Claimed</Badge>
                  ) : reward.available ? (
                    <Button
                      onClick={() => claimReward(reward.day)}
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      size="sm"
                    >
                      <Gift className="w-4 h-4 mr-1" />
                      Claim
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      Locked
                    </Badge>
                  )}
                </CardContent>

                {/* Legendary Glow Effect */}
                {reward.rarity === "legendary" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400 opacity-20 animate-pulse" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bonus Rewards Section */}
        <Card className="mb-8 border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100">
          <CardHeader>
            <CardTitle className="text-center text-amber-900 font-serif">🎯 Streak Bonuses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl mb-2">🔥</div>
                <h4 className="font-semibold text-amber-900">3-Day Streak</h4>
                <p className="text-sm text-amber-700">+25% Stone Generation</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-amber-900">5-Day Streak</h4>
                <p className="text-sm text-amber-700">+50% Boxing XP</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl mb-2">👑</div>
                <h4 className="font-semibold text-amber-900">7-Day Streak</h4>
                <p className="text-sm text-amber-700">Legendary Status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Claim Animation */}
        <AnimatePresence>
          {showClaimAnimation && claimedReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                  className="text-6xl mb-4"
                >
                  🎁
                </motion.div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">Reward Claimed!</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {claimedReward.icon}
                  <span className="text-lg font-semibold">
                    {claimedReward.value} {claimedReward.reward}
                  </span>
                </div>
                <p className="text-amber-700">Added to your frontier inventory!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <div className="text-center bg-amber-100 rounded-lg p-6">
          <h3 className="text-xl font-bold text-amber-900 mb-2">Don't Break Your Streak, Partner!</h3>
          <p className="text-amber-700 mb-4">
            The frontier rewards those who show up every day. Set a reminder and keep building your legend!
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Calendar className="w-4 h-4 mr-2" />
              Set Reminder
            </Button>
            <Button variant="outline" className="border-amber-600 text-amber-600">
              <Trophy className="w-4 h-4 mr-2" />
              View Achievements
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
