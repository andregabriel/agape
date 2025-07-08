import Image from "next/image"
import Link from "next/link"
import type { AudioTrack } from "@/types"
import { PlayCircle } from "lucide-react"
import { getAudioMapping } from "@/lib/audio-mapping"

interface AudioThumbnailProps {
  item: AudioTrack
}

export default function AudioThumbnail({ item }: AudioThumbnailProps) {
  // Obter o mapeamento real do Supabase
  const audioMapping = getAudioMapping(item.id)
  
  // Usar o ID real do Supabase se disponível, senão usar o ID da home
  const realId = audioMapping?.supabaseId || item.id
  
  const linkHref = item.type === "playlist" ? `/playlist/${realId}` : `/pre-player/${realId}`

  const getMetaText = () => {
    if (item.type === "playlist" && item.itemCount) {
      return `${item.itemCount} ${item.itemCount === 1 ? "oração" : "orações"}`
    }
    if (item.type === "audio" && item.duration) {
      return item.duration
    }
    return null
  }

  const metaText = getMetaText()

  return (
    <Link href={linkHref} className="block group w-36 md:w-40 flex-shrink-0">
      <div className="relative aspect-square rounded-lg overflow-hidden mb-2 shadow-md">
        <Image
          src={item.imageUrl || "/placeholder.svg?width=160&height=160&query=audio+art"}
          alt={item.title}
          width={160}
          height={160}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="w-10 h-10 text-white/80" />
        </div>
      </div>
      <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-primary">{item.title}</h4>
      {item.subCategory && <p className="text-xs text-muted-foreground truncate">{item.subCategory}</p>}
      {metaText && <p className="text-xs text-muted-foreground">{metaText}</p>}
    </Link>
  )
}
