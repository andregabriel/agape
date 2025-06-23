"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, BookOpen, Users, UserCircle } from "lucide-react"

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/discover", label: "Descobrir", icon: Search },
  { href: "/bible", label: "Bíblia", icon: BookOpen },
  { href: "/community", label: "Comunidade", icon: Users },
  { href: "/profile", label: "Eu", icon: UserCircle },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:absolute md:max-w-sm md:mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link key={label} href={href} className="flex flex-col items-center justify-center text-xs w-1/5">
              <Icon
                className={`w-6 h-6 mb-1 ${isActive ? "text-black" : "text-gray-500"}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={isActive ? "text-black font-semibold" : "text-gray-500"}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
