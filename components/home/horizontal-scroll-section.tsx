// Componente reutilizável para "Corpus Christi", "Destaques", "Favoritas dos Assinantes", "Diárias com Convidados"
import type { AudioTrack } from "@/types" // Usando o tipo existente
import AudioThumbnail from "@/components/audio-thumbnail" // Reutilizando o thumbnail existente

interface HorizontalScrollSectionProps {
  title: string
  items: AudioTrack[]
  itemWidthClass?: string // e.g. "w-36 md:w-40" for square, "w-48 md:w-60" for wider
  aspectRatioClass?: string // e.g. "aspect-square", "aspect-video"
}

export default function HorizontalScrollSection({
  title,
  items,
  itemWidthClass = "w-36 md:w-40", // Default for Corpus Christi like thumbs
  aspectRatioClass = "aspect-square",
}: HorizontalScrollSectionProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-0 md:px-6">
        {" "}
        {/* No px for mobile to allow full bleed scroll */}
        <h2 className="text-2xl font-bold tracking-tight mb-4 px-4 md:px-0">{title}</h2>
        <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`${itemWidthClass} flex-shrink-0 first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0`}
            >
              {/* Passando aspectRatioClass para o AudioThumbnail se ele for modificado para aceitar */}
              <AudioThumbnail item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
