interface ChapterTitleProps {
  book: string
  chapter: number
}

export default function ChapterTitle({ book, chapter }: ChapterTitleProps) {
  return (
    <div className="my-6 text-center">
      <h1 className="text-2xl font-serif text-foreground">
        {book} {chapter}
      </h1>
      <hr className="mt-2 w-16 mx-auto border-foreground/50" />
    </div>
  )
}
