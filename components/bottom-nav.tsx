"use client"

import Link from "next/link"
import { Home, Search, BookOpen, Users, UserCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/home", label: "Início", icon: Home },
  { href: "/descobrir", label: "Descobrir", icon: Search },
  { href: "/biblia", label: "Bíblia", icon: BookOpen },
  { href: "/comunidade", label: "Comunidade", icon: Users },
  { href: "/eu", label: "Eu", icon: UserCircle },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium p-2 rounded-md transition-colors",
                isActive ? "text-white" : "text-neutral-400 hover:bg-neutral-700/50 hover:text-white",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={cn("h-5 w-5 mb-0.5", isActive ? "text-white" : "text-neutral-400")} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
