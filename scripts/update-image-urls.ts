import fs from 'fs'
import path from 'path'

// Read the home page file
const homePagePath = path.join(process.cwd(), 'app/home/page.tsx')
let content = fs.readFileSync(homePagePath, 'utf8')

// List of all IDs and their replacements
const replacements = [
  // Destaques
  { id: 'hl1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'hl2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'hl3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Favoritas dos Assinantes
  { id: 'sf1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'sf2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'sf3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Diárias com Convidados
  { id: 'dg1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'dg2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'dg3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Rotinas Noturnas
  { id: 'nr1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'nr2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'nr3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Rezadas Recentemente
  { id: 'rp1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'rp2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'rp3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Músicas para Dormir
  { id: 'ms1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'ms2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'ms3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Música
  { id: 'm1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'm2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'm3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Temáticas
  { id: 'th1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'th2', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'th3', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  
  // Novenas
  { id: 'nv1', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'nv_scj', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
  { id: 'nv_smp', search: 'imageUrl: "/placeholder.svg?width=300&height=400",' },
]

// Grid items (different format)
const gridReplacements = [
  // Histórias Bíblicas para Dormir
  { id: 'bs1', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'bs2', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'bs3', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'bs4', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'bs5', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'bs6', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  
  // Novo Testamento
  { id: 'nt1', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'nt2', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'nt3', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'nt4', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'nt5', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'nt6', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  
  // Não sabe por onde começar
  { id: 'ws1', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'ws2', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'ws3', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'ws4', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'ws5', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'ws6', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  
  // Rotinas Matinais
  { id: 'mr1', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'mr2', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'mr3', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'mr4', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'mr5', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
  { id: 'mr6', search: 'imageUrl: "/placeholder.svg?width=100&height=100",' },
]

console.log('🔄 Updating image URLs in home page...')

// Apply replacements for regular items
let updatedCount = 0
for (const replacement of replacements) {
  const newContent = content.replace(
    replacement.search,
    `imageUrl: getImageUrl("${replacement.id}"),`
  )
  if (newContent !== content) {
    content = newContent
    updatedCount++
    console.log(`✅ Updated ${replacement.id}`)
  }
}

// Apply replacements for grid items
for (const replacement of gridReplacements) {
  const newContent = content.replace(
    replacement.search,
    `imageUrl: getImageUrl("${replacement.id}"),`
  )
  if (newContent !== content) {
    content = newContent
    updatedCount++
    console.log(`✅ Updated ${replacement.id}`)
  }
}

// Write the updated content back
fs.writeFileSync(homePagePath, content)

console.log(`\n🎉 Updated ${updatedCount} image URLs!`)
console.log('📁 All placeholders now use getImageUrl() function')

// Also need to check if we need more images in the mapping
const generatedImages = fs.readdirSync(path.join(process.cwd(), 'public/images/home/thumbnails'))
  .filter(file => file.endsWith('.png'))

console.log(`\n📊 Generated images: ${generatedImages.length}`)
console.log(`🔧 Updated URLs: ${updatedCount}`)

if (generatedImages.length >= updatedCount) {
  console.log('✅ All required images are available!')
} else {
  console.log('⚠️  Some images may still need to be generated')
}