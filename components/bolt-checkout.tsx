"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, CreditCard, Loader2 } from "lucide-react"

interface CryptoPurchaseProps {
  item: {
    id: string
    name: string
    price: number
    amount: number
    description: string
    icon: string
  }
}

export function BoltCheckout({ item }: CryptoPurchaseProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [purchaseComplete, setPurchaseComplete] = useState(false)

  const handlePurchase = async () => {
    setIsProcessing(true)

    try {
      // In production, this would integrate with actual Bolt API
      const response = await fetch("/api/payments/bolt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.id,
          amount: item.price,
          currency: "USD",
          description: item.description,
        }),
      })

      if (!response.ok) {
        throw new Error("Payment failed")
      }

      const result = await response.json()

      // Update user balance in Supabase
      await fetch("/api/user/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: item.amount,
          currency: "STONES",
          transaction_id: result.transactionId,
        }),
      })

      setPurchaseComplete(true)
    } catch (error) {
      console.error("Purchase failed:", error)
      alert("Purchase failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (purchaseComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Coins className="h-5 w-5 mr-2" />
            Purchase Complete!
          </CardTitle>
          <CardDescription className="text-green-600">
            {item.amount} {item.name} has been added to your account.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg font-bold">
            ${item.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
            <span className="font-medium">You'll receive:</span>
            <span className="font-bold text-amber-700">
              {item.amount} {item.name}
            </span>
          </div>

          <Button onClick={handlePurchase} disabled={isProcessing} className="w-full" size="lg">
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Buy {item.name} for ${item.price}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">Secure payment powered by Bolt</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BoltCheckout
