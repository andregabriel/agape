"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Search, Baseline, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Translation } from "../types"
import { books as allBooksArray } from "../data" // Assuming books array is exported from data.ts

interface BookSelectionSheetProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  currentBook: string
  onBookChange: (book: string) => void
  translations: Translation[]
  selectedTranslation: Translation
  onTranslationChange: (translation: Translation) => void
  // Add props for search and text settings later
}

export default function BookSelectionSheet({
  isOpen,
  onOpenChange,
  currentBook,
  onBookChange,
  translations,
  selectedTranslation,
  onTranslationChange,
}: BookSelectionSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-4/5 max-w-xs sm:max-w-sm flex flex-col">
        <SheetHeader className="p-4 border-b sticky top-0 bg-background z-10">
          <SheetTitle className="sr-only">Seleção de Livro e Opções</SheetTitle>
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-sm font-semibold px-3 py-1.5 h-auto border-foreground/30 hover:bg-muted/50"
                  aria-label={`Mudar tradução, atualmente ${selectedTranslation.name}`}
                >
                  {selectedTranslation.shortName} {/* Using shortName as per image */}
                  <ChevronDown className="ml-1.5 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {translations.map((translation) => (
                  <DropdownMenuItem key={translation.id} onClick={() => onTranslationChange(translation)}>
                    {translation.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label="Configurações de texto"
              >
                <Baseline className="h-5 w-5" /> {/* Lucide icon for Tt */}
              </Button>
            </div>
          </div>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <div className="py-1">
            {allBooksArray.map((book) => (
              <Button
                key={book}
                variant="ghost"
                className={cn(
                  "w-full justify-start px-4 py-2.5 rounded-none h-auto text-left",
                  book === currentBook
                    ? "text-lg font-bold text-foreground" // Adjusted to text-lg for current, text-md for others
                    : "text-md font-normal text-muted-foreground hover:text-foreground hover:bg-muted/30",
                )}
                onClick={() => onBookChange(book)}
              >
                {book}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
