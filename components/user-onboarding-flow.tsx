"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function UserOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to the Frontier!",
      icon: "🤠",
      description: "Step into 1880s Wyoming Territory where blockchain meets the Wild West",
      action: "Start Your Journey",
    },
    {
      title: "Connect Your Wallet",
      icon: "💰",
      description: "Link your crypto wallet to start earning and trading in the frontier economy",
      action: "Connect Wallet",
    },
    {
      title: "Choose Your Path",
      icon: "🎮",
      description: "Boxing Arena, Racing Circuit, or Trading Post - where will you make your fortune?",
      action: "Explore Games",
    },
    {
      title: "Build Your Reputation",
      icon: "⭐",
      description: "Win games, make trades, and convert your social capital into valuable land deeds",
      action: "Start Playing",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-4 border-black newspaper-bg">
        <CardHeader className="bg-amber-100 border-b-2 border-black">
          <CardTitle className="text-center font-serif text-2xl">🏜️ FRONTIER PIONEER ONBOARDING</CardTitle>
          <div className="flex justify-center mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center mx-2 ${
                  index <= currentStep ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-8xl mb-6">{steps[currentStep].icon}</div>
            <h2 className="text-3xl font-serif font-bold mb-4">{steps[currentStep].title}</h2>
            <p className="text-lg font-serif mb-8 max-w-2xl mx-auto">{steps[currentStep].description}</p>

            <div className="flex justify-center gap-4">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="border-black font-serif"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(currentStep + 1)
                  } else {
                    // Complete onboarding
                    window.location.href = "/games"
                  }
                }}
                className="frontier-button font-serif"
              >
                {steps[currentStep].action}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
