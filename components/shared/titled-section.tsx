"use client"

import type React from "react"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TitledSectionProps {
  title: string
  children: React.ReactNode
  showViewMore?: boolean // Para o ">"
  onActionClick?: () => void // Para o "+"
  viewMoreLink?: string
}

export default function TitledSection({
  title,
  children,
  showViewMore,
  onActionClick,
  viewMoreLink,
}: TitledSectionProps) {
  const actualViewMoreLink = viewMoreLink || `/eu/${title.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <section className="px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {showViewMore && (
            <Link href={actualViewMoreLink} className="text-sm text-primary hover:underline ml-1">
              {">"}
            </Link>
          )}
        </div>
        {onActionClick && (
          <Button variant="ghost" size="icon" onClick={onActionClick} className="text-primary">
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
      {children}
    </section>
  )
}
