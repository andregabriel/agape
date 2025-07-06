import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Lista completa de todas as imagens que precisam ser geradas
const imagesToGenerate = [
  // Teste (2 imagens)
  {
    id: "teste_padre",
    filename: "teste-padre-oracao-matinal.png",
    title: "Oração Matinal de Teste",
    prompt: "Religious artwork, Catholic priest praying at dawn, golden morning light, peaceful monastery chapel, spiritual serenity, warm golden tones, renaissance style",
    category: "Teste"
  },
  {
    id: "teste_storytelling",
    filename: "teste-storytelling-historia-biblica.png", 
    title: "História Bíblica de Teste",
    prompt: "Biblical scene, Jesus teaching disciples by the sea, storytelling atmosphere, warm Mediterranean light, ancient Palestine setting, peaceful narrative scene",
    category: "Teste"
  },

  // Corpus Christi (3 imagens - 1 já existe)
  {
    id: "cc2",
    filename: "amor-deus-eucaristia.png",
    title: "Amor de Deus na Eucaristia",
    prompt: "Sacred Eucharist scene, golden chalice and host, divine light rays, Catholic altar, sacred heart imagery, deep spiritual reverence, warm golden lighting",
    category: "Corpus Christi"
  },
  {
    id: "cc3", 
    filename: "comunhao-espiritual.png",
    title: "Comunhão Espiritual",
    prompt: "Spiritual communion scene, hands in prayer position, divine light descending, Italian religious art style, Padre Pio inspiration, mystical atmosphere",
    category: "Corpus Christi"
  },
  {
    id: "cc4",
    filename: "adoracao-santissimo.png",
    title: "Adoração ao Santíssimo",
    prompt: "Eucharistic adoration scene, monstrance with host, kneeling faithful, church interior, candlelight, sacred atmosphere, Catholic devotion",
    category: "Corpus Christi"
  },

  // Destaques (3 imagens)
  {
    id: "hl1",
    filename: "novena-namorados.png",
    title: "Novena para Namorados",
    prompt: "Young Catholic couple praying together, Saints Joachim and Anne blessing, romantic spiritual scene, soft warm lighting, love and faith",
    category: "Destaques"
  },
  {
    id: "hl2",
    filename: "novena-casais.png", 
    title: "Novena para Casais",
    prompt: "Married couple in prayer, wedding rings visible, Holy Family inspiration, domestic church, family devotion, warm home atmosphere",
    category: "Destaques"
  },
  {
    id: "hl3",
    filename: "novena-filhos.png",
    title: "Novena para Filhos", 
    prompt: "Parents praying over children, Holy Family scene, Mary and Joseph with child Jesus, protective blessing, family prayer time",
    category: "Destaques"
  },

  // Favoritas dos Assinantes (3 imagens)
  {
    id: "sf1",
    filename: "oracao-noite-completa.png",
    title: "Oração da Noite Completa",
    prompt: "Peaceful nighttime prayer scene, person kneeling by bedside, moonlight through window, serene bedroom, end of day devotion",
    category: "Favoritas"
  },
  {
    id: "sf2",
    filename: "minuto-inspiracao-divina.png",
    title: "Minuto de Inspiração Divina",
    prompt: "Divine inspiration moment, rays of light, open Bible, peaceful contemplation, spiritual enlightenment, brief prayer time",
    category: "Favoritas"
  },
  {
    id: "sf3",
    filename: "santo-dia-reflexoes.png",
    title: "Santo do Dia: Reflexões",
    prompt: "Various Catholic saints in heaven, golden halos, Church triumphant, daily sanctity, spiritual reflection, heavenly gathering",
    category: "Favoritas"
  },

  // Diárias com Convidados (3 imagens)
  {
    id: "dg1",
    filename: "evangelho-diario-comentado.png",
    title: "Evangelho Diário Comentado",
    prompt: "Open Gospel book, daily reading scene, morning devotion, scripture study, peaceful reading nook, spiritual learning",
    category: "Diárias"
  },
  {
    id: "dg2",
    filename: "imitacao-diaria-cristo.png",
    title: "Imitação Diária de Cristo",
    prompt: "Following Jesus' footsteps, discipleship scene, walking with Christ, spiritual journey, daily Christian living, path of holiness",
    category: "Diárias"
  },
  {
    id: "dg3",
    filename: "terco-mariano-familia.png",
    title: "Terço Mariano em Família",
    prompt: "Family praying rosary together, living room setting, rosary beads, Virgin Mary image, family devotion, evening prayer",
    category: "Diárias"
  },

  // Rotinas Noturnas (3 imagens)
  {
    id: "nr1",
    filename: "oracao-noite-dormir.png",
    title: "Oração da Noite para Dormir",
    prompt: "Peaceful bedtime prayer, person kneeling beside bed, soft lamplight, nighttime serenity, end of day gratitude, restful atmosphere",
    category: "Rotinas Noturnas"
  },
  {
    id: "nr2",
    filename: "minuto-dormir-paz.png",
    title: "Minuto Para Dormir em Paz",
    prompt: "Serene bedroom scene, peaceful sleep preparation, gentle moonlight, calm atmosphere, restful peace, spiritual tranquility",
    category: "Rotinas Noturnas"
  },
  {
    id: "nr3",
    filename: "pilulas-sabedoria-noturna.png",
    title: "Pílulas de Sabedoria Noturna",
    prompt: "Wise elder reading by candlelight, ancient wisdom, nighttime contemplation, spiritual insights, peaceful study, evening reflection",
    category: "Rotinas Noturnas"
  },

  // Rezadas Recentemente (3 imagens)
  {
    id: "rp1",
    filename: "terco-diario-meditado.png",
    title: "Terço Diário Meditado",
    prompt: "Rosary beads in hands, meditation pose, daily prayer routine, mysteries of rosary, contemplative prayer, spiritual discipline",
    category: "Recentes"
  },
  {
    id: "rp2",
    filename: "imitacao-cristo-audio.png",
    title: "Imitação de Cristo (Áudio)",
    prompt: "Classic spiritual book, 'Imitation of Christ', peaceful reading scene, spiritual literature, contemplative study, holy wisdom",
    category: "Recentes"
  },
  {
    id: "rp3",
    filename: "evangelho-dia-lectio.png",
    title: "Evangelho do Dia (Lectio)",
    prompt: "Lectio Divina practice, open Bible, contemplative reading, spiritual meditation, Gospel study, divine reading method",
    category: "Recentes"
  },

  // Músicas para Dormir (3 imagens)
  {
    id: "ms1",
    filename: "piano-dormir-sonhar.png",
    title: "Piano Para Dormir e Sonhar",
    prompt: "Elegant piano in moonlit room, peaceful nighttime music, gentle melodies, sleep-inducing atmosphere, musical serenity",
    category: "Música Dormir"
  },
  {
    id: "ms2",
    filename: "piano-relaxante-divino.png",
    title: "Piano Relaxante Divino",
    prompt: "Divine piano music scene, heavenly atmosphere, peaceful keyboard, spiritual melodies, relaxing sacred music, angelic inspiration",
    category: "Música Dormir"
  },
  {
    id: "ms3",
    filename: "cantos-gregorianos-celestiais.png",
    title: "Cantos Gregorianos Celestiais",
    prompt: "Monks chanting in monastery, Gregorian chant, medieval chapel, sacred music, celestial harmony, ancient liturgical tradition",
    category: "Música Dormir"
  },

  // Música (3 imagens)
  {
    id: "m1",
    filename: "tome-ao-vivo.png",
    title: "Tomé (Ao Vivo)",
    prompt: "Live Christian music performance, acoustic guitar, contemporary Catholic music, worship atmosphere, spiritual concert, faith-based music",
    category: "Música"
  },
  {
    id: "m2",
    filename: "sacred-heart-lofi.png",
    title: "Sacred Heart Lofi Beats",
    prompt: "Sacred Heart of Jesus imagery, modern lofi aesthetic, peaceful beats, spiritual hip-hop, contemporary Catholic music, chill vibes",
    category: "Música"
  },
  {
    id: "m3",
    filename: "playlist-lofi-crista.png",
    title: "#1 Playlist Lofi Cristã",
    prompt: "Christian lofi playlist cover, peaceful study music, faith-based beats, modern spiritual music, contemplative sounds, prayer background music",
    category: "Música"
  },

  // Temáticas (3 imagens)
  {
    id: "th1",
    filename: "paciencia-divina.png",
    title: "Paciência Divina",
    prompt: "Serene figure waiting in prayer, divine patience, spiritual endurance, trusting in God's timing, peaceful waiting, virtue of patience",
    category: "Temáticas"
  },
  {
    id: "th2",
    filename: "perdao-misericordia.png",
    title: "Perdão e Misericórdia",
    prompt: "Divine Mercy image, Jesus forgiving, mercy rays, forgiveness scene, compassionate Christ, spiritual reconciliation, healing mercy",
    category: "Temáticas"
  },
  {
    id: "th3",
    filename: "esperanca-crista.png",
    title: "Esperança Cristã",
    prompt: "Dawn breaking over horizon, Christian hope, resurrection light, new beginnings, spiritual optimism, faith in future, hopeful sunrise",
    category: "Temáticas"
  },

  // Novenas (3 imagens)
  {
    id: "nv1",
    filename: "novena-sao-jose-operario.png",
    title: "Novena de São José Operário",
    prompt: "Saint Joseph the Worker, carpenter tools, holy family provider, working saint, humble labor, spiritual work ethic, patron of workers",
    category: "Novenas"
  },
  {
    id: "nv_scj",
    filename: "novena-sagrado-coracao.png",
    title: "Novena ao Sagrado Coração de Jesus",
    prompt: "Sacred Heart of Jesus, divine love, flaming heart, thorns and rays, Jesus pointing to heart, sacred devotion, divine mercy",
    category: "Novenas"
  },
  {
    id: "nv_smp",
    filename: "novena-santa-maria-pura.png",
    title: "Novena a Santa Maria Pura",
    prompt: "Virgin Mary in pure white, immaculate conception, blessed mother, purity and grace, Marian devotion, heavenly queen, maternal love",
    category: "Novenas"
  },

  // Histórias Bíblicas para Dormir (6 imagens)
  {
    id: "bs1",
    filename: "vocacao-moises.png",
    title: "A Vocação de Moisés",
    prompt: "Moses and burning bush, divine calling, desert scene, biblical story, shepherd becoming leader, God's voice, holy ground",
    category: "Histórias Bíblicas"
  },
  {
    id: "bs2",
    filename: "lazaro-vem-fora.png",
    title: "Lázaro, Vem Para Fora",
    prompt: "Jesus raising Lazarus, miracle scene, tomb opening, resurrection power, biblical miracle, death to life, divine power",
    category: "Histórias Bíblicas"
  },
  {
    id: "bs3",
    filename: "anunciacao.png",
    title: "A Anunciação",
    prompt: "Angel Gabriel announcing to Mary, annunciation scene, Virgin Mary receiving news, divine messenger, holy conception, biblical scene",
    category: "Histórias Bíblicas"
  },
  {
    id: "bs4",
    filename: "filho-prodigo.png",
    title: "O Filho Pródigo",
    prompt: "Prodigal son returning home, father's embrace, forgiveness parable, homecoming scene, biblical story, mercy and love",
    category: "Histórias Bíblicas"
  },
  {
    id: "bs5",
    filename: "jonas-baleia.png",
    title: "Jonas e a Baleia",
    prompt: "Jonah and the whale, biblical sea story, great fish, prophet's journey, ocean scene, divine lesson, Old Testament narrative",
    category: "Histórias Bíblicas"
  },
  {
    id: "bs6",
    filename: "daniel-cova-leoes.png",
    title: "Daniel na Cova dos Leões",
    prompt: "Daniel in lions' den, biblical courage, divine protection, faithful prophet, lions tamed by God, Old Testament story",
    category: "Histórias Bíblicas"
  },

  // Novo Testamento (6 imagens)
  {
    id: "nt1",
    filename: "evangelho-sao-mateus.png",
    title: "Evangelho de São Mateus",
    prompt: "Saint Matthew the Evangelist, Gospel writer, ancient manuscript, biblical scribe, New Testament author, holy scripture",
    category: "Novo Testamento"
  },
  {
    id: "nt2",
    filename: "evangelho-sao-marcos.png",
    title: "Evangelho de São Marcos",
    prompt: "Saint Mark the Evangelist, Gospel of Mark, lion symbol, biblical writer, New Testament, evangelist with scroll",
    category: "Novo Testamento"
  },
  {
    id: "nt3",
    filename: "evangelho-sao-lucas.png",
    title: "Evangelho de São Lucas",
    prompt: "Saint Luke the Evangelist, physician and Gospel writer, ox symbol, biblical author, New Testament, evangelist at work",
    category: "Novo Testamento"
  },
  {
    id: "nt4",
    filename: "evangelho-sao-joao.png",
    title: "Evangelho de São João",
    prompt: "Saint John the Evangelist, beloved disciple, eagle symbol, Gospel writer, New Testament, young apostle writing",
    category: "Novo Testamento"
  },
  {
    id: "nt5",
    filename: "atos-apostolos.png",
    title: "Atos dos Apóstolos",
    prompt: "Early Christian church, apostles preaching, Pentecost scene, Holy Spirit descending, early Christianity, apostolic mission",
    category: "Novo Testamento"
  },
  {
    id: "nt6",
    filename: "apocalipse.png",
    title: "Apocalipse",
    prompt: "Revelation of John, heavenly vision, apocalyptic imagery, divine revelation, end times, mystical biblical vision",
    category: "Novo Testamento"
  },

  // Não sabe por onde começar (6 imagens)
  {
    id: "ws1",
    filename: "introdutorio-fe.png",
    title: "Introdutório à Fé",
    prompt: "Beginning faith journey, open Bible, cross and candle, spiritual foundation, basic Catholic doctrine, faith formation",
    category: "Onde Começar"
  },
  {
    id: "ws2",
    filename: "como-rezar-terco.png",
    title: "Como Rezar o Terço",
    prompt: "Hands holding rosary beads, prayer instruction, Marian devotion, learning to pray, rosary meditation, spiritual guidance",
    category: "Onde Começar"
  },
  {
    id: "ws3",
    filename: "lectio-divina-guia.png",
    title: "Lectio Divina: Guia",
    prompt: "Divine reading practice, open scripture, contemplative study, spiritual reading method, biblical meditation, sacred reading",
    category: "Onde Começar"
  },
  {
    id: "ws4",
    filename: "credo-explicado.png",
    title: "O Credo Explicado",
    prompt: "Apostles' Creed, articles of faith, Catholic doctrine, creed recitation, fundamental beliefs, faith statement",
    category: "Onde Começar"
  },
  {
    id: "ws5",
    filename: "sacramentos.png",
    title: "Os Sacramentos",
    prompt: "Seven sacraments, baptism font, communion chalice, confirmation, Catholic sacramental life, grace channels",
    category: "Onde Começar"
  },
  {
    id: "ws6",
    filename: "vida-santos.png",
    title: "Vida dos Santos",
    prompt: "Various Catholic saints, halos and holy attributes, saints' lives, spiritual examples, holy men and women, sanctity",
    category: "Onde Começar"
  },

  // Rotinas Matinais (6 imagens)
  {
    id: "mr1",
    filename: "terco-diario.png",
    title: "Terço Diário",
    prompt: "Morning rosary prayer, sunrise through window, daily devotion, rosary beads, morning routine, spiritual discipline",
    category: "Rotinas Matinais"
  },
  {
    id: "mr2",
    filename: "evangelho-diario.png",
    title: "Evangelho Diário",
    prompt: "Daily Gospel reading, morning scripture, Bible open to Gospel, daily lectio divina, spiritual reading, dawn light",
    category: "Rotinas Matinais"
  },
  {
    id: "mr3",
    filename: "oferecimento-manha.png",
    title: "Oferecimento da Manhã",
    prompt: "Morning offering prayer, hands raised in offering, sunrise dedication, consecrating the day, morning devotion, spiritual gift",
    category: "Rotinas Matinais"
  },
  {
    id: "mr4",
    filename: "desafio-meditacao.png",
    title: "Desafio de Meditação",
    prompt: "Meditation challenge, peaceful sitting, spiritual discipline, contemplative practice, inner peace, mindful prayer",
    category: "Rotinas Matinais"
  },
  {
    id: "mr5",
    filename: "diario-gratidao.png",
    title: "Diário de Gratidão",
    prompt: "Gratitude journal, morning reflection, thankful heart, writing blessings, spiritual diary, grateful prayer",
    category: "Rotinas Matinais"
  },
  {
    id: "mr6",
    filename: "santo-do-dia.png",
    title: "Santo do Dia",
    prompt: "Daily saint inspiration, calendar saint, holy example, spiritual patron, daily sanctity, saintly guidance",
    category: "Rotinas Matinais"
  },

  // Orações infantis (6 imagens)
  {
    id: "kp1",
    filename: "intro-criancas-fe.png",
    title: "Intro: Crianças na Fé",
    prompt: "Children praying together, family faith, young disciples, kids in prayer, childhood spirituality, innocent devotion",
    category: "Orações Infantis"
  },
  {
    id: "kp2",
    filename: "oracoes-familia-unida.png",
    title: "Orações em Família Unida",
    prompt: "Family prayer time, parents and children praying, united family, domestic church, family devotion, home altar",
    category: "Orações Infantis"
  },
  {
    id: "kp3",
    filename: "anjinho-guarda.png",
    title: "Anjinho da Guarda",
    prompt: "Guardian angel with child, protective angel, childhood prayer, angelic protection, innocent prayer, heavenly guardian",
    category: "Orações Infantis"
  },
  {
    id: "kp4",
    filename: "historias-biblicas-infantis.png",
    title: "Histórias Bíblicas Infantis",
    prompt: "Children's Bible stories, colorful biblical scenes, kid-friendly narratives, young audience, biblical adventure, faith stories",
    category: "Orações Infantis"
  },
  {
    id: "kp5",
    filename: "musicas-catolicas-infantis.png",
    title: "Músicas Católicas Infantis",
    prompt: "Children singing Catholic songs, joyful worship, kids' choir, musical prayer, childhood praise, innocent voices",
    category: "Orações Infantis"
  },
  {
    id: "kp6",
    filename: "boa-noite-jesus.png",
    title: "Boa Noite, Jesus",
    prompt: "Child saying bedtime prayers, Jesus watching over, nighttime protection, peaceful sleep, childhood devotion, bedtime blessing",
    category: "Orações Infantis"
  }
]

