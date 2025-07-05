import fs from 'fs'
import path from 'path'

// Lista de todas as imagens que precisam ser geradas para a home page
const imagesToGenerate = [
  // Carrossel de Teste
  {
    filename: "teste-padre-oracao-matinal.png",
    prompt: "Create a beautiful religious artwork in renaissance style, peaceful prayer scene with morning light, Catholic priest praying, soft golden rays, serene atmosphere, spiritual awakening, sacred space",
    section: "Teste"
  },
  {
    filename: "teste-storytelling-historia-biblica.png", 
    prompt: "Create a beautiful religious artwork in renaissance style, Jesus calming the storm, dramatic biblical scene, disciples in boat, divine power over nature, storytelling atmosphere, peaceful resolution",
    section: "Teste"
  },

  // Corpus Christi
  {
    filename: "corpus-christi-santo-ambrosio.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Saint Ambrose of Milan, Eucharist, Holy Communion, golden chalice, sacred host, divine light, patristic teaching, bishop with miter",
    section: "Corpus Christi"
  },
  {
    filename: "corpus-christi-amor-eucaristia.png",
    prompt: "Create a beautiful religious artwork in renaissance style, divine love in Eucharist, golden chalice radiating light, sacred host, mystical rays, heavenly atmosphere, devotional art",
    section: "Corpus Christi"
  },
  {
    filename: "corpus-christi-comunhao-espiritual.png",
    prompt: "Create a beautiful religious artwork in renaissance style, spiritual communion, Padre Pio style devotion, humble prayer, mystical experience, divine presence, contemplative atmosphere",
    section: "Corpus Christi"
  },
  {
    filename: "corpus-christi-adoracao-santissimo.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Eucharistic adoration, monstrance with sacred host, golden rays, candles, peaceful worship, contemplative prayer, sacred silence",
    section: "Corpus Christi"
  },

  // Destaques
  {
    filename: "destaques-novena-namorados.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Saints Joachim and Anna, holy couple praying together, pure love, engagement blessing, family devotion, sacred relationship",
    section: "Destaques"
  },
  {
    filename: "destaques-novena-casais.png",
    prompt: "Create a beautiful religious artwork in renaissance style, married couple praying together, family altar, wedding rings, sacred marriage, domestic church, conjugal love blessed by God",
    section: "Destaques"
  },
  {
    filename: "destaques-novena-filhos.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Holy Family with Mary, Joseph and child Jesus, parents praying for children, family blessing, domestic sanctuary",
    section: "Destaques"
  },

  // Rotinas Matinais
  {
    filename: "rotinas-matinais-terco-diario.png",
    prompt: "Create a beautiful religious artwork in renaissance style, morning prayer with rosary, sunrise light, peaceful meditation, Virgin Mary, mystical roses, contemplative atmosphere",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-matinais-evangelho-diario.png",
    prompt: "Create a beautiful religious artwork in renaissance style, open Bible with golden light, morning lectio divina, sacred scripture, divine word, peaceful study, spiritual reading",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-matinais-oferecimento-manha.png",
    prompt: "Create a beautiful religious artwork in renaissance style, morning offering prayer, hands raised to heaven, sunrise, spiritual awakening, consecration of the day to God",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-matinais-desafio-meditacao.png",
    prompt: "Create a beautiful religious artwork in renaissance style, peaceful meditation, serene mind, inner peace, contemplative prayer, spiritual tranquility, seven days of grace",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-matinais-diario-gratidao.png",
    prompt: "Create a beautiful religious artwork in renaissance style, gratitude prayer, thankful heart, divine blessings, morning reflection, counting blessings, grateful soul",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-matinais-santo-do-dia.png",
    prompt: "Create a beautiful religious artwork in renaissance style, saint of the day, holy inspiration, virtue example, saintly figure with halo, spiritual guidance, daily inspiration",
    section: "Rotinas Matinais"
  },

  // Favoritas dos Assinantes
  {
    filename: "favoritas-oracao-noite-completa.png",
    prompt: "Create a beautiful religious artwork in renaissance style, complete evening prayer, peaceful night, examination of conscience, end of day reflection, serene atmosphere",
    section: "Favoritas dos Assinantes"
  },
  {
    filename: "favoritas-minuto-inspiracao.png",
    prompt: "Create a beautiful religious artwork in renaissance style, divine inspiration, brief spiritual reflection, moment of grace, heavenly light, inspirational atmosphere",
    section: "Favoritas dos Assinantes"
  },
  {
    filename: "favoritas-santo-reflexoes.png",
    prompt: "Create a beautiful religious artwork in renaissance style, saint reflection, deep spiritual contemplation, faith with the Church, saintly wisdom, devotional study",
    section: "Favoritas dos Assinantes"
  },

  // Diárias com Convidados
  {
    filename: "diarias-evangelho-comentado.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Gospel commentary, daily scripture, accessible theology, spiritual teaching, biblical wisdom, sacred text",
    section: "Diárias com Convidados"
  },
  {
    filename: "diarias-imitacao-cristo.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Imitation of Christ, following Jesus, spiritual classic, practical application, Christian discipleship, holy life",
    section: "Diárias com Convidados"
  },
  {
    filename: "diarias-terco-familia.png",
    prompt: "Create a beautiful religious artwork in renaissance style, family rosary, Marian prayer, family gathered in prayer, domestic church, children and parents praying together",
    section: "Diárias com Convidados"
  },

  // Rotinas Noturnas
  {
    filename: "rotinas-noturnas-oracao-dormir.png",
    prompt: "Create a beautiful religious artwork in renaissance style, evening prayer for sleep, peaceful night, moonlight, serene rest, preparing heart for peaceful sleep",
    section: "Rotinas Noturnas"
  },
  {
    filename: "rotinas-noturnas-minuto-paz.png",
    prompt: "Create a beautiful religious artwork in renaissance style, brief prayers for peace, calming the mind before sleep, short evening devotions, tranquil atmosphere",
    section: "Rotinas Noturnas"
  },
  {
    filename: "rotinas-noturnas-sabedoria-noturna.png",
    prompt: "Create a beautiful religious artwork in renaissance style, nighttime wisdom, spiritual reflection, evening contemplation, nocturnal meditation, peaceful wisdom",
    section: "Rotinas Noturnas"
  },

  // Histórias Bíblicas para Dormir
  {
    filename: "historias-biblicas-vocacao-moises.png",
    prompt: "Create a biblical scene illustration, Moses' calling, burning bush, divine calling, peaceful biblical scene, soft dreamy atmosphere, suitable for bedtime, contemplative narrative",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "historias-biblicas-lazaro.png",
    prompt: "Create a biblical scene illustration, Lazarus come forth, resurrection miracle, Jesus' power and compassion, peaceful biblical scene, soft dreamy atmosphere, suitable for bedtime",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "historias-biblicas-anunciacao.png",
    prompt: "Create a biblical scene illustration, Annunciation, Angel Gabriel and Virgin Mary, humility and faith, peaceful biblical scene, soft dreamy atmosphere, suitable for bedtime",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "historias-biblicas-filho-prodigo.png",
    prompt: "Create a biblical scene illustration, Prodigal Son parable, father's love, divine mercy, peaceful biblical scene, soft dreamy atmosphere, suitable for bedtime",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "historias-biblicas-jonas-baleia.png",
    prompt: "Create a biblical scene illustration, Jonah and the whale, adventure story, dramatic elements for all ages, peaceful biblical scene, soft dreamy atmosphere, suitable for bedtime",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "historias-biblicas-daniel-leoes.png",
    prompt: "Create a biblical scene illustration, Daniel in lions' den, faithfulness to God, courage in persecution, peaceful biblical scene, soft dreamy atmosphere, suitable for bedtime",
    section: "Histórias Bíblicas para Dormir"
  },

  // Rezadas Recentemente
  {
    filename: "rezadas-terco-meditado.png",
    prompt: "Create a beautiful religious artwork in renaissance style, meditated rosary, daily mysteries, deep contemplation, Marian devotion, mystical roses, contemplative prayer",
    section: "Rezadas Recentemente"
  },
  {
    filename: "rezadas-imitacao-cristo-audio.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Imitation of Christ audio, spiritual classic, practical application, following Jesus, Christian perfection",
    section: "Rezadas Recentemente"
  },
  {
    filename: "rezadas-evangelho-lectio.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Gospel lectio divina, daily scripture, contemplative steps, divine word, spiritual reading, sacred meditation",
    section: "Rezadas Recentemente"
  },

  // Músicas para Dormir
  {
    filename: "musicas-piano-dormir-sonhar.png",
    prompt: "Create a beautiful religious artwork in renaissance style, peaceful sleep music, piano keys, soft colors, musical notes, serene atmosphere, contemplative melodies for rest",
    section: "Músicas para Dormir"
  },
  {
    filename: "musicas-piano-relaxante-divino.png",
    prompt: "Create a beautiful religious artwork in renaissance style, divine relaxing piano, peaceful sleep music, soft colors, musical notes, serene atmosphere, heavenly melodies",
    section: "Músicas para Dormir"
  },
  {
    filename: "musicas-gregoriano-celestial.png",
    prompt: "Create a beautiful religious artwork in renaissance style, celestial Gregorian chant, deep meditation and sleep, monastic tradition, sacred music, peaceful atmosphere",
    section: "Músicas para Dormir"
  },

  // Novo Testamento
  {
    filename: "novo-testamento-mateus.png",
    prompt: "Create a biblical scene illustration, Gospel of Matthew, Jesus Christ's life, evangelist with scroll, sacred scripture, New Testament, apostolic witness",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-marcos.png",
    prompt: "Create a biblical scene illustration, Gospel of Mark, Jesus Christ's life, evangelist with lion symbol, sacred scripture, New Testament, apostolic witness",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-lucas.png",
    prompt: "Create a biblical scene illustration, Gospel of Luke, Jesus Christ's life, evangelist with ox symbol, sacred scripture, New Testament, apostolic witness",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-joao.png",
    prompt: "Create a biblical scene illustration, Gospel of John, Jesus Christ's life, evangelist with eagle symbol, sacred scripture, New Testament, apostolic witness",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-atos.png",
    prompt: "Create a biblical scene illustration, Acts of the Apostles, early Church beginning, Holy Spirit, apostolic mission, Christian community, sacred scripture",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-apocalipse.png",
    prompt: "Create a biblical scene illustration, Book of Revelation, Saint John's visions, heavenly scenes, divine revelation, sacred scripture, mystical imagery",
    section: "Novo Testamento"
  },

  // Música
  {
    filename: "musica-tome-ao-vivo.png",
    prompt: "Create a contemporary Christian design, live Catholic music, spiritual worship, contemporary praise, musical celebration, faith expression through song",
    section: "Música"
  },
  {
    filename: "musica-sacred-heart-lofi.png",
    prompt: "Create a contemporary Christian design, Sacred Heart lofi beats, Catholic lofi for prayer, peaceful background music, spiritual focus, modern devotional music",
    section: "Música"
  },
  {
    filename: "musica-playlist-lofi-crista.png",
    prompt: "Create a contemporary Christian design, Christian lofi playlist, music for prayer and study, peaceful meditation, spiritual background music, contemplative atmosphere",
    section: "Música"
  },

  // Não sabe por onde começar
  {
    filename: "onde-comecar-introducao-fe.png",
    prompt: "Create a beautiful religious artwork in renaissance style, introduction to faith, basic doctrine, beginning spiritual journey, foundational teachings, first steps in faith",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-como-rezar-terco.png",
    prompt: "Create a beautiful religious artwork in renaissance style, how to pray the rosary, Marian prayer power, rosary beads, learning to pray, spiritual instruction",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-lectio-divina-guia.png",
    prompt: "Create a beautiful religious artwork in renaissance style, lectio divina guide, Word of God meditation, sacred scripture reading, spiritual reading method, divine word",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-credo-explicado.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Creed explained, articles of faith, fundamental beliefs, Catholic doctrine, faith understanding",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-sacramentos.png",
    prompt: "Create a beautiful religious artwork in renaissance style, seven sacraments, visible signs of invisible grace, Catholic sacramental life, divine grace, holy mysteries",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-vida-santos.png",
    prompt: "Create a beautiful religious artwork in renaissance style, lives of saints, examples of faith and virtue, saintly witnesses, holy inspiration, spiritual models",
    section: "Não sabe por onde começar"
  },

  // Temáticas
  {
    filename: "tematicas-paciencia-divina.png",
    prompt: "Create a beautiful religious artwork in renaissance style, divine patience, waiting with God and trusting, spiritual virtue, peaceful endurance, trust in divine timing",
    section: "Temáticas"
  },
  {
    filename: "tematicas-perdao-misericordia.png",
    prompt: "Create a beautiful religious artwork in renaissance style, forgiveness and mercy, 'Father forgive them for they know not what they do', divine mercy, compassionate heart",
    section: "Temáticas"
  },
  {
    filename: "tematicas-esperanca-crista.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Christian hope, virtue that moves us, theological virtue, hopeful expectation, divine promise",
    section: "Temáticas"
  },

  // Orações infantis
  {
    filename: "oracoes-infantis-intro-criancas-fe.png",
    prompt: "Create a beautiful religious artwork in renaissance style, children in faith, Agape Children, young souls learning prayer, family faith, children's spirituality",
    section: "Orações infantis"
  },
  {
    filename: "oracoes-infantis-familia-unida.png",
    prompt: "Create a beautiful religious artwork in renaissance style, united family prayers, praying with children, family devotion, domestic church, children and parents together",
    section: "Orações infantis"
  },
  {
    filename: "oracoes-infantis-anjinho-guarda.png",
    prompt: "Create a beautiful religious artwork in renaissance style, guardian angel prayer, children's prayer, protective angel, innocent devotion, angelic protection",
    section: "Orações infantis"
  },
  {
    filename: "oracoes-infantis-historias-biblicas.png",
    prompt: "Create a biblical scene illustration, children's biblical stories, Bible adventures for little ones, age-appropriate biblical narratives, faith formation for children",
    section: "Orações infantis"
  },
  {
    filename: "oracoes-infantis-musicas-catolicas.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Catholic children's music, sing and praise with joy, musical faith expression, joyful worship for children",
    section: "Orações infantis"
  },
  {
    filename: "oracoes-infantis-boa-noite-jesus.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Good night Jesus prayer, bedtime prayer, children's evening devotion, peaceful sleep with Jesus",
    section: "Orações infantis"
  },

  // Novenas
  {
    filename: "novenas-sao-jose-operario.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Saint Joseph the Worker novena, patron of workers, carpenter saint, family protector, nine days of prayer",
    section: "Novenas"
  },
  {
    filename: "novenas-sagrado-coracao-jesus.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Sacred Heart of Jesus novena, divine love, red heart with thorns, golden rays, 'I trust in You Lord'",
    section: "Novenas"
  },
  {
    filename: "novenas-santa-maria-pura.png",
    prompt: "Create a beautiful religious artwork in renaissance style, Saint Mary Pure novena, admirable Mother, Marian devotion, pure Virgin, maternal intercession",
    section: "Novenas"
  },

  // Explore por Categorias
  {
    filename: "explore-audios-biblia-sagrada.png",
    prompt: "Create a biblical scene illustration, Sacred Bible audios, walking through God's Word, sacred scripture, biblical narratives, divine word proclaimed",
    section: "Explore por Categorias"
  },
  {
    filename: "explore-meditacoes-guiadas.png",
    prompt: "Create a beautiful religious artwork in renaissance style, guided meditations, finding inner peace, contemplative prayer, spiritual guidance, peaceful meditation",
    section: "Explore por Categorias"
  }
]

