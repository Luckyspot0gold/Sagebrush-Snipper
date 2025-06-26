"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Wallet, Gamepad2, Star, MapPin } from "lucide-react"
import { useFrontierSounds } from "@/lib/frontier-sounds"

export function UserOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { playPaperRustle, playCoinDrop, playBootSteps } = useFrontierSounds()

  const steps = [
    {
      title: "Welcome to the Digital Frontier!",
      icon: <MapPin className="w-16 h-16 text-amber-600" />,
      description:
        "Step into 1880s Wyoming Territory where blockchain meets the Wild West. Your pioneer adventure begins now!",
      action: "Begin Journey",
      sound: () => playBootSteps(),
    },
    {
      title: "Connect Your Frontier Wallet",
      icon: <Wallet className="w-16 h-16 text-green-600" />,
      description:
        "Link your crypto wallet to start earning gold, trading assets, and claiming valuable frontier land deeds.",
      action: "Connect Wallet",
      sound: () => playCoinDrop(),
    },
    {
      title: "Choose Your Pioneer Path",
      icon: <Gamepad2 className="w-16 h-16 text-blue-600" />,
      description:
        "Boxing Arena for fighters, Racing Circuit for speed demons, or Trading Post for merchants - where will you make your fortune?",
      action: "Explore Games",
      sound: () => playPaperRustle(),
    },
    {
      title: "Build Your Frontier Legacy",
      icon: <Star className="w-16 h-16 text-purple-600" />,
      description:
        "Win games, make smart trades, and convert your social capital into valuable Wyoming Territory land deeds. Your reputation is your currency!",
      action: "Start Playing",
      sound: () => playCoinDrop(),
    },
  ]

  const nextStep = () => {
    steps[currentStep].sound()
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
      setTimeout(() => {
        window.location.href = "/games"
      }, 2000)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-4 border-black newspaper-bg text-center">
          <CardContent className="p-12">
            <div className="text-8xl mb-6">🤠</div>
            <h2 className="text-4xl font-serif font-bold mb-4">Welcome to the Frontier, Pioneer!</h2>
            <p className="text-xl font-serif mb-6">Your adventure begins now...</p>
            <div className="animate-spin text-4xl">⭐</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-4 border-black newspaper-bg">
        <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-black">
          <CardTitle className="text-center font-serif text-3xl letterpress">🏜️ WYOVERSE PIONEER ACADEMY</CardTitle>
          <div className="flex justify-center mt-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full border-3 border-black flex items-center justify-center mx-2 font-bold transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-green-500 text-white shadow-lg transform scale-110"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-12">
          <div className="text-center">
            <div className="mb-8 flex justify-center">{steps[currentStep].icon}</div>
            <h2 className="text-4xl font-serif font-bold mb-6 letterpress">{steps[currentStep].title}</h2>
            <p className="text-xl font-serif mb-8 max-w-2xl mx-auto leading-relaxed">
              {steps[currentStep].description}
            </p>

            <div className="flex justify-center gap-6">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="border-2 border-black font-serif text-lg px-6 py-3"
                >
                  ← Previous
                </Button>
              )}
              <Button
                onClick={nextStep}
                className="frontier-button font-serif text-lg px-8 py-3 transform hover:scale-105 transition-all duration-200"
              >
                {steps[currentStep].action}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="mt-8 text-sm font-serif text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
