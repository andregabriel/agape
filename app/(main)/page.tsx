"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  Play,
  Star,
  Download,
  CalendarDays,
  MoreHorizontal,
  Clock,
  Upload,
  ChevronRight,
  QrCode,
} from "lucide-react"

// --- Reusable Components for the Home Page ---

const HorizontalCard = ({
  id,
  imgSrc,
  title,
  subtitle,
  details,
}: {
  id: string
  imgSrc: string
  title: string
  subtitle: string
  details: string
}) => (
  <Link href={`/session/${id}`} className="flex-shrink-0 w-40">
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={title}
      width={160}
      height={100}
      className="rounded-lg object-cover h-24 w-full shadow"
    />
    <h4 className="font-semibold text-sm mt-1.5 truncate">{title}</h4>
    <p className="text-xs text-gray-600 truncate">{subtitle}</p>
    <p className="text-xs text-gray-500">{details}</p>
  </Link>
)

const VerticalListItem = ({
  id,
  imgSrc,
  title,
  subtitle,
  details,
  showMoreButton = true,
}: {
  id: string
  imgSrc: string
  title: string
  subtitle: string
  details: string
  showMoreButton?: boolean
}) => (
  <Link href={`/session/${id}`} className="flex items-center space-x-3 w-full">
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={title}
      width={56}
      height={56}
      className="rounded-lg object-cover h-14 w-14 flex-shrink-0"
    />
    <div className="flex-grow overflow-hidden">
      <h4 className="font-semibold text-sm truncate">{title}</h4>
      <p className="text-xs text-gray-600 truncate">{subtitle}</p>
      <p className="text-xs text-gray-500">{details}</p>
    </div>
    {showMoreButton && (
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          alert("More options clicked!")
        }}
        className="p-1 text-gray-500 flex-shrink-0"
      >
        <MoreHorizontal size={20} />
      </button>
    )}
  </Link>
)

const HorizontalSection = ({
  title,
  items,
  viewAllLink = false,
}: { title: string; items: any[]; viewAllLink?: boolean }) => (
  <section className="mb-8">
    <div className="flex justify-between items-center px-4 mb-3">
      <h3 className="text-xl font-bold">{title}</h3>
      {viewAllLink && (
        <Link href="#" className="text-sm font-semibold text-gray-600 flex items-center">
          Ver todos <ChevronRight size={16} className="ml-1" />
        </Link>
      )}
    </div>
    <div className="pl-4 flex overflow-x-auto space-x-3 pb-2 hide-scrollbar">
      {items.map((item) => (
        <HorizontalCard key={item.id} {...item} />
      ))}
      <div className="flex-shrink-0 w-1"></div>
    </div>
  </section>
)

const VerticalGridSection = ({
  title,
  items,
  showMoreButtonInItems = true,
}: {
  title: string
  items: any[]
  showMoreButtonInItems?: boolean
}) => (
  <section className="mb-8">
    <h3 className="text-xl font-bold px-4 mb-3">{title}</h3>
    <div className="pl-4 overflow-x-auto hide-scrollbar">
      <div className="grid grid-flow-col grid-rows-3 gap-x-4 gap-y-3 auto-cols-[calc(50%-0.5rem)] sm:auto-cols-[calc(50%-0.75rem)] pr-4">
        {items.map((item) => (
          <div key={item.id} className="w-full">
            <VerticalListItem {...item} showMoreButton={showMoreButtonInItems} />
          </div>
        ))}
      </div>
    </div>
  </section>
)

const FullWidthPostCard = ({
  id,
  sectionTitle,
  imgSrc,
  title,
  subtitle,
  details,
}: {
  id: string
  sectionTitle: string
  imgSrc: string
  title: string
  subtitle: string
  details: string
}) => (
  <section className="mb-8">
    <h3 className="text-xl font-bold px-4 mb-3">{sectionTitle}</h3>
    <Link href={`/session/${id}`} className="block px-4">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full object-cover"
        />
        <div className="p-3 bg-white">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-gray-700">{subtitle}</p>
          <p className="text-sm text-gray-500 mt-1">{details}</p>
        </div>
      </div>
    </Link>
  </section>
)

