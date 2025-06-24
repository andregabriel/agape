import type { AudioTrack } from "@/types"
import AudioThumbnail from "@/components/audio-thumbnail"
import { cn } from "@/lib/utils"

interface HorizontalScrollSectionProps {
  title: string
  items: AudioTrack[]
  itemWidthClass?: string
  aspectRatioClass?: string // Usado para variant 'default'
  thumbnailVariant?: "default" | "lounge"
  className?: string
}

export default function HorizontalScrollSection({
  title,
  items,
  itemWidthClass: providedItemWidthClass,
  aspectRatioClass = "aspect-square",
  thumbnailVariant = "default",
  className,
}: HorizontalScrollSectionProps) {
  const isLounge = thumbnailVariant === "lounge"

  // Ajusta a largura do item e o aspect ratio baseado na variante
  const itemWidthClass = isLounge
    ? providedItemWidthClass || "w-40 sm:w-44 md:w-48" // Largura maior para lounge
    : providedItemWidthClass || "w-36 md:w-40" // Largura padrão

  const spacingClass = isLounge ? "space-x-4 md:space-x-5" : "space-x-3 md:space-x-4"

  return (
    <section className={cn("py-6 md:py-8", className)}>
      <div className="container px-0 md:px-6">
        <h2
          className={cn(
            "font-bold tracking-tight mb-4 px-4 md:px-0",
            isLounge ? "text-2xl md:text-3xl text-white" : "text-xl md:text-2xl text-white", // Título maior para lounge
          )}
        >
          {title}
        </h2>
        <div className={cn("flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar", spacingClass)}>
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={cn(itemWidthClass, "flex-shrink-0 first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0")}
            >
              <AudioThumbnail
                item={item}
                variant={thumbnailVariant}
                aspectRatioClass={isLounge ? undefined : aspectRatioClass} // Passa aspectRatioClass apenas para default
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
