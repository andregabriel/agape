// Renomeando e adaptando para ser o cabeçalho principal com avatar e filtros
"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HomeHeaderProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  userNameInitial?: string // Opcional, para fallback se a imagem falhar
  userImageUrl?: string // Caminho para a imagem do usuário
}

export default function HomeHeader({
  categories,
  selectedCategory,
  onSelectCategory,
  userNameInitial = "A", // Default fallback initial
  userImageUrl = "/images/profile/eu.jpeg", // Default to your image
}: HomeHeaderProps) {
  const displayCategories = ["Tudo", ...categories.filter((c) => c !== "Tudo")]

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg p-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/eu" aria-label="Perfil do usuário">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage src={userImageUrl || "/placeholder.svg"} alt="Foto do perfil" />
            <AvatarFallback className="bg-[#4A90E2] text-white text-lg font-medium">
              {userNameInitial.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-grow overflow-x-auto no-scrollbar flex items-center space-x-2">
          {displayCategories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              size="sm"
              onClick={() => onSelectCategory(category)}
              className={cn(
                "rounded-full px-4 py-1.5 h-auto text-sm font-medium whitespace-nowrap transition-all duration-200 ease-in-out",
                selectedCategory === category
                  ? "bg-[#1DB954] text-black hover:bg-[#1AA34A]"
                  : "bg-neutral-800 text-white hover:bg-neutral-700",
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="text-white hover:bg-neutral-700/50 rounded-full">
            <Search className="h-5 w-5" />
          </Button> */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-neutral-700/50 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
