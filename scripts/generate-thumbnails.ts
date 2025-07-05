import fs from 'fs'
import path from 'path'

// Lista de todas as imagens que precisam ser geradas para a home page
const imagesToGenerate = [
  // Carrossel de Teste
  {
    filename: "teste-padre-oracao-matinal.png",
    prompt: "Create a beautiful religious artwork in renaissance style, peaceful prayer scene with morning light, Catholic priest praying, soft golden rays, serene atmosphere, spiritual awakening, sacred space, warm colors",
    section: "Teste"
  },
  {
    filename: "teste-storytelling-historia-biblica.png", 
    prompt: "Create a beautiful religious artwork in renaissance style, Jesus calming the storm, dramatic biblical scene, disciples in boat, divine power over nature, storytelling atmosphere, peaceful resolution, dramatic lighting",
    section: "Teste"
  },

  // Corpus Christi
  {
    filename: "corpus-christi-santo-ambrosio.png",
    prompt: "Create a beautiful religious artwork showing Saint Ambrose of Milan, Catholic saint with episcopal vestments, golden miter, holding a book, church background, renaissance style, divine light, sacred atmosphere",
    section: "Corpus Christi"
  },
  {
    filename: "corpus-christi-amor-eucaristia.png",
    prompt: "Create a beautiful religious artwork of the Eucharist, golden chalice and host, divine light rays, sacred heart imagery, renaissance style, warm golden tones, spiritual love, holy communion",
    section: "Corpus Christi"
  },
  {
    filename: "corpus-christi-comunhao-espiritual.png",
    prompt: "Create a beautiful religious artwork of spiritual communion, praying hands, divine light, sacred heart of Jesus, renaissance style, peaceful meditation, spiritual connection, warm lighting",
    section: "Corpus Christi"
  },
  {
    filename: "corpus-christi-adoracao-santissimo.png",
    prompt: "Create a beautiful religious artwork of Eucharistic adoration, golden monstrance, divine rays, kneeling figures in prayer, church interior, renaissance style, sacred atmosphere, holy worship",
    section: "Corpus Christi"
  },

  // Destaques
  {
    filename: "destaques-novena-namorados.png",
    prompt: "Create a beautiful religious artwork of Saints Joachim and Anna, elderly holy couple, biblical times clothing, gentle expressions, divine blessing, renaissance style, family love, sacred marriage",
    section: "Destaques"
  },
  {
    filename: "destaques-novena-casais.png",
    prompt: "Create a beautiful religious artwork of a Christian couple praying together, wedding rings, holy family imagery, divine blessing, renaissance style, matrimonial love, spiritual unity",
    section: "Destaques"
  },
  {
    filename: "destaques-novena-filhos.png",
    prompt: "Create a beautiful religious artwork of the Holy Family, Mary, Joseph and child Jesus, peaceful domestic scene, parental love, divine protection, renaissance style, family blessing",
    section: "Destaques"
  },

  // Rotinas Matinais
  {
    filename: "rotinas-terco-diario.png",
    prompt: "Create a beautiful religious artwork of rosary prayer, hands holding rosary beads, morning light, peaceful meditation, Catholic devotion, renaissance style, spiritual discipline, divine grace",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-evangelho-diario.png",
    prompt: "Create a beautiful religious artwork of Gospel reading, open Bible with divine light, morning scene, lectio divina, spiritual study, renaissance style, sacred scripture, holy wisdom",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-oferecimento-manha.png",
    prompt: "Create a beautiful religious artwork of morning offering, sunrise, praying figure, hands raised to heaven, new day blessing, renaissance style, spiritual dedication, divine consecration",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-desafio-meditacao.png",
    prompt: "Create a beautiful religious artwork of peaceful meditation, serene landscape, contemplative figure, inner peace, spiritual tranquility, renaissance style, mental clarity, divine serenity",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-diario-gratidao.png",
    prompt: "Create a beautiful religious artwork representing gratitude, thankful prayer, abundant blessings, harvest imagery, grateful heart, renaissance style, divine providence, spiritual appreciation",
    section: "Rotinas Matinais"
  },
  {
    filename: "rotinas-santo-dia.png",
    prompt: "Create a beautiful religious artwork of Catholic saints, holy figures with halos, diverse saints representing different virtues, renaissance style, saintly inspiration, divine examples",
    section: "Rotinas Matinais"
  },

  // Favoritas dos Assinantes
  {
    filename: "favoritas-oracao-noite.png",
    prompt: "Create a beautiful religious artwork of evening prayer, peaceful night scene, moonlight, bedside prayer, spiritual reflection, renaissance style, nighttime devotion, divine peace",
    section: "Favoritas dos Assinantes"
  },
  {
    filename: "favoritas-inspiracao-divina.png",
    prompt: "Create a beautiful religious artwork of divine inspiration, holy spirit dove, rays of light, spiritual enlightenment, prophetic vision, renaissance style, divine revelation, sacred wisdom",
    section: "Favoritas dos Assinantes"
  },
  {
    filename: "favoritas-santo-reflexoes.png",
    prompt: "Create a beautiful religious artwork of saints in contemplation, holy figures in prayer, spiritual reflection, divine wisdom, renaissance style, saintly meditation, sacred thoughts",
    section: "Favoritas dos Assinantes"
  },

  // Diárias com Convidados
  {
    filename: "diarias-evangelho-comentado.png",
    prompt: "Create a beautiful religious artwork of Gospel commentary, teacher with scripture, disciples listening, biblical teaching, renaissance style, sacred instruction, divine word",
    section: "Diárias com Convidados"
  },
  {
    filename: "diarias-imitacao-cristo.png",
    prompt: "Create a beautiful religious artwork of following Christ, disciples walking with Jesus, spiritual journey, Christian discipleship, renaissance style, sacred path, divine guidance",
    section: "Diárias com Convidados"
  },
  {
    filename: "diarias-terco-familia.png",
    prompt: "Create a beautiful religious artwork of family rosary, parents and children praying together, family devotion, domestic church, renaissance style, familial prayer, sacred tradition",
    section: "Diárias com Convidados"
  },

  // Rotinas Noturnas
  {
    filename: "noturnas-oracao-dormir.png",
    prompt: "Create a beautiful religious artwork of bedtime prayer, peaceful bedroom scene, guardian angel, nighttime blessing, spiritual protection, renaissance style, restful sleep, divine care",
    section: "Rotinas Noturnas"
  },
  {
    filename: "noturnas-minuto-paz.png",
    prompt: "Create a beautiful religious artwork of inner peace, tranquil night scene, stars, spiritual calm, divine serenity, renaissance style, peaceful rest, holy quietude",
    section: "Rotinas Noturnas"
  },
  {
    filename: "noturnas-sabedoria-noturna.png",
    prompt: "Create a beautiful religious artwork of nighttime wisdom, owl symbolism, moonlight, contemplative study, spiritual insight, renaissance style, nocturnal reflection, divine knowledge",
    section: "Rotinas Noturnas"
  },

  // Histórias Bíblicas para Dormir
  {
    filename: "biblicas-vocacao-moises.png",
    prompt: "Create a beautiful religious artwork of Moses and the burning bush, biblical scene, divine calling, desert landscape, holy fire, renaissance style, prophetic vision, sacred mission",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "biblicas-lazaro-ressurreicao.png",
    prompt: "Create a beautiful religious artwork of Lazarus resurrection, Jesus calling forth Lazarus, tomb scene, divine miracle, biblical drama, renaissance style, resurrection power, sacred healing",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "biblicas-anunciacao.png",
    prompt: "Create a beautiful religious artwork of the Annunciation, Angel Gabriel and Virgin Mary, lily flowers, divine light, holy spirit dove, renaissance style, sacred announcement, divine incarnation",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "biblicas-filho-prodigo.png",
    prompt: "Create a beautiful religious artwork of the Prodigal Son, father embracing returning son, parable scene, forgiveness, divine mercy, renaissance style, paternal love, sacred reconciliation",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "biblicas-jonas-baleia.png",
    prompt: "Create a beautiful religious artwork of Jonah and the whale, biblical sea scene, great fish, divine providence, storm and calm, renaissance style, prophetic calling, sacred rescue",
    section: "Histórias Bíblicas para Dormir"
  },
  {
    filename: "biblicas-daniel-leoes.png",
    prompt: "Create a beautiful religious artwork of Daniel in lions den, peaceful Daniel among lions, divine protection, biblical courage, renaissance style, faithful witness, sacred deliverance",
    section: "Histórias Bíblicas para Dormir"
  },

  // Rezadas Recentemente
  {
    filename: "recentes-terco-meditado.png",
    prompt: "Create a beautiful religious artwork of meditative rosary, contemplative prayer, rosary mysteries, spiritual meditation, renaissance style, Marian devotion, sacred contemplation",
    section: "Rezadas Recentemente"
  },
  {
    filename: "recentes-imitacao-cristo.png",
    prompt: "Create a beautiful religious artwork of Christ imitation, Christian discipleship, spiritual book, monastic study, renaissance style, sacred reading, divine wisdom",
    section: "Rezadas Recentemente"
  },
  {
    filename: "recentes-evangelho-lectio.png",
    prompt: "Create a beautiful religious artwork of lectio divina, sacred reading, Gospel book with divine light, contemplative study, renaissance style, spiritual practice, holy scripture",
    section: "Rezadas Recentemente"
  },

  // Músicas para Dormir
  {
    filename: "musicas-piano-dormir.png",
    prompt: "Create a beautiful religious artwork of peaceful piano music, ethereal scene, musical notes floating, divine harmony, renaissance style, celestial music, sacred melody",
    section: "Músicas para Dormir"
  },
  {
    filename: "musicas-piano-relaxante.png",
    prompt: "Create a beautiful religious artwork of relaxing divine music, heavenly choir, angelic instruments, peaceful atmosphere, renaissance style, celestial harmony, sacred sound",
    section: "Músicas para Dormir"
  },
  {
    filename: "musicas-canto-gregoriano.png",
    prompt: "Create a beautiful religious artwork of Gregorian chant, monastery choir, ancient musical notation, sacred singing, renaissance style, monastic tradition, holy music",
    section: "Músicas para Dormir"
  },

  // Minuto de Homilia
  {
    filename: "homilia-minuto-sergio.png",
    prompt: "Create a beautiful religious artwork of priest giving homily, pulpit scene, Catholic priest preaching, congregation listening, renaissance style, sacred teaching, divine word",
    section: "Minuto de Homilia"
  },

  // Novo Testamento
  {
    filename: "novo-testamento-mateus.png",
    prompt: "Create a beautiful religious artwork of Gospel of Matthew, Saint Matthew writing, angel inspiration, biblical scroll, renaissance style, evangelist portrait, sacred scripture",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-marcos.png",
    prompt: "Create a beautiful religious artwork of Gospel of Mark, Saint Mark with lion symbol, biblical writing, evangelist study, renaissance style, sacred authorship, divine inspiration",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-lucas.png",
    prompt: "Create a beautiful religious artwork of Gospel of Luke, Saint Luke with ox symbol, physician evangelist, biblical manuscript, renaissance style, sacred writing, holy gospel",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-joao.png",
    prompt: "Create a beautiful religious artwork of Gospel of John, Saint John with eagle symbol, beloved disciple, mystical gospel, renaissance style, divine love, sacred revelation",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-atos.png",
    prompt: "Create a beautiful religious artwork of Acts of Apostles, early church, apostles preaching, Pentecost scene, holy spirit fire, renaissance style, church foundation, sacred mission",
    section: "Novo Testamento"
  },
  {
    filename: "novo-testamento-apocalipse.png",
    prompt: "Create a beautiful religious artwork of Book of Revelation, apocalyptic vision, Saint John on Patmos, divine revelation, heavenly scenes, renaissance style, prophetic vision, sacred mystery",
    section: "Novo Testamento"
  },

  // Música
  {
    filename: "musica-lofi-catolico.png",
    prompt: "Create a beautiful religious artwork of peaceful Catholic music, modern spiritual atmosphere, headphones with cross, contemporary faith, renaissance style, sacred sound, divine harmony",
    section: "Música"
  },
  {
    filename: "musica-canto-gregoriano-estudo.png",
    prompt: "Create a beautiful religious artwork of Gregorian chant study, ancient musical manuscripts, monastery library, sacred music notation, renaissance style, musical tradition, holy learning",
    section: "Música"
  },
  {
    filename: "musica-instrumental-oracao.png",
    prompt: "Create a beautiful religious artwork of instrumental prayer music, heavenly instruments, divine orchestra, peaceful worship, renaissance style, celestial symphony, sacred instruments",
    section: "Música"
  },

  // Não sabe por onde começar
  {
    filename: "onde-comecar-introdutorio.png",
    prompt: "Create a beautiful religious artwork of faith introduction, open door to church, welcoming light, spiritual beginning, renaissance style, new believer, sacred invitation",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-terco.png",
    prompt: "Create a beautiful religious artwork of learning to pray rosary, teaching hands with rosary, Marian devotion, prayer instruction, renaissance style, sacred learning, holy practice",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-lectio-divina.png",
    prompt: "Create a beautiful religious artwork of lectio divina guide, sacred reading instruction, Bible study, spiritual practice, renaissance style, divine reading, holy meditation",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-credo.png",
    prompt: "Create a beautiful religious artwork of the Creed, articles of faith, Catholic doctrine, symbols of faith, renaissance style, sacred beliefs, divine truth",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-sacramentos.png",
    prompt: "Create a beautiful religious artwork of seven sacraments, baptism, communion, confirmation symbols, sacramental grace, renaissance style, sacred signs, divine gifts",
    section: "Não sabe por onde começar"
  },
  {
    filename: "onde-comecar-vida-santos.png",
    prompt: "Create a beautiful religious artwork of saints lives, multiple holy figures, saintly examples, halos and virtue symbols, renaissance style, sacred inspiration, divine models",
    section: "Não sabe por onde começar"
  },

  // Temáticas
  {
    filename: "tematicas-espiritualidade.png",
    prompt: "Create a beautiful religious artwork of Christian spirituality, dove and cross, spiritual themes, divine connection, renaissance style, sacred topics, holy subjects",
    section: "Temáticas"
  },
  {
    filename: "tematicas-vida-crista.png",
    prompt: "Create a beautiful religious artwork of Christian living, daily faith, cross in daily life, spiritual practice, renaissance style, faithful living, sacred lifestyle",
    section: "Temáticas"
  },
  {
    filename: "tematicas-oracao.png",
    prompt: "Create a beautiful religious artwork of prayer themes, various prayer postures, contemplative prayer, spiritual communication, renaissance style, sacred dialogue, divine conversation",
    section: "Temáticas"
  },

  // Orações infantis
  {
    filename: "infantis-intro-criancas.png",
    prompt: "Create a beautiful religious artwork of children in faith, young children praying, innocent devotion, family faith, renaissance style, childhood spirituality, sacred upbringing",
    section: "Orações infantis"
  },
  {
    filename: "infantis-familia-unida.png",
    prompt: "Create a beautiful religious artwork of family prayer, parents and children together, united family worship, domestic church, renaissance style, family devotion, sacred unity",
    section: "Orações infantis"
  },
  {
    filename: "infantis-anjo-guarda.png",
    prompt: "Create a beautiful religious artwork of guardian angel, angel protecting child, divine protection, innocent prayer, renaissance style, angelic care, sacred guardianship",
    section: "Orações infantis"
  },
  {
    filename: "infantis-historias-biblicas.png",
    prompt: "Create a beautiful religious artwork of biblical stories for children, Jesus with children, gentle teaching, child-friendly Bible scenes, renaissance style, sacred storytelling, divine love",
    section: "Orações infantis"
  },
  {
    filename: "infantis-musicas-catolicas.png",
    prompt: "Create a beautiful religious artwork of children singing Catholic songs, choir of children, joyful worship, musical praise, renaissance style, sacred music, divine joy",
    section: "Orações infantis"
  },
  {
    filename: "infantis-boa-noite-jesus.png",
    prompt: "Create a beautiful religious artwork of bedtime prayer for children, child praying before sleep, Jesus blessing, nighttime protection, renaissance style, peaceful rest, sacred care",
    section: "Orações infantis"
  },

  // Novenas
  {
    filename: "novenas-devocionais.png",
    prompt: "Create a beautiful religious artwork of novena devotion, nine days of prayer, candles and prayer books, spiritual discipline, renaissance style, sacred practice, divine petition",
    section: "Novenas"
  },
  {
    filename: "novenas-santos.png",
    prompt: "Create a beautiful religious artwork of saints novenas, various saints interceding, prayer to saints, holy intercession, renaissance style, saintly devotion, sacred mediation",
    section: "Novenas"
  },
  {
    filename: "novenas-marianas.png",
    prompt: "Create a beautiful religious artwork of Marian novenas, Virgin Mary apparitions, rosary devotion, maternal intercession, renaissance style, Marian spirituality, sacred motherhood",
    section: "Novenas"
  },

  // Explore por Categorias
  {
    filename: "explore-lofi-catolico.png",
    prompt: "Create a beautiful religious artwork of Catholic lofi music, modern spiritual atmosphere, peaceful study with faith elements, contemporary devotion, renaissance style, sacred focus, divine concentration",
    section: "Explore por Categorias"
  },
  {
    filename: "explore-biblia-audios.png",
    prompt: "Create a beautiful religious artwork of Bible audio, sacred scripture with sound waves, divine word being heard, spiritual listening, renaissance style, auditory scripture, sacred hearing",
    section: "Explore por Categorias"
  },
  {
    filename: "explore-meditacoes.png",
    prompt: "Create a beautiful religious artwork of guided meditations, peaceful contemplation, spiritual guidance, inner peace, renaissance style, sacred reflection, divine tranquility",
    section: "Explore por Categorias"
  },

  // Reflita sobre o Evangelho
  {
    filename: "reflita-homilia-semanal.png",
    prompt: "Create a beautiful religious artwork of weekly homily, priest at pulpit, Gospel book open, congregation in reflection, renaissance style, sacred preaching, divine word",
    section: "Reflita sobre o Evangelho"
  }
]

