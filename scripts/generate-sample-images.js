const fs = require('fs');
const path = require('path');

// Sample images to generate (just a few for demonstration)
const sampleImages = [
  {
    filename: "teste-padre-oracao-matinal.png",
    prompt: "Create a beautiful religious artwork in renaissance style, peaceful prayer scene with morning light, Catholic priest praying, soft golden rays, serene atmosphere, spiritual awakening, sacred space, warm colors",
    section: "Teste"
  },
  {
    filename: "teste-storytelling-historia-biblica.png", 
    prompt: "Create a beautiful religious artwork in renaissance style, Jesus calming the storm, dramatic biblical scene, disciples in boat, divine power over nature, storytelling atmosphere, peaceful resolution, dramatic lighting",
    section: "Teste"
  },
  {
    filename: "corpus-christi-santo-ambrosio.png",
    prompt: "Create a beautiful religious artwork showing Saint Ambrose of Milan, Catholic saint with episcopal vestments, golden miter, holding a book, church background, renaissance style, divine light, sacred atmosphere",
    section: "Corpus Christi"
  }
];

// Function to generate image using OpenAI
async function generateImage(imageData) {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imageData.prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.data && data.data[0] && data.data[0].url) {
      // Download the image
      const imageResponse = await fetch(data.data[0].url);
      const imageBuffer = await imageResponse.arrayBuffer();
      
      // Create directory if it doesn't exist
      const dir = path.join(process.cwd(), 'public', 'images', 'home', 'thumbnails');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Save image
      const filepath = path.join(dir, imageData.filename);
      fs.writeFileSync(filepath, new Uint8Array(imageBuffer));
      
      console.log(`✅ Generated: ${imageData.filename}`);
      return { success: true, filename: imageData.filename, url: data.data[0].url };
    } else {
      throw new Error('No image URL returned');
    }
  } catch (error) {
    console.error(`❌ Error generating ${imageData.filename}:`, error.message);
    return { success: false, filename: imageData.filename, error: error.message };
  }
}

// Generate sample images
async function generateSampleImages() {
  console.log('🎨 Generating sample images...');
  
  for (const imageData of sampleImages) {
    console.log(`🎨 Generating: ${imageData.filename}`);
    await generateImage(imageData);
    
    // Wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('✅ Sample generation complete!');
}

// Run if called directly
if (require.main === module) {
  generateSampleImages().catch(console.error);
}