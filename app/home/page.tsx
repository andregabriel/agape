"use client"

import { useState } from "react"
// Importando o novo HomeHeader que inclui avatar e filtros
import HomeHeader from "@/components/home/home-header"
import HamburgerMenu from "@/components/home/hamburger-menu"
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
import SpotifyCarousel from "@/components/home/spotify-carousel"

// --- DADOS (Expandidos para atender aos mínimos) ---
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
    title: "Amor de Deus na Eucaristia",
    subCategory: "Livro II, Capítulo 2",
    duration: "8-11 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
  },
  {
    id: "cc3",
    title: "Comunhão Espiritual",
    subCategory: "Padre Pio em italiano",
    duration: "1 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
  },
  {
    id: "cc4",
    title: "Adoração ao Santíssimo",
    subCategory: "Cantos e Orações",
    duration: "60 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    itemCount: 10,
  },
]
const highlightsItems: AudioTrack[] = [
  {
    id: "hl1",
    title: "Novena para Namorados",
    subCategory: "com Joaquim e Ana",
    type: "playlist",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=300&height=400",
  },
  {
    id: "hl2",
    title: "Novena para Casais",
    subCategory: "com Amanda e Marcelo",
    type: "playlist",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=300&height=400",
  },
  {
    id: "hl3",
    title: "Novena para Filhos",
    subCategory: "com Maria e José",
    type: "playlist",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=300&height=400",
  },
]
const subscriberFavoritesItems: AudioTrack[] = [
  {
    id: "sf1",
    title: "Oração da Noite Completa",
    subCategory: "Com Juliano Cazarré",
    duration: "8-9 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
  },
  {
    id: "sf2",
    title: "Minuto de Inspiração Divina",
    subCategory: "com Pe. Patrick Fernandes",
    duration: "3-6 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
  },
  {
    id: "sf3",
    title: "Santo do Dia: Reflexões",
    subCategory: "Crer com a Igreja",
    duration: "4-8 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
  },
]
const dailyWithGuestsItems: AudioTrack[] = [
  {
    id: "dg1",
    title: "Evangelho Diário Comentado",
    subCategory: "com Juliano Cazarré",
    duration: "5-30 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
  },
  {
    id: "dg2",
    title: "Imitação Diária de Cristo",
    subCategory: "com Juliano Cazarré",
    duration: "8-12 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
  },
  {
    id: "dg3",
    title: "Terço Mariano em Família",
    subCategory: "com Família Lima",
    duration: "24 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    itemCount: 5,
  },
]
const nightRoutinesItems: AudioTrack[] = [
  {
    id: "nr1",
    title: "Oração da Noite para Dormir",
    subCategory: "Com Juliano Cazarré",
    duration: "9 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
    link: "/audio/oracao-noite-jc",
  },
  {
    id: "nr2",
    title: "Minuto Para Dormir em Paz",
    subCategory: "Orações Breves Para Descansar",
    itemCount: 18,
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    link: "/playlist/minuto-dormir",
  },
  {
    id: "nr3",
    title: "Pílulas de Sabedoria Noturna",
    subCategory: "Francisco Faus",
    duration: "16 min",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
    link: "/audio/pilulas-sabedoria",
  },
]
const recentlyPlayedItems: AudioTrack[] = [
  {
    id: "rp1",
    title: "Terço Diário Meditado",
    subCategory: "Com os mistérios do dia",
    itemCount: 7,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=300&height=400",
    link: "/playlist/terco-misterios",
  },
  {
    id: "rp2",
    title: "Imitação de Cristo (Áudio)",
    subCategory: "com Juliano Cazarré",
    duration: "10 min",
    type: "audio",
    imageUrl: "/placeholder.svg?width=300&height=400",
    link: "/audio/imitacao-cristo-jc",
  },
  {
    id: "rp3",
    title: "Evangelho do Dia (Lectio)",
    subCategory: "Lectio Divina",
    duration: "12 min",
    type: "audio",
    imageUrl: "/placeholder.svg?width=300&height=400",
    link: "/audio/evangelho-dia",
  },
]
const musicForSleepItems: AudioTrack[] = [
  {
    id: "ms1",
    title: "Piano Para Dormir e Sonhar",
    subCategory: "Francesca LaRosa",
    itemCount: 16,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=300&height=400",
    link: "/playlist/piano-dormir-francesca",
  },
  {
    id: "ms2",
    title: "Piano Relaxante Divino",
    subCategory: "Simon Wester",
    itemCount: 12,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=300&height=400",
    link: "/playlist/piano-relaxante-simon",
  },
  {
    id: "ms3",
    title: "Cantos Gregorianos Celestiais",
    subCategory: "Para meditar e dormir profundamente",
    itemCount: 19,
    type: "playlist",
    imageUrl: "/placeholder.svg?width=300&height=400",
    link: "/playlist/gregoriano-dormir",
  },
]
const musicItems: AudioTrack[] = [
  {
    id: "m1",
    title: "Tomé (Ao Vivo)",
    subCategory: "Davidson Silva",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
    link: "/audio/tome",
  },
  {
    id: "m2",
    title: "Sacred Heart Lofi Beats",
    subCategory: "Lofi católico para oração",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "audio",
    link: "/audio/sacred-heart-lofi",
  },
  {
    id: "m3",
    title: "#1 Playlist Lofi Cristã",
    subCategory: "Para rezar, estudar e meditar",
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    itemCount: 10,
    link: "/playlist/lofi-1",
  },
]
const thematicsItems: AudioTrack[] = [
  {
    id: "th1",
    title: "Paciência Divina",
    subCategory: "Espere com Deus e confie",
    itemCount: 6,
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    link: "/playlist/paciencia",
  },
  {
    id: "th2",
    title: "Perdão e Misericórdia",
    subCategory: "Pai, perdoai-lhes, não sabem o que fazem",
    itemCount: 8,
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    link: "/playlist/perdao",
  },
  {
    id: "th3",
    title: "Esperança Cristã",
    subCategory: "A virtude que nos move",
    itemCount: 7,
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    link: "/playlist/esperanca",
  },
]
const novenasItems: AudioTrack[] = [
  {
    id: "nv1",
    title: "Novena de São José Operário",
    subCategory: "São José, rogai por nós e nossas famílias",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    link: "/playlist/novena-sao-jose",
  },
  {
    id: "nv_scj",
    title: "Novena ao Sagrado Coração de Jesus",
    subCategory: "Eu confio em Vós, Senhor",
    itemCount: 12,
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    link: "/playlist/novena-sagrado-coracao",
  },
  {
    id: "nv_smp",
    title: "Novena a Santa Maria Pura",
    subCategory: "Mãe admirável",
    itemCount: 9,
    imageUrl: "/placeholder.svg?width=300&height=400",
    type: "playlist",
    link: "/playlist/novena-santamariapura",
  },
]

