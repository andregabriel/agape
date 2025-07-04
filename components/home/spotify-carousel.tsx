import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

interface SpotifyCarouselItem {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  link: string
}

interface SpotifyCarouselProps {
  title: string
  items: SpotifyCarouselItem[]
  showAll?: boolean
}

export default function SpotifyCarousel({ title, items, showAll = false }: SpotifyCarouselProps) {
  return (
    <section className="px-4 md:px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
          {title}
        </h2>
        {showAll && (
          <Link href={`/browse/${title.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-medium text-gray-400 hover:text-white hover:underline">
            Mostrar tudo
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="group relative bg-gray-900/40 hover:bg-gray-800/60 rounded-lg p-4 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {/* Album/Playlist Cover */}
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16.66vw, 14.28vw"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-green-500 hover:bg-green-400 rounded-full p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Play className="w-6 h-6 text-black fill-current" />
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="space-y-1">
              <h3 className="font-semibold text-white text-sm leading-tight truncate group-hover:underline">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs leading-tight line-clamp-2">
                {item.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}