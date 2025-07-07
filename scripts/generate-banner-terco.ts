import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function generateBannerImage() {
  try {
    console.log('🎨 Generating banner for "Terço Diário - Sábado"...')
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a beautiful Catholic prayer banner for "Terço Diário - Sábado" (Daily Rosary - Saturday) featuring "Mistérios Gozosos" (Joyful Mysteries). Style: Peaceful hands holding rosary beads, warm spiritual lighting, Catholic devotional art, green and blue tones similar to prayer app aesthetic. Show rosary beads prominently, gentle praying hands, serene atmosphere. Landscape orientation 16:9 aspect ratio. Professional religious art style, warm and welcoming colors, suitable for mobile Catholic prayer app banner.`,
      n: 1,
      size: "1792x1024", // Landscape format for banner
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
    
    // Save to public/images/banners/
    const dir = path.join(process.cwd(), 'public', 'images', 'banners')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    const filepath = path.join(dir, 'terco-diario-sabado.png')
    fs.writeFileSync(filepath, new Uint8Array(imageBuffer))
    
    console.log('✅ Generated: terco-diario-sabado.png')
    console.log('📁 Saved to: /public/images/banners/')
    console.log('🔗 Image URL for reference:', imageUrl)
    
    return { success: true, filename: 'terco-diario-sabado.png', url: imageUrl }
    
  } catch (error) {
    console.error('❌ Error generating banner:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// Run the generation
generateBannerImage()
  .then(result => {
    if (result.success) {
      console.log('\n🎉 Banner generation completed successfully!')
      console.log('💰 Cost: ~$0.08 (1792x1024 DALL-E 3 image)')
    } else {
      console.log('\n❌ Banner generation failed:', result.error)
    }
  })
  .catch(console.error)