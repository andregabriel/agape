import QuickActionItem, { type QuickActionItemProps } from "./quick-action-item"

interface QuickActionsSectionProps {
  items: QuickActionItemProps[]
}

export default function QuickActionsSection({ items }: QuickActionsSectionProps) {
  return (
    <section className="px-4 pt-6 pb-2">
      <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {items.map((item) => (
          <QuickActionItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
