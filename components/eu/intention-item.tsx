import Link from "next/link"

export interface IntentionItemProps {
  id: string
  text: string
  date: string
  link: string
}

export default function IntentionItem({ id, text, date, link }: IntentionItemProps) {
  return (
    <Link href={link} className="block p-3 bg-card rounded-lg shadow-sm hover:bg-muted transition-colors">
      <p className="text-sm font-medium text-foreground truncate">{text}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </Link>
  )
}
