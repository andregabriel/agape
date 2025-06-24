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
    <div className={cn("sticky top-0 z-40 bg-black/80 backdrop-blur-lg pt-4 pb-2", className)}>
      <div className="container flex items-center justify-between gap-4 px-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?width=32&height=32&text=A" alt="User Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex-grow" />
        <Button variant="ghost" size="icon" className="text-white">
          <Bell className="h-6 w-6" />
        </Button>
      </div>
      <div className="container px-4 mt-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
    </div>
  )
}
