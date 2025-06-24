import { NewspaperLayout } from "@/components/newspaper-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, BookOpen, Users, Star } from "lucide-react"
import Image from "next/image"

export default function CryptopiaPage() {
  return (
    <NewspaperLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="headline-primary text-4xl mb-2">🎲 CRYPTOPIA GAME 🎲</h1>
          <p className="body-text text-lg">Educational Story Board Adventure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">Game Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 mb-4">
                <Image
                  src="/images/bull-vs-bear-bully.jpeg"
                  alt="Cryptopia Game"
                  fill
                  className="object-cover border-2 border-black rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <BookOpen className="h-16 w-16 mx-auto mb-2" />
                    <p className="font-serif text-xl">Story Mode</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className="bg-yellow-500 text-white">BETA</Badge>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>456 players</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-purple-100 border-2 border-purple-300 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xl">🐺</div>
                      <div className="font-bold">Cutch</div>
                    </div>
                    <div className="text-sm">The wise wolf who teaches crypto fundamentals</div>
                  </div>

                  <div className="p-3 bg-pink-100 border-2 border-pink-300 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xl">🦊</div>
                      <div className="font-bold">Irelynn</div>
                    </div>
                    <div className="text-sm">The clever fox who explains DeFi protocols</div>
                  </div>

                  <div className="p-3 bg-red-100 border-2 border-red-300 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xl">🐂</div>
                      <div className="font-bold">Bully</div>
                    </div>
                    <div className="text-sm">The strong bull who demonstrates market strength</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="https://github.com/Luckyspot0gold/Cryptopia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full newspaper-button">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Source Code
                    </Button>
                  </a>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    Start Adventure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🎓</div>
                  <h3 className="font-bold font-serif">Educational Achievements</h3>
                </div>

                <div className="space-y-3">
                  {[
                    { topic: "Blockchain Basics", progress: 100, badge: "🏆" },
                    { topic: "Cryptocurrency Trading", progress: 85, badge: "⭐" },
                    { topic: "DeFi Protocols", progress: 60, badge: "🎯" },
                    { topic: "NFT Marketplace", progress: 40, badge: "🎨" },
                    { topic: "Smart Contracts", progress: 25, badge: "⚡" },
                  ].map((lesson) => (
                    <div key={lesson.topic} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{lesson.badge}</span>
                          <span className="font-serif font-medium">{lesson.topic}</span>
                        </div>
                        <span className="text-sm font-bold">{lesson.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${lesson.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center p-4 bg-green-50 border-2 border-green-300 rounded">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="font-bold font-serif">Crypto Knowledge Level</div>
                  <div className="text-2xl font-bold text-green-600">Intermediate</div>
                  <div className="text-sm text-gray-600">Keep learning to reach Expert!</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-4 border-black bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="headline-secondary text-xl mb-2">Ready to Learn?</h3>
            <p className="body-text mb-4">
              Join Cutch, Irelynn, Bully and the whales in an educational adventure through the world of cryptocurrency.
              Learn while you play in this fork of Bulls vs Bears!
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="newspaper-button">Begin Tutorial</Button>
              <Button variant="outline" className="border-black">
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewspaperLayout>
  )
}
