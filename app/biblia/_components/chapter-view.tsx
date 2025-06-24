import type { Verse } from "../types"

interface ChapterViewProps {
  book: string
  chapter: number
  verses: Verse[]
}

export default function ChapterView({ book, chapter, verses }: ChapterViewProps) {
  return (
    <div className="p-4 font-serif">
      <h2 className="text-2xl text-center mb-6 pb-1 border-b border-foreground/50 inline-block mx-auto">
        {book} {chapter}
      </h2>
      <div className="space-y-3">
        {verses.map((verse) => (
          <p key={verse.number} className="text-base leading-relaxed">
            <sup className="mr-1 text-xs font-sans text-muted-foreground">{verse.number}</sup>
            {verse.text}
          </p>
        ))}
      </div>
    </div>
  )
}