// Função para gerar uma imagem usando OpenAI DALL-E
async function generateImage(imageData: typeof imagesToGenerate[0]) {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imageData.prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url'
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.data && data.data[0] && data.data[0].url) {
      // Baixar a imagem
      const imageResponse = await fetch(data.data[0].url)
      const imageBuffer = await imageResponse.arrayBuffer()
      
      // Criar diretório se não existir
      const dir = path.join(process.cwd(), 'public', 'images', 'home', 'thumbnails')
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      
      // Salvar imagem
      const filepath = path.join(dir, imageData.filename)
      fs.writeFileSync(filepath, new Uint8Array(imageBuffer))
      
      console.log(`✅ Generated: ${imageData.filename}`)
      return { success: true, filename: imageData.filename, url: data.data[0].url }
    } else {
      throw new Error('No image URL returned')
    }
  } catch (error) {
    console.error(`❌ Error generating ${imageData.filename}:`, error)
    return { success: false, filename: imageData.filename, error: error instanceof Error ? error.message : String(error) }
  }
}

// Função para gerar todas as imagens
async function generateAllImages() {
  console.log(`🎨 Starting generation of ${imagesToGenerate.length} thumbnail images...`)
  
  const results = []
  let successCount = 0
  let errorCount = 0
  
  // Gerar imagens com delay para evitar rate limiting
  for (const imageData of imagesToGenerate) {
    console.log(`🎨 Generating: ${imageData.filename} (${imageData.section})`)
    
    const result = await generateImage(imageData)
    results.push(result)
    
    if (result.success) {
      successCount++
    } else {
      errorCount++
    }
    
    // Delay de 2 segundos entre cada geração para evitar rate limiting
    if (imagesToGenerate.indexOf(imageData) < imagesToGenerate.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }
  
  console.log(`\n📊 Generation Summary:`)
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📁 Images saved to: public/images/home/thumbnails/`)
  
  // Salvar relatório
  const reportPath = path.join(process.cwd(), 'generation-report.json')
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    total: imagesToGenerate.length,
    success: successCount,
    errors: errorCount,
    results: results
  }, null, 2))
  
  console.log(`📋 Report saved to: generation-report.json`)
}

// Executar se chamado diretamente
if (require.main === module) {
  generateAllImages().catch(console.error)
}

export { generateAllImages, imagesToGenerate }