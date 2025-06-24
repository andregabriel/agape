// Ajustado para 3 linhas fixas
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GridItemData {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  details: string
  link: string
}

interface HorizontalGridScrollSectionProps {
  title: string
  items: GridItemData[]
  className?: string
  // numRows prop removida, fixo em 3 linhas
}

export default function HorizontalGridScrollSection({ title, items, className }: HorizontalGridScrollSectionProps) {
  return (
    <section className={cn("py-6 md:py-8", className)}>
      <div className="container px-0 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4 px-4 md:px-0 text-white">{title}</h2>
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-4">
          {/* Ajuste na altura para 3 linhas. 
              h-28 (item) + theme(spacing.3) (gap-y) = approx 124px per item row.
              3 * 124px = 372px.
              Usando theme(spacing) para consistência:
              Item height: h-28 (112px) or md:h-32 (128px)
              Gap: theme(spacing.3) (12px)
              Total height per item row: 112+12 = 124px or 128+12 = 140px
              3 rows: 3 * (h-28 + gap-3) = calc(3 * (7rem + 0.75rem)) = calc(3 * 7.75rem) = 23.25rem
              3 rows md: 3 * (h-32 + gap-3) = calc(3 * (8rem + 0.75rem)) = calc(3 * 8.75rem) = 26.25rem
           */}
          <div
            className="flex flex-col flex-wrap gap-3 h-[calc(3*(theme(spacing.28)+theme(spacing.3)))] md:h-[calc(3*(theme(spacing.32)+theme(spacing.3)))]"
            style={{ writingMode: "horizontal-tb" }}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center p-2 bg-neutral-800 hover:bg-neutral-700/80 rounded-lg shadow-sm transition-colors w-72 md:w-80 h-28 md:h-32" // Ajustei bg e w
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-md overflow-hidden mr-3 shrink-0">
                  <Image
                    src={
                      item.imageUrl || `/placeholder.svg?width=112&height=112&query=${encodeURIComponent(item.title)}`
                    }
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h3 className="font-semibold text-sm md:text-base leading-tight truncate text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-400 truncate">{item.subtitle}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.details}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-400 hover:text-white ml-1 shrink-0 self-start"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
