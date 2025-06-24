import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react" // Checkmark icon

export interface GettingStartedCardProps {
  id: string
  title: string
  imageUrl: string
  backgroundColor: string // Tailwind class e.g. "bg-purple-100"
  isCompleted: boolean
  link: string
}

export default function GettingStartedCard({
  id,
  title,
  imageUrl,
  backgroundColor,
  isCompleted,
  link,
}: GettingStartedCardProps) {
  return (
    <Link href={link} className="block group">
      <div
        className={`relative aspect-[4/5] rounded-xl p-3 flex flex-col justify-between items-start shadow-sm hover:shadow-md transition-shadow ${backgroundColor}`}
      >
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-background/70 rounded-full p-0.5">
            <CheckCircle2 className="h-5 w-5 text-green-500 fill-white" />
          </div>
        )}
        <div className="relative w-1/2 aspect-square self-center mt-2 mb-auto">
          {/* Placeholder para ilustração, a imagem real viria de imageUrl */}
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="opacity-80 group-hover:scale-105 transition-transform"
          />
        </div>
        <p className="font-semibold text-sm text-foreground/90 mt-2">{title}</p>
      </div>
    </Link>
  )
}
