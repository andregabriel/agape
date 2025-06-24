"use client"

import { useState } from "react"
import HomeFilterHeader from "@/components/home/home-filter-header"
import MainBanner from "@/components/home/main-banner"
import QuickAccessIcons from "@/components/home/quick-access-icons"
import ChallengeBanner from "@/components/home/challenge-banner"
import HorizontalScrollSection from "@/components/home/horizontal-scroll-section"
import QuoteSection from "@/components/home/quote-section"
import type { AudioTrack } from "@/types"
import SingleCardFeature from "@/components/home/single-card-feature"
import ExploreCategoryCard from "@/components/home/explore-category-card"
import HorizontalGridScrollSection from "@/components/home/horizontal-grid-scroll-section"
import MagisteriumBanner from "@/components/home/magisterium-banner"
import FinalSection from "@/components/home/final-section"
import VerticalListItem from "@/components/home/vertical-list-item"

// --- DADOS (mantidos do arquivo original para consistência) ---
const corpusChristiItems: AudioTrack[] = [
  {
    id: "cc1",
    title: "Santo Ambrósio de Milão",
    subCategory: "Homilias Pai, Corpus Christi",
    duration: "7-15 min",
    imageUrl: "/images/home/03-corpus-christi.png",
    type: "audio",
  },
  {
    id: "cc2",
    title: "Amor de Deus na Euc...",
    subCategory: "Livro II, Capítulo 2",
    duration: "8-11 min",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
  },
  {
    id: "cc3",
    title: "Comunhão Espiritual",
    subCategory: "Padre Pio em italiano",
    duration: "1 min",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
  },
]
const highlightsItems: AudioTrack[] = [
  {
    id: "hl1",
    title: "Novena para Namo...",
    subCategory: "com Joaquim",
    type: "playlist",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=240&height=135",
  },
  {
    id: "hl2",
    title: "Novena para Casais",
    subCategory: "com Amanda e Marcel...",
    type: "playlist",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=240&height=135",
  },
]
const subscriberFavoritesItems: AudioTrack[] = [
  {
    id: "sf1",
    title: "Oração da Noite",
    subCategory: "Com Juliano Cazarré",
    duration: "8-9 min",
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "audio",
  },
  {
    id: "sf2",
    title: "Minuto de Inspiraç...",
    subCategory: "com Pe. Patrick Fernan...",
    duration: "3-6 min",
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "audio",
  },
]
const dailyWithGuestsItems: AudioTrack[] = [
  {
    id: "dg1",
    title: "Evangelho Diário",
    subCategory: "com Juliano Cazarré",
    duration: "5-30 min",
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "audio",
  },
  {
    id: "dg2",
    title: "Imitação Diária",
    subCategory: "com Juliano Cazarré",
    duration: "8-12 min",
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "audio",
  },
]
const exploreCategoriesItems = [
  {
    id: "ec1",
    title: "Lofi",
    description: "Música para relaxar ou focar",
    imageUrl: "/images/home/11-explore-categories.jpeg",
    link: "/category/lofi",
  },
  {
    id: "ec2",
    title: "Áudios da Bíblia",
    description: "Caminhe pela Palavra",
    imageUrl: "/placeholder.svg?width=280&height=373",
    link: "/category/biblia-audios",
  },
]
const nightRoutinesItems: AudioTrack[] = [
  {
    id: "nr1",
    title: "Oração da Noite",
    subCategory: "Com Juliano Cazarré",
    duration: "9 min",
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "audio",
    link: "/audio/oracao-noite-jc",
  },
  {
    id: "nr2",
    title: "Minuto Para Dormir",
    subCategory: "Orações Breves Para D...",
    itemCount: 18,
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "playlist",
    link: "/playlist/minuto-dormir",
  },
]
const bibleStoriesForSleepItems = [
  {
    id: "bs1",
    title: "A Vocação de Moisés",
    subtitle: "Ex 2-6,13",
    details: "26 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/vocacao-moises",
  },
  {
    id: "bs2",
    title: "Lázaro",
    subtitle: "André Leite: Jo 10, 22-12",
    details: "22 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/lazaro",
  },
]
const recentlyPlayedItems: AudioTrack[] = [
  {
    id: "rp1",
    title: "Terço Diário",
    subCategory: "Com os mistérios diários",
    itemCount: 7,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/playlist/terco-misterios",
  },
  {
    id: "rp2",
    title: "Imitação de Cristo",
    subCategory: "com Juliano Cazarré",
    duration: "10 min",
    type: "audio",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/audio/imitacao-cristo-jc",
  },
]
const musicForSleepItems: AudioTrack[] = [
  {
    id: "ms1",
    title: "Piano Para Dormir",
    subCategory: "Francesca LaRosa",
    itemCount: 16,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=240&height=135",
    link: "/playlist/piano-dormir-francesca",
  },
  {
    id: "ms2",
    title: "Cantos Gregorianos",
    subCategory: "Para meditar e dormir",
    itemCount: 19,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=240&height=135",
    link: "/playlist/gregoriano-dormir",
  },
]
const newTestamentItems = [
  {
    id: "nt1",
    title: "Evangelho de Mateus",
    subtitle: "Caminhe pela Vida de Jesus",
    details: "28 sessões",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/playlist/mateus",
  },
  {
    id: "nt2",
    title: "Evangelho de Marcos",
    subtitle: "Caminhe pela Vida de Jesus",
    details: "16 sessões",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/playlist/marcos",
  },
]
const musicItems: AudioTrack[] = [
  {
    id: "m1",
    title: "Tomé",
    subCategory: "Davidson Silva",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
    link: "/audio/tome",
  },
  {
    id: "m2",
    title: "Sacred Heart Lofi",
    subCategory: "Lofi católico",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
    link: "/audio/sacred-heart-lofi",
  },
]
const whereToStartItems = [
  {
    id: "ws1",
    title: "Introdutório",
    subtitle: "Comece com o básico",
    details: "9 sessões",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/playlist/introdutorio",
  },
  {
    id: "ws2",
    title: "Como Rezar",
    subtitle: "Conheça o Poder da Oração",
    details: "14 sessões",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/playlist/como-rezar",
  },
]
const thematicsItems: AudioTrack[] = [
  {
    id: "th1",
    title: "Paciência",
    subCategory: "Espere com Deus",
    itemCount: 6,
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "playlist",
    link: "/playlist/paciencia",
  },
  {
    id: "th2",
    title: "Perdão",
    subCategory: "Pai, perdoai-lhes",
    itemCount: 8,
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "playlist",
    link: "/playlist/perdao",
  },
]
const morningRoutinesGridItems = [
  {
    id: "mr1",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    details: "23-28 min",
    link: "/pre-player/terco-diario",
  },
  {
    id: "mr2",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Evangelho Diário",
    subtitle: "Lectio Divina Diária",
    details: "5-30 min",
    link: "/pre-player/evangelho-diario",
  },
]
const kidsPrayersGridItems = [
  {
    id: "kp1",
    title: "Intro: Crianças",
    subtitle: "Hallow Crianças",
    details: "5 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/intro-criancas",
  },
  {
    id: "kp2",
    title: "Orações em Família",
    subtitle: "Para rezar junto",
    details: "4 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/oracoes-familia",
  },
]
const novenasItems: AudioTrack[] = [
  {
    id: "nv1",
    title: "Novena de São José",
    subCategory: "São José, rogai por nós",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "playlist",
    link: "/playlist/novena-sao-jose",
  },
  {
    id: "nv_scj",
    title: "Sagrado Coração de Jesus",
    subCategory: "Eu confio em Vós",
    itemCount: 12,
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "playlist",
    link: "/playlist/novena-sagrado-coracao",
  },
]
// --- FIM DOS DADOS ---

