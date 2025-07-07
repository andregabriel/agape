import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Lista de imagens para gerar (primeiras 5 para teste)
const imagesToGenerate = [
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

    return { success: true, filename: imageData.filename, url: imageUrl, id: imageData.id }
    
  } catch (error) {
    console.error(`❌ Error generating ${imageData.filename}:`, error)
    return { 
      success: false, 
      filename: imageData.filename, 
      id: imageData.id,
      error: error instanceof Error ? error.message : String(error) 
    }
  }
}

export async function POST(request: Request) {
  try {
    const { imageCount = 5 } = await request.json()
    
    console.log(`🚀 Starting generation of ${imageCount} images...`)
    
    const results = []
    const imagesToProcess = imagesToGenerate.slice(0, imageCount)
    
    for (const imageData of imagesToProcess) {
      const result = await generateImage(imageData)
      results.push(result)
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    
    // Summary
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length
    
    console.log(`📊 SUMMARY:`)
    console.log(`✅ Successful: ${successful}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`💰 Estimated cost: $${(successful * 0.04).toFixed(2)}`)
    
    return NextResponse.json({
      success: true,
      summary: {
        total: results.length,
        successful,
        failed,
        cost: (successful * 0.04).toFixed(2)
      },
      results
    })
    
  } catch (error) {
    console.error('Error in image generation API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Image generation API ready",
    available: !!process.env.OPENAI_API_KEY,
    imagesCount: imagesToGenerate.length
  })
}