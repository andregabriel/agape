"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ALL_CONTENT } from "@/lib/content-mapping"
import { Image, Play, Pause, Square, Download, Eye } from "lucide-react"

interface GeneratedImage {
  id: string
  title: string
  imageUrl: string
  prompt: string
  status: 'pending' | 'generating' | 'completed' | 'error'
  error?: string
}

export default function ImageGenerator() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [customPrompt, setCustomPrompt] = useState("")
  const [imageStyle, setImageStyle] = useState("religious-art")
  const [imageSize, setImageSize] = useState("1024x1024")

  // Filtrar conteúdo por categoria
  const filteredContent = selectedCategory === "all" 
    ? ALL_CONTENT 
    : ALL_CONTENT.filter(item => item.category === selectedCategory)

  // Obter categorias únicas
  const categories = Array.from(new Set(ALL_CONTENT.map(item => item.category)))

  const generateImagePrompt = (item: any) => {
    const basePrompts = {
      "religious-art": "Create a beautiful religious artwork in renaissance style",
      "modern-spiritual": "Create a modern spiritual design with clean aesthetics",
      "classical-catholic": "Create a classical Catholic art style illustration",
      "contemporary-christian": "Create a contemporary Christian design",
      "biblical-scene": "Create a biblical scene illustration"
    }

    const stylePrompt = basePrompts[imageStyle as keyof typeof basePrompts]
    
    if (customPrompt) {
      return `${stylePrompt}, ${customPrompt}, for "${item.title}"`
    }

    // Prompts específicos baseados no conteúdo
    if (item.category === "Teste") {
      return `${stylePrompt}, testing audio generation, peaceful prayer scene, soft lighting`
    }
    
    if (item.category === "Corpus Christi") {
      return `${stylePrompt}, Eucharist, Holy Communion, golden chalice, sacred host, divine light`
    }
    
    if (item.category === "Sagrado Coração de Jesus") {
      return `${stylePrompt}, Sacred Heart of Jesus, divine love, red heart with thorns, golden rays`
    }
    
    if (item.category === "Histórias Bíblicas para Dormir") {
      return `${stylePrompt}, peaceful biblical scene for "${item.title}", soft dreamy atmosphere, suitable for bedtime`
    }
    
    if (item.category === "Rotinas Matinais") {
      return `${stylePrompt}, morning prayer, sunrise, peaceful meditation, spiritual awakening`
    }
    
    if (item.category === "Rotinas Noturnas") {
      return `${stylePrompt}, evening prayer, moonlight, peaceful rest, spiritual reflection`
    }
    
    if (item.category === "Novenas") {
      return `${stylePrompt}, nine days of prayer, candles, rosary, devotional atmosphere`
    }
    
    if (item.category === "Músicas para Dormir") {
      return `${stylePrompt}, peaceful sleep music, soft colors, musical notes, serene atmosphere`
    }
    
    // Prompt genérico baseado no título
    return `${stylePrompt}, spiritual content for "${item.title}", peaceful and inspiring`
  }

  const generateSingleImage = async (item: any): Promise<string> => {
    const prompt = generateImagePrompt(item)
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size: imageSize,
          quality: "standard",
          style: "natural"
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.imageUrl
    } catch (error) {
      console.error('Error generating image:', error)
      throw error
    }
  }

  const startGeneration = async () => {
    setIsGenerating(true)
    setCurrentIndex(0)
    
    const initialImages = filteredContent.map(item => ({
      id: item.id,
      title: item.title,
      imageUrl: '',
      prompt: generateImagePrompt(item),
      status: 'pending' as const
    }))
    
    setGeneratedImages(initialImages)

    // Gerar imagens uma por vez para evitar rate limiting
    for (let i = 0; i < filteredContent.length; i++) {
      if (!isGenerating) break // Parar se o usuário cancelou
      
      const item = filteredContent[i]
      setCurrentIndex(i)
      
      setGeneratedImages(prev => 
        prev.map(img => 
          img.id === item.id 
            ? { ...img, status: 'generating' }
            : img
        )
      )

      try {
        const imageUrl = await generateSingleImage(item)
        
        setGeneratedImages(prev => 
          prev.map(img => 
            img.id === item.id 
              ? { ...img, imageUrl, status: 'completed' }
              : img
          )
        )
      } catch (error) {
        setGeneratedImages(prev => 
          prev.map(img => 
            img.id === item.id 
              ? { ...img, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
              : img
          )
        )
      }

      // Pausa entre gerações para respeitar rate limits
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    setIsGenerating(false)
  }

  const stopGeneration = () => {
    setIsGenerating(false)
  }

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  const progress = filteredContent.length > 0 ? (currentIndex / filteredContent.length) * 100 : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Gerador de Imagens para Thumbnails
          </CardTitle>
          <CardDescription>
            Generate thumbnail images for all content items using OpenAI's DALL-E
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configurações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Estilo da Imagem</Label>
              <Select value={imageStyle} onValueChange={setImageStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="religious-art">Arte Religiosa Clássica</SelectItem>
                  <SelectItem value="modern-spiritual">Espiritual Moderno</SelectItem>
                  <SelectItem value="classical-catholic">Católico Clássico</SelectItem>
                  <SelectItem value="contemporary-christian">Cristão Contemporâneo</SelectItem>
                  <SelectItem value="biblical-scene">Cena Bíblica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Tamanho da Imagem</Label>
              <Select value={imageSize} onValueChange={setImageSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">1024x1024 (Quadrado)</SelectItem>
                  <SelectItem value="1792x1024">1792x1024 (Paisagem)</SelectItem>
                  <SelectItem value="1024x1792">1024x1792 (Retrato)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Prompt Personalizado (Opcional)</Label>
            <Textarea
              id="custom-prompt"
              placeholder="Adicione instruções específicas para o estilo das imagens..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {filteredContent.length} itens selecionados
              </Badge>
              {isGenerating && (
                <Badge variant="default">
                  Gerando {currentIndex + 1} de {filteredContent.length}
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isGenerating ? (
                <Button onClick={startGeneration} disabled={filteredContent.length === 0}>
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Geração
                </Button>
              ) : (
                <Button onClick={stopGeneration} variant="destructive">
                  <Square className="w-4 h-4 mr-2" />
                  Parar
                </Button>
              )}
            </div>
          </div>

          {/* Progress */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progresso da Geração</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      {generatedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Imagens Geradas</CardTitle>
            <CardDescription>
              {generatedImages.filter(img => img.status === 'completed').length} de {generatedImages.length} imagens geradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedImages.map((image) => (
                <div key={image.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{image.title}</h3>
                    <Badge 
                      variant={
                        image.status === 'completed' ? 'default' :
                        image.status === 'generating' ? 'secondary' :
                        image.status === 'error' ? 'destructive' : 'outline'
                      }
                    >
                      {image.status}
                    </Badge>
                  </div>
                  
                  {image.imageUrl && (
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={image.imageUrl} 
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {image.status === 'generating' && (
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                  
                  {image.status === 'error' && (
                    <div className="aspect-square bg-red-50 rounded-lg flex items-center justify-center p-4">
                      <p className="text-red-600 text-xs text-center">{image.error}</p>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {image.prompt}
                  </div>
                  
                  {image.status === 'completed' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => downloadImage(image.imageUrl, `${image.id}-thumbnail`)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(image.imageUrl, '_blank')}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}