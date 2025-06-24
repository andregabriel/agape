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
        <Avatar className="h-9 w-9 flex-shrink-0">
          {" "}
          {/* Ajustado para h-9 w-9 para corresponder melhor */}
          <AvatarImage src="/placeholder.svg?width=36&height=36&text=A" alt="User Avatar" />
          <AvatarFallback className="bg-[#4A90E2] text-white text-lg font-medium">A</AvatarFallback>{" "}
          {/* Cor e fonte ajustadas */}
        </Avatar>

        {/* 2. Filtros */}
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2 no-scrollbar">
            {["Tudo", ...categories].map((category) => (
              <Button
                key={category}
                onClick={() => onSelectCategory(category)}
                variant="ghost"
                // size="sm" // Removido para usar padding customizado para altura
                className={cn(
                  "rounded-full px-4 py-1.5 h-auto text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-in-out", // Padding e fonte ajustados
                  selectedCategory === category
                    ? "bg-[#1DB954] text-black hover:bg-[#1AA34A]" // Estilo selecionado
                    : "bg-neutral-800 text-white hover:bg-neutral-700", // Estilo não selecionado
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 3. Ícone de Notificações */}
        <Button variant="ghost" size="icon" className="text-white flex-shrink-0 hover:bg-neutral-700/50">
          <Bell className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
