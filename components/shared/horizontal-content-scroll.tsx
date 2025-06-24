"use client"

import ContentThumbnailCard, { type ContentCardItemProps } from "./content-thumbnail-card"
import Link from "next/link"

interface HorizontalContentScrollProps {
  title: string
  items: ContentCardItemProps[]
  showViewMore?: boolean
  onViewMore?: () => void // Ou um link href
  itemWidthClass?: string
  aspectRatioClass?: string
}

export default function HorizontalContentScroll({
  title,
  items,
  showViewMore,
  onViewMore,
  itemWidthClass = "w-36 md:w-40",
  aspectRatioClass = "aspect-square",
}: HorizontalContentScrollProps) {
  return (
    <section className="py-2">
      <div className="flex justify-between items-center mb-3 px-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {showViewMore && onViewMore && (
          <Link
            href={`/eu/${title.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-sm text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              onViewMore()
            }}
          >
            {">"}
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-3 -mx-4 px-4 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={`${itemWidthClass} flex-shrink-0 ${index === 0 ? "ml-0" : ""} ${
              index === items.length - 1 ? "mr-0" : ""
            }`}
          >
            <ContentThumbnailCard {...item} aspectRatioClass={aspectRatioClass} />
          </div>
        ))}
        {/* Placeholder para mostrar que há mais itens, se necessário */}
        {items.length > 3 && <div className="w-1 flex-shrink-0"></div>}
      </div>
    </section>
  )
}
