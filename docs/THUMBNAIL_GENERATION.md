# 🎨 Thumbnail Generation Guide

## Overview

This document explains how to generate all thumbnail images for the Agape Prayer App home page using OpenAI DALL-E 3.

## Status Update

✅ **Test Carousel**: Already implemented with 2 test audios
✅ **Voice Configuration**: Real ElevenLabs voice IDs confirmed:
- **Padre**: `L0Dsvb3SLTyegXwtm47J` (Archer - grounded and friendly British male)
- **Storytelling**: `g6xIsTj2HwM6VR4iXFCw` (Jessica Anne Bogart - empathetic and expressive)

## Image Generation Requirements

### Total Images Needed: 68 thumbnails

The system needs to generate thumbnails for all home page sections:

1. **Teste** (2 images) - Test carousel
2. **Corpus Christi** (4 images) - Religious celebration
3. **Destaques** (3 images) - Featured content
4. **Rotinas Matinais** (6 images) - Morning routines
5. **Favoritas dos Assinantes** (3 images) - Subscriber favorites
6. **Diárias com Convidados** (3 images) - Daily with guests
7. **Rotinas Noturnas** (3 images) - Evening routines
8. **Histórias Bíblicas para Dormir** (6 images) - Bible stories for sleep
9. **Rezadas Recentemente** (3 images) - Recently prayed
10. **Músicas para Dormir** (3 images) - Sleep music
11. **Minuto de Homilia** (1 image) - Homily minute
12. **Novo Testamento** (6 images) - New Testament
13. **Música** (3 images) - Music section
14. **Não sabe por onde começar** (6 images) - Where to start
15. **Temáticas** (3 images) - Themes
16. **Orações infantis** (6 images) - Children's prayers
17. **Novenas** (3 images) - Novenas
18. **Explore por Categorias** (3 images) - Explore categories
19. **Reflita sobre o Evangelho** (1 image) - Reflect on Gospel

## Generation Scripts

### Main Generation Script
- **File**: `scripts/generate-thumbnails.ts`
- **Purpose**: Generate all 68 thumbnails using OpenAI DALL-E 3
- **Features**: 
  - Batch processing with rate limiting
  - Error handling and retry logic
  - Progress tracking and reporting
  - Automatic directory creation

### Sample Generation Script
- **File**: `scripts/generate-sample-images.js`
- **Purpose**: Generate a few sample images for testing
- **Usage**: For testing API connection and image quality

## Art Style Guidelines

All images follow these specifications:
- **Style**: Renaissance religious artwork
- **Quality**: High-quality, sacred atmosphere
- **Colors**: Warm, divine lighting with golden tones
- **Theme**: Catholic religious imagery appropriate for each section
- **Resolution**: 1024x1024 pixels
- **Format**: PNG files

## Prompt Engineering

Each image uses carefully crafted prompts that include:
- **Base Style**: "Create a beautiful religious artwork in renaissance style"
- **Specific Content**: Tailored to each section's theme
- **Atmosphere**: Sacred, peaceful, divine elements
- **Visual Elements**: Appropriate religious symbols and imagery
- **Lighting**: Divine light, golden rays, warm atmosphere

### Example Prompts:

**Test Padre Audio**:
```
Create a beautiful religious artwork in renaissance style, peaceful prayer scene with morning light, Catholic priest praying, soft golden rays, serene atmosphere, spiritual awakening, sacred space, warm colors
```

**Bible Story**:
```
Create a beautiful religious artwork in renaissance style, Jesus calming the storm, dramatic biblical scene, disciples in boat, divine power over nature, storytelling atmosphere, peaceful resolution, dramatic lighting
```

## Directory Structure

```
public/
  images/
    home/
      thumbnails/
        teste-padre-oracao-matinal.png
        teste-storytelling-historia-biblica.png
        corpus-christi-santo-ambrosio.png
        corpus-christi-amor-eucaristia.png
        [... 64 more images]
```

## Cost Estimation

- **OpenAI DALL-E 3**: $0.040 per image (1024x1024)
- **Total Cost**: 68 images × $0.040 = **$2.72**
- **Generation Time**: ~4 minutes (2 seconds between requests)

## Usage Instructions

### Prerequisites
1. Set environment variable: `OPENAI_API_KEY=your_api_key_here`
2. Ensure Node.js and npm are installed
3. Install dependencies: `npm install`

### Generate All Images
```bash
# Using TypeScript
npx tsx scripts/generate-thumbnails.ts

# Using Node.js (sample)
node scripts/generate-sample-images.js
```

### Generate Specific Images
You can modify the `imagesToGenerate` array in the script to generate only specific images.

## Error Handling

The scripts include comprehensive error handling:
- **Rate Limiting**: 2-second delays between requests
- **API Errors**: Detailed error messages and retry logic
- **File System**: Automatic directory creation
- **Reporting**: JSON report with success/failure details

## Integration with Home Page

Once generated, images are automatically referenced in the home page components:
- Images are stored in `public/images/home/thumbnails/`
- File paths are constructed using consistent naming convention
- Components automatically load images based on section IDs

## Quality Assurance

All generated images should meet these criteria:
- ✅ Appropriate religious theme
- ✅ High visual quality
- ✅ Consistent art style
- ✅ Proper resolution (1024x1024)
- ✅ Appropriate for all audiences
- ✅ Matches section content theme

## Maintenance

- **Updates**: Re-run scripts when new sections are added
- **Optimization**: Images can be optimized for web using tools like `sharp`
- **Backup**: Keep generated images in version control or backup storage
- **Monitoring**: Check generation reports for any failures

## Next Steps

1. ✅ Test carousel implemented
2. ✅ Voice IDs confirmed
3. 🔄 **Current**: Generate all 68 thumbnail images
4. 🔄 Update home page components to use new images
5. 🔄 Test image loading and performance
6. 🔄 Optimize images for web delivery

## Troubleshooting

### Common Issues:
- **401 Errors**: Check OpenAI API key is set correctly
- **Rate Limiting**: Increase delay between requests
- **File Permissions**: Ensure write permissions for public directory
- **Network Issues**: Check internet connection and API availability

### Solutions:
- Verify environment variables are loaded
- Use `dotenv` for local development
- Check OpenAI API usage limits
- Implement exponential backoff for retries