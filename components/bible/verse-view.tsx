import type { Verse } from "@/types/bible"

interface VerseViewProps {
  verses: Verse[]
}

export default function VerseView({ verses }: VerseViewProps) {
  return (
    <div className="px-4 md:px-8 font-serif text-lg leading-relaxed text-foreground">
      {verses.map((verse) => (
        <p key={verse.number} className="mb-3">
          <span className="text-xs align-super mr-1 text-muted-foreground">{verse.number}</span>
          {verse.text}
        </p>
      ))}
    </div>
  )
}
