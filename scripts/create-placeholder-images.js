const fs = require('fs');
const path = require('path');

// Create simple SVG placeholders for religious themes
const placeholderImages = [
  {
    filename: "teste-padre-oracao-matinal.png",
    title: "Oração Matinal",
    theme: "morning-prayer",
    color: "#8B4513"
  },
  {
    filename: "teste-storytelling-historia-biblica.png",
    title: "História Bíblica",
    theme: "bible-story",
    color: "#4682B4"
  },
  {
    filename: "corpus-christi-santo-ambrosio.png",
    title: "Santo Ambrósio",
    theme: "saint",
    color: "#DAA520"
  },
  {
    filename: "corpus-christi-amor-eucaristia.png",
    title: "Amor Eucarístico",
    theme: "eucharist",
    color: "#B8860B"
  },
  {
    filename: "destaques-novena-namorados.png",
    title: "Novena Namorados",
    theme: "novena",
    color: "#CD853F"
  },
  {
    filename: "rotinas-terco-diario.png",
    title: "Terço Diário",
    theme: "rosary",
    color: "#8B4513"
  },
  {
    filename: "biblicas-vocacao-moises.png",
    title: "Vocação de Moisés",
    theme: "moses",
    color: "#A0522D"
  },
  {
    filename: "novo-testamento-mateus.png",
    title: "Evangelho Mateus",
    theme: "gospel",
    color: "#D2691E"
  }
];

// Create SVG content for each placeholder
function createSVG(imageData) {
  const { title, theme, color } = imageData;
  
  // Religious symbols based on theme
  const symbols = {
    'morning-prayer': '☀️',
    'bible-story': '📖',
    'saint': '👑',
    'eucharist': '🍞',
    'novena': '🙏',
    'rosary': '📿',
    'moses': '🔥',
    'gospel': '✝️'
  };
  
  const symbol = symbols[theme] || '✝️';
  
  return `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="400" fill="url(#grad1)"/>
  
  <!-- Decorative border -->
  <rect x="10" y="10" width="380" height="380" fill="none" stroke="#FFD700" stroke-width="3" opacity="0.8"/>
  <rect x="20" y="20" width="360" height="360" fill="none" stroke="#FFD700" stroke-width="1" opacity="0.6"/>
  
  <!-- Religious symbol -->
  <text x="200" y="180" text-anchor="middle" font-size="80" fill="#FFD700" opacity="0.9">${symbol}</text>
  
  <!-- Title -->
  <text x="200" y="250" text-anchor="middle" font-family="serif" font-size="24" font-weight="bold" fill="#FFFFFF" filter="url(#shadow)">
    ${title}
  </text>
  
  <!-- Subtitle -->
  <text x="200" y="280" text-anchor="middle" font-family="serif" font-size="14" fill="#F0E68C" opacity="0.9">
    Agape Prayer App
  </text>
  
  <!-- Decorative elements -->
  <circle cx="80" cy="80" r="3" fill="#FFD700" opacity="0.6"/>
  <circle cx="320" cy="80" r="3" fill="#FFD700" opacity="0.6"/>
  <circle cx="80" cy="320" r="3" fill="#FFD700" opacity="0.6"/>
  <circle cx="320" cy="320" r="3" fill="#FFD700" opacity="0.6"/>
  
  <!-- Cross pattern -->
  <path d="M 190 40 L 210 40 L 210 60 L 230 60 L 230 80 L 210 80 L 210 100 L 190 100 L 190 80 L 170 80 L 170 60 L 190 60 Z" 
        fill="#FFD700" opacity="0.3"/>
</svg>`;
}

// Convert SVG to PNG using a simple approach
function createPlaceholderImage(imageData) {
  const svgContent = createSVG(imageData);
  const dir = path.join(process.cwd(), 'public', 'images', 'home', 'thumbnails');
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Save as SVG first (can be converted to PNG later)
  const svgPath = path.join(dir, imageData.filename.replace('.png', '.svg'));
  fs.writeFileSync(svgPath, svgContent);
  
  console.log(`✅ Created placeholder: ${imageData.filename.replace('.png', '.svg')}`);
  return svgPath;
}

// Generate all placeholder images
function generatePlaceholders() {
  console.log('🎨 Creating placeholder images...');
  
  placeholderImages.forEach(imageData => {
    createPlaceholderImage(imageData);
  });
  
  console.log(`✅ Created ${placeholderImages.length} placeholder images`);
  console.log('📁 Location: public/images/home/thumbnails/');
  console.log('');
  console.log('💡 Note: These are SVG placeholders. To generate actual PNG images:');
  console.log('   1. Set your OPENAI_API_KEY environment variable');
  console.log('   2. Run: npx tsx scripts/generate-thumbnails.ts');
  console.log('   3. Cost: ~$2.72 for all 68 images');
}

// Run if called directly
if (require.main === module) {
  generatePlaceholders();
}

module.exports = { generatePlaceholders, placeholderImages };