// Este componente é uma adaptação do AudioThumbnail para ser mais genérico
import Image from "next/image"
import Link from "next/link"
import { PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ContentCardItemProps {
  id: string
  title: string
  subtitle?: string
  details?: string // e.g., duration, item count, sessions
  imageUrl: string
  link: string
  type?: "audio" | "playlist" | "generic" // Para diferenciar o link se necessário
}

interface ContentThumbnailCardProps extends ContentCardItemProps {
  aspectRatioClass?: string
}

export default function ContentThumbnailCard({
  id,
  title,
  subtitle,
  details,
  imageUrl,
  link,
  type = "generic",
  aspectRatioClass = "aspect-square",
}: ContentThumbnailCardProps) {
  // Lógica de link pode ser ajustada com base no 'type' se necessário
  // const linkHref = type === "playlist" ? `/playlist/${id}` : (type === "audio" ? `/pre-player/${id}` : link);

  return (
    <Link href={link} className="block group w-full">
      <div className={cn("relative rounded-lg overflow-hidden mb-1.5 shadow-sm", aspectRatioClass)}>
        <Image
          src={imageUrl || "/placeholder.svg?width=160&height=160&query=content+art"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="w-8 h-8 text-white/80" />
        </div>
      </div>
      <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-primary">{title}</h4>
      {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      {details && <p className="text-xs text-muted-foreground">{details}</p>}
    </Link>
  )
}
