require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkAndInsertTestPrayer() {
  const supabaseUrl = 'https://llomihbcknpzndlabmmt.supabase.co'
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Primeiro, vamos ver a estrutura da tabela
  console.log('Verificando estrutura da tabela audios...')
  const { data: tableInfo, error: tableError } = await supabase
    .from('audios')
    .select('*')
    .limit(1)

  if (tableError) {
    console.error('Erro ao verificar tabela:', tableError)
    return
  }

  console.log('Estrutura da tabela audios:', Object.keys(tableInfo[0] || {}))

  // Verificar se a oração teste_padre já existe
  const { data: existingPrayer, error: selectError } = await supabase
    .from('audios')
    .select('*')
    .eq('title', 'Oração Matinal de Teste')
    .single()

  if (selectError && selectError.code !== 'PGRST116') {
    console.error('Erro ao verificar oração:', selectError)
    return
  }

  if (existingPrayer) {
    console.log('Oração já existe:', existingPrayer.id)
    return existingPrayer.id
  }

  // Se não existe, inserir a oração (usando apenas campos básicos)
  const { data: newPrayer, error: insertError } = await supabase
    .from('audios')
    .insert({
      title: 'Oração Matinal de Teste',
      description: 'Teste com voz de padre'
    })
    .select()
    .single()

  if (insertError) {
    console.error('Erro ao inserir oração:', insertError)
    return
  }

  console.log('Oração criada com ID:', newPrayer.id)
  return newPrayer.id
}

checkAndInsertTestPrayer().catch(console.error) 