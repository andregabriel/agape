import Image from "next/image"
import Link from "next/link"
import { PlayCircle, ListMusic, Mic2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AudioTrack } from "@/types" // Certifique-se que este tipo é abrangente

interface AudioThumbnailProps {
  item: AudioTrack
  variant?: "default" | "lounge"
  className?: string
  aspectRatioClass?: string // Usado para 'default', ignorado para 'lounge'
}

export default function AudioThumbnail({
  item,
  variant = "default",
  className,
  aspectRatioClass = "aspect-square",
}: AudioThumbnailProps) {
  const linkHref = item.type === "playlist" ? `/playlist/${item.id}` : item.link || `/pre-player/${item.id}`

  if (variant === "lounge") {
    return (
      <Link href={linkHref} className={cn("block group w-full", className)}>
        <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden shadow-lg mb-2">
          <Image
            src={item.imageUrl || "/placeholder.svg?width=300&height=400&query=lounge+music"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 flex flex-col justify-end">
            <h3 className="text-white text-lg font-bold leading-tight drop-shadow-md">{item.title}</h3>
            {item.type === "playlist" && item.itemCount && (
              <p className="text-xs text-white/80 drop-shadow-sm">{item.itemCount} áudios</p>
            )}
            {item.type === "audio" && item.duration && (
              <p className="text-xs text-white/80 drop-shadow-sm">{item.duration}</p>
            )}
          </div>
          {/* Ícone de tipo no canto superior direito, se necessário, similar ao Spotify */}
          <div className="absolute top-2 right-2">
            {item.type === "playlist" ? (
              <ListMusic className="w-5 h-5 text-white/70" />
            ) : item.type === "audio" ? (
              <Mic2 className="w-5 h-5 text-white/70" />
            ) : null}
          </div>
        </div>
        {/* Descrição abaixo da imagem para o estilo lounge */}
        <p className="text-sm text-neutral-200 group-hover:text-white line-clamp-2 leading-tight">
          {item.subCategory || "Conteúdo exclusivo"}
        </p>
        {/* Informação adicional como duração ou contagem de itens, se não estiver na imagem */}
        {variant === "lounge" &&
          item.type === "playlist" &&
          item.itemCount &&
          !item.title.includes(String(item.itemCount)) && (
            <p className="text-xs text-neutral-400 mt-0.5">{item.itemCount} áudios</p>
          )}
        {variant === "lounge" && item.type === "audio" && item.duration && !item.title.includes(item.duration) && (
          <p className="text-xs text-neutral-400 mt-0.5">{item.duration}</p>
        )}
      </Link>
    )
  }

  // Estilo Padrão (Default)
  return (
    <Link href={linkHref} className={cn("block group w-full", className)}>
      <div className={cn("relative rounded-lg overflow-hidden mb-1.5 shadow-sm", aspectRatioClass)}>
        <Image
          src={item.imageUrl || "/placeholder.svg?width=160&height=160&query=content+art"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="w-8 h-8 text-white/80" />
        </div>
        {item.type === "playlist" && (
          <div className="absolute top-1.5 right-1.5 bg-black/50 backdrop-blur-sm p-1 rounded-sm">
            <ListMusic className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      <h4 className="text-sm font-semibold truncate text-white group-hover:text-sky-300">{item.title}</h4>
      {item.subCategory && <p className="text-xs text-neutral-400 truncate">{item.subCategory}</p>}
      {item.duration && <p className="text-xs text-neutral-500">{item.duration}</p>}
      {item.itemCount && !item.duration && <p className="text-xs text-neutral-500">{item.itemCount} áudios</p>}
    </Link>
  )
}
