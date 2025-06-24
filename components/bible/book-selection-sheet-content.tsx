"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Settings2, X, ChevronDown } from "lucide-react" // Settings2 para o ícone Tt, X para fechar
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface BookSelectionSheetContentProps {
  books: string[]
  currentBook: string
  onSelectBook: (book: string) => void
  onClose: () => void
}

// Placeholder para traduções
const translations = [
  { id: "ave-maria", name: "PT Ave-Maria" },
  { id: "nvi", name: "PT NVI" },
  { id: "acf", name: "PT ACF" },
]

export default function BookSelectionSheetContent({
  books,
  currentBook,
  onSelectBook,
  onClose,
}: BookSelectionSheetContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTranslation, setSelectedTranslation] = useState(translations[0].id)

  const filteredBooks = books.filter((book) => book.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                {translations.find((t) => t.id === selectedTranslation)?.name || "Tradução"}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {translations.map((translation) => (
                <DropdownMenuItem key={translation.id} onClick={() => setSelectedTranslation(translation.id)}>
                  {translation.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings2 className="h-4 w-4" /> {/* Ícone Tt */}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 md:hidden">
              {" "}
              {/* Botão de fechar para mobile */}
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* A barra de busca pode ser adicionada aqui se o ícone de Search for para ativar uma busca interna no sheet */}
        {/* <Input 
          type="text"
          placeholder="Buscar livro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        /> */}
      </header>

      <ScrollArea className="flex-grow">
        <div className="py-2">
          {filteredBooks.map((book) => (
            <Button
              key={book}
              variant="ghost"
              className={cn(
                "w-full justify-start px-4 py-3 text-md rounded-none",
                book === currentBook
                  ? "font-bold text-foreground bg-muted"
                  : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
              onClick={() => onSelectBook(book)}
            >
              {book}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
