"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface HomeFilterHeaderProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  className?: string
}

export default function HomeFilterHeader({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: HomeFilterHeaderProps) {
  return (
    <div className={cn("sticky top-0 z-40 bg-black/80 backdrop-blur-lg pt-4 pb-3", className)}>
      <div className="container flex items-center gap-3 px-4">
        {/* 1. Avatar */}
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/placeholder.svg?width=32&height=32&text=A" alt="User Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        {/* 2. Filtros */}
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {["Tudo", ...categories].map((category) => (
              <Button
                key={category}
                onClick={() => onSelectCategory(category)}
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full px-4 py-1 h-auto text-sm whitespace-nowrap",
                  selectedCategory === category
                    ? "bg-stone-50 text-black hover:bg-stone-200"
                    : "bg-stone-800 text-white hover:bg-stone-700",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 3. Ícone de Notificações */}
        <Button variant="ghost" size="icon" className="text-white flex-shrink-0">
          <Bell className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
