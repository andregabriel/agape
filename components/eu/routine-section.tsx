"use client"

import Image from "next/image"
import Link from "next/link"

interface RoutineSectionProps {
  routineTime: string
  title: string
  subtitle: string
  imageUrl: string
  link: string
  onViewDetails: () => void // Ou um link href
}

export default function RoutineSection({
  routineTime,
  title,
  subtitle,
  imageUrl,
  link,
  onViewDetails,
}: RoutineSectionProps) {
  return (
    <section className="px-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-foreground">Rotina das {routineTime}</h2>
        <Link
          href="/eu/rotina"
          className="text-sm text-primary hover:underline"
          onClick={(e) => {
            e.preventDefault()
            onViewDetails()
          }}
        >
          {">"}
        </Link>
      </div>
      <Link href={link} className="block group">
        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </Link>
    </section>
  )
}
