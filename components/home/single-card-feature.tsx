// Para seções como "Reflita sobre o Evangelho", "Minuto de Homilia"
import Image from "next/image"
import Link from "next/link"

interface SingleCardFeatureProps {
  sectionTitle: string
  card: {
    imageUrl: string
    title: string
    subtitle: string
    details: string // e.g., "114 sessões" or "2 min"
    link: string
  }
}

export default function SingleCardFeature({ sectionTitle, card }: SingleCardFeatureProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">{sectionTitle}</h2>
        <Link href={card.link} className="block group">
          <div className="rounded-lg overflow-hidden shadow-lg bg-card">
            <div className="relative aspect-video md:aspect-[16/7]">
              <Image
                src={card.imageUrl || "/placeholder.svg"}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-card-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.details}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
