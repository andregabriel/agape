"use client"

import Image from "next/image"
import { usePlayerStore } from "@/store/player-store"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MiniPlayer() {
  const { currentTrack, expandPlayer, closePlayer } = usePlayerStore()

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 p-2">
      <div
        className="flex items-center justify-between bg-slate-800 text-white rounded-lg p-2 shadow-lg max-w-md mx-auto"
        onClick={expandPlayer}
        role="button"
        tabIndex={0}
        aria-label="Expandir player"
      >
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded overflow-hidden">
            <Image
              src={currentTrack.imageUrl || "/placeholder.svg?width=40&height=40"}
              alt={currentTrack.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm truncate">{currentTrack.title}</h4>
            <p className="text-xs text-gray-300 truncate">{currentTrack.description || "Meditação Cristã"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
            <Play className="h-5 w-5 fill-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={(e) => {
              e.stopPropagation() // Prevent expandPlayer from firing
              closePlayer()
            }}
            aria-label="Fechar player"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
