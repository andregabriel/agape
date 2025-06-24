"use client"

import Image from "next/image"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileHeaderProps {
  name: string
  fullName: string
  avatarUrl: string
  onSettingsClick: () => void
}

export default function ProfileHeader({ name, fullName, avatarUrl, onSettingsClick }: ProfileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-background border-b">
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={avatarUrl || "/placeholder.svg"} alt={name} layout="fill" objectFit="cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{name}</h1>
          <p className="text-sm text-muted-foreground">{fullName}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onSettingsClick}>
        <Settings className="h-6 w-6 text-muted-foreground" />
      </Button>
    </header>
  )
}
