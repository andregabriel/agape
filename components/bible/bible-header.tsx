"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react" // Menu pode ser usado se o ChevronDown não for clicável o suficiente
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import BookSelectionSheetContent from "./book-selection-sheet-content"

interface BibleHeaderProps {
  currentBook: string
  currentChapter: number
  books: string[]
  totalChapters: number
  onBookChange: (book: string) => void
  onChapterChange: (chapter: number) => void
}

export default function BibleHeader({
  currentBook,
  currentChapter,
  books,
  totalChapters,
  onBookChange,
  onChapterChange,
}: BibleHeaderProps) {
  const chapterNumbers = Array.from({ length: totalChapters }, (_, i) => i + 1)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleSelectBook = (book: string) => {
    onBookChange(book)
    setIsSheetOpen(false) // Fechar o sheet após selecionar um livro
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-background border-b">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-xl font-bold p-0 h-auto hover:bg-transparent">
            {currentBook}
            <ChevronDown className="ml-1 h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4">
          <BookSelectionSheetContent
            books={books}
            currentBook={currentBook}
            onSelectBook={handleSelectBook}
            onClose={() => setIsSheetOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <Select value={currentChapter.toString()} onValueChange={(value) => onChapterChange(Number(value))}>
        <SelectTrigger className="w-auto text-xl font-bold border-none shadow-none focus:ring-0 p-0 h-auto">
          <SelectValue placeholder="Cap." />
        </SelectTrigger>
        <SelectContent className="max-h-96 overflow-y-auto">
          {chapterNumbers.map((chapter) => (
            <SelectItem key={chapter} value={chapter.toString()}>
              {chapter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  )
}
