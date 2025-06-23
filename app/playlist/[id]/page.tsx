"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, MoreHorizontal, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Playlist, AudioTrack } from "@/types"
import { usePlayerStore } from "@/store/player-store"

// Placeholder data - this would be fetched from Supabase using the `id` param
const playlistData: Playlist = {
  id: "criancas-intro",
  type: "playlist",
  category: "Crianças",
  title: "Intro: Crianças",
  description: "De 3-7 anos: Conheça o Bom Pastor e suas ovelhas muito amadas nesta introdução à...",
  imageUrl: "/images/tela-playlist.jpeg", // Using the uploaded image
  itemCount: 3,
  duration: "14 min", // Total duration maybe
  tracks: [
    {
      id: "intro-pais",
      title: "Introdução Para os Pais",
      subCategory: "O Bom Pastor",
      duration: "5 min",
      imageUrl: "",
      type: "audio",
    },
    {
      id: "fazendo-silencio",
      title: "Fazendo Silêncio",
      subCategory: "O Bom Pastor",
      duration: "5 min",
      imageUrl: "",
      type: "audio",
    },
    {
      id: "o-bom-pastor",
      title: "O Bom Pastor",
      subCategory: "O Bom Pastor",
      duration: "4 min",
      imageUrl: "",
      type: "audio",
    },
  ],
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const play = usePlayerStore((state) => state.play)

  const handlePlayAll = () => {
    // Play the first track of the playlist
    if (playlistData.tracks.length > 0) {
      play(playlistData.tracks[0], playlistData.tracks)
    }
  }

  const handlePlayTrack = (track: AudioTrack) => {
    play(track, playlistData.tracks)
  }

  return (
    <div className="bg-background text-foreground">
      <div className="relative h-60">
        <Image
          src={playlistData.imageUrl || "/placeholder.svg"}
          alt={playlistData.title}
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 hover:bg-black/30 text-white rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full"
        >
          <MoreHorizontal />
        </Button>
      </div>

      <div className="p-4 -mt-8 relative z-10">
        <p className="text-sm font-semibold uppercase text-muted-foreground">{playlistData.category}</p>
        <h1 className="text-3xl font-bold mt-1">{playlistData.title}</h1>
        <p className="text-muted-foreground mt-2">
          {playlistData.description} <button className="font-semibold text-primary">MAIS</button>
        </p>

        <Button className="w-full mt-4 bg-foreground text-background hover:bg-foreground/80" onClick={handlePlayAll}>
          <Play className="mr-2 h-4 w-4 fill-background" />
          Reproduzir Próxima Oração
        </Button>

        <ul className="mt-6 space-y-4">
          {playlistData.tracks.map((track) => (
            <li key={track.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4 text-muted-foreground"
                  onClick={() => handlePlayTrack(track)}
                >
                  <Play className="h-5 w-5" />
                </Button>
                <div>
                  {/* Link to pre-player page */}
                  <Link href={`/pre-player/${track.id}`} className="hover:underline">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.subCategory}</p>
                    <p className="text-sm text-muted-foreground">{track.duration}</p>
                  </Link>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
