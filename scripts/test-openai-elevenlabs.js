// Teste backend: Geração de texto (OpenAI) + áudio (ElevenLabs)
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js')

async function uploadToSupabaseStorage(localFilePath, storagePath) {
  const supabaseUrl = 'https://llomihbcknpzndlabmmt.supabase.co'
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const fileBuffer = fs.readFileSync(localFilePath)
  const { data, error } = await supabase.storage.from('audios').upload(storagePath, fileBuffer, {
    contentType: 'audio/mpeg',
    upsert: true,
  })
  if (error) throw error
  return `${supabaseUrl}/storage/v1/object/public/audios/${storagePath}`
}

async function updateAudioUrlInDatabase(audioId, audioUrl) {
  const supabaseUrl = 'https://llomihbcknpzndlabmmt.supabase.co'
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const { error } = await supabase
    .from('audios')
    .update({ audio_url: audioUrl })
    .eq('id', audioId)
  if (error) throw error
}

async function main() {
  // 1. Gerar texto com OpenAI (v5.x)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = 'Faça uma breve oração católica para começar o dia.';
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 100,
    temperature: 0.7,
  });
  const texto = completion.choices[0].message.content.trim();
  console.log('Texto gerado pela OpenAI:', texto);

  // 2. Gerar áudio com ElevenLabs
  const elevenApiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = '21m00Tcm4TlvDq8ikWAM'; // Voz padrão "Rachel" ElevenLabs
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  const response = await axios.post(
    url,
    {
      text: texto,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.5 },
    },
    {
      headers: {
        'xi-api-key': elevenApiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      responseType: 'arraybuffer',
    }
  );
  const audioBuffer = Buffer.from(response.data, 'binary');
  const mp3Path = path.join(__dirname, 'openai-elevenlabs-teste.mp3');
  fs.writeFileSync(mp3Path, audioBuffer);
  console.log('Áudio salvo em:', mp3Path);

  // 3. Upload para Supabase Storage e atualizar banco
  const storagePath = `teste_padre/openai-elevenlabs-teste.mp3`
  const publicUrl = await uploadToSupabaseStorage(mp3Path, storagePath)
  await updateAudioUrlInDatabase('d7e7a808-44e9-4f4a-b012-2575bc3a81a0', publicUrl)
  console.log('Áudio vinculado à oração teste_padre:', publicUrl)
}

main().catch(console.error) 