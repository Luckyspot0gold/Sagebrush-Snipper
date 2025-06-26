"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, Download } from "lucide-react"
import { useFrontierSounds } from "@/lib/frontier-sounds"

export function DemoVideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const { playCoinDrop, playPaperRustle } = useFrontierSounds()

  const demoVideos = [
    {
      id: "complete-experience",
      title: "🎬 Complete WyoVerse Experience",
      description: "Full walkthrough of the digital frontier - from onboarding to land ownership",
      duration: "3:45",
      thumbnail: "/images/wyoverse-demo-thumbnail.png",
      highlights: ["User onboarding", "Game mechanics", "Social capital system", "Land deed conversion"],
    },
    {
      id: "boxing-arena",
      title: "🥊 Crypto Clashers Boxing Demo",
      description: "Watch epic battles in our blockchain-powered boxing arena",
      duration: "2:30",
      thumbnail: "/images/boxing-demo-thumbnail.png",
      highlights: ["Real-time combat", "Crypto staking", "NFT rewards", "Leaderboards"],
    },
    {
      id: "racing-circuit",
      title: "🏎️ Frontier Racing Circuit",
      description: "High-speed crypto racing through Wyoming Territory",
      duration: "2:15",
      thumbnail: "/images/racing-demo-thumbnail.png",
      highlights: ["Vehicle selection", "Track betting", "Speed competitions", "Prize pools"],
    },
    {
      id: "social-capital",
      title: "🤝 Social Capital to Land Deeds",
      description: "Revolutionary system converting online influence to real value",
      duration: "4:00",
      thumbnail: "/images/social-capital-demo.png",
      highlights: ["Influence tracking", "Value calculation", "Land conversion", "Territory claiming"],
    },
  ]

  const playDemo = (videoId: string) => {
    playCoinDrop()
    setIsPlaying(true)
    // In a real implementation, this would play the actual video
    setTimeout(() => {
      playPaperRustle()
      alert(`🎥 Demo "${demoVideos.find((v) => v.id === videoId)?.title}" is now playing!`)
      setIsPlaying(false)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <Card className="border-4 border-black newspaper-bg">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-black">
          <CardTitle className="text-center font-serif text-3xl letterpress">🎬 WYOVERSE DEMO SHOWCASE</CardTitle>
          <p className="text-center font-serif text-lg mt-2">Experience the complete digital frontier journey</p>
        </CardHeader>
      </Card>

      {/* Featured Demo */}
      <Card className="border-4 border-black newspaper-bg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-100 to-orange-100 border-b-2 border-black">
          <CardTitle className="font-serif text-2xl letterpress text-center">
            🌟 FEATURED: Complete WyoVerse Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-amber-900 to-orange-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">🎥</div>
                <h3 className="text-2xl font-serif font-bold mb-2">Full Demo Video</h3>
                <p className="text-lg font-serif mb-6">Complete walkthrough of WyoVerse features</p>
                <Button
                  onClick={() => playDemo("complete-experience")}
                  className="frontier-button font-serif text-xl px-8 py-4"
                  disabled={isPlaying}
                >
                  {isPlaying ? (
                    <>
                      <div className="animate-spin mr-2">⭐</div>
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-6 w-6" />
                      Watch Full Demo
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black bg-opacity-50 rounded p-2">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-white hover:text-yellow-400">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:text-yellow-400"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              <div className="text-white font-serif text-sm">3:45</div>
              <Button size="sm" variant="ghost" className="text-white hover:text-yellow-400">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoVideos.slice(1).map((video) => (
          <Card
            key={video.id}
            className="border-3 border-black newspaper-bg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-black">
              <CardTitle className="font-serif text-lg letterpress">{video.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded mb-4 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🎬</div>
                  <Badge variant="outline" className="border-white text-white">
                    {video.duration}
                  </Badge>
                </div>
              </div>

              <p className="font-serif text-sm mb-4 leading-relaxed">{video.description}</p>

              <div className="mb-4">
                <h4 className="font-serif font-bold text-sm mb-2">Demo Highlights:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {video.highlights.map((highlight, index) => (
                    <li key={index} className="font-serif text-xs text-gray-700">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => playDemo(video.id)}
                className="w-full frontier-button font-serif text-sm py-2"
                disabled={isPlaying}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Download Section */}
      <Card className="border-4 border-black newspaper-bg">
        <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 border-b-2 border-black">
          <CardTitle className="font-serif text-2xl letterpress text-center">📥 DOWNLOAD DEMO MATERIALS</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Demo Video Package", desc: "All demo videos in HD quality", size: "250 MB" },
              { title: "Screenshots Collection", desc: "High-res screenshots of all features", size: "45 MB" },
              { title: "Technical Documentation", desc: "Complete technical specs and API docs", size: "12 MB" },
            ].map((item, index) => (
              <div key={index} className="text-center p-4 border-2 border-black rounded bg-white">
                <div className="text-4xl mb-3">📦</div>
                <h3 className="font-serif font-bold text-lg mb-2">{item.title}</h3>
                <p className="font-serif text-sm mb-2">{item.desc}</p>
                <Badge variant="outline" className="border-black mb-4">
                  {item.size}
                </Badge>
                <Button className="w-full frontier-button font-serif text-sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
