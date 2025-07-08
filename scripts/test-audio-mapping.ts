import { getAudioMapping, getAudioMappingBySupabaseId, getAllAudioMappings } from '../lib/audio-mapping'

console.log('🧪 Testando mapeamento de áudio...')

// Teste 1: Mapeamento por ID da home
console.log('\n1. Teste mapeamento por ID da home:')
const homeMapping = getAudioMapping('teste_padre')
console.log('teste_padre ->', homeMapping)

// Teste 2: Mapeamento por ID do Supabase
console.log('\n2. Teste mapeamento por ID do Supabase:')
const supabaseMapping = getAudioMappingBySupabaseId('d7e7a808-44e9-4f4a-b012-2575bc3a81a0')
console.log('d7e7a808-44e9-4f4a-b012-2575bc3a81a0 ->', supabaseMapping)

// Teste 3: Listar todos os mapeamentos
console.log('\n3. Todos os mapeamentos:')
const allMappings = getAllAudioMappings()
allMappings.forEach(mapping => {
  console.log(`${mapping.homeId} -> ${mapping.supabaseId} (${mapping.title})`)
})

console.log('\n✅ Teste concluído!') 