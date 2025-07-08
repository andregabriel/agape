// Item individual para seções de lista vertical
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VerticalListItemProps {
  item: {
    id: string
    imageUrl: string
    title: string
    subtitle: string
    details: string // e.g., duration or session count
    link: string
    showMoreIcon?: boolean
  }
}

export default function VerticalListItem({ item }: VerticalListItemProps) {
  return (
    <Link
      href={item.link}
      className="flex items-center p-3 bg-card rounded-lg shadow-sm hover:bg-muted transition-colors"
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden mr-4 shrink-0">
        <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-base md:text-lg leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.details}</p>
      </div>
      {item.showMoreIcon !== false && (
        <Button variant="ghost" size="icon" className="text-muted-foreground ml-2 shrink-0">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      )}
    </Link>
  )
}
