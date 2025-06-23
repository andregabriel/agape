"use client"

import type React from "react"
import Image from "next/image"
import {
  ChevronDown,
  MoreHorizontal,
  Rewind,
  FastForward,
  Play,
  Pause,
  ListMusic,
  Gauge,
  Heart,
  X,
  Loader,
} from "lucide-react"
import { usePlayer } from "@/contexts/player-context"

const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds) || timeInSeconds === Number.POSITIVE_INFINITY) return "00:00"
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

const FullScreenPlayer = () => {
  const { currentSession, isPlaying, isLoading, togglePlayPause, progress, duration, setPlayerMode, seek } = usePlayer()

  if (!currentSession) return null

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value))
  }

  return (
    <div className="fixed inset-0 bg-blue-800 text-white z-50 flex flex-col md:absolute md:max-w-sm md:mx-auto">
      <div className="relative h-1/2 w-full">
        <Image
          src={currentSession.image_url || "/placeholder.svg?query=prayer+background"}
          alt={currentSession.title}
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button onClick={() => setPlayerMode("mini")} className="p-2">
            <ChevronDown size={28} />
          </button>
          <button className="p-2">
            <MoreHorizontal size={28} />
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-between p-6 -mt-16 bg-blue-800 rounded-t-3xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{currentSession.title}</h2>
          <p className="text-lg opacity-80">{currentSession.subtitle}</p>
        </div>

        <div>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            disabled={isLoading || !duration}
          />
          <div className="flex justify-between text-xs font-mono mt-1">
            <span>{formatTime(progress)}</span>
            <span>-{formatTime(duration - progress)}</span>
          </div>
        </div>

        <div className="flex justify-around items-center text-white">
          <button className="p-2 opacity-80 hover:opacity-100" onClick={() => seek(progress - 15)}>
            <Rewind size={32} className="fill-white" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-4 bg-white/20 rounded-full w-20 h-20 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader size={40} className="animate-spin" />
            ) : isPlaying ? (
              <Pause size={40} className="fill-white" />
            ) : (
              <Play size={40} className="fill-white ml-1" />
            )}
          </button>
          <button className="p-2 opacity-80 hover:opacity-100" onClick={() => seek(progress + 15)}>
            <FastForward size={32} className="fill-white" />
          </button>
        </div>

        <div className="flex justify-around items-center text-xs opacity-80">
          <button className="flex flex-col items-center space-y-1">
            <Gauge size={24} />
            <span>1.0x</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Heart size={24} />
            <span>Intenção</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <ListMusic size={24} />
            <span>Lista</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const MiniPlayer = () => {
  const { currentSession, isPlaying, isLoading, togglePlayPause, progress, duration, setPlayerMode } = usePlayer()

  if (!currentSession) return null

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPlayerMode("hidden")
  }

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div
      onClick={() => setPlayerMode("full")}
      className="fixed bottom-16 left-0 right-0 md:absolute md:max-w-sm md:mx-auto z-20 px-2 pb-1 cursor-pointer"
    >
      <div className="bg-[#C54323] text-white p-2 rounded-md shadow-lg flex items-center space-x-3">
        <Image
          src={currentSession.image_url || "/placeholder.svg?query=audio+thumbnail"}
          alt={currentSession.title}
          width={40}
          height={40}
          className="rounded"
        />
        <div className="flex-grow overflow-hidden">
          <p className="text-sm font-semibold truncate">{currentSession.title}</p>
          <p className="text-xs opacity-80 truncate">{currentSession.subtitle}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            togglePlayPause()
          }}
          className="p-2 flex-shrink-0"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader size={24} className="animate-spin" />
          ) : isPlaying ? (
            <Pause size={24} className="fill-white" />
          ) : (
            <Play size={24} className="fill-white" />
          )}
        </button>
        <button onClick={handleClose} className="p-2 flex-shrink-0">
          <X size={20} />
        </button>
      </div>
      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-white/30">
        <div className="h-full bg-white" style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>
  )
}

export default function Player() {
  const { playerMode } = usePlayer()

  if (playerMode === "hidden") return null
  if (playerMode === "full") return <FullScreenPlayer />
  return <MiniPlayer />
}
