import Image from "next/image"
import Link from "next/link"

interface FeaturedBannerProps {
  item: {
    imageUrl: string
    title: string
    subtitle: string
    details: string
    link: string
  }
}

export default function FeaturedBanner({ item }: FeaturedBannerProps) {
  return (
    <Link href={item.link} className="block group">
      <div className="rounded-xl overflow-hidden shadow-lg">
        <div className="relative aspect-[4/3] md:aspect-video">
          <Image
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          {/* Pode adicionar um gradiente se necessário, como em outros banners */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> */}
        </div>
        <div className="p-4 bg-card">
          <h2 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {item.title}
          </h2>
          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
        </div>
      </div>
    </Link>
  )
}
