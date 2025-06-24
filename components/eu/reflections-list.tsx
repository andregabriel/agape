import ReflectionItem, { type ReflectionItemProps } from "./reflection-item"

interface ReflectionsListProps {
  items: ReflectionItemProps[]
}

export default function ReflectionsList({ items }: ReflectionsListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma reflexão adicionada.</p>
  }
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ReflectionItem key={item.id} {...item} />
      ))}
    </div>
  )
}
