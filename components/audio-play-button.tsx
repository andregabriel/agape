"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { usePlayerStore } from "@/store/player-store"
import { getUserTypeSync } from "@/lib/auth-utils"
import type { AudioTrack } from "@/types"

interface AudioPlayButtonProps {
  track: AudioTrack
  playlist?: AudioTrack[]
  size?: "sm" | "md" | "lg"
  variant?: "default" | "ghost" | "outline"
  className?: string
}

export default function AudioPlayButton({ 
  track, 
  playlist = [], 
  size = "md", 
  variant = "default",
  className = ""
}: AudioPlayButtonProps) {
  const { currentTrack, status, play, pause, resume } = usePlayerStore()
  
  // Verifica se este track está tocando
  const isCurrentTrack = currentTrack?.id === track.id
  const isPlaying = isCurrentTrack && status === "playing"
  const isPaused = isCurrentTrack && status === "paused"

  const handlePlayClick = () => {
    // Se está tocando este track, pausa
    if (isPlaying) {
      pause()
      return
    }
    
    // Se este track está pausado, resume
    if (isPaused) {
      resume()
      return
    }
    
    // Novo track - verifica tipo de usuário e toca
    const userType = getUserTypeSync()
    play(track, playlist.length > 0 ? playlist : [track], userType)
  }

  const getButtonSize = () => {
    switch (size) {
      case "sm": return "w-8 h-8"
      case "md": return "w-10 h-10"
      case "lg": return "w-12 h-12"
      default: return "w-10 h-10"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm": return "w-4 h-4"
      case "md": return "w-5 h-5"
      case "lg": return "w-6 h-6"
      default: return "w-5 h-5"
    }
  }

  return (
    <Button
      variant={variant}
      size="icon"
      className={`${getButtonSize()} ${className} transition-all duration-200 hover:scale-105`}
      onClick={handlePlayClick}
      aria-label={isPlaying ? "Pausar" : "Reproduzir"}
    >
      {isPlaying ? (
        <Pause className={`${getIconSize()} fill-current`} />
      ) : (
        <Play className={`${getIconSize()} fill-current ml-0.5`} />
      )}
    </Button>
  )
}

// Exemplo de uso:
/*
import AudioPlayButton from "@/components/audio-play-button"

// Em qualquer componente:
<AudioPlayButton 
  track={{
    id: "audio1",
    title: "Terço Diário",
    subCategory: "Oração",
    duration: "25:30",
    imageUrl: "/audio-image.jpg",
    type: "audio"
  }}
  playlist={[]} // opcional
  size="lg"
  variant="default"
  className="bg-green-500 hover:bg-green-600 text-white"
/>
*/