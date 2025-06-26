"use client"
import { usePathname } from "next/navigation"
import { NavItem } from "@/components/nav-item"
import { LayoutDashboard, BarChart, Sword } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/market-pulse", icon: BarChart, label: "Market Pulse" },
    { href: "/boxing-arena", icon: Sword, label: "Boxing Arena" },
  ]

  return (
    <aside className="w-56 border-r p-4 space-y-2 bg-white">
      {links.map(({ href, icon, label }) => (
        <NavItem key={href} href={href} label={label} icon={icon} active={pathname === href} />
      ))}
    </aside>
  )
}
