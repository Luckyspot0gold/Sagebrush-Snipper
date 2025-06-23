"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bell, Wrench, Zap, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface UnderConstructionProps {
  title?: string
  description?: string
  expectedCompletion?: string
  features?: string[]
  progress?: number
  showNotifyButton?: boolean
}

export function UnderConstruction({
  title = "Under Construction",
  description = "Clutch is hard at work building something amazing for the WyoVerse!",
  expectedCompletion = "Coming Soon",
  features = [],
  progress = 65,
  showNotifyButton = true,
}: UnderConstructionProps) {
  const [currentProgress, setCurrentProgress] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setCurrentProgress(progress), 500)
    return () => clearTimeout(timer)
  }, [progress])

  const handleNotifyMe = () => {
    toast({
      title: "Notification Set!",
      description: "We'll notify you when this feature is ready to explore.",
    })
  }

  return (
    <div className="min-h-screen bg-[#f8f3e3] newspaper-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Newspaper Header */}
        <div className="border-b-4 border-black pb-4 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-serif uppercase tracking-tight">WYOVERSE CONSTRUCTION GAZETTE</h1>
            <p className="text-sm font-serif mt-2">BUILDING THE FUTURE OF DIGITAL FRONTIER</p>
          </div>
        </div>

        {/* Main Construction Notice */}
        <div className="newspaper-article mb-8">
          <div className="newspaper-article-inner">
            <div className="text-center mb-6">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 font-serif text-lg px-4 py-2">
                <Wrench className="h-5 w-5 mr-2" />
                {title}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black">
                    <Image
                      src="/images/mech-wolf-clutch.jpeg"
                      alt="Clutch working in the garage"
                      width={500}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#f8f3e3] border-2 border-black px-3 py-1">
                  <p className="text-xs font-serif font-medium">Clutch's Workshop - 2024</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold font-serif mb-4">{title}</h2>
                  <p className="font-serif text-lg leading-relaxed">{description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    <span className="font-serif">
                      <strong>Expected Completion:</strong> {expectedCompletion}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-serif font-medium">Construction Progress</span>
                      <span className="font-serif text-sm">{currentProgress}%</span>
                    </div>
                    <Progress value={currentProgress} className="h-3 border border-black" />
                  </div>
                </div>

                {features.length > 0 && (
                  <div>
                    <h3 className="font-serif font-bold mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Planned Features:
                    </h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="font-serif flex items-center gap-2">
                          <div className="w-2 h-2 bg-black"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-4">
                  {showNotifyButton && (
                    <Button onClick={handleNotifyMe} className="bg-black text-white hover:bg-gray-800 font-serif">
                      <Bell className="h-4 w-4 mr-2" />
                      Notify Me When Ready
                    </Button>
                  )}
                  <Link href="/">
                    <Button variant="outline" className="border-black font-serif">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to WyoVerse
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Construction Updates */}
        <div className="newspaper-article">
          <div className="newspaper-article-inner">
            <h3 className="text-2xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
              LATEST CONSTRUCTION UPDATES
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-black p-4">
                <h4 className="font-serif font-bold mb-2">Foundation Complete</h4>
                <p className="font-serif text-sm">Core infrastructure and database systems are operational.</p>
              </div>
              <div className="border-2 border-black p-4">
                <h4 className="font-serif font-bold mb-2">Framework Built</h4>
                <p className="font-serif text-sm">User interface and navigation systems are in place.</p>
              </div>
              <div className="border-2 border-black p-4">
                <h4 className="font-serif font-bold mb-2">Testing Phase</h4>
                <p className="font-serif text-sm">Quality assurance and performance optimization underway.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-4 border-t-2 border-black">
          <p className="font-serif text-sm">PUBLISHED BY WYOVERSE CONSTRUCTION CREW • BUILDING THE DIGITAL FRONTIER</p>
        </div>
      </div>
    </div>
  )
}
