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
import { Switch } from "@/components/ui/switch"
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
  Download,
  Calendar,
  Layout,
  Eye,
  EyeOff,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Image,
  Settings,
  Save,
  Copy,
  MoreHorizontal
} from "lucide-react"

// Enhanced mock data
const mockAudios = [
  { id: 1, title: "Terço Diário", category: "Oração", duration: "25:30", status: "published", order: 1, visible: true },
  { id: 2, title: "Evangelho Comentado", category: "Estudos", duration: "15:45", status: "draft", order: 2, visible: true },
  { id: 3, title: "Novena São José", category: "Novenas", duration: "12:20", status: "published", order: 3, visible: false },
]

const mockPlaylists = [
  { id: 1, name: "Rotinas Matinais", audioCount: 12, category: "Rotinas", order: 1, visible: true },
  { id: 2, name: "Novenas Especiais", audioCount: 27, category: "Novenas", order: 2, visible: true },
  { id: 3, name: "Estudos Bíblicos", audioCount: 45, category: "Estudos", order: 3, visible: true },
]

const mockCategories = [
  { id: 1, name: "Oração", audioCount: 156, color: "#3B82F6", order: 1, visible: true, showInHamburger: true, showInExplore: true },
  { id: 2, name: "Estudos", audioCount: 89, color: "#10B981", order: 2, visible: true, showInHamburger: true, showInExplore: true },
  { id: 3, name: "Novenas", audioCount: 67, color: "#F59E0B", order: 3, visible: true, showInHamburger: true, showInExplore: true },
  { id: 4, name: "Música", audioCount: 34, color: "#EF4444", order: 4, visible: true, showInHamburger: false, showInExplore: true },
]

const mockPhrases = [
  { id: 1, text: "Que Deus abençoe o seu dia", category: "Bênçãos", usage: 145, order: 1, visible: true },
  { id: 2, text: "Em Cristo encontramos paz", category: "Paz", usage: 203, order: 2, visible: true },
  { id: 3, text: "Maria, Mãe de Misericórdia", category: "Mariana", usage: 167, order: 3, visible: true },
]

const mockEvents = [
  { id: 1, title: "Sagrado Coração de Jesus", subtitle: "Dia 6: 14 de junho", image: "/images/home/02-sacred-heart.png", status: "active", type: "challenge", order: 1, visible: true },
  { id: 2, title: "Contra o Vício", subtitle: "Novena Santa Mônica", image: "/images/home/05-against-vice.jpeg", status: "active", type: "challenge", order: 2, visible: true },
  { id: 3, title: "Termine de Rezar", subtitle: "Sagrado Coração", image: "/images/home/08-finish-praying.png", status: "scheduled", type: "challenge", order: 3, visible: true },
]

