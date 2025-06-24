import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"

export interface QuickActionItemProps {
  id: string
  label: string
  subLabel?: string
  iconType: "plus" | "hallowLogo" | "userAvatar"
  iconUrl?: string // Para hallowLogo e userAvatar
  link: string
}

export default function QuickActionItem({ id, label, subLabel, iconType, iconUrl, link }: QuickActionItemProps) {
  let iconContent
  if (iconType === "plus") {
    iconContent = <Plus className="h-6 w-6 text-primary" />
  } else if (iconUrl) {
    iconContent = (
      <Image src={iconUrl || "/placeholder.svg"} alt={label} width={40} height={40} className="rounded-full" />
    )
  }

  return (
    <Link href={link} className="flex flex-col items-center space-y-1.5 flex-shrink-0 w-20 text-center group">
      <div
        className={`flex items-center justify-center h-16 w-16 rounded-full 
                    ${iconType === "plus" ? "bg-primary/10 border border-primary/30" : ""}
                    ${iconType === "hallowLogo" ? "bg-purple-500 p-0.5" : ""} 
                    group-hover:opacity-80 transition-opacity`}
      >
        {iconContent}
      </div>
      <p className="text-xs font-medium text-foreground">{label}</p>
      {subLabel && <p className="text-xs text-muted-foreground -mt-1">{subLabel}</p>}
    </Link>
  )
}
