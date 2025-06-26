"use client"
import { usePathname } from "next/navigation"
import { NavItem } from "@/components/nav-item"
import { LayoutDashboard, BarChart, Sword, TrendingUp, Coins } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/market-pulse", icon: BarChart, label: "Market Pulse" },
    { href: "/boxing-arena", icon: Sword, label: "Boxing Arena" },
    { href: "/frontier-trader", icon: TrendingUp, label: "Frontier Trader" },
    { href: "/land-deeds", icon: Coins, label: "Land Deeds" },
  ]

  return (
    <aside className="w-56 border-r p-4 space-y-2 bg-white">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">CryptoClashers</h2>
        <p className="text-sm text-gray-600">Digital Frontier</p>
      </div>

      {links.map(({ href, icon, label }) => (
        <NavItem key={href} href={href} label={label} icon={icon} active={pathname === href} />
      ))}
    </aside>
  )
}
