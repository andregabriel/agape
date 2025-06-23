import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

export default function SacredHeartBanner() {
  const bannerData = {
    title: "Sagrado Coração de Jesus",
    imageUrl: "/images/sacred-heart-banner.jpeg",
    prayingCount: "70,116 de 222,0K rezando",
    daysRemaining: "12 dias restantes",
    category: "Santos",
    dateInfo: "Dia 6: 14 de junho",
    link: "/pre-player/sagrado-coracao-jesus",
  }

  return (
    <section className="relative w-full h-[300px] md:h-[400px] group">
      <Link href={bannerData.link} className="block w-full h-full">
        <Image
          src={bannerData.imageUrl || "/placeholder.svg"}
          alt={bannerData.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg" />

        <div className="absolute top-4 left-4 flex flex-col space-y-1 md:space-y-2">
          <span className="bg-black/50 text-white text-xs md:text-sm px-2 py-1 rounded">{bannerData.prayingCount}</span>
          <span className="bg-black/50 text-white text-xs md:text-sm px-2 py-1 rounded">
            {bannerData.daysRemaining}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg md:text-xl font-semibold">{bannerData.category}</h3>
          <p className="text-sm md:text-base">{bannerData.dateInfo}</p>
        </div>

        <div className="absolute bottom-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 md:w-12 md:h-12"
            aria-label={`Reproduzir ${bannerData.title}`}
          >
            <PlayCircle className="w-6 h-6 md:w-8 md:h-8 fill-white" />
          </Button>
        </div>
      </Link>
    </section>
  )
}
