import { type NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"
import { createClient } from "@supabase/supabase-js"

// Initialize clients
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json()

    if (!title || !description) {
      return NextResponse.json({ error: "Título e descrição são obrigatórios." }, { status: 400 })
    }

    // 1. Generate script with OpenAI
    const scriptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Você é um roteirista para meditações e orações em áudio. Crie um roteiro calmo e reflexivo com base no título e na descrição fornecidos. O roteiro deve ser apropriado para narração. Não inclua títulos ou anotações, apenas o texto a ser falado.",
        },
        { role: "user", content: `Título: ${title}\nDescrição: ${description}` },
      ],
      max_tokens: 500,
    })

    const script = scriptResponse.choices[0].message.content
    if (!script) {
      throw new Error("Falha ao gerar roteiro com a OpenAI.")
    }

    // 2. Generate audio with ElevenLabs
    const elevenLabsResponse = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", // Voice ID for "Rachel"
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        },
        body: JSON.stringify({
          text: script,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      },
    )

    if (!elevenLabsResponse.ok) {
      const errorBody = await elevenLabsResponse.text()
      throw new Error(`Falha na API da ElevenLabs: ${errorBody}`)
    }

    const audioBuffer = await elevenLabsResponse.arrayBuffer()

    // 3. Upload audio to Supabase Storage
    const fileName = `audio_${Date.now()}.mp3`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("audios") // Make sure you have a bucket named 'audios'
      .upload(fileName, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Falha no upload para o Supabase: ${uploadError.message}`)
    }

    // 4. Get public URL and save metadata to 'audios' table
    const { data: urlData } = supabase.storage.from("audios").getPublicUrl(fileName)

    const { data: dbData, error: dbError } = await supabase
      .from("audios")
      .insert([
        {
          title,
          description: script, // Save the generated script as the description
          audio_url: urlData.publicUrl,
          image_url: `/placeholder.svg?query=${encodeURIComponent(title)}`, // Generate a placeholder image
        },
      ])
      .select()
      .single()

    if (dbError) {
      throw new Error(`Falha ao salvar metadados no banco de dados: ${dbError.message}`)
    }

    return NextResponse.json(dbData)
  } catch (error: any) {
    console.error("Erro na geração de áudio:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
