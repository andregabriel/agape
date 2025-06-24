"use client" // Adicionando 'use client' para interatividade futura

import ProfileHeader from "@/components/eu/profile-header"
import StreakSection from "@/components/eu/streak-section"
import RoutineSection from "@/components/eu/routine-section"
import HorizontalContentScroll from "@/components/shared/horizontal-content-scroll" // Componente compartilhado
import TitledSection from "@/components/shared/titled-section"
import IntentionsList from "@/components/eu/intentions-list"
import ReflectionsList from "@/components/eu/reflections-list"
import type { ContentCardItemProps } from "@/components/shared/content-thumbnail-card" // Tipo compartilhado
import type { IntentionItemProps } from "@/components/eu/intention-item"
import type { ReflectionItemProps } from "@/components/eu/reflection-item"

// Placeholder data
const userData = {
  name: "André",
  fullName: "André Gabriel",
  avatarUrl: "/placeholder.svg?width=48&height=48",
}

const streakData = {
  count: 0,
  message: "Reze hoje e construa um hábito de oração!",
}

const routineData = {
  time: "05:00 PM",
  title: "Terço Diário - Sábado",
  subtitle: "Mistérios Gozosos",
  imageUrl: "/placeholder.svg?width=400&height=200",
  link: "/audio/terco-diario-sabado",
}

const recentlyPlayedItems: ContentCardItemProps[] = [
  {
    id: "rp1",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    details: "7 sessões",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/playlist/terco-misterios",
  },
  {
    id: "rp2",
    title: "Terço Diário",
    subtitle: "com Myrian Rios",
    details: "7 sessões",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/playlist/terco-myrian",
  },
  {
    id: "rp3",
    title: "Imitação de Cristo",
    subtitle: "com Juliano Cazarré",
    details: "100 sessões", // Corrigido da imagem
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/audio/imitacao-cristo-jc",
  },
]

const favoriteItems: ContentCardItemProps[] = [
  {
    id: "fav1",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    details: "1 sessão",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/playlist/terco-favorito",
  },
]

const downloadedItems: ContentCardItemProps[] = [
  {
    id: "dl1",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    details: "1 sessão",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/download/terco-diario",
  },
]

const intentions: IntentionItemProps[] = [
  { id: "int1", text: "Intenção", date: "June 14, 2025", link: "/intencao/int1" },
  { id: "int2", text: "Encontrar Paz", date: "June 10, 2025", link: "/intencao/int2" },
  { id: "int3", text: "sdafasdfasdfasdfasd", date: "May 22, 2025", link: "/intencao/int3" },
]

const reflections: ReflectionItemProps[] = [
  {
    id: "ref1",
    text: "Onde publica?",
    date: "June 10, 2025",
    imageUrl: "/placeholder.svg?width=40&height=40",
    link: "/reflexao/ref1",
  },
]

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ProfileHeader
        name={userData.name}
        fullName={userData.fullName}
        avatarUrl={userData.avatarUrl}
        onSettingsClick={() => console.log("Settings clicked")}
      />
      <main className="flex-grow overflow-y-auto pb-20 space-y-6">
        <StreakSection
          count={streakData.count}
          message={streakData.message}
          onViewDetails={() => console.log("View streak details")}
        />
        <RoutineSection
          routineTime={routineData.time}
          title={routineData.title}
          subtitle={routineData.subtitle}
          imageUrl={routineData.imageUrl}
          link={routineData.link}
          onViewDetails={() => console.log("View routine details")}
        />
        <HorizontalContentScroll
          title="Rezadas Recentemente"
          items={recentlyPlayedItems}
          showViewMore
          onViewMore={() => console.log("View more recently played")}
        />
        <HorizontalContentScroll
          title="Favoritos"
          items={favoriteItems}
          showViewMore
          onViewMore={() => console.log("View more favorites")}
        />
        <HorizontalContentScroll
          title="Downloads"
          items={downloadedItems}
          showViewMore
          onViewMore={() => console.log("View more downloads")}
        />
        <TitledSection title="Intenções" showViewMore onActionClick={() => console.log("Add new intention")}>
          <IntentionsList items={intentions} />
        </TitledSection>
        <TitledSection title="Reflexões" showViewMore onActionClick={() => console.log("Add new reflection")}>
          <ReflectionsList items={reflections} />
        </TitledSection>
      </main>
    </div>
  )
}
