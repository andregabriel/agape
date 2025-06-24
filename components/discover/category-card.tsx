import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  item: {
    id: string
    title: string
    imageUrl: string
    link: string
  }
}

export default function CategoryCard({ item }: CategoryCardProps) {
  return (
    <Link href={item.link} className="block group">
      {/* A largura do card é definida aqui: w-48 md:w-56 */}
      <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white text-base font-semibold truncate">{item.title}</h3>
        </div>
      </div>
    </Link>
  )
}
