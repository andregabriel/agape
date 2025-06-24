import IntentionItem, { type IntentionItemProps } from "./intention-item"

interface IntentionsListProps {
  items: IntentionItemProps[]
}

export default function IntentionsList({ items }: IntentionsListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma intenção adicionada.</p>
  }
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <IntentionItem key={item.id} {...item} />
      ))}
    </div>
  )
}
