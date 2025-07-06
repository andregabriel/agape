"use client"

import Image from "next/image"
import { usePlayerStore } from "@/store/player-store"
import { ChevronDown, Play, Pause, Rewind, FastForward, Upload, ListMusic, Book, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function FullPlayer() {
  const { currentTrack, status, minimizePlayer, pause, resume } = usePlayerStore()

  if (!currentTrack) return null

  const isPlaying = status === "playing"

  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col">
      <div className="relative w-full h-1/2">
        <Image
          src={currentTrack.imageUrl || "/placeholder.svg?width=400&height=400&query=abstract+peace"}
          alt={currentTrack.title}
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={minimizePlayer}
            className="bg-black/20 hover:bg-black/30 rounded-full"
            aria-label="Minimizar player"
          >
            <ChevronDown className="text-white" />
          </Button>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-between p-6 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
                      <p className="text-lg text-slate-300">{currentTrack.description || "Meditação Cristã"}</p>
        </div>

        <div>
          <Slider defaultValue={[37]} max={600} step={1} className="my-4" />
          <div className="flex justify-between text-xs text-slate-400">
            <span>00:37</span>
            <span>-09:22</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 my-4">
          <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full">
            <Rewind className="w-8 h-8" />
          </Button>
          <Button
            size="icon"
            className="w-20 h-20 rounded-full bg-white text-slate-900 shadow-lg"
            onClick={isPlaying ? pause : resume}
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 fill-current" />
            ) : (
              <Play className="w-10 h-10 fill-current ml-1" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full">
            <FastForward className="w-8 h-8" />
          </Button>
        </div>

        <div className="flex justify-around items-center text-slate-300">
          <Button variant="ghost" size="icon">
            <Upload className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <ListMusic className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Book className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
