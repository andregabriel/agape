"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Info } from "lucide-react"

interface ChurchLaunchCardProps {
  imageUrl: string
  title: string
  subtitle: string
  buttonText: string
  waitingListCount: number
  link: string
  onDismiss?: () => void
}

export default function ChurchLaunchCard({
  imageUrl,
  title,
  subtitle,
  buttonText,
  waitingListCount,
  link,
  onDismiss,
}: ChurchLaunchCardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-lg p-5 text-center relative">
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="absolute top-3 right-3 h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-foreground/10 shadow-md">
        <Image src={imageUrl || "/placeholder.svg"} alt="Church Image" fill style={{ objectFit: "cover" }} />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
      <Button
        asChild
        className="w-full max-w-xs mx-auto bg-foreground text-background hover:bg-foreground/90 py-3 text-base"
      >
        <Link href={link}>{buttonText}</Link>
      </Button>
      <div className="mt-3 text-xs text-muted-foreground flex items-center justify-center">
        {waitingListCount} membros na lista de espera
        <Info className="h-3 w-3 ml-1.5" />
      </div>
    </div>
  )
}
