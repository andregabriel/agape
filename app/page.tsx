// Conteúdo anterior de app/page.tsx foi removido para dar lugar à nova Tela de Início.
// Os componentes SacredHeartBanner e CorpusChristiSection originais não são usados aqui
// para evitar conflito e seguir a instrução de recriar baseado nas novas imagens.
// Se eles fossem idênticos, poderiam ser reutilizados.

import HomeHeader from "@/components/home/home-header"
import MainBanner from "@/components/home/main-banner"
import QuickAccessIcons from "@/components/home/quick-access-icons"
import ChallengeBanner from "@/components/home/challenge-banner"
import HorizontalScrollSection from "@/components/home/horizontal-scroll-section"
import QuoteSection from "@/components/home/quote-section"
import MorningRoutinesSection from "@/components/home/morning-routines-section"
import type { AudioTrack } from "@/types" // Reutilizando o tipo
import SingleCardFeature from "@/components/home/single-card-feature"
import ExploreCategoryCard from "@/components/home/explore-category-card"
import VerticalListItem from "@/components/home/vertical-list-item"
import MagisteriumBanner from "@/components/home/magisterium-banner"
import GridSection from "@/components/home/grid-section"

// Placeholder data for sections
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
  {
    id: "cc4",
    title: "Hora Santa",
    subCategory: "Uma hora com Jesus",
    type: "playlist",
    itemCount: 7,
    imageUrl: "/placeholder.svg?width=160&height=160",
  },
  {
    id: "cc5",
    title: "Comunhão Espiritual",
    subCategory: "Minha alma suspira por Vós",
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
  {
    id: "hl3",
    title: "Novena para Filhos",
    subCategory: "com Maria",
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
  {
    id: "sf3",
    title: "Santo do Dia",
    subCategory: "Crer com a Igreja",
    duration: "4-8 min",
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
  {
    id: "dg3",
    title: "Terço Mariano",
    subCategory: "com Família",
    duration: "24 min",
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "playlist",
    itemCount: 5,
  },
]

// Placeholder data for NEW sections
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
  {
    id: "ec3",
    title: "Meditação",
    description: "Encontre paz e silêncio",
    imageUrl: "/placeholder.svg?width=280&height=373",
    link: "/category/meditacao",
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
  {
    id: "nr3",
    title: "Pílulas de Sabedoria",
    subCategory: "Francisco Faus",
    duration: "16 min",
    imageUrl: "/placeholder.svg?width=240&height=135",
    type: "audio",
    link: "/audio/pilulas-sabedoria",
  },
]

const bibleStoriesForSleepItems = [
  {
    id: "bs1",
    title: "A Vocação de Moisés",
    subtitle: "Ex 2-6,13",
    details: "26 min",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/audio/vocacao-moises",
  },
  {
    id: "bs2",
    title: "Lázaro",
    subtitle: "André Leite: Jo 10, 22-12",
    details: "22 min",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/audio/lazaro",
  },
  {
    id: "bs3",
    title: "O Cerco de Jericó",
    subtitle: "Js 3-6",
    details: "22 min",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/audio/cerco-jerico",
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
  {
    id: "nt3",
    title: "Evangelho de Lucas",
    subtitle: "Caminhe pela Vida de Jesus",
    details: "24 sessões",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/playlist/lucas",
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
  {
    id: "m3",
    title: "#1 Playlist Lofi",
    subCategory: "Para rezar e estudar",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "playlist",
    itemCount: 10,
    link: "/playlist/lofi-1",
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
    title: "Oferecimento do Dia",
    subtitle: "Comece seu dia",
    details: "1 sessão",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/audio/oferecimento-dia",
  },
  {
    id: "ws3",
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
  // ... mais itens temáticos
]

const kidsPrayersItems = [
  {
    id: "kp1",
    title: "Intro: Crianças",
    subtitle: "Hallow Crianças",
    details: "5 sessões",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/playlist/intro-criancas",
  },
  {
    id: "kp2",
    title: "Orações em Família",
    subtitle: "Para rezar junto",
    details: "4 sessões",
    imageUrl: "/placeholder.svg?width=64&height=64",
    link: "/playlist/oracoes-familia",
  },
  // ... mais orações infantis
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
  // ... mais novenas
]

export default function NewHomePage() {
  return (
    <div className="bg-background">
      <HomeHeader />
      <MainBanner />
      <QuickAccessIcons />

      <ChallengeBanner
        title="Sagrado Coração de Jesus"
        imageUrl="/images/home/02-sacred-heart.png"
        prayingCount="70,116 de 222,0K rezando"
        daysRemaining="12 dias restantes"
        category="Santos"
        primaryText="Sagrado Coração de Jesus"
        secondaryText="Dia 6: 14 de junho"
        link="/challenge/sagrado-coracao"
        themeColorClass="bg-red-900/70"
      />

      <HorizontalScrollSection title="Corpus Christi" items={corpusChristiItems} />

      <QuoteSection />

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

      <HorizontalScrollSection
        title="Destaques"
        items={highlightsItems}
        itemWidthClass="w-60 md:w-72" // Wider thumbnails
        aspectRatioClass="aspect-video" // For rectangular images
      />

      <MorningRoutinesSection />

      <HorizontalScrollSection
        title="Favoritas dos Assinantes"
        items={subscriberFavoritesItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />

      {/* A imagem "8 Termine de Rezar.png" é muito similar à "Sagrado Coração de Jesus".
        Pode ser uma variação ou uma seção diferente com o mesmo estilo.
        Assumindo que é uma seção separada por enquanto: */}
      <ChallengeBanner
        title="Termine de Rezar"
        imageUrl="/images/home/08-finish-praying.png" // Usando a imagem específica
        prayingCount="70,116 de 222,0K rezando" // Dados da imagem, podem ser diferentes
        daysRemaining="12 dias restantes"
        category="Santos"
        primaryText="Sagrado Coração de Jesus" // Texto da imagem
        secondaryText="Dia 6: 14 de junho"
        link="/challenge/termine-de-rezar-sagrado-coracao"
        themeColorClass="bg-red-900/70"
      />

      <HorizontalScrollSection
        title="Diárias com Convidados"
        items={dailyWithGuestsItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />

      {/* NOVAS SEÇÕES ADICIONADAS ABAIXO */}
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

      <HorizontalScrollSection
        title="Rotinas Noturnas"
        items={nightRoutinesItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />

      <section className="py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Histórias Bíblicas Para Dormir</h2>
          <div className="space-y-3">
            {bibleStoriesForSleepItems.map((item) => (
              <VerticalListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

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

      <HorizontalScrollSection title="Música" items={musicItems} />

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

      <HorizontalScrollSection title="Temáticas" items={thematicsItems} />
      <MagisteriumBanner />
      <GridSection title="Orações Infantis" items={kidsPrayersItems} />
      <HorizontalScrollSection title="Novenas" items={novenasItems} />

      {/* Espaço extra no final para não colar na BottomNav */}
      <div className="h-8 md:h-12"></div>
    </div>
  )
}
