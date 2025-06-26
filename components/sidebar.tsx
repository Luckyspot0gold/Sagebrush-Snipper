import type React from "react"
import { LayoutDashboard, Settings, Users, HelpCircle, Trophy, Share2, BookOpen, Gift } from "lucide-react"
import { Separator } from "@/components/ui/separator"

import { NavItem } from "@/components/nav-item"

interface SidebarProps {
  isCollapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const navigation = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Your workspace",
    },
    {
      title: "User Management",
      href: "/users",
      icon: Users,
      description: "Manage user accounts",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Configure application settings",
    },
    {
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
      description: "Get assistance and support",
    },
    // Add these items to the navigation array
    {
      title: "Pioneer Onboarding",
      href: "/onboarding",
      icon: Trophy,
      description: "Start your frontier journey",
    },
    {
      title: "Share Victories",
      href: "/social-sharing",
      icon: Share2,
      description: "Share your achievements",
    },
    {
      title: "Frontier Stories",
      href: "/frontier-stories",
      icon: BookOpen,
      description: "Community tales & adventures",
    },
    {
      title: "Daily Rewards",
      href: "/daily-rewards",
      icon: Gift,
      description: "Claim your daily bounty",
    },
  ]

  return (
    <div className={`flex flex-col h-full ${isCollapsed ? "w-16" : "w-60"} border-r border-primary/10`}>
      <div className="flex flex-col flex-1 p-3">
        <a href="#" className="grid h-14 w-full place-items-center rounded-md bg-secondary">
          {/* Logo */}
          <p className="font-semibold">LOGO</p>
        </a>
        <Separator className="my-3 space-y-1" />
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              description={item.description}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
