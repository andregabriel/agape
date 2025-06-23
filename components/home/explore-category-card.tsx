// Card individual para a seção "Explore por Categoria"
import Image from "next/image"
import Link from "next/link"

interface ExploreCardProps {
  item: {
    id: string
    title: string
    description: string
    imageUrl: string
    link: string
  }
}

export default function ExploreCategoryCard({ item }: ExploreCardProps) {
  return (
    <Link href={item.link} className="block group">
      <div className="relative aspect-[3/4] w-60 md:w-72 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-sm opacity-90">{item.description}</p>
        </div>
      </div>
    </Link>
  )
}
