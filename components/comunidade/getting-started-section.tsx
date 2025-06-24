import GettingStartedCard, { type GettingStartedCardProps } from "./getting-started-card"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GettingStartedSectionProps {
  items: GettingStartedCardProps[]
  completedCount: number
  totalCount: number
}

export default function GettingStartedSection({ items, completedCount, totalCount }: GettingStartedSectionProps) {
  return (
    <section className="px-4 py-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-foreground">Começar</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          {completedCount} of {totalCount} complete
          <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {items.map((item) => (
          <GettingStartedCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
