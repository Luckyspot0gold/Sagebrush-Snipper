"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, Zap, Crown, Medal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress: number
  maxProgress: number
  reward: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

const ONBOARDING_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_steps",
    title: "First Steps on the Frontier",
    description: "Welcome to WyoVerse, pioneer!",
    icon: <Target className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: "10 AVAX",
    rarity: "common",
  },
  {
    id: "land_claimer",
    title: "Land Claimer",
    description: "Stake your first claim in the digital frontier",
    icon: <Trophy className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: "Premium Land Deed",
    rarity: "rare",
  },
  {
    id: "stone_collector",
    title: "Stone Collector",
    description: "Gather 50 stones from your land",
    icon: <Star className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    reward: "Leather Boxing Gloves",
    rarity: "common",
  },
  {
    id: "first_fight",
    title: "Frontier Fighter",
    description: "Win your first boxing match",
    icon: <Zap className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: "25 AVAX + Fighter Badge",
    rarity: "epic",
  },
  {
    id: "bills_friend",
    title: "Bill's Trusted Friend",
    description: "Have 5 conversations with Bar Keep Bill",
    icon: <Crown className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    reward: "VIP Saloon Access",
    rarity: "legendary",
  },
]

export function GamifiedOnboarding() {
  const [achievements, setAchievements] = useState<Achievement[]>(ONBOARDING_ACHIEVEMENTS)
  const [currentStep, setCurrentStep] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [totalProgress, setTotalProgress] = useState(0)

  useEffect(() => {
    const unlockedCount = achievements.filter((a) => a.unlocked).length
    setTotalProgress((unlockedCount / achievements.length) * 100)
  }, [achievements])

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true, progress: achievement.maxProgress }
          : achievement,
      ),
    )
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 3000)
  }

  const updateProgress = (achievementId: string, progress: number) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, progress: Math.min(progress, achievement.maxProgress) }
          : achievement,
      ),
    )
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 font-serif">Welcome to the Frontier, Pioneer!</h1>
          <p className="text-lg text-amber-700 mb-4">
            Complete these challenges to earn your place in WyoVerse history
          </p>
          <div className="max-w-md mx-auto">
            <Progress value={totalProgress} className="h-3" />
            <p className="text-sm text-amber-600 mt-2">Progress: {Math.round(totalProgress)}% Complete</p>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden border-2 ${
                  achievement.unlocked
                    ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100"
                    : "border-amber-200 bg-white"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-yellow-400" : "bg-gray-200"}`}>
                      {achievement.icon}
                    </div>
                    <Badge className={`${getRarityColor(achievement.rarity)} text-white`}>
                      {achievement.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-serif text-amber-900">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-700 mb-3">{achievement.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    <p className="text-xs text-amber-600 mt-1">
                      {achievement.progress}/{achievement.maxProgress}
                    </p>
                  </div>

                  {/* Reward */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">🏆 {achievement.reward}</span>
                    {achievement.unlocked && <Medal className="w-5 h-5 text-yellow-500" />}
                  </div>
                </CardContent>

                {/* Unlock Animation */}
                {achievement.unlocked && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 right-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-yellow-400 rounded-full p-1"
                      >
                        <Trophy className="w-4 h-4 text-yellow-800" />
                      </motion.div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => unlockAchievement("first_steps")} className="bg-amber-600 hover:bg-amber-700">
              🏔️ Start Your Journey
            </Button>
            <Button
              onClick={() => unlockAchievement("land_claimer")}
              variant="outline"
              className="border-amber-600 text-amber-600"
            >
              🏡 Claim Land
            </Button>
            <Button
              onClick={() => updateProgress("stone_collector", 25)}
              variant="outline"
              className="border-amber-600 text-amber-600"
            >
              💎 Collect Stones
            </Button>
          </div>

          <p className="text-sm text-amber-600 italic">
            "Every legend starts with a single step, partner!" - Bar Keep Bill
          </p>
        </div>

        {/* Celebration Modal */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl mb-4"
                >
                  🏆
                </motion.div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">Achievement Unlocked!</h2>
                <p className="text-amber-700">You're making your mark on the frontier, pioneer!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
