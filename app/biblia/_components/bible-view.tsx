"use client"

import { useState, useCallback } from "react"
import BibleHeader from "./bible-header"
import ChapterView from "./chapter-view"
import BookSelectionSheet from "./book-selection-sheet" // Import the new component
import { initialBook, initialChapter, versesData, chaptersPerBook, translations } from "../data"
import type { Translation } from "../types"

export default function BibleView() {
  const [currentBook, setCurrentBook] = useState(initialBook)
  const [currentChapter, setCurrentChapter] = useState(initialChapter)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedTranslation, setSelectedTranslation] = useState<Translation>(translations[0])

  const handleBookChange = useCallback((book: string) => {
    setCurrentBook(book)
    setCurrentChapter(1)
    setIsSheetOpen(false)
  }, [])

  const handleChapterChange = useCallback((chapter: number) => {
    setCurrentChapter(chapter)
  }, [])

  const handleTranslationChange = useCallback((translation: Translation) => {
    setSelectedTranslation(translation)
    // Future: Potentially refetch data for the new translation here
    // For now, just close the sheet if it was part of a flow that opened it.
    // The translation dropdown itself doesn't close the main sheet.
  }, [])

  const currentVerses = versesData[currentBook]?.[currentChapter] || [{ number: 0, text: "Capítulo não encontrado." }]
  const totalChaptersForCurrentBook = chaptersPerBook[currentBook] || 1

  return (
    <div className="flex flex-col h-screen bg-background">
      <BibleHeader
        currentBook={currentBook}
        currentChapter={currentChapter}
        onBookSelectClick={() => setIsSheetOpen(true)}
      />
      <div className="flex-grow overflow-y-auto pb-16">
        <ChapterView book={currentBook} chapter={currentChapter} verses={currentVerses} />
      </div>

      <BookSelectionSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        currentBook={currentBook}
        onBookChange={handleBookChange}
        translations={translations}
        selectedTranslation={selectedTranslation}
        onTranslationChange={handleTranslationChange}
      />
    </div>
  )
}
