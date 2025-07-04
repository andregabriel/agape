"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DiscoverHeaderProps {
  onSearch?: (query: string) => void
  searchQuery?: string
}

export default function DiscoverHeader({ onSearch, searchQuery }: DiscoverHeaderProps) {
  return (
    <header className="sticky top-0 bg-background z-40 px-4 pt-4 pb-3 shadow-sm">
      <h1 className="text-3xl font-bold text-foreground mb-3">Descobrir</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Orações, Categorias, Bíblia e Mais"
          className="pl-10 w-full bg-muted border-transparent focus-visible:ring-primary focus-visible:border-primary"
          value={searchQuery || ""}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </header>
  )
}
