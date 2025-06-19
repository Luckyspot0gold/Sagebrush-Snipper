"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Package, PenToolIcon as Tool, Gem } from "lucide-react"

type StoreItem = {
  id: string
  name: string
  description: string
  price: number
  category: "equipment" | "assets" | "upgrades"
  image: string
}

const storeItems: StoreItem[] = [
  {
    id: "item-1",
    name: "Mining Drill",
    description: "Increases mining efficiency by 25%",
    price: 50,
    category: "equipment",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "item-2",
    name: "Water Pump",
    description: "Improves water access on your land",
    price: 75,
    category: "equipment",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "item-3",
    name: "WyoCoin Bundle",
    description: "100 WyoCoins at a discounted rate",
    price: 90,
    category: "assets",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "item-4",
    name: "Land Survey Kit",
    description: "Reveals hidden resources on your land",
    price: 120,
    category: "equipment",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "item-5",
    name: "Claim Expansion",
    description: "Increases the size of your land claim",
    price: 200,
    category: "upgrades",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "item-6",
    name: "Premium Mining Rights",
    description: "Grants advanced mining capabilities",
    price: 250,
    category: "upgrades",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function StoreItems() {
  const { toast } = useToast()
  const [cart, setCart] = useState<StoreItem[]>([])

  const handleAddToCart = (item: StoreItem) => {
    setCart((prev) => [...prev, item])
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Your cart is empty. Add items before checking out.",
        variant: "destructive",
      })
      return
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0)

    toast({
      title: "Checkout Initiated",
      description: `Processing payment for ${cart.length} items totaling $${total}.`,
    })

    // Clear cart after checkout
    setCart([])
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="upgrades">Upgrades</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {storeItems.map((item) => (
              <StoreItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {storeItems
              .filter((item) => item.category === "equipment")
              .map((item) => (
                <StoreItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {storeItems
              .filter((item) => item.category === "assets")
              .map((item) => (
                <StoreItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="upgrades" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {storeItems
              .filter((item) => item.category === "upgrades")
              .map((item) => (
                <StoreItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Shopping Cart</h3>
            <p className="text-sm text-muted-foreground">{cart.length} items</p>
          </div>
          <Button onClick={handleCheckout} disabled={cart.length === 0}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Checkout
          </Button>
        </div>

        {cart.length > 0 && (
          <div className="mt-4 space-y-2">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between items-center p-2 border rounded-lg">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="flex justify-between items-center p-2 font-medium">
              <span>Total</span>
              <span>${cart.reduce((sum, item) => sum + item.price, 0)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StoreItemCard({
  item,
  onAddToCart,
}: {
  item: StoreItem
  onAddToCart: (item: StoreItem) => void
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 flex items-center justify-center bg-accent/10">
        {item.category === "equipment" && <Tool className="h-10 w-10 text-primary" />}
        {item.category === "assets" && <Package className="h-10 w-10 text-primary" />}
        {item.category === "upgrades" && <Gem className="h-10 w-10 text-primary" />}
      </div>
      <div className="p-4">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold">${item.price}</span>
          <Button size="sm" onClick={() => onAddToCart(item)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
