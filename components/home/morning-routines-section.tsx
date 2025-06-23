import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RoutineItem {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  duration: string
  link: string
}

// Placeholder data
const routines: RoutineItem[] = [
  {
    id: "terco-diario",
    imageUrl: "/placeholder.svg?width=64&height=64",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    duration: "23-28 min",
    link: "/pre-player/terco-diario",
  },
  {
    id: "evangelho-diario",
    imageUrl: "/placeholder.svg?width=64&height=64",
    title: "Evangelho Diário",
    subtitle: "Lectio Divina Diária",
    duration: "5-30 min",
    link: "/pre-player/evangelho-diario",
  },
  {
    id: "minuto-homilia",
    imageUrl: "/placeholder.svg?width=64&height=64",
    title: "Minuto de Homilia",
    subtitle: "Com Pe. Sérgio Jeremias",
    duration: "2 min",
    link: "/pre-player/minuto-homilia",
  },
]

export default function MorningRoutinesSection() {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Rotinas Matinais</h2>
        <div className="space-y-3">
          {routines.map((routine) => (
            <Link
              key={routine.id}
              href={routine.link}
              className="flex items-center p-3 bg-card rounded-lg shadow-sm hover:bg-muted transition-colors"
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4 shrink-0">
                <Image
                  src={routine.imageUrl || "/placeholder.svg"}
                  alt={routine.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-base leading-tight">{routine.title}</h3>
                <p className="text-sm text-muted-foreground">{routine.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{routine.duration}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground ml-2 shrink-0">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
