import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Lista das 11 imagens que faltam
const imagesToGenerate = [
  // Rotinas Matinais (5 imagens)
  {
    id: "mr6",
    filename: "santo-do-dia.png",
    title: "Santo do Dia",
    prompt: "Daily saint inspiration, calendar saint, holy example, spiritual patron, daily sanctity, saintly guidance, catholic saint with halo, peaceful expression, warm lighting",
    category: "Rotinas Matinais"
  },
  {
    id: "mr5",
    filename: "diario-gratidao.png",
    title: "Diário de Gratidão",
    prompt: "Gratitude journal, morning reflection, thankful heart, writing blessings, spiritual diary, grateful prayer, open journal with pen, peaceful morning scene",
    category: "Rotinas Matinais"
  },
  {
    id: "mr3",
    filename: "oferecimento-manha.png",
    title: "Oferecimento da Manhã",
    prompt: "Morning offering prayer, hands raised in offering, sunrise dedication, consecrating the day, morning devotion, spiritual gift, dawn breaking, peaceful prayer",
    category: "Rotinas Matinais"
  },
  {
    id: "mr2",
    filename: "evangelho-diario.png",
    title: "Evangelho Diário",
    prompt: "Daily Gospel reading, morning scripture, Bible open to Gospel, daily lectio divina, spiritual reading, dawn light, peaceful study, sacred text",
    category: "Rotinas Matinais"
  },
  {
    id: "mr1",
    filename: "terco-diario.png",
    title: "Terço Diário",
    prompt: "Morning rosary prayer, sunrise through window, daily devotion, rosary beads, morning routine, spiritual discipline, peaceful prayer time",
    category: "Rotinas Matinais"
  },

  // Orações infantis (6 imagens)
  {
    id: "kp6",
    filename: "boa-noite-jesus.png",
    title: "Boa Noite, Jesus",
    prompt: "Child saying bedtime prayers, Jesus watching over, nighttime protection, peaceful sleep, childhood devotion, bedtime blessing, gentle Jesus with child",
    category: "Orações Infantis"
  },
  {
    id: "kp5",
    filename: "musicas-catolicas-infantis.png",
    title: "Músicas Católicas Infantis",
    prompt: "Children singing Catholic songs, joyful worship, kids' choir, musical prayer, childhood praise, innocent voices, children with instruments, happy singing",
    category: "Orações Infantis"
  },
  {
    id: "kp4",
    filename: "historias-biblicas-infantis.png",
    title: "Histórias Bíblicas Infantis",
    prompt: "Children's Bible stories, colorful biblical scenes, kid-friendly narratives, young audience, biblical adventure, faith stories, children reading Bible",
    category: "Orações Infantis"
  },
  {
    id: "kp3",
    filename: "anjinho-guarda.png",
    title: "Anjinho da Guarda",
    prompt: "Guardian angel with child, protective angel, childhood prayer, angelic protection, innocent prayer, heavenly guardian, beautiful angel watching over child",
    category: "Orações Infantis"
  },
  {
    id: "kp2",
    filename: "oracoes-familia-unida.png",
    title: "Orações em Família Unida",
    prompt: "Family prayer time, parents and children praying, united family, domestic church, family devotion, home altar, loving family together in prayer",
    category: "Orações Infantis"
  },
  {
    id: "kp1",
    filename: "intro-criancas-fe.png",
    title: "Intro: Crianças na Fé",
    prompt: "Children praying together, family faith, young disciples, kids in prayer, childhood spirituality, innocent devotion, children learning about faith",
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

    const imageUrl = response.data?.[0]?.url
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
  console.log(`🚀 Starting generation of ${imagesToGenerate.length} remaining images...`)
  
  const results = []
  
  for (const imageData of imagesToGenerate) {
    const result = await generateImage(imageData)
    results.push(result)
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
  
  // Summary
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(`\n📊 FINAL SUMMARY:`)
  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`💰 Cost for this batch: $${(successful * 0.04).toFixed(2)}`)
  console.log(`💰 Total project cost: ~$${((50 + successful) * 0.04).toFixed(2)}`)
  
  if (failed > 0) {
    console.log(`\n❌ Failed images:`)
    results.filter(r => !r.success).forEach(r => {
      console.log(`- ${r.filename}: ${r.error}`)
    })
  }
  
  // Save results
  fs.writeFileSync('remaining-generation-results.json', JSON.stringify(results, null, 2))
  console.log(`\n📄 Results saved to remaining-generation-results.json`)
  
  if (successful === imagesToGenerate.length) {
    console.log(`\n🎉 ALL IMAGES COMPLETED! Total: ${50 + successful} images generated!`)
  }
}

// Run the generation
generateAllImages().catch(console.error)