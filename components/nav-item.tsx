"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Icon } from "lucide-react"

interface NavItemProps {
  href: string
  label: string
  icon: Icon
  active?: boolean
}

export function NavItem({ href, label, icon: IconCmp, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-gray-100",
        active && "bg-gray-200 font-semibold",
      )}
    >
      <IconCmp className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}