async function generateImage(imageData: typeof imagesToGenerate[0]) {
  try {
    console.log(`🎨 Generating: ${imageData.title}...`)
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a beautiful, spiritual, Catholic-themed image for "${imageData.title}". Style: ${imageData.prompt}. High quality, peaceful, reverent, suitable for a Catholic prayer app. Aspect ratio 3:4 (portrait). Warm, welcoming colors. Professional religious art style.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    })

    const imageUrl = response.data[0]?.url
    if (!imageUrl) {
      throw new Error('No image URL returned')
    }

    // Download the image
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()
    
    // Save to public/images/home/thumbnails/
    const dir = path.join(process.cwd(), 'public', 'images', 'home', 'thumbnails')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    const filepath = path.join(dir, imageData.filename)
    fs.writeFileSync(filepath, new Uint8Array(imageBuffer))
    
    console.log(`✅ Generated: ${imageData.filename}`)
    return { success: true, filename: imageData.filename, url: imageUrl }
    
  } catch (error) {
    console.error(`❌ Error generating ${imageData.filename}:`, error)
    return { success: false, filename: imageData.filename, error: error instanceof Error ? error.message : String(error) }
  }
}

async function generateAllImages() {
  console.log(`🚀 Starting generation of ${imagesToGenerate.length} images...`)
  
  const results = []
  
  for (const imageData of imagesToGenerate) {
    const result = await generateImage(imageData)
    results.push(result)
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  // Summary
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(`\n📊 SUMMARY:`)
  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`💰 Estimated cost: $${(successful * 0.04).toFixed(2)}`)
  
  if (failed > 0) {
    console.log(`\n❌ Failed images:`)
    results.filter(r => !r.success).forEach(r => {
      console.log(`- ${r.filename}: ${r.error}`)
    })
  }
  
  // Save results
  fs.writeFileSync('generation-results.json', JSON.stringify(results, null, 2))
  console.log(`\n📄 Results saved to generation-results.json`)
}

// Run the generation
generateAllImages().catch(console.error)