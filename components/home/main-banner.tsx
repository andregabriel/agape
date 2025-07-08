import Image from "next/image"
import { Play } from "lucide-react"
import Link from "next/link"

export default function MainBanner() {
  // Placeholder data
  const banner = {
    imageUrl: "/images/banners/terco-diario-sabado.png",
    category: "Terço",
    title: "Terço Diário - Sábado",
    subtitle: "Mistérios Gozosos",
    link: "/pre-player/terco-diario-sabado",
  }

  return (
    <Link href={banner.link} className="block relative aspect-[4/3] md:aspect-video group">
      <Image src={banner.imageUrl || "/placeholder.svg"} alt={banner.title} fill style={{ objectFit: "cover" }} priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 rounded-full p-3 md:p-4 shadow-lg">
          <Play className="h-8 w-8 md:h-10 md:h-10 text-black fill-black" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-sm font-medium bg-black/30 px-2 py-0.5 rounded inline-block mb-1">{banner.category}</p>
        <h2 className="text-xl md:text-2xl font-bold">{banner.title}</h2>
        <p className="text-sm md:text-base">{banner.subtitle}</p>
      </div>
    </Link>
  )
}
