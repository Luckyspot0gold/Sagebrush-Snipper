"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Gamepad2, Video, Trophy, Users, ArrowRight, Play } from "lucide-react"
import Image from "next/image"

export function SportsSection() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <div className="text-center border-b-4 border-black pb-4 mb-6">
            <h1 className="text-5xl font-bold font-serif uppercase">SPORTS SECTION</h1>
            <p className="text-lg font-serif italic">Games, Arena Battles & Digital Competition</p>
            <div className="flex justify-center mt-2">
              <Badge className="bg-red-100 text-red-800 font-serif">🔴 LIVE • Arena Battle in Progress</Badge>
            </div>
          </div>

          {/* Live Stream Feature */}
          <div className="border-4 border-black p-1 mb-6">
            <div className="border-2 border-black p-4 bg-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-serif">LIVE ARENA BATTLE</h2>
                  <p className="font-serif">Bull vs Bear • Market-Driven Combat</p>
                  <p className="text-sm font-serif text-gray-600">2,847 viewers watching</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/streaming">
                    <Button className="bg-red-600 text-white hover:bg-red-700 font-serif">
                      <Video className="h-4 w-4 mr-2" />
                      WATCH LIVE
                    </Button>
                  </Link>
                  <Link href="/boxing-arena">
                    <Button variant="outline" className="border-black font-serif">
                      <Play className="h-4 w-4 mr-2" />
                      JOIN BATTLE
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/games" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Gamepad2 className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">ALL GAMES</h3>
                  <p className="text-xs font-serif text-center">Game Portal</p>
                </div>
              </div>
            </Link>

            <Link href="/boxing-arena" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Trophy className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">BOXING ARENA</h3>
                  <p className="text-xs font-serif text-center">Crypto Battles</p>
                </div>
              </div>
            </Link>

            <Link href="/digital-rodeo" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">DIGITAL RODEO</h3>
                  <p className="text-xs font-serif text-center">Bull Riding</p>
                </div>
              </div>
            </Link>

            <Link href="/streaming" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Video className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">LIVE STREAM</h3>
                  <p className="text-xs font-serif text-center">Broadcast</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Matches */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="text-3xl font-bold font-serif mb-4">FEATURED MATCHES</h2>

              <div className="space-y-4">
                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4">
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <Image
                          src="/images/victory-bull-colosseum.webp"
                          alt="Victory Bull"
                          width={200}
                          height={150}
                          className="w-full h-auto border border-black"
                        />
                      </div>
                      <div className="w-2/3">
                        <h3 className="text-xl font-bold font-serif mb-2">VICTORY BULL DOMINATES COLOSSEUM</h3>
                        <p className="font-serif mb-3">
                          In a stunning display of market-driven power, Victory Bull secured another victory as Bitcoin
                          surged past $45,000. The crowd of 50,000 digital spectators witnessed an epic battle that
                          lasted 12 rounds.
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-green-100 text-green-800">VICTORY</Badge>
                          <Link href="/boxing-arena">
                            <Button variant="link" className="p-0 font-serif">
                              Watch Replay <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4">
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <Image
                          src="/images/wolf-vs-bear-boxing.jpeg"
                          alt="Wolf vs Bear"
                          width={200}
                          height={150}
                          className="w-full h-auto border border-black"
                        />
                      </div>
                      <div className="w-2/3">
                        <h3 className="text-xl font-bold font-serif mb-2">CLUTCH THE WOLF CHALLENGES BEAR MARKET</h3>
                        <p className="font-serif mb-3">
                          Our beloved mascot Clutch stepped into the ring against the formidable Bear as Ethereum faced
                          resistance. The technical analysis showed a close match with both fighters displaying
                          incredible skill.
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-yellow-100 text-yellow-800">DRAW</Badge>
                          <Link href="/games">
                            <Button variant="link" className="p-0 font-serif">
                              Play Now <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="text-2xl font-bold font-serif mb-4">LEADERBOARD</h2>
              <div className="space-y-3">
                <div className="border border-black p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold">Victory Bull</span>
                    <Badge className="bg-gold-100 text-gold-800">🥇 #1</Badge>
                  </div>
                  <p className="text-sm font-serif">47 Wins • 3 Losses</p>
                </div>
                <div className="border border-black p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold">Bear Market</span>
                    <Badge className="bg-silver-100 text-silver-800">🥈 #2</Badge>
                  </div>
                  <p className="text-sm font-serif">42 Wins • 8 Losses</p>
                </div>
                <div className="border border-black p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold">Clutch Wolf</span>
                    <Badge className="bg-bronze-100 text-bronze-800">🥉 #3</Badge>
                  </div>
                  <p className="text-sm font-serif">38 Wins • 12 Losses</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold font-serif mb-3">UPCOMING EVENTS</h3>
                <div className="space-y-2 text-sm font-serif">
                  <div className="border border-gray-300 p-2">
                    <p className="font-bold">Championship Finals</p>
                    <p>March 15, 2024 • 8:00 PM</p>
                  </div>
                  <div className="border border-gray-300 p-2">
                    <p className="font-bold">Frontier Days Tournament</p>
                    <p>July 22-31, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
