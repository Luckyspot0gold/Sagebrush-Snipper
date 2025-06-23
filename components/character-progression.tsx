"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Zap, Target } from "lucide-react"
import Image from "next/image"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
  reward: string
}

interface Character {
  name: string
  level: number
  experience: number
  maxExperience: number
  avatar: string
  specialties: string[]
  achievements: Achievement[]
}

export function CharacterProgression() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("clutch")

  const characters: Record<string, Character> = {
    clutch: {
      name: "Clutch",
      level: 15,
      experience: 2450,
      maxExperience: 3000,
      avatar: "/images/clutch-boxer.gif",
      specialties: ["Boxing", "Horse Riding", "Leadership"],
      achievements: [
        {
          id: "first-win",
          title: "First Victory",
          description: "Win your first boxing match",
          icon: "🥊",
          unlocked: true,
          progress: 1,
          maxProgress: 1,
          reward: "50 STONES",
        },
        {
          id: "horse-master",
          title: "Horse Master",
          description: "Complete 10 horse races",
          icon: "🐎",
          unlocked: true,
          progress: 10,
          maxProgress: 10,
          reward: "Legendary Saddle NFT",
        },
        {
          id: "market-trader",
          title: "Market Trader",
          description: "Make 100 successful trades",
          icon: "📈",
          unlocked: false,
          progress: 67,
          maxProgress: 100,
          reward: "Trading Bot Access",
        },
      ],
    },
  }

  const character = characters[selectedCharacter]
  const experiencePercent = (character.experience / character.maxExperience) * 100

  return (
    <div className="space-y-6">
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h1 className="text-4xl font-bold font-serif text-center mb-6">CHARACTER PROGRESSION</h1>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Character Card */}
              <div className="border-4 border-black p-1">
                <div className="border-2 border-black p-6 bg-white">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24">
                      <Image
                        src={character.avatar || "/placeholder.svg"}
                        alt={character.name}
                        fill
                        className="object-cover border-2 border-black rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-3xl font-bold font-serif">{character.name}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-xl font-bold">Level {character.level}</span>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Experience</span>
                          <span>
                            {character.experience} / {character.maxExperience}
                          </span>
                        </div>
                        <Progress value={experiencePercent} className="h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-bold font-serif mb-3">Specialties</h3>
                    <div className="flex gap-2">
                      {character.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-sm">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cross-Game Stats */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4 bg-white text-center">
                    <div className="text-3xl font-bold text-red-600">23</div>
                    <div className="text-sm font-serif">Boxing Wins</div>
                  </div>
                </div>

                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4 bg-white text-center">
                    <div className="text-3xl font-bold text-blue-600">15</div>
                    <div className="text-sm font-serif">Races Won</div>
                  </div>
                </div>

                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4 bg-white text-center">
                    <div className="text-3xl font-bold text-green-600">1,250</div>
                    <div className="text-sm font-serif">STONES Earned</div>
                  </div>
                </div>

                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4 bg-white text-center">
                    <div className="text-3xl font-bold text-purple-600">8</div>
                    <div className="text-sm font-serif">Land Deeds</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid gap-4">
                {character.achievements.map((achievement) => (
                  <div key={achievement.id} className="border-4 border-black p-1">
                    <div
                      className={`border-2 border-black p-4 ${achievement.unlocked ? "bg-yellow-50" : "bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{achievement.icon}</div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold font-serif">{achievement.title}</h3>
                            {achievement.unlocked && <Trophy className="h-5 w-5 text-yellow-500" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>

                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                            {achievement.unlocked ? "Unlocked" : "Locked"}
                          </Badge>
                          <p className="text-sm mt-2 font-semibold">{achievement.reward}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4 bg-white">
                    <h3 className="text-xl font-bold font-serif mb-4">Available Rewards</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 border border-gray-300 rounded">
                        <span>Daily Login Bonus</span>
                        <Button size="sm">
                          <Zap className="h-4 w-4 mr-2" />
                          Claim
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-2 border border-gray-300 rounded">
                        <span>Weekly Challenge</span>
                        <Button size="sm" variant="outline" disabled>
                          <Target className="h-4 w-4 mr-2" />
                          In Progress
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4 bg-white">
                    <h3 className="text-xl font-bold font-serif mb-4">Inventory</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>STONES</span>
                        <span className="font-bold">1,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tatonka Tokens</span>
                        <span className="font-bold">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Artifacts</span>
                        <span className="font-bold">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
