import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { title, subtitle, description, category, prompt, voiceType } = await request.json()

    // Validar campos obrigatórios
    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      )
    }

    // Construir prompt baseado no contexto
    let systemPrompt = `Você é um assistente especializado em criar orações e reflexões católicas. 
    Crie um texto que seja adequado para ser narrado em áudio, com linguagem clara e acessível.
    
    Contexto:
    - Título: ${title}
    - Subtítulo: ${subtitle || 'N/A'}
    - Descrição: ${description || 'N/A'}
    - Categoria: ${category}
    - Tipo de voz: ${voiceType === 'padre' ? 'Padre (voz masculina, séria e acolhedora)' : 'Storytelling (voz feminina, expressiva e envolvente)'}
    
    ${prompt ? `Prompt específico: ${prompt}` : ''}
    
    O texto deve:
    1. Ter entre 2-5 minutos de duração quando narrado
    2. Ser apropriado para a categoria especificada
    3. Ter uma estrutura clara com introdução, desenvolvimento e conclusão
    4. Usar linguagem acessível mas respeitosa
    5. Incluir elementos de fé católica quando apropriado
    6. Ser adequado para o tipo de voz especificado
    
    Retorne apenas o texto da oração/reflexão, sem formatação adicional.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Crie uma oração/reflexão para "${title}" na categoria "${category}".`
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const text = completion.choices[0]?.message?.content

    if (!text) {
      throw new Error('No text generated')
    }

    return NextResponse.json({ text })

  } catch (error) {
    console.error('Error generating text:', error)
    return NextResponse.json(
      { error: 'Failed to generate text' },
      { status: 500 }
    )
  }
} 