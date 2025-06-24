"use client"

import { Zap } from "lucide-react" // Ícone de raio/trovão
import Link from "next/link"

interface StreakSectionProps {
  count: number
  message: string
  onViewDetails: () => void // Ou um link href
}

export default function StreakSection({ count, message, onViewDetails }: StreakSectionProps) {
  return (
    <section className="px-4 pt-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-foreground">Sequência</h2>
        <Link
          href="/eu/sequencia"
          className="text-sm text-primary hover:underline"
          onClick={(e) => {
            e.preventDefault()
            onViewDetails()
          }}
        >
          {">"}
        </Link>
      </div>
      <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
        <Zap className="h-6 w-6 text-yellow-500" />
        <span className="text-3xl font-bold text-foreground">{count}</span>
        <p className="text-sm text-muted-foreground flex-grow">{message}</p>
      </div>
    </section>
  )
}
