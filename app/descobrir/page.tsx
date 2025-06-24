import DiscoverHeader from "@/components/discover/discover-header"
import FeaturedBanner from "@/components/discover/featured-banner"
// import CategoryScrollSection from "@/components/discover/category-scroll-section"; // Não mais usado aqui
import VerticalCategoryGrid from "@/components/discover/vertical-category-grid" // Novo componente

// Dados do banner principal (mantidos)
const featuredBannerData = {
  imageUrl: "/images/discover/pope-leo-xiv-banner.jpg",
  title: "Papa Leão XIV",
  subtitle: "Reze pelo novo Papa",
  details: "7 sessões",
  link: "/playlist/papa-leao-xiv",
}

// Lista completa de categorias recomendadas (mantida)
const recommendedCategoriesData = [
  { id: "pascoa", title: "Páscoa", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/pascoa" },
  { id: "diarias", title: "Diárias", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/diarias" },
  { id: "dormir", title: "Dormir", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/dormir" },
  { id: "musica", title: "Música", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/musica" },
  {
    id: "novo-no-hallow",
    title: "Novo no Hallow",
    imageUrl: "/placeholder.svg?width=300&height=200",
    link: "/category/novo-no-hallow",
  },
  { id: "minutos", title: "Minutos", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/minutos" },
  { id: "desafios", title: "Desafios", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/desafios" },
  {
    id: "desafios-comunitarios",
    title: "Desafios Comunitários",
    imageUrl: "/placeholder.svg?width=300&height=200",
    link: "/category/desafios-comunitarios",
  },
  {
    id: "convidados",
    title: "Convidados",
    imageUrl: "/placeholder.svg?width=300&height=200",
    link: "/category/convidados",
  },
  { id: "biblia", title: "Bíblia", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/biblia" },
  { id: "novenas", title: "Novenas", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/novenas" },
  {
    id: "ladainhas",
    title: "Ladainhas",
    imageUrl: "/placeholder.svg?width=300&height=200",
    link: "/category/ladainhas",
  },
  {
    id: "tematicas",
    title: "Temáticas",
    imageUrl: "/placeholder.svg?width=300&height=200",
    link: "/category/tematicas",
  },
  { id: "infantis", title: "Infantis", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/infantis" },
  {
    id: "consagracoes",
    title: "Consagrações",
    imageUrl: "/placeholder.svg?width=300&height=200",
    link: "/category/consagracoes",
  },
  { id: "english", title: "English", imageUrl: "/placeholder.svg?width=300&height=200", link: "/category/english" },
]

export default function DiscoverPage() {
  return (
    <div className="bg-background min-h-screen">
      <DiscoverHeader />
      <div className="p-4 space-y-8">
        <FeaturedBanner item={featuredBannerData} />
        {/* Usando o novo VerticalCategoryGrid aqui */}
        <VerticalCategoryGrid title="Categorias Recomendadas" items={recommendedCategoriesData} />
        {/* Adicionar mais seções aqui conforme as imagens completas da tela Descobrir */}
      </div>
    </div>
  )
}