// --- ESTRUTURA DE SEÇÕES E CATEGORIAS ---
// Lista de categorias na ordem desejada para os filtros
const orderedCategories = [
  "Sagrado Coração de Jesus",
  "Corpus Christi",
  "Frase",
  "Contra o vício",
  "Destaques", // Assuming "Destaques e Rotinas Matinais" refers to the "highlights" section
  "Rotinas Matinais",
  "Favoritas dos Assinantes",
  "Termine de Rezar",
  "Diárias com Convidados",
  "Reflita sobre o Evangelho",
  "Explore por Categorias",
  "Rotinas Noturnas",
  "Histórias Bíblicas para Dormir",
  "Rezadas Recentemente",
  "Músicas para Dormir",
  "Minuto de Homilia",
  "Novo Testamento",
  "Música",
  "Não sabe por onde começar",
  "Temáticas",
  "Magisterium",
  "Orações infantis",
  "Novenas",
]

const sections = [
  // These first two sections don't have a direct match in your 24 filter names.
  // They will only show if "Tudo" is selected, or if we assign them to one of the 24 categories.
  // For now, let's assign them to a placeholder category that won't match a filter.
  { id: "main-banner", category: "Banner Principal", component: <MainBanner /> },
  { id: "quick-access", category: "Acesso Rápido", component: <QuickAccessIcons /> },
  {
    id: "challenge-sacred-heart",
    category: "Sagrado Coração de Jesus", // Matched
    component: (
      <ChallengeBanner
        title="Sagrado Coração de Jesus"
        imageUrl="/images/home/02-sacred-heart.png"
        prayingCount="70,116 de 222,0K rezando"
        daysRemaining="12 dias restantes"
        category="Santos" // This inner 'category' prop of ChallengeBanner is for its display, not filtering
        primaryText="Sagrado Coração de Jesus"
        secondaryText="Dia 6: 14 de junho"
        link="/challenge/sagrado-coracao"
        themeColorClass="bg-red-900/70"
      />
    ),
  },
  {
    id: "corpus-christi",
    category: "Corpus Christi", // Matched
    component: <HorizontalScrollSection title="Corpus Christi" items={corpusChristiItems} />,
  },
  { id: "quote", category: "Frase", component: <QuoteSection /> }, // Matched
  {
    id: "challenge-vice",
    category: "Contra o vício", // Matched
    component: (
      <ChallengeBanner
        title="Contra o Vício"
        imageUrl="/images/home/05-against-vice.jpeg"
        prayingCount="1,949 de 5,0K rezando"
        daysRemaining="Termina Hoje"
        primaryText="Dia 8: Santa Mônica"
        secondaryText="Novena Contra o Vício"
        link="/challenge/contra-o-vicio"
        themeColorClass="bg-blue-900/70"
      />
    ),
  },
  {
    id: "highlights", // This corresponds to "Destaques e Rotinas Matinais" in user's list, using "Destaques" as filter
    category: "Destaques", // Matched
    component: (
      <HorizontalScrollSection
        title="Destaques"
        items={highlightsItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />
    ),
  },
  {
    id: "morning-routines",
    category: "Rotinas Matinais", // Matched
    component: <HorizontalGridScrollSection title="Rotinas Matinais" items={morningRoutinesGridItems} />,
  },
  {
    id: "subscriber-favorites",
    category: "Favoritas dos Assinantes", // Matched
    component: (
      <HorizontalScrollSection
        title="Favoritas dos Assinantes"
        items={subscriberFavoritesItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />
    ),
  },
  {
    id: "challenge-finish-praying",
    category: "Termine de Rezar", // Matched
    component: (
      <ChallengeBanner
        title="Termine de Rezar"
        imageUrl="/images/home/08-finish-praying.png"
        prayingCount="70,116 de 222,0K rezando"
        daysRemaining="12 dias restantes"
        category="Santos"
        primaryText="Sagrado Coração de Jesus"
        secondaryText="Dia 6: 14 de junho"
        link="/challenge/termine-de-rezar-sagrado-coracao"
        themeColorClass="bg-red-900/70"
      />
    ),
  },
  {
    id: "daily-with-guests",
    category: "Diárias com Convidados", // Matched
    component: (
      <HorizontalScrollSection
        title="Diárias com Convidados"
        items={dailyWithGuestsItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />
    ),
  },
  {
    id: "reflect-gospel",
    category: "Reflita sobre o Evangelho", // Matched
    component: (
      <SingleCardFeature
        sectionTitle="Reflita sobre o Evangelho"
        card={{
          imageUrl: "/images/home/10-reflect-gospel.jpeg",
          title: "Homilia Semanal",
          subtitle: "Pe. Pedro Willemsens",
          details: "114 sessões",
          link: "/homilia/semanal-pe-pedro",
        }}
      />
    ),
  },
  {
    id: "explore-categories",
    category: "Explore por Categorias", // Matched
    component: (
      <section className="py-6 md:py-8">
        <div className="container px-0 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4 px-4 md:px-0">Explore por Categoria</h2>
          <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
            {exploreCategoriesItems.map((item) => (
              <div key={item.id} className="flex-shrink-0 first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0">
                <ExploreCategoryCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "night-routines",
    category: "Rotinas Noturnas", // Matched
    component: (
      <HorizontalScrollSection
        title="Rotinas Noturnas"
        items={nightRoutinesItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />
    ),
  },
  {
    id: "bible-stories",
    category: "Histórias Bíblicas para Dormir", // Matched
    component: <HorizontalGridScrollSection title="Histórias Bíblicas Para Dormir" items={bibleStoriesForSleepItems} />,
  },
  {
    id: "recently-played",
    category: "Rezadas Recentemente", // Matched
    component: <HorizontalScrollSection title="Rezadas Recentemente >" items={recentlyPlayedItems} />,
  },
  {
    id: "music-sleep",
    category: "Músicas para Dormir", // Matched
    component: (
      <HorizontalScrollSection
        title="Músicas Para Dormir"
        items={musicForSleepItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />
    ),
  },
  {
    id: "homily-minute",
    category: "Minuto de Homilia", // Matched
    component: (
      <SingleCardFeature
        sectionTitle="Minuto de Homilia"
        card={{
          imageUrl: "/images/home/14-homily-minute.jpeg",
          title: "Minuto de Homilia",
          subtitle: "Com Pe. Sérgio Jeremias",
          details: "2 min",
          link: "/homilia/minuto-pe-sergio",
        }}
      />
    ),
  },
  {
    id: "new-testament",
    category: "Novo Testamento", // Matched
    component: (
      <section className="py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Novo Testamento</h2>
          <div className="space-y-3">
            {newTestamentItems.map((item) => (
              <VerticalListItem key={item.id} item={{ ...item, showMoreIcon: false }} />
            ))}
          </div>
        </div>
      </section>
    ),
  },
  { id: "music", category: "Música", component: <HorizontalScrollSection title="Música" items={musicItems} /> }, // Matched
  {
    id: "where-to-start",
    category: "Não sabe por onde começar", // Matched
    component: (
      <section className="py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Não sabe por onde começar?</h2>
          <div className="space-y-3">
            {whereToStartItems.map((item) => (
              <VerticalListItem key={item.id} item={{ ...item, showMoreIcon: false }} />
            ))}
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "thematics",
    category: "Temáticas", // Matched
    component: <HorizontalScrollSection title="Temáticas" items={thematicsItems} />,
  },
  { id: "magisterium", category: "Magisterium", component: <MagisteriumBanner /> }, // Matched
  {
    id: "kids-prayers",
    category: "Orações infantis", // Matched
    component: <HorizontalGridScrollSection title="Orações Infantis" items={kidsPrayersGridItems} />,
  },
  { id: "novenas", category: "Novenas", component: <HorizontalScrollSection title="Novenas" items={novenasItems} /> }, // Matched
  // The "FinalSection" doesn't have a direct match in your 24 filter names.
  // It will only show if "Tudo" is selected.
  { id: "final-section", category: "Seção Final", component: <FinalSection /> },
]

export default function NewHomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tudo")

  const filteredSections =
    selectedCategory === "Tudo" ? sections : sections.filter((section) => section.category === selectedCategory)

  return (
    <div className="bg-black text-white min-h-screen">
      <HomeFilterHeader
        categories={orderedCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main>
        {filteredSections.map((section) => (
          <div key={section.id}>{section.component}</div>
        ))}
      </main>

      {/* Espaço extra no final para não colar na BottomNav */}
      <div className="h-24"></div>
    </div>
  )
}
