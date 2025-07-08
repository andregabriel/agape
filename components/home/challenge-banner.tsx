// Componente reutilizável para "Sagrado Coração de Jesus", "Contra o Vício", "Termine de Rezar"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChallengeBannerProps {
  title: string
  imageUrl: string
  prayingCount?: string
  daysRemaining?: string
  category?: string
  dateInfo?: string
  primaryText: string
  secondaryText: string
  link: string
  themeColorClass?: string // e.g., "bg-red-700", "bg-blue-700"
}

export default function ChallengeBanner({
  title,
  imageUrl,
  prayingCount,
  daysRemaining,
  category,
  dateInfo,
  primaryText,
  secondaryText,
  link,
  themeColorClass = "bg-black/70",
}: ChallengeBannerProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">{title}</h2>
        <Link
          href={link}
          className="block relative aspect-video md:aspect-[16/7] group rounded-lg overflow-hidden shadow-lg"
        >
          <Image src={imageUrl || "/placeholder.svg"} alt={primaryText} fill style={{ objectFit: "cover" }} />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent`} />

          {(prayingCount || daysRemaining) && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2">
              {prayingCount && (
                <span className="bg-black/60 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                  {prayingCount}
                </span>
              )}
              {daysRemaining && (
                <span className="bg-black/60 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                  {daysRemaining}
                </span>
              )}
            </div>
          )}

          <div
            className={`absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white ${themeColorClass} bg-opacity-80 backdrop-blur-sm`}
          >
            <div className="flex justify-between items-end">
              <div>
                {category && <p className="text-xs md:text-sm font-semibold">{category}</p>}
                <h3 className="text-base md:text-lg font-bold leading-tight">{primaryText}</h3>
                <p className="text-xs md:text-sm opacity-90">{secondaryText}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 md:w-10 md:h-10 shrink-0"
                aria-label={`Reproduzir ${primaryText}`}
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-white" />
              </Button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
