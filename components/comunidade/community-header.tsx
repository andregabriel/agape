"use client"

import { ChevronDown, Users, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommunityHeaderProps {
  currentView: string
  onViewChange: (view: string) => void
  onSearch: () => void
  onGroupsClick: () => void
}

const viewOptions = ["Amigos", "Grupos", "Eventos"] // Exemplo

export default function CommunityHeader({ currentView, onViewChange, onSearch, onGroupsClick }: CommunityHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-background border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-2xl font-bold p-0 h-auto hover:bg-transparent">
            {currentView}
            <ChevronDown className="ml-1.5 h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {viewOptions.map((view) => (
            <DropdownMenuItem key={view} onClick={() => onViewChange(view)}>
              {view}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onGroupsClick}>
          <Users className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onSearch}>
          <SearchIcon className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}
