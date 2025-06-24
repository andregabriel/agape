"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface BibleHeaderProps {
  currentBook: string
  currentChapter: number
  onBookSelectClick: () => void
  // Add onChapterSelectClick later if needed
}

export default function BibleHeader({ currentBook, currentChapter, onBookSelectClick }: BibleHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background border-b">
      <Button
        variant="ghost"
        className="text-lg font-bold p-0 h-auto hover:bg-transparent"
        onClick={onBookSelectClick}
        aria-label={`Selecionar livro, atualmente ${currentBook}`}
      >
        {currentBook}
        <ChevronDown className="ml-1 h-5 w-5" />
      </Button>
      <div className="text-lg font-bold">{currentChapter}</div>
      {/* Placeholder for other icons like search, text settings if needed later */}
    </header>
  )
}
