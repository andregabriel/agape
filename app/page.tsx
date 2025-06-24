import HomeHeader from "@/components/home/home-header"
import MainBanner from "@/components/home/main-banner"
import QuickAccessIcons from "@/components/home/quick-access-icons"
import ChallengeBanner from "@/components/home/challenge-banner"
import HorizontalScrollSection from "@/components/home/horizontal-scroll-section"
import QuoteSection from "@/components/home/quote-section"
// import MorningRoutinesSection from "@/components/home/morning-routines-section"; // Será substituído
import type { AudioTrack } from "@/types"
import SingleCardFeature from "@/components/home/single-card-feature"
import ExploreCategoryCard from "@/components/home/explore-category-card"
import HorizontalGridScrollSection from "@/components/home/horizontal-grid-scroll-section"
import MagisteriumBanner from "@/components/home/magisterium-banner"
// import GridSection from "@/components/home/grid-section"; // Será substituído por HorizontalGridScrollSection para Orações Infantis
import FinalSection from "@/components/home/final-section"
import VerticalListItem from "@/components/home/vertical-list-item"

// Placeholder data for sections (mantendo os dados existentes e adicionando/ajustando para as seções modificadas)
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
  {
    id: "bs3",
    title: "O Cerco de Jericó",
    subtitle: "Js 3-6",
    details: "22 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/cerco-jerico",
  },
  {
    id: "bs4",
    title: "Daniel na Cova dos Leões",
    subtitle: "Dn 6",
    details: "18 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/daniel-leoes",
  },
  {
    id: "bs5",
    title: "Jonas e o Grande Peixe",
    subtitle: "Jn 1-2",
    details: "15 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/jonas",
  },
  {
    id: "bs6",
    title: "A Rainha Ester",
    subtitle: "Et 4-7",
    details: "25 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/rainha-ester",
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

// Dados para Rotinas Matinais, adaptados para HorizontalGridScrollSection
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
  {
    id: "mr3",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Minuto de Homilia",
    subtitle: "Com Pe. Sérgio Jeremias",
    details: "2 min",
    link: "/pre-player/minuto-homilia",
  },
  {
    id: "mr4",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Oração da Manhã",
    subtitle: "Comece bem o seu dia",
    details: "5 min",
    link: "/pre-player/oracao-manha",
  },
  {
    id: "mr5",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Café com Deus Pai",
    subtitle: "Reflexão diária",
    details: "7 min",
    link: "/pre-player/cafe-deus-pai",
  },
  {
    id: "mr6",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Santo do Dia",
    subtitle: "Inspiração e exemplo",
    details: "4 min",
    link: "/pre-player/santo-do-dia",
  },
]

// Dados para Orações Infantis, adaptados para HorizontalGridScrollSection
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
  {
    id: "kp3",
    title: "Orações Para Dormir",
    subtitle: "Recarregar esta página", // Exemplo da imagem
    details: "7 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/oracoes-dormir-criancas",
  },
  {
    id: "kp4",
    title: "A Ovelha Perdida",
    subtitle: "História do Hallow Crianças",
    details: "23 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/ovelha-perdida",
  },
  {
    id: "kp5",
    title: "Meu Diário com Deus",
    subtitle: "Escrita Espiritual. Para Crianças",
    details: "15 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/diario-deus-criancas",
  },
  {
    id: "kp6",
    title: "Intro: Adolescentes",
    subtitle: "Hallow Crianças",
    details: "8 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/intro-adolescentes",
  },
  {
    id: "kp7",
    title: "Intro: Jovens",
    subtitle: "Hallow Jovens",
    details: "6 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/intro-jovens",
  },
  {
    id: "kp8",
    title: "Que Santo É Este?",
    subtitle: "Hallow Crianças",
    details: "15 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/que-santo-e-este",
  },
  {
    id: "kp9",
    title: "Preparação para a Confissão",
    subtitle: "Hallow Crianças",
    details: "15 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/preparacao-confissao-criancas",
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
  // ... mais novenas
  {
    id: "nv_scj",
    title: "Sagrado Coração de Jesus",
    subCategory: "Eu confio em Vós",
    itemCount: 12, // Exemplo da imagem
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "playlist",
    link: "/playlist/novena-sagrado-coracao",
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
    title: "Terço Diário",
    subCategory: "com Myrian Rios",
    itemCount: 7,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/playlist/terco-myrian",
  },
  {
    id: "rp3",
    title: "Imitação de Cristo",
    subCategory: "com Juliano Cazarré",
    duration: "10 min",
    type: "audio",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/audio/imitacao-cristo-jc",
  },
  {
    id: "rp4",
    title: "Evangelho do Dia",
    subCategory: "Lectio Divina",
    duration: "12 min",
    type: "audio",
    imageUrl: "/placeholder.svg?width=160&height=160",
    link: "/audio/evangelho-dia",
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
    title: "Piano Relaxante",
    subCategory: "Simon Wester",
    itemCount: 12,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=240&height=135",
    link: "/playlist/piano-relaxante-simon",
  },
  {
    id: "ms3",
    title: "Cantos Gregorianos",
    subCategory: "Para meditar e dormir",
    itemCount: 19,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=240&height=135",
    link: "/playlist/gregoriano-dormir",
  },
  {
    id: "ms4",
    title: "Música Ambiente Calma",
    subCategory: "Sons da natureza",
    itemCount: 22,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=240&height=135",
    link: "/playlist/ambiente-calma",
  },
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
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />

      {/* Seção Rotinas Matinais MODIFICADA */}
      <HorizontalGridScrollSection title="Rotinas Matinais" items={morningRoutinesGridItems} />

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

      {/* Seção Histórias Bíblicas Para Dormir MODIFICADA */}
      <HorizontalGridScrollSection title="Histórias Bíblicas Para Dormir" items={bibleStoriesForSleepItems} />

      {/* NOVA SEÇÃO: Rezadas Recentemente */}
      <HorizontalScrollSection title="Rezadas Recentemente >" items={recentlyPlayedItems} />

      {/* NOVA SEÇÃO: Músicas Para Dormir */}
      <HorizontalScrollSection
        title="Músicas Para Dormir"
        items={musicForSleepItems}
        itemWidthClass="w-60 md:w-72"
        aspectRatioClass="aspect-video"
      />

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

      {/* Seção Orações Infantis MODIFICADA */}
      <HorizontalGridScrollSection title="Orações Infantis" items={kidsPrayersGridItems} />

      <HorizontalScrollSection title="Novenas" items={novenasItems} />

      {/* NOVA SEÇÃO FINAL */}
      <FinalSection />

      {/* Espaço extra no final para não colar na BottomNav */}
      <div className="h-8 md:h-12"></div>
    </div>
  )
}
