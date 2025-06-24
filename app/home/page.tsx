"use client"

import { useState } from "react"

import MainBanner from "@/components/home/MainBanner"
import QuickAccessIcons from "@/components/home/QuickAccessIcons"
import SacredHeartBanner from "@/components/home/SacredHeartBanner"
import CorpusChristiSection from "@/components/home/CorpusChristiSection"
import QuoteSection from "@/components/home/QuoteSection"
import ChallengeBanner from "@/components/home/ChallengeBanner"
import SingleCardFeature from "@/components/home/SingleCardFeature"
import MorningRoutinesSection from "@/components/home/MorningRoutinesSection"
import HorizontalScrollSection from "@/components/shared/HorizontalScrollSection"
import GridSection from "@/components/shared/GridSection"
import ExploreCategoryCard from "@/components/home/ExploreCategoryCard"
import HorizontalGridScrollSection from "@/components/shared/HorizontalGridScrollSection"
import MagisteriumBanner from "@/components/home/MagisteriumBanner"
import FinalSection from "@/components/home/FinalSection"

const orderedCategories = ["Músicas", "Podcasts"]

const sections = [
  { id: "main-banner", category: "Destaques", component: <MainBanner /> },
  { id: "quick-access", category: "Destaques", component: <QuickAccessIcons /> },
  { id: "sacred-heart", category: "Podcasts", component: <SacredHeartBanner /> },
  { id: "corpus-christi", category: "Podcasts", component: <CorpusChristiSection /> },
  { id: "quote", category: "Podcasts", component: <QuoteSection /> },
  { id: "challenge", category: "Destaques", component: <ChallengeBanner /> },
  { id: "single-feature", category: "Destaques", component: <SingleCardFeature /> },
  { id: "morning-routines", category: "Podcasts", component: <MorningRoutinesSection /> },
  {
    id: "favorites",
    category: "Músicas",
    component: <HorizontalScrollSection title="Favoritos dos Assinantes" audios={[]} />,
  },
  {
    id: "daily-guests",
    category: "Podcasts",
    component: <GridSection title="Reze o terço diário com convidados" items={[]} />,
  },
  {
    id: "gospel",
    category: "Podcasts",
    component: <HorizontalScrollSection title="Reflita sobre o Evangelho do dia" audios={[]} />,
  },
  { id: "explore", category: "Destaques", component: <ExploreCategoryCard /> },
  {
    id: "night-routines",
    category: "Podcasts",
    component: <HorizontalGridScrollSection title="Rotinas noturnas" items={[]} />,
  },
  {
    id: "recently-played",
    category: "Músicas",
    component: <HorizontalScrollSection title="Ouvidos Recentemente" audios={[]} />,
  },
  { id: "homily", category: "Podcasts", component: <GridSection title="Homilia do Minuto" items={[]} /> },
  {
    id: "nt-music",
    category: "Músicas",
    component: <HorizontalGridScrollSection title="Música para o Novo Testamento" items={[]} />,
  },
  { id: "magisterium", category: "Podcasts", component: <MagisteriumBanner /> },
  { id: "thematics", category: "Podcasts", component: <GridSection title="Temáticas" items={[]} /> },
  { id: "kids", category: "Podcasts", component: <GridSection title="Para Crianças" items={[]} /> },
  { id: "final", category: "Destaques", component: <FinalSection /> },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(orderedCategories[0])

  const filteredSections = sections.filter((section) => section.category === selectedCategory)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Página Inicial</h1>

        <div>
          {orderedCategories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>

        <div>
          {filteredSections.map((section) => (
            <section key={section.id}>{section.component}</section>
          ))}
        </div>
      </div>
    </main>
  )
}