const mockCarousels = [
  { id: 1, title: "Corpus Christi", type: "horizontal", category: "Corpus Christi", order: 1, visible: true, itemCount: 4 },
  { id: 2, title: "Destaques", type: "horizontal", category: "Destaques", order: 2, visible: true, itemCount: 3 },
  { id: 3, title: "Rotinas Matinais", type: "grid", category: "Rotinas Matinais", order: 3, visible: true, itemCount: 6 },
  { id: 4, title: "Favoritas dos Assinantes", type: "horizontal", category: "Favoritas dos Assinantes", order: 4, visible: true, itemCount: 3 },
  { id: 5, title: "Novo Testamento", type: "grid", category: "Novo Testamento", order: 5, visible: true, itemCount: 6 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("audios")
  const [searchTerm, setSearchTerm] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [bulkQuantity, setBulkQuantity] = useState(5)
  const [bulkType, setBulkType] = useState("")

  // Enhanced OpenAI Generation Functions
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

  const handleToggleVisibility = (id: number, type: string) => {
    // Implementation for toggling visibility
    alert(`Visibilidade alterada para ${type} ID: ${id}`)
  }

  const handleReorder = (id: number, direction: 'up' | 'down', type: string) => {
    // Implementation for reordering
    alert(`${type} ID: ${id} movido para ${direction === 'up' ? 'cima' : 'baixo'}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-2">Gestão completa do conteúdo da plataforma Agape</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
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
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="carousels" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Carrosséis
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
                      <div key={audio.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <Button variant="ghost" size="sm" onClick={() => handleReorder(audio.id, 'up', 'áudio')}>
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <Button variant="ghost" size="sm" onClick={() => handleReorder(audio.id, 'down', 'áudio')}>
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                          </div>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleVisibility(audio.id, 'áudio')}
                          >
                            {audio.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4" />
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
                    <Card key={playlist.id} className="relative">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleReorder(playlist.id, 'up', 'playlist')}>
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleReorder(playlist.id, 'down', 'playlist')}>
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleVisibility(playlist.id, 'playlist')}
                            >
                              {playlist.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-medium mb-2">{playlist.name}</h3>
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
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleReorder(category.id, 'up', 'categoria')}>
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleReorder(category.id, 'down', 'categoria')}>
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleVisibility(category.id, 'categoria')}
                            >
                              {category.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-500">{category.audioCount} áudios</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`hamburger-${category.id}`} className="text-sm">
                              Exibir no Menu Hamburger
                            </Label>
                            <Switch
                              id={`hamburger-${category.id}`}
                              checked={category.showInHamburger}
                              onCheckedChange={() => {}}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`explore-${category.id}`} className="text-sm">
                              Exibir em Explorar Categorias
                            </Label>
                            <Switch
                              id={`explore-${category.id}`}
                              checked={category.showInExplore}
                              onCheckedChange={() => {}}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Management */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Eventos</CardTitle>
                    <CardDescription>Gerencie banners e eventos que aparecem na página inicial</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Evento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <Button variant="ghost" size="sm" onClick={() => handleReorder(event.id, 'up', 'evento')}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <Button variant="ghost" size="sm" onClick={() => handleReorder(event.id, 'down', 'evento')}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-500">{event.subtitle}</p>
                          <Badge variant="outline" className="mt-1">{event.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                          {event.status === 'active' ? 'Ativo' : 'Agendado'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleVisibility(event.id, 'evento')}
                        >
                          {event.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carousels Management */}
          <TabsContent value="carousels" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Carrosséis</CardTitle>
                    <CardDescription>Organize e configure carrosséis da página inicial</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Carrossel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCarousels.map((carousel) => (
                    <div key={carousel.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <Button variant="ghost" size="sm" onClick={() => handleReorder(carousel.id, 'up', 'carrossel')}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <Button variant="ghost" size="sm" onClick={() => handleReorder(carousel.id, 'down', 'carrossel')}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Layout className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{carousel.title}</h3>
                          <p className="text-sm text-gray-500">
                            {carousel.type === 'horizontal' ? 'Horizontal' : 'Grade'} • {carousel.itemCount} itens
                          </p>
                          <Badge variant="outline" className="mt-1">{carousel.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleVisibility(carousel.id, 'carrossel')}
                        >
                          {carousel.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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
                    <div key={phrase.id} className="p-4 border rounded-lg bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleReorder(phrase.id, 'up', 'frase')}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleReorder(phrase.id, 'down', 'frase')}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleVisibility(phrase.id, 'frase')}
                          >
                            {phrase.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">"{phrase.text}"</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <Badge variant="outline">{phrase.category}</Badge>
                          <span>Usado {phrase.usage} vezes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced OpenAI Integration */}
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
                        <SelectItem value="event">Evento/Banner</SelectItem>
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

              {/* Enhanced Bulk Generation */}
              <Card>
                <CardHeader>
                  <CardTitle>Geração em Lote</CardTitle>
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
                      onChange={(e) => setBulkQuantity(Number(e.target.value))}
                    />
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
                    <Select defaultValue="spiritual">
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
                
                <div className="mt-4 flex justify-end">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}