const FullWidthBannerCard = ({
  id,
  sectionTitle,
  imgSrc,
  title,
  subtitle,
  topTagLeft,
  topTagRight,
}: {
  id: string
  sectionTitle: string
  imgSrc: string
  title: string
  subtitle: string
  topTagLeft: string
  topTagRight: string
}) => (
  <section className="mb-8">
    <h3 className="text-xl font-bold px-4 mb-3">{sectionTitle}</h3>
    <Link href={`/session/${id}`} className="block px-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg group h-56">
        <Image src={imgSrc || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 p-3 flex flex-col">
          <div className="flex justify-between text-white text-xs mb-auto">
            <span className="bg-black/50 px-2 py-0.5 rounded-full">{topTagLeft}</span>
            <span className="bg-black/50 px-2 py-0.5 rounded-full">{topTagRight}</span>
          </div>
          <div className="mt-auto flex justify-between items-end">
            <div>
              <h4 className="text-white text-lg font-bold">{title}</h4>
              <p className="text-white text-sm opacity-90">{subtitle}</p>
            </div>
            <button className="bg-white/30 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/50 transition-colors">
              <Play size={20} className="text-white fill-white ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  </section>
)

// --- Data (Replace with actual UUIDs from your DB) ---
const destaquesItems = [
  {
    id: "uuid-destaque-1",
    imgSrc: "/images/home/highlights-novena-namoro.jpeg",
    title: "Novena para Namo...",
    subtitle: "com Joaquim",
    details: "9 sessões",
  },
  {
    id: "uuid-destaque-2",
    imgSrc: "/images/home/highlights-novena-casais.jpeg",
    title: "Novena para Casais",
    subtitle: "com Amanda e Marcel...",
    details: "9 sessões",
  },
  {
    id: "uuid-destaque-3",
    imgSrc: "/images/home/highlights-novena-placeholder.png",
    title: "Novena Exemplo",
    subtitle: "com Santo Exemplo",
    details: "10 sessões",
  },
]
const rotinasMatinaisItems = [
  {
    id: "uuid-rotina-1",
    imgSrc: "/images/home/routine-terco.jpeg",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    details: "23-28 min",
  },
  {
    id: "uuid-rotina-2",
    imgSrc: "/images/home/routine-evangelho.jpeg",
    title: "Evangelho Diário",
    subtitle: "Lectio Divina Diária",
    details: "5-30 min",
  },
  {
    id: "uuid-rotina-3",
    imgSrc: "/images/home/routine-homilia-sergio.jpeg",
    title: "Minuto de Homilia",
    subtitle: "Com Pe. Sérgio Jeremias",
    details: "2 min",
  },
  {
    id: "uuid-rotina-4",
    imgSrc: "/prayer-book.png",
    title: "Oração da Manhã",
    subtitle: "Comece o dia com Deus",
    details: "10 min",
  },
  {
    id: "uuid-rotina-5",
    imgSrc: "/sunrise-cross.png",
    title: "Meditação Matinal",
    subtitle: "Foco e Paz",
    details: "15 min",
  },
  {
    id: "uuid-rotina-6",
    imgSrc: "/bible-study-group.png",
    title: "Estudo Bíblico",
    subtitle: "Palavra do Dia",
    details: "20 min",
  },
]
const favoritasAssinantesItems = [
  {
    id: "uuid-favorita-1",
    imgSrc: "/images/home/subscribers-oracao-noite.jpeg",
    title: "Oração da Noite",
    subtitle: "Com Juliano Cazarré",
    details: "8-9 min",
  },
  {
    id: "uuid-favorita-2",
    imgSrc: "/images/home/subscribers-inspiracao-patrick.jpeg",
    title: "Minuto de Inspiraç...",
    subtitle: "com Pe. Patrick Fernan...",
    details: "3-6 min",
  },
  {
    id: "uuid-favorita-3",
    imgSrc: "/images/home/subscribers-placeholder.png",
    title: "Salmo 23",
    subtitle: "Reflexão e Oração",
    details: "4-8 min",
  },
]
const diariasConvidadosItems = [
  {
    id: "uuid-diaria-1",
    imgSrc: "/images/home/daily-evangelho-cazarre.jpeg",
    title: "Evangelho Diário",
    subtitle: "com Juliano Cazarré",
    details: "5-30 min",
  },
  {
    id: "uuid-diaria-2",
    imgSrc: "/images/home/daily-imitacao-cazarre.jpeg",
    title: "Imitação Diária",
    subtitle: "com Juliano Cazarré",
    details: "8-12 min",
  },
  {
    id: "uuid-diaria-3",
    imgSrc: "/images/home/daily-placeholder.png",
    title: "Terço com Convidado",
    subtitle: "Participação Especial",
    details: "24 min",
  },
]
const exploreCategoriaItems = [
  {
    id: "uuid-explore-1",
    imgSrc: "/images/home/explore-lofi.jpeg",
    title: "Lofi",
    subtitle: "Música para relaxar ou focar",
    details: "",
  },
  {
    id: "uuid-explore-2",
    imgSrc: "/images/home/explore-audio.jpeg",
    title: "Áudio Bíblia",
    subtitle: "Caminho pela Palavra",
    details: "",
  },
]
const rotinasNoturnasItems = [
  {
    id: "uuid-noturna-1",
    imgSrc: "/images/home/night-routine-oracao.jpeg",
    title: "Oração da Noite",
    subtitle: "Com Juliano Cazarré",
    details: "9 min",
  },
  {
    id: "uuid-noturna-2",
    imgSrc: "/images/home/night-routine-minuto.jpeg",
    title: "Minuto Para Dormir",
    subtitle: "Orações Breves Para D...",
    details: "18 sessões",
  },
  {
    id: "uuid-noturna-3",
    imgSrc: "/images/home/night-routine-placeholder.png",
    title: "Paz Interior",
    subtitle: "Meditação Guiada",
    details: "16 min",
  },
]
const historiasBiblicasItems = [
  {
    id: "uuid-historia-1",
    imgSrc: "/images/home/bible-stories-moises.jpeg",
    title: "A Vocação de Moisés",
    subtitle: "Ex 2-6,13",
    details: "26 min",
  },
  {
    id: "uuid-historia-2",
    imgSrc: "/images/home/bible-stories-lazaro.jpeg",
    title: "Lázaro",
    subtitle: "André Leite: Jo 10, 22-12",
    details: "22 min",
  },
  {
    id: "uuid-historia-3",
    imgSrc: "/images/home/bible-stories-jerico.jpeg",
    title: "O Cerco de Jericó",
    subtitle: "Js 3-6",
    details: "22 min",
  },
  {
    id: "uuid-historia-4",
    imgSrc: "/david-goliath.png",
    title: "Davi e Golias",
    subtitle: "1 Sm 17",
    details: "20 min",
  },
  {
    id: "uuid-historia-5",
    imgSrc: "/jonah-whale.png",
    title: "Jonas e a Baleia",
    subtitle: "Jn 1-2",
    details: "18 min",
  },
  {
    id: "uuid-historia-6",
    imgSrc: "/daniel-in-lions-den.png",
    title: "Daniel na Cova dos Leões",
    subtitle: "Dn 6",
    details: "24 min",
  },
]
const rezadasRecentementeItems = [
  {
    id: "uuid-recente-1",
    imgSrc: "/images/home/recent-terco-diario.jpeg",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    details: "7 sessões",
  },
  {
    id: "uuid-recente-2",
    imgSrc: "/images/home/recent-terco-myrian.jpeg",
    title: "Terço Diário",
    subtitle: "com Myrian Rios",
    details: "7 sessões",
  },
  {
    id: "uuid-recente-3",
    imgSrc: "/images/home/recent-placeholder.png",
    title: "Imitação de Cristo",
    subtitle: "com Juliano Cazarré",
    details: "100 sessões",
  },
]
const musicasDormirItems = [
  {
    id: "uuid-dormir-1",
    imgSrc: "/images/home/sleep-music-piano-larosa.jpeg",
    title: "Piano Para Dormir",
    subtitle: "Francesca LaRosa",
    details: "16 sessões",
  },
  {
    id: "uuid-dormir-2",
    imgSrc: "/images/home/sleep-music-piano-wester.jpeg",
    title: "Piano Relaxante",
    subtitle: "Simon Wester",
    details: "12 sessões",
  },
  {
    id: "uuid-dormir-3",
    imgSrc: "/images/home/sleep-music-placeholder.png",
    title: "Canções de Ninar",
    subtitle: "Melodias Suaves",
    details: "19 sessões",
  },
]
const novoTestamentoItems = [
  {
    id: "uuid-nt-1",
    imgSrc: "/images/home/nt-mateus.jpeg",
    title: "Evangelho de Mateus",
    subtitle: "Caminhe pela Vida de Jesus",
    details: "28 sessões",
  },
  {
    id: "uuid-nt-2",
    imgSrc: "/images/home/nt-marcos.jpeg",
    title: "Evangelho de Marcos",
    subtitle: "Caminhe pela Vida de Jesus",
    details: "16 sessões",
  },
  {
    id: "uuid-nt-3",
    imgSrc: "/images/home/nt-lucas.jpeg",
    title: "Evangelho de Lucas",
    subtitle: "Caminhe pela Vida de Jesus",
    details: "24 sessões",
  },
  {
    id: "uuid-nt-4",
    imgSrc: "/placeholder.svg",
    title: "Evangelho de João",
    subtitle: "Caminhe pela Vida de Jesus",
    details: "21 sessões",
  },
  {
    id: "uuid-nt-5",
    imgSrc: "/placeholder.svg",
    title: "Atos dos Apóstolos",
    subtitle: "O início da Igreja",
    details: "28 sessões",
  },
  {
    id: "uuid-nt-6",
    imgSrc: "/placeholder.svg",
    title: "Apocalipse",
    subtitle: "As revelações finais",
    details: "22 sessões",
  },
]
const musicaItems = [
  {
    id: "uuid-musica-1",
    imgSrc: "/images/home/music-tome.jpeg",
    title: "Tomé",
    subtitle: "Davidson Silva",
    details: "12 sessões",
  },
  {
    id: "uuid-musica-2",
    imgSrc: "/images/home/music-sacred-heart-lofi.jpeg",
    title: "Sacred Heart Lofi",
    subtitle: "Lofi católico",
    details: "20 sessões",
  },
  {
    id: "uuid-musica-3",
    imgSrc: "/images/home/music-placeholder.png",
    title: "#1 Playlist",
    subtitle: "Playlist de Oração",
    details: "9 sessões",
  },
]
const porOndeComecarItems = [
  {
    id: "uuid-comecar-1",
    imgSrc: "/images/home/start-introductorio.jpeg",
    title: "Introdutório",
    subtitle: "Comece com o básico",
    details: "9 sessões",
  },
  {
    id: "uuid-comecar-2",
    imgSrc: "/images/home/start-oferecimento.jpeg",
    title: "Oferecimento do Dia",
    subtitle: "Comece seu dia",
    details: "1 sessão",
  },
  {
    id: "uuid-comecar-3",
    imgSrc: "/images/home/start-como-rezar.jpeg",
    title: "Como Rezar",
    subtitle: "Conheça o Poder da Oração",
    details: "14 sessões",
  },
  {
    id: "uuid-comecar-4",
    imgSrc: "/placeholder.svg",
    title: "Fundamentos da Fé",
    subtitle: "Pilares da crença",
    details: "7 sessões",
  },
  {
    id: "uuid-comecar-5",
    imgSrc: "/placeholder.svg",
    title: "Crescimento Espiritual",
    subtitle: "Jornada de fé",
    details: "12 sessões",
  },
  {
    id: "uuid-comecar-6",
    imgSrc: "/placeholder.svg",
    title: "Oração Comunitária",
    subtitle: "Unidos em oração",
    details: "5 sessões",
  },
]
const tematicasItems = [
  {
    id: "uuid-tematica-1",
    imgSrc: "/images/home/new/tematicas-paciencia.png",
    title: "Paciência",
    subtitle: "Espere com Deus",
    details: "6 sessões",
  },
  {
    id: "uuid-tematica-2",
    imgSrc: "/images/home/new/tematicas-perdao.png",
    title: "Perdão",
    subtitle: "Pai, perdoai-lhes",
    details: "8 sessões",
  },
  {
    id: "uuid-tematica-3",
    imgSrc: "/images/home/new/tematicas-gratidao.png",
    title: "Gratidão",
    subtitle: "Sede gratos",
    details: "6 sessões",
  },
]
const oracoesInfantisItems = [
  {
    id: "uuid-infantil-1",
    imgSrc: "/images/home/new/oracoes-infantis-intro.png",
    title: "Intro: Crianças",
    subtitle: "Hallow Crianças",
    details: "5 sessões",
  },
  {
    id: "uuid-infantil-2",
    imgSrc: "/images/home/new/oracoes-familia.png",
    title: "Orações em Família",
    subtitle: "Para rezar junto",
    details: "4 sessões",
  },
  {
    id: "uuid-infantil-3",
    imgSrc: "/images/home/new/oracoes-dormir.png",
    title: "Orações Para Dormir",
    subtitle: "Hallow Crianças",
    details: "7 sessões",
  },
]
const novenasItems = [
  {
    id: "uuid-novena-1",
    imgSrc: "/images/home/new/novena-sao-jose.png",
    title: "Novena de São José",
    subtitle: "São José, rogai por nós",
    details: "10 sessões",
  },
  {
    id: "uuid-novena-2",
    imgSrc: "/images/home/new/novena-nossa-senhora.png",
    title: "Novena de Nossa S...",
    subtitle: "Reze à Nossa Senhora ...",
    details: "9 sessões",
  },
  {
    id: "uuid-novena-3",
    imgSrc: "/images/home/highlights-novena-placeholder.png",
    title: "Novena das Rosas",
    subtitle: "Santa Teresinha",
    details: "9 sessões",
  },
]
const convidadosInglesItems = [
  {
    id: "uuid-ingles-1",
    imgSrc: "/images/home/new/guest-roumie.png",
    title: "Jonathan Roumie",
    subtitle: "The Chosen",
    details: "23 sessões",
  },
  {
    id: "uuid-ingles-2",
    imgSrc: "/images/home/new/guest-schmitz.png",
    title: "Fr. Mike Schmitz",
    subtitle: "Catechism in a Year",
    details: "15 sessões",
  },
  {
    id: "uuid-ingles-3",
    imgSrc: "/images/home/new/guest-bishops.png",
    title: "US Bishops",
    subtitle: "USCCB",
    details: "5 sessões",
  },
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Início</h1>
        <button className="p-2 cursor-pointer">
          <Bell size={24} />
        </button>
      </header>

      {/* Hero Section */}
      <Link href="/session/uuid-hero-terco" className="block px-4 mb-6">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/placeholder-pr4vx.png"
            alt="Terço Diário"
            width={400}
            height={250}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white rounded-full p-3 shadow-md">
                <Play size={32} className="text-black fill-black ml-1" />
              </button>
            </div>
            <span className="bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded mb-1 w-fit">Terço</span>
            <h2 className="text-white text-xl font-bold">Terço Diário - Sábado</h2>
            <p className="text-white text-sm">Mistérios Gozosos</p>
          </div>
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="pl-4 flex overflow-x-auto space-x-3 my-6 pb-2 hide-scrollbar">
        <Link href="#" className="flex-shrink-0 w-28 flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow">
          <Star size={24} className="text-gray-700 mb-1" />
          <span className="text-xs text-gray-700 font-medium">Favoritos</span>
        </Link>
        <Link href="#" className="flex-shrink-0 w-28 flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow">
          <Download size={24} className="text-gray-700 mb-1" />
          <span className="text-xs text-gray-700 font-medium">Downloads</span>
        </Link>
        <Link href="#" className="flex-shrink-0 w-28 flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow">
          <CalendarDays size={24} className="text-gray-700 mb-1" />
          <span className="text-xs text-gray-700 font-medium">Rotina</span>
        </Link>
        <Link href="#" className="flex-shrink-0 w-28 flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow mr-4">
          <Clock size={24} className="text-gray-700 mb-1" />
          <span className="text-xs text-gray-700 font-medium">Recentes</span>
        </Link>
      </div>

      {/* Frase São Boaventura */}
      <section className="text-center px-4 py-6 mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SÃO BOAVENTURA</p>
        <p className="text-xl font-serif text-gray-800 mb-3">
          "Toda criatura é uma palavra divina porque proclama Deus".
        </p>
        <button className="text-gray-500 hover:text-gray-700 mb-6">
          <Upload size={20} />
        </button>
      </section>

      <HorizontalSection title="Destaques" items={destaquesItems} />
      <VerticalGridSection title="Rotinas Matinais" items={rotinasMatinaisItems} showMoreButtonInItems={true} />
      <HorizontalSection title="Favoritas dos Assinantes" items={favoritasAssinantesItems} />

      {/* Nova Seção "Contra o Vício" */}
      <FullWidthBannerCard
        id="uuid-contra-vicio-nova"
        sectionTitle="Contra o Vício"
        imgSrc="/images/home/new/banner-contra-vicio.jpeg"
        title="Dia 8: Santa Mônica"
        subtitle="Novena Contra o Vício"
        topTagLeft="1,949 de 5,0K rezando"
        topTagRight="Evento Encerrado"
      />

      <HorizontalSection title="Diárias com Convidados" items={diariasConvidadosItems} />

      {/* Nova Seção "Reflita sobre o Evangelho" */}
      <FullWidthPostCard
        id="uuid-reflita-evangelho-nova"
        sectionTitle="Reflita sobre o Evangelho"
        imgSrc="/images/home/new/card-reflita-evangelho-2.jpeg"
        title="Homilia Semanal"
        subtitle="Pe. Pedro Willemsens"
        details="114 sessões"
      />

      <HorizontalSection
        title="Explore por Categoria"
        items={exploreCategoriaItems.map((item) => ({ ...item, large: true }))}
      />
      <HorizontalSection title="Rotinas Noturnas" items={rotinasNoturnasItems} />
      <VerticalGridSection
        title="Histórias Bíblicas Para Dormir"
        items={historiasBiblicasItems}
        showMoreButtonInItems={true}
      />
      <HorizontalSection title="Rezadas Recentemente" items={rezadasRecentementeItems} viewAllLink={false} />
      <HorizontalSection title="Músicas Para Dormir" items={musicasDormirItems} />

      {/* Nova Seção "Minuto de Homilia" */}
      <FullWidthPostCard
        id="uuid-minuto-homilia-nova"
        sectionTitle="Minuto de Homilia"
        imgSrc="/images/home/new/card-minuto-homilia-2.jpeg"
        title="Minuto de Homilia"
        subtitle="Com Pe. Sérgio Jeremias"
        details="2 min"
      />

      <VerticalGridSection title="Novo Testamento" items={novoTestamentoItems} showMoreButtonInItems={false} />
      <HorizontalSection title="Música" items={musicaItems} />
      <VerticalGridSection
        title="Não sabe por onde começar?"
        items={porOndeComecarItems}
        showMoreButtonInItems={false}
      />
      <HorizontalSection title="Temáticas" items={tematicasItems} />

      {/* Magisterium IA */}
      <section className="mb-8 px-4">
        <h3 className="text-xl font-bold mb-3">Magisterium IA</h3>
        <Link href="#" className="block bg-[#333132] text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 border-l-2 border-t-2 border-yellow-400 transform rotate-45"></div>
            <span className="font-bold text-sm tracking-widest">MAGISTERIUM</span>
          </div>
          <p className="text-lg font-semibold mb-2">
            Olá, eu sou o Magisterium AI. Faça-me perguntas sobre a fé e os ensinamentos da Igreja!
          </p>
          <span className="text-sm font-semibold flex items-center">
            Experimente <ChevronRight size={16} className="ml-1" />
          </span>
        </Link>
      </section>

      {/* Orações Infantis */}
      <section className="mb-8 px-4">
        <h3 className="text-xl font-bold mb-3">Orações Infantis</h3>
        <div className="space-y-4">
          {oracoesInfantisItems.map((item) => (
            <VerticalListItem key={item.id} {...item} showMoreButton={false} />
          ))}
        </div>
      </section>

      <HorizontalSection title="Novenas" items={novenasItems} />
      <HorizontalSection title="Convidados em Inglês" items={convidadosInglesItems} />

      {/* Seção Final */}
      <section className="text-center px-4 py-8">
        <h2 className="text-4xl font-bold tracking-tight">992,285,955</h2>
        <p className="text-gray-600 mb-4">Orações Rezadas com o Hallow</p>
        <div className="flex justify-center space-x-8 mb-6">
          <button className="flex items-center space-x-2 font-semibold">
            <Upload size={20} />
            <span>Compartilhar</span>
          </button>
          <button className="flex items-center space-x-2 font-semibold">
            <QrCode size={20} />
            <span>Código</span>
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
          <Image
            src="/images/home/new/presente-hallow.png"
            alt="Presente Hallow"
            width={100}
            height={80}
            className="mb-3"
          />
          <p className="mb-4">Incentive outras pessoas a rezar dando a elas acesso ao Hallow.</p>
          <button className="bg-black text-white font-semibold py-3 px-6 rounded-full flex items-center space-x-2">
            <div className="w-5 h-5 bg-white text-black rounded flex items-center justify-center font-bold text-xs">
              🎁
            </div>
            <span>Presente Hallow</span>
          </button>
        </div>
      </section>

      <div className="h-4"></div>
    </div>
  )
}
