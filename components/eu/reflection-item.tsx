import Image from "next/image"
import Link from "next/link"

export interface ReflectionItemProps {
  id: string
  text: string
  date: string
  imageUrl?: string
  link: string
}

export default function ReflectionItem({ id, text, date, imageUrl, link }: ReflectionItemProps) {
  return (
    <Link href={link} className="flex items-center p-3 bg-card rounded-lg shadow-sm hover:bg-muted transition-colors">
      <div className="flex-grow">
        <p className="text-sm font-medium text-foreground truncate">{text}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      {imageUrl && (
        <div className="relative w-10 h-10 rounded-md overflow-hidden ml-3 flex-shrink-0">
          <Image src={imageUrl || "/placeholder.svg"} alt="Reflexão" fill style={{ objectFit: "cover" }} />
        </div>
      )}
    </Link>
  )
}
