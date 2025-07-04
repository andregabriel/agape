import CategoryCard from "./category-card" // Vamos reutilizar o CategoryCard modificado

interface CategoryItem {
  id: string
  title: string
  imageUrl: string
  link: string
}

interface VerticalCategoryGridProps {
  title: string
  items: CategoryItem[]
}

export default function VerticalCategoryGrid({ title, items }: VerticalCategoryGridProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-3 gap-3">
        {" "}
        {/* Define 3 colunas e um espaçamento entre os cards */}
        {items.map((item) => (
          <CategoryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
