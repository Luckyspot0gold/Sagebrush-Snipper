"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import { updatePlayerBalance } from "@/lib/supabase/client"

interface PurchaseItem {
  id: string
  name: string
  description: string
  price: number
  amount: number
  type: "stones" | "land_deed" | "boxing_gear" | "premium"
  icon: string
}

interface BoltCheckoutProps {
  item: PurchaseItem
  userId?: string
  onSuccess?: (transaction: any) => void
  onError?: (error: any) => void
}

const PURCHASE_ITEMS: PurchaseItem[] = [
  {
    id: "stones_100",
    name: "100 STONES",
    description: "Basic stone package for mining and trading",
    price: 9.99,
    amount: 100,
    type: "stones",
    icon: "💎",
  },
  {
    id: "stones_500",
    name: "500 STONES",
    description: "Popular choice! Great value for active players",
    price: 39.99,
    amount: 500,
    type: "stones",
    icon: "💎",
  },
  {
    id: "stones_1000",
    name: "1000 STONES",
    description: "Best value! Perfect for serious miners",
    price: 69.99,
    amount: 1000,
    type: "stones",
    icon: "💎",
  },
  {
    id: "land_deed_basic",
    name: "Basic Land Deed",
    description: "Own a piece of the digital frontier",
    price: 24.99,
    amount: 1,
    type: "land_deed",
    icon: "📜",
  },
  {
    id: "boxing_gloves_pro",
    name: "Pro Boxing Gloves",
    description: "Increase your boxing performance by 25%",
    price: 19.99,
    amount: 1,
    type: "boxing_gear",
    icon: "🥊",
  },
  {
    id: "premium_month",
    name: "Premium Membership",
    description: "30 days of premium benefits and bonuses",
    price: 14.99,
    amount: 30,
    type: "premium",
    icon: "⭐",
  },
]

export function BoltCheckout({ item, userId = "demo-user", onSuccess, onError }: BoltCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const processBoltPayment = async () => {
    setIsProcessing(true)
    setPaymentStatus("processing")
    setErrorMessage(null)

    try {
      // Simulate Bolt payment processing
      // In production, this would integrate with actual Bolt API
      const paymentData = {
        productId: item.id,
        amount: item.price,
        currency: "USD",
        userId: userId,
        timestamp: new Date().toISOString(),
      }

      // Mock payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000))

      // Simulate payment success (90% success rate for demo)
      if (Math.random() > 0.1) {
        // Payment successful - update user balance
        await updatePlayerBalance(userId, item.amount, item.type === "stones" ? "stones" : "experience")

        const transaction = {
          id: `bolt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...paymentData,
          status: "completed",
          item: item,
        }

        setPaymentStatus("success")
        onSuccess?.(transaction)

        // Log successful purchase
        console.log("Purchase completed:", transaction)
      } else {
        throw new Error("Payment declined by processor")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Payment processing failed"
      setErrorMessage(errorMsg)
      setPaymentStatus("error")
      onError?.(error)
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetPayment = () => {
    setPaymentStatus("idle")
    setErrorMessage(null)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{item.icon}</span>
          {item.name}
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-semibold">Price:</span>
          <span className="text-2xl font-bold text-green-600">${item.price}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <span className="font-semibold">You Get:</span>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {item.amount}{" "}
            {item.type === "stones"
              ? "STONES"
              : item.type === "land_deed"
                ? "Land Deed"
                : item.type === "boxing_gear"
                  ? "Boxing Gear"
                  : "Premium Days"}
          </Badge>
        </div>

        {paymentStatus === "idle" && (
          <Button onClick={processBoltPayment} disabled={isProcessing} className="w-full h-12 text-lg">
            <CreditCard className="h-5 w-5 mr-2" />
            Buy with Bolt
          </Button>
        )}

        {paymentStatus === "processing" && (
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
            <p className="text-sm text-gray-600">Processing your payment...</p>
            <p className="text-xs text-gray-500">Please don't close this window</p>
          </div>
        )}

        {paymentStatus === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="font-semibold">Payment Successful!</div>
              <div className="text-sm mt-1">
                {item.amount} {item.type === "stones" ? "STONES" : item.type} added to your account
              </div>
            </AlertDescription>
          </Alert>
        )}

        {paymentStatus === "error" && (
          <div className="space-y-3">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <div className="font-semibold">Payment Failed</div>
                <div className="text-sm mt-1">{errorMessage}</div>
              </AlertDescription>
            </Alert>
            <Button onClick={resetPayment} variant="outline" className="w-full bg-transparent">
              Try Again
            </Button>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>🔒 Secure payment powered by Bolt</p>
          <p>💳 All major credit cards accepted</p>
          <p>⚡ Instant delivery to your account</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function BoltCheckoutGrid() {
  const [selectedItem, setSelectedItem] = useState<PurchaseItem | null>(null)

  const handlePurchaseSuccess = (transaction: any) => {
    console.log("Purchase successful:", transaction)
    // Could show a success toast or redirect
    setTimeout(() => setSelectedItem(null), 3000)
  }

  const handlePurchaseError = (error: any) => {
    console.error("Purchase failed:", error)
    // Could show an error toast
  }

  if (selectedItem) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Button variant="ghost" onClick={() => setSelectedItem(null)} className="self-start">
          ← Back to Store
        </Button>
        <BoltCheckout item={selectedItem} onSuccess={handlePurchaseSuccess} onError={handlePurchaseError} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">WyoVerse Store</h2>
        <p className="text-gray-600">Power up your frontier adventure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PURCHASE_ITEMS.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="text-2xl font-bold text-green-600 mb-4">${item.price}</div>
              <Button onClick={() => setSelectedItem(item)} className="w-full">
                Purchase Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BoltCheckout
