// Para seções como "Orações Infantis"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GridItem {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  details: string // e.g. duration or session count
  link: string
}

interface GridSectionProps {
  title: string
  items: GridItem[]
}

export default function GridSection({ title, items }: GridSectionProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="flex items-start p-3 bg-card rounded-lg shadow-sm hover:bg-muted transition-colors"
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden mr-3 shrink-0">
                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.details}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground ml-1 shrink-0 -mt-1 -mr-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
