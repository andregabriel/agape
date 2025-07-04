"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Music, 
  List, 
  Tag, 
  MessageSquare, 
  Bot, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Play,
  Pause,
  Upload,
  Download
} from "lucide-react"

// Mock data for demonstration
const mockAudios = [
  { id: 1, title: "Terço Diário", category: "Oração", duration: "25:30", status: "published" },
  { id: 2, title: "Evangelho Comentado", category: "Estudos", duration: "15:45", status: "draft" },
  { id: 3, title: "Novena São José", category: "Novenas", duration: "12:20", status: "published" },
]

const mockPlaylists = [
  { id: 1, name: "Rotinas Matinais", audioCount: 12, category: "Rotinas" },
  { id: 2, name: "Novenas Especiais", audioCount: 27, category: "Novenas" },
  { id: 3, name: "Estudos Bíblicos", audioCount: 45, category: "Estudos" },
]

const mockCategories = [
  { id: 1, name: "Oração", audioCount: 156, color: "#3B82F6" },
  { id: 2, name: "Estudos", audioCount: 89, color: "#10B981" },
  { id: 3, name: "Novenas", audioCount: 67, color: "#F59E0B" },
  { id: 4, name: "Música", audioCount: 34, color: "#EF4444" },
]

const mockPhrases = [
  { id: 1, text: "Que Deus abençoe o seu dia", category: "Bênçãos", usage: 145 },
  { id: 2, text: "Em Cristo encontramos paz", category: "Paz", usage: 203 },
  { id: 3, text: "Maria, Mãe de Misericórdia", category: "Mariana", usage: 167 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("audios")
  const [searchTerm, setSearchTerm] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // OpenAI Generation Functions
  const handleGenerateContent = async (type: string, quantity: number = 1) => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      alert(`${quantity} ${type}(s) gerado(s) com sucesso!`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-2">Gerencie todo o conteúdo da plataforma Agape</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="audios" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Áudios
            </TabsTrigger>
            <TabsTrigger value="playlists" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Playlists
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="phrases" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Frases
            </TabsTrigger>
            <TabsTrigger value="openai" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              OpenAI
            </TabsTrigger>
          </TabsList>

          {/* Audios Management */}
          <TabsContent value="audios" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Áudios</CardTitle>
                    <CardDescription>Adicione, edite e organize áudios da plataforma</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Áudio
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search */}
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar áudios..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  {/* Audio List */}
                  <div className="space-y-3">
                    {mockAudios.map((audio) => (
                      <div key={audio.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Play className="w-8 h-8 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{audio.title}</h3>
                            <p className="text-sm text-gray-500">{audio.category} • {audio.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={audio.status === 'published' ? 'default' : 'secondary'}>
                            {audio.status === 'published' ? 'Publicado' : 'Rascunho'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Playlists Management */}
          <TabsContent value="playlists" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Playlists</CardTitle>
                    <CardDescription>Organize coleções de áudios em playlists temáticas</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Playlist
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockPlaylists.map((playlist) => (
                    <Card key={playlist.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{playlist.name}</h3>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{playlist.audioCount} áudios</p>
                        <Badge variant="outline">{playlist.category}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Management */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Categorias</CardTitle>
                    <CardDescription>Organize e classifique o conteúdo por categorias</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Categoria
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCategories.map((category) => (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            <div>
                              <h3 className="font-medium">{category.name}</h3>
                              <p className="text-sm text-gray-500">{category.audioCount} áudios</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Phrases Management */}
          <TabsContent value="phrases" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Frases</CardTitle>
                    <CardDescription>Gerencie frases inspiracionais que aparecem na página inicial</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Frase
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPhrases.map((phrase) => (
                    <div key={phrase.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium mb-2">"{phrase.text}"</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <Badge variant="outline">{phrase.category}</Badge>
                            <span>Usado {phrase.usage} vezes</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OpenAI Integration */}
          <TabsContent value="openai" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Individual Generation */}
              <Card>
                <CardHeader>
                  <CardTitle>Geração Individual</CardTitle>
                  <CardDescription>Crie conteúdo individual usando IA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo de Conteúdo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="audio">Áudio</SelectItem>
                        <SelectItem value="playlist">Playlist</SelectItem>
                        <SelectItem value="category">Categoria</SelectItem>
                        <SelectItem value="phrase">Frase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Prompt/Descrição</Label>
                    <Textarea 
                      placeholder="Descreva o que você gostaria de gerar..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleGenerateContent("item", 1)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Gerando..." : "Gerar Conteúdo"}
                  </Button>
                </CardContent>
              </Card>

              {/* Bulk Generation */}
              <Card>
                <CardHeader>
                  <CardTitle>Geração em Lote</CardTitle>
                  <CardDescription>Crie múltiplos itens de uma só vez</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo de Conteúdo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="audios">Áudios</SelectItem>
                        <SelectItem value="playlists">Playlists</SelectItem>
                        <SelectItem value="categories">Categorias</SelectItem>
                        <SelectItem value="phrases">Frases</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantidade</Label>
                    <Input type="number" min="1" max="50" defaultValue="5" />
                  </div>

                  <div className="space-y-2">
                    <Label>Tema/Contexto</Label>
                    <Textarea 
                      placeholder="Ex: Novenas para santos brasileiros, Orações matinais, etc..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleGenerateContent("itens", 5)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Gerando..." : "Gerar em Lote"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações de IA</CardTitle>
                <CardDescription>Configure parâmetros para geração de conteúdo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Criatividade</Label>
                    <Select defaultValue="medium">
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
                    <Select defaultValue="formal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="spiritual">Espiritual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Duração Preferida</Label>
                    <Select defaultValue="medium">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}