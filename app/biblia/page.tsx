"use client"

import { useState } from "react"
import BibleHeader from "@/components/bible/bible-header"
import ChapterTitle from "@/components/bible/chapter-title"
import VerseView from "@/components/bible/verse-view"
import type { Verse } from "@/types/bible"

// Placeholder data
const versesData: { [key: string]: { [key: number]: Verse[] } } = {
  Gênesis: {
    1: [
      { number: 1, text: "No princípio, Deus criou o céu e a terra." },
      {
        number: 2,
        text: "A terra estava sem forma e vazia; as trevas cobriam o abismo e o Espírito de Deus pairava sobre as águas.",
      },
      { number: 3, text: "Deus disse: “Faça-se a luz!”. E a luz foi feita." },
      { number: 4, text: "Deus viu que a luz era boa, e separou a luz das trevas." },
      {
        number: 5,
        text: "Deus chamou à luz Dia, e às trevas Noite. Houve tarde e manhã, o primeiro dia.",
      },
    ],
    2: [
      { number: 1, text: "Assim foram concluídos o céu e a terra, com todo o seu exército." },
      {
        number: 2,
        text: "No sétimo dia, Deus concluiu a obra que fizera; e no sétimo dia descansou de toda a sua obra.",
      },
    ],
  },
  Êxodo: {
    1: [
      {
        number: 1,
        text: "Estes são os nomes dos filhos de Israel que entraram no Egito com Jacó, cada um com sua família:",
      },
      { number: 2, text: "Rúben, Simeão, Levi e Judá;" },
    ],
  },
}

const books = [
  "Gênesis",
  "Êxodo",
  "Levítico",
  "Números",
  "Deuteronômio",
  "Josué",
  "Juízes",
  "Rute",
  "I Samuel",
  "II Samuel",
  "I Reis",
  "II Reis",
  "I Crônicas",
  "II Crônicas",
  "Esdras",
  "Neemias",
  "Ester",
  "Jó",
  "Salmos",
  "Provérbios",
  "Eclesiastes",
  "Cânticos",
  "Isaías",
  "Jeremias",
  "Lamentações",
  "Ezequiel",
  "Daniel",
  "Oséias",
  "Joel",
  "Amós",
  "Obadias",
  "Jonas",
  "Miquéias",
  "Naum",
  "Habacuque",
  "Sofonias",
  "Ageu",
  "Zacarias",
  "Malaquias",
  "Mateus",
  "Marcos",
  "Lucas",
  "João",
  "Atos",
  "Romanos",
  "I Coríntios",
  "II Coríntios",
  "Gálatas",
  "Efésios",
  "Filipenses",
  "Colossenses",
  "I Tessalonicenses",
  "II Tessalonicenses",
  "I Timóteo",
  "II Timóteo",
  "Tito",
  "Filemom",
  "Hebreus",
  "Tiago",
  "I Pedro",
  "II Pedro",
  "I João",
  "II João",
  "III João",
  "Judas",
  "Apocalipse",
]

const chaptersPerBook: { [key: string]: number } = {
  Gênesis: 50,
  Êxodo: 40,
  Levítico: 27,
  Números: 36,
  Deuteronômio: 34,
  Josué: 24,
  Juízes: 21,
  Rute: 4,
  "I Samuel": 31,
  "II Samuel": 24,
  "I Reis": 22,
  "II Reis": 25,
  Mateus: 28,
  Marcos: 16,
  Lucas: 24,
  João: 21,
  Apocalipse: 22,
}

export default function BiblePage() {
  const [currentBook, setCurrentBook] = useState("Gênesis")
  const [currentChapter, setCurrentChapter] = useState(1)

  const handleBookChange = (book: string) => {
    setCurrentBook(book)
    setCurrentChapter(1)
  }

  const handleChapterChange = (chapter: number) => {
    setCurrentChapter(chapter)
  }

  const currentVerses = versesData[currentBook]?.[currentChapter] || [{ number: 0, text: "Capítulo não encontrado." }]
  const totalChaptersForCurrentBook = chaptersPerBook[currentBook] || 1

  return (
    <div className="flex flex-col h-screen">
      <BibleHeader
        currentBook={currentBook}
        currentChapter={currentChapter}
        books={books}
        totalChapters={totalChaptersForCurrentBook}
        onBookChange={handleBookChange}
        onChapterChange={handleChapterChange}
      />
      <div className="flex-grow overflow-y-auto pb-16">
        <ChapterTitle book={currentBook} chapter={currentChapter} />
        <VerseView verses={currentVerses} />
      </div>
    </div>
  )
}