// Função para gerar uma imagem
async function generateImage(imageData: any) {
  try {
    console.log(`Generating image: ${imageData.filename}...`)
    
    const response = await fetch('http://localhost:3000/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: imageData.prompt,
        size: "1024x1024",
        quality: "standard",
        style: "natural"
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.imageUrl) {
      // Download da imagem
      const imageResponse = await fetch(data.imageUrl)
      const imageBuffer = await imageResponse.arrayBuffer()
      
      // Criar diretório se não existir
      const dir = path.join(process.cwd(), 'public', 'images', 'generated')
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      
      // Salvar imagem
      const filepath = path.join(dir, imageData.filename)
      fs.writeFileSync(filepath, new Uint8Array(imageBuffer))
      
      console.log(`✅ Generated: ${imageData.filename}`)
      return { success: true, filename: imageData.filename, url: data.imageUrl }
    } else {
      throw new Error('No image URL returned')
    }
  } catch (error) {
    console.error(`❌ Error generating ${imageData.filename}:`, error)
    return { success: false, filename: imageData.filename, error: (error as Error).message }
  }
}

// Função principal
async function generateAllImages() {
  console.log(`🎨 Starting generation of ${imagesToGenerate.length} images...`)
  
  const results = []
  
  for (let i = 0; i < imagesToGenerate.length; i++) {
    const imageData = imagesToGenerate[i]
    console.log(`\n📸 [${i + 1}/${imagesToGenerate.length}] ${imageData.section}`)
    
    const result = await generateImage(imageData)
    results.push(result)
    
    // Pausa entre gerações para respeitar rate limits
    if (i < imagesToGenerate.length - 1) {
      console.log('⏳ Waiting 3 seconds...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }
  
  // Relatório final
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(`\n🎯 GENERATION COMPLETE!`)
  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📊 Total: ${results.length}`)
  
  if (failed > 0) {
    console.log(`\n❌ Failed images:`)
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.filename}: ${r.error}`)
    })
  }
  
  // Salvar relatório
  const report = {
    timestamp: new Date().toISOString(),
    total: results.length,
    successful,
    failed,
    results
  }
  
  const reportPath = path.join(process.cwd(), 'public', 'images', 'generated', 'generation-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n📝 Report saved to: ${reportPath}`)
}

// Executar se chamado diretamente
if (require.main === module) {
  generateAllImages().catch(console.error)
}

export { generateAllImages, imagesToGenerate }