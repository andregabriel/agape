'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Save, Zap, Settings } from 'lucide-react'

export default function OpenAIContentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [bulkQuantity, setBulkQuantity] = useState(5)
  const [bulkType, setBulkType] = useState("")
  const [individualType, setIndividualType] = useState("")
  const [prompt, setPrompt] = useState("")
  const [bulkTheme, setBulkTheme] = useState("")
  const [creativity, setCreativity] = useState("medium")
  const [languageStyle, setLanguageStyle] = useState("spiritual")
  const [duration, setDuration] = useState("medium")

  const handleGenerateContent = async (type: string, quantity: number = 1) => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      alert(`${quantity} ${type}(s) gerado(s) com sucesso!`)
    }, 2000)
  }

  const handleBulkGeneration = async () => {
    if (!bulkType) {
      alert("Por favor, selecione um tipo de conteúdo")
      return
    }
    await handleGenerateContent(bulkType, bulkQuantity)
  }

  const handleIndividualGeneration = async () => {
    if (!individualType || !prompt.trim()) {
      alert("Por favor, selecione um tipo de conteúdo e digite um prompt")
      return
    }
    await handleGenerateContent(individualType, 1)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Individual Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Geração Individual
            </CardTitle>
            <CardDescription>Crie conteúdo individual usando IA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Conteúdo</Label>
              <Select value={individualType} onValueChange={setIndividualType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audio">Áudio</SelectItem>
                  <SelectItem value="playlist">Playlist</SelectItem>
                  <SelectItem value="category">Categoria</SelectItem>
                  <SelectItem value="event">Evento/Banner</SelectItem>
                  <SelectItem value="phrase">Frase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prompt/Descrição</Label>
              <Textarea 
                placeholder="Descreva o que você gostaria de gerar..."
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleIndividualGeneration}
              disabled={isGenerating}
            >
              {isGenerating ? "Gerando..." : "Gerar Conteúdo"}
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Bulk Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Geração em Lote
            </CardTitle>
            <CardDescription>Crie múltiplos itens de uma só vez</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Conteúdo</Label>
              <Select value={bulkType} onValueChange={setBulkType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audios">Áudios</SelectItem>
                  <SelectItem value="playlists">Playlists</SelectItem>
                  <SelectItem value="categories">Categorias</SelectItem>
                  <SelectItem value="events">Eventos/Banners</SelectItem>
                  <SelectItem value="phrases">Frases</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input 
                type="number" 
                min="1" 
                max="50" 
                value={bulkQuantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBulkQuantity(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Tema/Contexto</Label>
              <Textarea 
                placeholder="Ex: Novenas para santos brasileiros, Orações matinais, etc..."
                value={bulkTheme}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBulkTheme(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleBulkGeneration}
              disabled={isGenerating || !bulkType}
            >
              {isGenerating ? "Gerando..." : `Gerar ${bulkQuantity} ${bulkType}`}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Bulk Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Geração Avançada em Lote</CardTitle>
          <CardDescription>Crie múltiplos tipos de conteúdo relacionados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Categorias</Label>
              <Input type="number" min="0" max="10" defaultValue="2" />
            </div>
            <div className="space-y-2">
              <Label>Playlists por Categoria</Label>
              <Input type="number" min="0" max="5" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label>Áudios por Categoria</Label>
              <Input type="number" min="0" max="50" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label>Frases por Categoria</Label>
              <Input type="number" min="0" max="20" defaultValue="3" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tema Principal</Label>
            <Input placeholder="Ex: Santos do Brasil, Orações para Família, etc..." />
          </div>

          <Button 
            className="w-full" 
            onClick={() => handleGenerateContent("conjunto completo", 1)}
            disabled={isGenerating}
          >
            {isGenerating ? "Gerando..." : "Gerar Conjunto Completo"}
          </Button>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações de IA
          </CardTitle>
          <CardDescription>Configure parâmetros para geração de conteúdo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Criatividade</Label>
              <Select value={creativity} onValueChange={setCreativity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Linguagem</Label>
              <Select value={languageStyle} onValueChange={setLanguageStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="spiritual">Espiritual</SelectItem>
                  <SelectItem value="traditional">Tradicional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duração Preferida</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Curta (1-5min)</SelectItem>
                  <SelectItem value="medium">Média (5-15min)</SelectItem>
                  <SelectItem value="long">Longa (15min+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}