// Dados para seções de 3 linhas (mínimo 6 itens)
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
    title: "Lázaro, Vem Para Fora",
    subtitle: "André Leite: Jo 10, 22-12",
    details: "22 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/lazaro",
  },
  {
    id: "bs3",
    title: "A Anunciação",
    subtitle: "Lc 1, 26-38",
    details: "15 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/anunciacao",
  },
  {
    id: "bs4",
    title: "O Filho Pródigo",
    subtitle: "Lc 15, 11-32",
    details: "18 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/filho-prodigo",
  },
  {
    id: "bs5",
    title: "Jonas e a Baleia",
    subtitle: "Livro de Jonas",
    details: "20 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/jonas",
  },
  {
    id: "bs6",
    title: "Daniel na Cova dos Leões",
    subtitle: "Dn 6",
    details: "22 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/daniel-leoes",
  },
]
const newTestamentItems = [
  {
    id: "nt1",
    title: "Evangelho de São Mateus",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    details: "28 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/mateus",
  },
  {
    id: "nt2",
    title: "Evangelho de São Marcos",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    details: "16 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/marcos",
  },
  {
    id: "nt3",
    title: "Evangelho de São Lucas",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    details: "24 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/lucas",
  },
  {
    id: "nt4",
    title: "Evangelho de São João",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    details: "21 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/joao",
  },
  {
    id: "nt5",
    title: "Atos dos Apóstolos",
    subtitle: "O início da Igreja",
    details: "28 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/atos",
  },
  {
    id: "nt6",
    title: "Apocalipse",
    subtitle: "Revelações de São João",
    details: "22 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/apocalipse",
  },
]
const whereToStartItems = [
  {
    id: "ws1",
    title: "Introdutório à Fé",
    subtitle: "Comece com o básico da doutrina",
    details: "9 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/introdutorio",
  },
  {
    id: "ws2",
    title: "Como Rezar o Terço",
    subtitle: "Conheça o Poder da Oração Mariana",
    details: "14 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/como-rezar",
  },
  {
    id: "ws3",
    title: "Lectio Divina: Guia",
    subtitle: "Meditação da Palavra de Deus",
    details: "7 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/lectio-divina-guia",
  },
  {
    id: "ws4",
    title: "O Credo Explicado",
    subtitle: "Entenda os artigos da nossa fé",
    details: "12 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/credo-explicado",
  },
  {
    id: "ws5",
    title: "Os Sacramentos",
    subtitle: "Sinais visíveis da graça invisível",
    details: "7 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/sacramentos",
  },
  {
    id: "ws6",
    title: "Vida dos Santos",
    subtitle: "Exemplos de fé e virtude",
    details: "20 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/vida-santos",
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
  {
    id: "mr3",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Oferecimento da Manhã",
    subtitle: "Consagre seu dia a Deus",
    details: "2 min",
    link: "/pre-player/oferecimento-manha",
  },
  {
    id: "mr4",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Desafio de Meditação",
    subtitle: "7 dias para uma mente serena",
    details: "7 sessões",
    link: "/playlist/desafio-meditacao",
  },
  {
    id: "mr5",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Diário de Gratidão",
    subtitle: "Reflexões matinais",
    details: "5 min",
    link: "/pre-player/diario-gratidao",
  },
  {
    id: "mr6",
    imageUrl: "/placeholder.svg?width=100&height=100",
    title: "Santo do Dia",
    subtitle: "Inspiração para sua jornada",
    details: "3 min",
    link: "/pre-player/santo-do-dia",
  },
]
const kidsPrayersGridItems = [
  {
    id: "kp1",
    title: "Intro: Crianças na Fé",
    subtitle: "Agape Crianças",
    details: "5 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/intro-criancas",
  },
  {
    id: "kp2",
    title: "Orações em Família Unida",
    subtitle: "Para rezar junto com seus filhos",
    details: "4 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/oracoes-familia",
  },
  {
    id: "kp3",
    title: "Anjinho da Guarda",
    subtitle: "Oração para crianças",
    details: "1 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/anjo-da-guarda",
  },
  {
    id: "kp4",
    title: "Histórias Bíblicas Infantis",
    subtitle: "Aventuras da Bíblia para os pequenos",
    details: "10 sessões",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/historias-biblicas-infantis",
  },
  {
    id: "kp5",
    title: "Músicas Católicas Infantis",
    subtitle: "Cante e louve com alegria",
    details: "15 músicas",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/playlist/musicas-catolicas-infantis",
  },
  {
    id: "kp6",
    title: "Boa Noite, Jesus",
    subtitle: "Oração antes de dormir",
    details: "2 min",
    imageUrl: "/placeholder.svg?width=100&height=100",
    link: "/audio/boa-noite-jesus",
  },
]

// Dados não modificados explicitamente, mas podem precisar de mais itens se tiverem menos de 3
const exploreCategoriesItems = [
  {
    id: "ec1",
    title: "Lofi Católico",
    description: "Música para relaxar ou focar na fé",
    imageUrl: "/images/home/11-explore-categories.jpeg",
    link: "/category/lofi",
  },
  {
    id: "ec2",
    title: "Áudios da Bíblia Sagrada",
    description: "Caminhe pela Palavra de Deus",
    imageUrl: "/placeholder.svg?width=280&height=373",
    link: "/category/biblia-audios",
  },
  {
    id: "ec3",
    title: "Meditações Guiadas",
    description: "Encontre paz interior",
    imageUrl: "/placeholder.svg?width=280&height=373",
    link: "/category/meditacoes",
  },
]

// Spotify Carousel Data for each category
const terçoDiarioItems = [
  { id: "td1", title: "Terço dos Mistérios Gozosos", subtitle: "Contemplando a alegria de Maria", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-gozosos" },
  { id: "td2", title: "Terço dos Mistérios Dolorosos", subtitle: "Contemplando a Paixão de Cristo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-dolorosos" },
  { id: "td3", title: "Terço dos Mistérios Gloriosos", subtitle: "Contemplando a Ressurreição", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-gloriosos" },
  { id: "td4", title: "Terço dos Mistérios Luminosos", subtitle: "Contemplando a vida pública de Jesus", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-luminosos" },
  { id: "td5", title: "Terço Cantado", subtitle: "Ave Maria em melodia celestial", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-cantado" },
  { id: "td6", title: "Terço em Família", subtitle: "Rezando unidos em Cristo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-familia" },
]

const corpusChristiCarouselItems = [
  { id: "cc1", title: "Santo Ambrósio de Milão", subtitle: "Homilias Pai, Corpus Christi", imageUrl: "/images/home/03-corpus-christi.png", link: "/audio/santo-ambrosio" },
  { id: "cc2", title: "Amor de Deus na Eucaristia", subtitle: "Livro II, Capítulo 2", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/amor-eucaristia" },
  { id: "cc3", title: "Comunhão Espiritual", subtitle: "Padre Pio em italiano", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/comunhao-espiritual" },
  { id: "cc4", title: "Adoração ao Santíssimo", subtitle: "Cantos e Orações", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/adoracao-santissimo" },
  { id: "cc5", title: "Hinos Eucarísticos", subtitle: "Louvores ao Corpo de Cristo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/hinos-eucaristicos" },
  { id: "cc6", title: "Meditações sobre a Eucaristia", subtitle: "Reflexões contemplativas", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/meditacoes-eucaristia" },
]

const destaquesCarouselItems = [
  { id: "dest1", title: "Novena para Namorados", subtitle: "com Joaquim e Ana", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-namorados" },
  { id: "dest2", title: "Novena para Casais", subtitle: "com Amanda e Marcelo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-casais" },
  { id: "dest3", title: "Novena para Filhos", subtitle: "com Maria e José", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-filhos" },
  { id: "dest4", title: "Orações pela Família", subtitle: "Proteção e bênçãos familiares", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/oracoes-familia" },
  { id: "dest5", title: "Santo do Dia", subtitle: "Inspiração diária dos santos", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/santo-dia" },
  { id: "dest6", title: "Palavra de Fé", subtitle: "Mensagens de esperança", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/palavra-fe" },
]

const rotinasMatinaisCarouselItems = [
  { id: "rm1", title: "Terço Diário", subtitle: "Com os mistérios diários", imageUrl: "/placeholder.svg?width=300&height=300", link: "/pre-player/terco-diario" },
  { id: "rm2", title: "Evangelho Diário", subtitle: "Lectio Divina Diária", imageUrl: "/placeholder.svg?width=300&height=300", link: "/pre-player/evangelho-diario" },
  { id: "rm3", title: "Oferecimento da Manhã", subtitle: "Consagre seu dia a Deus", imageUrl: "/placeholder.svg?width=300&height=300", link: "/pre-player/oferecimento-manha" },
  { id: "rm4", title: "Desafio de Meditação", subtitle: "7 dias para uma mente serena", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/desafio-meditacao" },
  { id: "rm5", title: "Diário de Gratidão", subtitle: "Reflexões matinais", imageUrl: "/placeholder.svg?width=300&height=300", link: "/pre-player/diario-gratidao" },
  { id: "rm6", title: "Santo do Dia", subtitle: "Inspiração para sua jornada", imageUrl: "/placeholder.svg?width=300&height=300", link: "/pre-player/santo-do-dia" },
]

const favoritasAssinantesCarouselItems = [
  { id: "fa1", title: "Oração da Noite Completa", subtitle: "Com Juliano Cazarré", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/oracao-noite-completa" },
  { id: "fa2", title: "Minuto de Inspiração Divina", subtitle: "com Pe. Patrick Fernandes", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/inspiracao-divina" },
  { id: "fa3", title: "Santo do Dia: Reflexões", subtitle: "Crer com a Igreja", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/santo-reflexoes" },
  { id: "fa4", title: "Palavra de Vida", subtitle: "Mensagens inspiradoras", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/palavra-vida" },
  { id: "fa5", title: "Orações Poderosas", subtitle: "Para momentos especiais", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/oracoes-poderosas" },
  { id: "fa6", title: "Cânticos Marianos", subtitle: "Louvores à Nossa Senhora", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/canticos-marianos" },
]

const diariasConvidadosCarouselItems = [
  { id: "dc1", title: "Evangelho Diário Comentado", subtitle: "com Juliano Cazarré", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/evangelho-comentado" },
  { id: "dc2", title: "Imitação Diária de Cristo", subtitle: "com Juliano Cazarré", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/imitacao-cristo" },
  { id: "dc3", title: "Terço Mariano em Família", subtitle: "com Família Lima", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-familia-lima" },
  { id: "dc4", title: "Reflexões da Manhã", subtitle: "com Padre João", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/reflexoes-manha" },
  { id: "dc5", title: "Palavra do Pastor", subtitle: "Mensagens semanais", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/palavra-pastor" },
  { id: "dc6", title: "Testemunhos de Fé", subtitle: "Histórias reais de conversão", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/testemunhos-fe" },
]

const reflitaEvangelhoCarouselItems = [
  { id: "re1", title: "Homilia Semanal", subtitle: "Pe. Pedro Willemsens", imageUrl: "/images/home/10-reflect-gospel.jpeg", link: "/homilia/semanal-pe-pedro" },
  { id: "re2", title: "Lectio Divina Guiada", subtitle: "Meditação profunda da Palavra", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/lectio-divina" },
  { id: "re3", title: "Evangelho Contemplativo", subtitle: "Orando com as Escrituras", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/evangelho-contemplativo" },
  { id: "re4", title: "Parábolas Explicadas", subtitle: "Entendendo os ensinamentos de Jesus", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/parabolas-explicadas" },
  { id: "re5", title: "Sermões Dominicais", subtitle: "Reflexões para o domingo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/sermoes-dominicais" },
  { id: "re6", title: "Palavra e Vida", subtitle: "Aplicando o Evangelho no cotidiano", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/palavra-vida-cotidiano" },
]

const exploreCategoriasCarouselItems = [
  { id: "ec1", title: "Lofi Católico", subtitle: "Música para relaxar ou focar na fé", imageUrl: "/images/home/11-explore-categories.jpeg", link: "/category/lofi" },
  { id: "ec2", title: "Áudios da Bíblia Sagrada", subtitle: "Caminhe pela Palavra de Deus", imageUrl: "/placeholder.svg?width=300&height=300", link: "/category/biblia-audios" },
  { id: "ec3", title: "Meditações Guiadas", subtitle: "Encontre paz interior", imageUrl: "/placeholder.svg?width=300&height=300", link: "/category/meditacoes" },
  { id: "ec4", title: "Orações Católicas", subtitle: "Tradição e devoção", imageUrl: "/placeholder.svg?width=300&height=300", link: "/category/oracoes-catolicas" },
  { id: "ec5", title: "Música Sacra", subtitle: "Cantos litúrgicos e hinos", imageUrl: "/placeholder.svg?width=300&height=300", link: "/category/musica-sacra" },
  { id: "ec6", title: "Espiritualidade", subtitle: "Crescimento na fé", imageUrl: "/placeholder.svg?width=300&height=300", link: "/category/espiritualidade" },
]

const rotinasNoturnasCarouselItems = [
  { id: "rn1", title: "Oração da Noite para Dormir", subtitle: "Com Juliano Cazarré", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/oracao-noite-jc" },
  { id: "rn2", title: "Minuto Para Dormir em Paz", subtitle: "Orações Breves Para Descansar", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/minuto-dormir" },
  { id: "rn3", title: "Pílulas de Sabedoria Noturna", subtitle: "Francisco Faus", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/pilulas-sabedoria" },
  { id: "rn4", title: "Exame de Consciência", subtitle: "Reflexão antes do descanso", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/exame-consciencia" },
  { id: "rn5", title: "Orações para o Sono", subtitle: "Paz e proteção noturna", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/oracoes-sono" },
  { id: "rn6", title: "Cânticos Contemplativos", subtitle: "Melodias para relaxar", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/canticos-contemplativos" },
]

const historiasBiblicasCarouselItems = [
  { id: "hb1", title: "A Vocação de Moisés", subtitle: "Ex 2-6,13", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/vocacao-moises" },
  { id: "hb2", title: "Lázaro, Vem Para Fora", subtitle: "André Leite: Jo 10, 22-12", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/lazaro" },
  { id: "hb3", title: "A Anunciação", subtitle: "Lc 1, 26-38", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/anunciacao" },
  { id: "hb4", title: "O Filho Pródigo", subtitle: "Lc 15, 11-32", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/filho-prodigo" },
  { id: "hb5", title: "Jonas e a Baleia", subtitle: "Livro de Jonas", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/jonas" },
  { id: "hb6", title: "Daniel na Cova dos Leões", subtitle: "Dn 6", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/daniel-leoes" },
]

const rezadasRecentementeCarouselItems = [
  { id: "rr1", title: "Terço Diário Meditado", subtitle: "Com os mistérios do dia", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/terco-misterios" },
  { id: "rr2", title: "Imitação de Cristo (Áudio)", subtitle: "com Juliano Cazarré", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/imitacao-cristo-jc" },
  { id: "rr3", title: "Evangelho do Dia (Lectio)", subtitle: "Lectio Divina", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/evangelho-dia" },
  { id: "rr4", title: "Novena São José", subtitle: "Protetor das famílias", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-sao-jose" },
  { id: "rr5", title: "Ave Maria Cantada", subtitle: "Louvores marianos", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/ave-maria-cantada" },
  { id: "rr6", title: "Oração do Angelus", subtitle: "Três vezes ao dia", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/angelus" },
]

const musicasDormirCarouselItems = [
  { id: "md1", title: "Piano Para Dormir e Sonhar", subtitle: "Francesca LaRosa", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/piano-dormir-francesca" },
  { id: "md2", title: "Piano Relaxante Divino", subtitle: "Simon Wester", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/piano-relaxante-simon" },
  { id: "md3", title: "Cantos Gregorianos Celestiais", subtitle: "Para meditar e dormir profundamente", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/gregoriano-dormir" },
  { id: "md4", title: "Harpa Celestial", subtitle: "Melodias angelicais", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/harpa-celestial" },
  { id: "md5", title: "Sons da Natureza", subtitle: "Criação divina em harmonia", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/sons-natureza" },
  { id: "md6", title: "Instrumentais Sagrados", subtitle: "Música contemplativa", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/instrumentais-sagrados" },
]

const minutoHomiliaCarouselItems = [
  { id: "mh1", title: "Minuto de Homilia", subtitle: "Com Pe. Sérgio Jeremias", imageUrl: "/images/home/14-homily-minute.jpeg", link: "/homilia/minuto-pe-sergio" },
  { id: "mh2", title: "Reflexão Diária", subtitle: "Palavras que transformam", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/reflexao-diaria" },
  { id: "mh3", title: "Pensamento do Dia", subtitle: "Inspiração em 60 segundos", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/pensamento-dia" },
  { id: "mh4", title: "Palavra de Encorajamento", subtitle: "Força para continuar", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/palavra-encorajamento" },
  { id: "mh5", title: "Minuto de Paz", subtitle: "Tranquilidade para a alma", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/minuto-paz" },
  { id: "mh6", title: "Reflexão Pastoral", subtitle: "Orientação espiritual", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/reflexao-pastoral" },
]

const novoTestamentoCarouselItems = [
  { id: "nt1", title: "Evangelho de São Mateus", subtitle: "Caminhe pela Vida de Jesus Cristo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/mateus" },
  { id: "nt2", title: "Evangelho de São Marcos", subtitle: "Caminhe pela Vida de Jesus Cristo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/marcos" },
  { id: "nt3", title: "Evangelho de São Lucas", subtitle: "Caminhe pela Vida de Jesus Cristo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/lucas" },
  { id: "nt4", title: "Evangelho de São João", subtitle: "Caminhe pela Vida de Jesus Cristo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/joao" },
  { id: "nt5", title: "Atos dos Apóstolos", subtitle: "O início da Igreja", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/atos" },
  { id: "nt6", title: "Apocalipse", subtitle: "Revelações de São João", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/apocalipse" },
]

const musicaCarouselItems = [
  { id: "mus1", title: "Tomé (Ao Vivo)", subtitle: "Davidson Silva", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/tome" },
  { id: "mus2", title: "Sacred Heart Lofi Beats", subtitle: "Lofi católico para oração", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/sacred-heart-lofi" },
  { id: "mus3", title: "#1 Playlist Lofi Cristã", subtitle: "Para rezar, estudar e meditar", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/lofi-1" },
  { id: "mus4", title: "Hinos Tradicionais", subtitle: "Clássicos da fé católica", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/hinos-tradicionais" },
  { id: "mus5", title: "Worship Contemporâneo", subtitle: "Louvores modernos", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/worship-contemporaneo" },
  { id: "mus6", title: "Música Instrumental", subtitle: "Para meditação e oração", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/musica-instrumental" },
]

const naoSabeCarouselItems = [
  { id: "ns1", title: "Introdutório à Fé", subtitle: "Comece com o básico da doutrina", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/introdutorio" },
  { id: "ns2", title: "Como Rezar o Terço", subtitle: "Conheça o Poder da Oração Mariana", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/como-rezar" },
  { id: "ns3", title: "Lectio Divina: Guia", subtitle: "Meditação da Palavra de Deus", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/lectio-divina-guia" },
  { id: "ns4", title: "O Credo Explicado", subtitle: "Entenda os artigos da nossa fé", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/credo-explicado" },
  { id: "ns5", title: "Os Sacramentos", subtitle: "Sinais visíveis da graça invisível", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/sacramentos" },
  { id: "ns6", title: "Vida dos Santos", subtitle: "Exemplos de fé e virtude", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/vida-santos" },
]

const tematicasCarouselItems = [
  { id: "tem1", title: "Paciência Divina", subtitle: "Espere com Deus e confie", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/paciencia" },
  { id: "tem2", title: "Perdão e Misericórdia", subtitle: "Pai, perdoai-lhes, não sabem o que fazem", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/perdao" },
  { id: "tem3", title: "Esperança Cristã", subtitle: "A virtude que nos move", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/esperanca" },
  { id: "tem4", title: "Amor de Deus", subtitle: "O fundamento de tudo", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/amor-deus" },
  { id: "tem5", title: "Vida em Santidade", subtitle: "Chamados à perfeição", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/vida-santidade" },
  { id: "tem6", title: "Confiança Divina", subtitle: "Entregue-se completamente", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/confianca-divina" },
]

const oracoesInfantisCarouselItems = [
  { id: "oi1", title: "Intro: Crianças na Fé", subtitle: "Agape Crianças", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/intro-criancas" },
  { id: "oi2", title: "Orações em Família Unida", subtitle: "Para rezar junto com seus filhos", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/oracoes-familia" },
  { id: "oi3", title: "Anjinho da Guarda", subtitle: "Oração para crianças", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/anjo-da-guarda" },
  { id: "oi4", title: "Histórias Bíblicas Infantis", subtitle: "Aventuras da Bíblia para os pequenos", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/historias-biblicas-infantis" },
  { id: "oi5", title: "Músicas Católicas Infantis", subtitle: "Cante e louve com alegria", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/musicas-catolicas-infantis" },
  { id: "oi6", title: "Boa Noite, Jesus", subtitle: "Oração antes de dormir", imageUrl: "/placeholder.svg?width=300&height=300", link: "/audio/boa-noite-jesus" },
]

const novenasCarouselItems = [
  { id: "nov1", title: "Novena de São José Operário", subtitle: "São José, rogai por nós e nossas famílias", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-sao-jose" },
  { id: "nov2", title: "Novena ao Sagrado Coração de Jesus", subtitle: "Eu confio em Vós, Senhor", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-sagrado-coracao" },
  { id: "nov3", title: "Novena a Santa Maria Pura", subtitle: "Mãe admirável", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-santamariapura" },
  { id: "nov4", title: "Novena de Nossa Senhora Aparecida", subtitle: "Padroeira do Brasil", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-aparecida" },
  { id: "nov5", title: "Novena de Santo Antônio", subtitle: "Santo dos milagres", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-santo-antonio" },
  { id: "nov6", title: "Novena do Espírito Santo", subtitle: "Vem, Espírito Criador", imageUrl: "/placeholder.svg?width=300&height=300", link: "/playlist/novena-espirito-santo" },
]

// --- FIM DOS DADOS ---

const orderedCategories = [
  "Terço Diário",
  "Corpus Christi",
  "Destaques",
  "Rotinas Matinais",
  "Favoritas dos Assinantes",
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
  "Orações infantis",
  "Novenas",
]

export default function NewHomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tudo")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Filtrando seções com base na categoria selecionada
  // Seções marcadas com "NÃO_FILTRAR" ou se "Tudo" está selecionado, são sempre incluídas.
  const filteredSections = sections.filter(
    (section) =>
      section.category === "NÃO_FILTRAR" || selectedCategory === "Tudo" || section.category === selectedCategory,
  )

  return (
    <div className="bg-black text-white min-h-screen overflow-y-auto">
      <HomeHeader
        categories={orderedCategories} // All categories now appear in filter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onMenuToggle={() => setIsMenuOpen(true)}
        // userNameInitial="U" // Você pode passar a inicial do nome do usuário aqui
        // userImageUrl="/path/to/user-image.jpg" // E o caminho da imagem se for dinâmico
      />
      
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={orderedCategories} // All categories appear in hamburger menu
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <main className="pt-4 pb-24">
        {" "}
        {/* Adicionado padding no topo do main para não sobrepor o header fixo e padding bottom para BottomNav */}
        {filteredSections.map((section) => (
          <div key={section.id}>{section.component}</div>
        ))}
      </main>
    </div>
  )
}

// Definição das seções (movida para baixo para melhor organização com os dados)
const sections = [
  { id: "main-banner", category: "NÃO_FILTRAR", component: <MainBanner /> },
  { id: "quick-access", category: "NÃO_FILTRAR", component: <QuickAccessIcons /> },
  
  // Spotify Carousels for each category
  { id: "terco-diario-carousel", category: "Terço Diário", component: <SpotifyCarousel title="Terço Diário" items={terçoDiarioItems} showAll={true} /> },
  { id: "corpus-christi-carousel", category: "Corpus Christi", component: <SpotifyCarousel title="Corpus Christi" items={corpusChristiCarouselItems} showAll={true} /> },
  { id: "destaques-carousel", category: "Destaques", component: <SpotifyCarousel title="Destaques" items={destaquesCarouselItems} showAll={true} /> },
  { id: "rotinas-matinais-carousel", category: "Rotinas Matinais", component: <SpotifyCarousel title="Rotinas Matinais" items={rotinasMatinaisCarouselItems} showAll={true} /> },
  { id: "favoritas-assinantes-carousel", category: "Favoritas dos Assinantes", component: <SpotifyCarousel title="Favoritas dos Assinantes" items={favoritasAssinantesCarouselItems} showAll={true} /> },
  { id: "diarias-convidados-carousel", category: "Diárias com Convidados", component: <SpotifyCarousel title="Diárias com Convidados" items={diariasConvidadosCarouselItems} showAll={true} /> },
  { id: "reflita-evangelho-carousel", category: "Reflita sobre o Evangelho", component: <SpotifyCarousel title="Reflita sobre o Evangelho" items={reflitaEvangelhoCarouselItems} showAll={true} /> },
  { id: "explore-categorias-carousel", category: "Explore por Categorias", component: <SpotifyCarousel title="Explore por Categorias" items={exploreCategoriasCarouselItems} showAll={true} /> },
  { id: "rotinas-noturnas-carousel", category: "Rotinas Noturnas", component: <SpotifyCarousel title="Rotinas Noturnas" items={rotinasNoturnasCarouselItems} showAll={true} /> },
  { id: "historias-biblicas-carousel", category: "Histórias Bíblicas para Dormir", component: <SpotifyCarousel title="Histórias Bíblicas para Dormir" items={historiasBiblicasCarouselItems} showAll={true} /> },
  { id: "rezadas-recentemente-carousel", category: "Rezadas Recentemente", component: <SpotifyCarousel title="Rezadas Recentemente" items={rezadasRecentementeCarouselItems} showAll={true} /> },
  { id: "musicas-dormir-carousel", category: "Músicas para Dormir", component: <SpotifyCarousel title="Músicas para Dormir" items={musicasDormirCarouselItems} showAll={true} /> },
  { id: "minuto-homilia-carousel", category: "Minuto de Homilia", component: <SpotifyCarousel title="Minuto de Homilia" items={minutoHomiliaCarouselItems} showAll={true} /> },
  { id: "novo-testamento-carousel", category: "Novo Testamento", component: <SpotifyCarousel title="Novo Testamento" items={novoTestamentoCarouselItems} showAll={true} /> },
  { id: "musica-carousel", category: "Música", component: <SpotifyCarousel title="Música" items={musicaCarouselItems} showAll={true} /> },
  { id: "nao-sabe-carousel", category: "Não sabe por onde começar", component: <SpotifyCarousel title="Não sabe por onde começar" items={naoSabeCarouselItems} showAll={true} /> },
  { id: "tematicas-carousel", category: "Temáticas", component: <SpotifyCarousel title="Temáticas" items={tematicasCarouselItems} showAll={true} /> },
  { id: "oracoes-infantis-carousel", category: "Orações infantis", component: <SpotifyCarousel title="Orações infantis" items={oracoesInfantisCarouselItems} showAll={true} /> },
  { id: "novenas-carousel", category: "Novenas", component: <SpotifyCarousel title="Novenas" items={novenasCarouselItems} showAll={true} /> },
  {
    id: "challenge-sacred-heart",
    category: "Sagrado Coração de Jesus",
    component: (
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
        imageContainerClassName="aspect-[695/960]"
      />
    ),
  },
  {
    id: "corpus-christi",
    category: "Corpus Christi",
    component: <HorizontalScrollSection title="Corpus Christi" items={corpusChristiItems} thumbnailVariant="lounge" />,
  },
  { id: "quote", category: "Frase", component: <QuoteSection /> },
  {
    id: "challenge-vice",
    category: "Contra o vício",
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
        imageContainerClassName="aspect-[695/960]"
      />
    ),
  },
  {
    id: "highlights",
    category: "Destaques",
    component: <HorizontalScrollSection title="Destaques" items={highlightsItems} thumbnailVariant="lounge" />,
  },
  {
    id: "morning-routines",
    category: "Rotinas Matinais",
    component: <HorizontalGridScrollSection title="Rotinas Matinais" items={morningRoutinesGridItems} />,
  }, // numRows={3} é o padrão agora no componente
  {
    id: "subscriber-favorites",
    category: "Favoritas dos Assinantes",
    component: (
      <HorizontalScrollSection
        title="Favoritas dos Assinantes"
        items={subscriberFavoritesItems}
        thumbnailVariant="lounge"
      />
    ),
  },
  {
    id: "challenge-finish-praying",
    category: "Termine de Rezar",
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
        imageContainerClassName="aspect-[695/960]"
      />
    ),
  },
  {
    id: "daily-with-guests",
    category: "Diárias com Convidados",
    component: (
      <HorizontalScrollSection title="Diárias com Convidados" items={dailyWithGuestsItems} thumbnailVariant="lounge" />
    ),
  },
  {
    id: "reflect-gospel",
    category: "Reflita sobre o Evangelho",
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
    category: "Explore por Categorias",
    component: (
      <section className="py-6 md:py-8">
        <div className="container px-0 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 px-4 md:px-0 text-white">
            Explore por Categoria
          </h2>
          <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
            {exploreCategoriesItems.map((item) => (
              <div key={item.id} className="flex-shrink-0 first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0 w-60 md:w-72">
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
    category: "Rotinas Noturnas",
    component: (
      <HorizontalScrollSection title="Rotinas Noturnas" items={nightRoutinesItems} thumbnailVariant="lounge" />
    ),
  },
  {
    id: "bible-stories",
    category: "Histórias Bíblicas para Dormir",
    component: <HorizontalGridScrollSection title="Histórias Bíblicas Para Dormir" items={bibleStoriesForSleepItems} />,
  }, // numRows={3} é o padrão
  {
    id: "recently-played",
    category: "Rezadas Recentemente",
    component: (
      <HorizontalScrollSection title="Rezadas Recentemente >" items={recentlyPlayedItems} thumbnailVariant="lounge" />
    ),
  },
  {
    id: "music-sleep",
    category: "Músicas para Dormir",
    component: (
      <HorizontalScrollSection title="Músicas Para Dormir" items={musicForSleepItems} thumbnailVariant="lounge" />
    ),
  },
  {
    id: "homily-minute",
    category: "Minuto de Homilia",
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
    category: "Novo Testamento",
    component: <HorizontalGridScrollSection title="Novo Testamento" items={newTestamentItems} />,
  }, // numRows={3} é o padrão
  {
    id: "music",
    category: "Música",
    component: <HorizontalScrollSection title="Música" items={musicItems} thumbnailVariant="lounge" />,
  },
  {
    id: "where-to-start",
    category: "Não sabe por onde começar",
    component: <HorizontalGridScrollSection title="Não sabe por onde começar?" items={whereToStartItems} />,
  }, // numRows={3} é o padrão
  {
    id: "thematics",
    category: "Temáticas",
    component: <HorizontalScrollSection title="Temáticas" items={thematicsItems} thumbnailVariant="lounge" />,
  },
  { id: "magisterium", category: "Magisterium", component: <MagisteriumBanner /> },
  {
    id: "kids-prayers",
    category: "Orações infantis",
    component: <HorizontalGridScrollSection title="Orações Infantis" items={kidsPrayersGridItems} />,
  }, // numRows={3} é o padrão
  {
    id: "novenas",
    category: "Novenas",
    component: <HorizontalScrollSection title="Novenas" items={novenasItems} thumbnailVariant="lounge" />,
  },
  { id: "final-section", category: "NÃO_FILTRAR", component: <FinalSection /> },
]
