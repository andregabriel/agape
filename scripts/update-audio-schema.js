import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://llomihbcknpzndlabmmt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTc1MzQsImV4cCI6MjA2NTgzMzUzNH0.lP6F0JwQZ-n6Y2w67MLCdTPcUaiVw-ddloryJrlbq7U'

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateAudioSchema() {
  try {
    console.log('🔄 Atualizando schema da tabela audios...')
    
    // Ler o arquivo SQL
    const sqlContent = fs.readFileSync('./scripts/add-audio-fields.sql', 'utf8')
    
    // Executar o SQL via RPC (se disponível) ou via query direta
    const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent })
    
    if (error) {
      console.log('❌ Erro ao executar SQL via RPC:', error.message)
      console.log('📝 SQL que precisa ser executado manualmente:')
      console.log(sqlContent)
      return
    }
    
    console.log('✅ Schema atualizado com sucesso!')
    console.log('📊 Campos adicionados: subtitle, elevenlabs_voice_id, category')
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
    console.log('📝 Execute manualmente o SQL em scripts/add-audio-fields.sql')
  }
}

updateAudioSchema() 