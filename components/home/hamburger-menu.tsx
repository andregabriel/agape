"use client"

import { X, Home, Search, Book, Users, User, Heart, Download, RotateCcw, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function HamburgerMenu({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
}: HamburgerMenuProps) {
  if (!isOpen) return null

  const quickAccessItems = [
    { icon: Heart, label: "Favoritos", href: "/favoritos" },
    { icon: Download, label: "Downloads", href: "/downloads" },
    { icon: RotateCcw, label: "Rotina", href: "/rotina" },
    { icon: Clock, label: "Recentes", href: "/recentes" },
  ]

  const mainNavigationItems = [
    { icon: Home, label: "Início", href: "/home" },
    { icon: Search, label: "Descobrir", href: "/descobrir" },
    { icon: Book, label: "Bíblia", href: "/biblia" },
    { icon: Users, label: "Comunidade", href: "/comunidade" },
    { icon: User, label: "Eu", href: "/eu" },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-lg overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-neutral-700/50 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Access Icons */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Acesso Rápido</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickAccessItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5 text-white mb-1" />
                  <span className="text-xs text-gray-300">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Navegação</h3>
            <div className="space-y-2">
              {mainNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-lg text-white hover:bg-neutral-700 transition-colors"
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Categorias</h3>
            <div className="space-y-2">
              {["Tudo", ...categories.filter((c) => c !== "Tudo")].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onSelectCategory(category)
                    onClose()
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors",
                    selectedCategory === category
                      ? "bg-[#1DB954] text-black"
                      : "text-white hover:bg-neutral-700"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}