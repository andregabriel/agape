"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Music, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Play,
  Upload,
  Eye,
  EyeOff,
  Save,
  X
} from "lucide-react"

interface Audio {
  id: string
  title: string
  subtitle?: string
  description?: string
  imageUrl: string
  audioUrl?: string
  duration?: string
  category?: string
  subCategory?: string
  type: "audio" | "playlist"
  itemCount?: number
  visible: boolean
  order: number
  createdAt: string
}

// Mock data
const mockAudios: Audio[] = [
  {
    id: "1",
    title: "Terço Diário",
    subtitle: "Com os mistérios do dia",
    description: "Oração completa do terço com meditações profundas sobre os mistérios",
    imageUrl: "/placeholder.svg?width=300&height=400",
    audioUrl: "/audio/terco-diario.mp3",
    duration: "25:30",
    category: "Rotinas Matinais",
    subCategory: "Oração",
    type: "audio",
    visible: true,
    order: 1,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Evangelho Comentado",
    subtitle: "Lectio Divina Diária",
    description: "Reflexões sobre o Evangelho do dia com aplicação prática",
    imageUrl: "/placeholder.svg?width=300&height=400",
    audioUrl: "/audio/evangelho-comentado.mp3",
    duration: "15:45",
    category: "Rotinas Matinais",
    subCategory: "Estudos",
    type: "audio",
    visible: true,
    order: 2,
    createdAt: "2024-01-14"
  },
  {
    id: "3",
    title: "Novenas Especiais",
    subtitle: "Coleção completa",
    description: "Todas as novenas mais populares em uma playlist",
    imageUrl: "/placeholder.svg?width=300&height=400",
    duration: "180:00",
    category: "Novenas",
    subCategory: "Oração",
    type: "playlist",
    itemCount: 12,
    visible: true,
    order: 3,
    createdAt: "2024-01-13"
  }
]

const categories = [
  "Teste",
  "Corpus Christi", 
  "Destaques",
  "Rotinas Matinais",
  "Favoritas dos Assinantes",
  "Rotinas Noturnas",
  "Histórias Bíblicas para Dormir",
  "Novenas",
  "Músicas para Dormir",
  "Novo Testamento",
  "Música",
  "Temáticas",
  "Orações infantis"
]

export default function AudioManager() {
  const [audios, setAudios] = useState<Audio[]>(mockAudios)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAudio, setEditingAudio] = useState<Audio | null>(null)
  const [formData, setFormData] = useState<Partial<Audio>>({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    audioUrl: "",
    duration: "",
    category: "",
    subCategory: "",
    type: "audio",
    visible: true,
    order: 0
  })

  // Filter audios
  const filteredAudios = audios.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audio.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audio.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || audio.category === selectedCategory
    const matchesType = selectedType === "all" || audio.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const handleSave = () => {
    if (!formData.title || !formData.imageUrl) {
      alert("Título e Imagem são obrigatórios")
      return
    }

    if (formData.type === "audio" && !formData.audioUrl) {
      alert("URL do áudio é obrigatória para áudios")
      return
    }

    if (editingAudio) {
      // Update existing audio
      setAudios(prev => prev.map(audio => 
        audio.id === editingAudio.id 
          ? { ...audio, ...formData } as Audio
          : audio
      ))
    } else {
      // Create new audio
      const newAudio: Audio = {
        id: Date.now().toString(),
        title: formData.title!,
        subtitle: formData.subtitle,
        description: formData.description,
        imageUrl: formData.imageUrl!,
        audioUrl: formData.audioUrl,
        duration: formData.duration,
        category: formData.category,
        subCategory: formData.subCategory,
        type: formData.type as "audio" | "playlist",
        itemCount: formData.itemCount,
        visible: formData.visible ?? true,
        order: formData.order ?? audios.length + 1,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setAudios(prev => [...prev, newAudio])
    }

    // Reset form
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      audioUrl: "",
      duration: "",
      category: "",
      subCategory: "",
      type: "audio",
      visible: true,
      order: 0
    })
    setEditingAudio(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (audio: Audio) => {
    setEditingAudio(audio)
    setFormData(audio)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este áudio?")) {
      setAudios(prev => prev.filter(audio => audio.id !== id))
    }
  }

  const handleToggleVisibility = (id: string) => {
    setAudios(prev => prev.map(audio => 
      audio.id === id 
        ? { ...audio, visible: !audio.visible }
        : audio
    ))
  }

  const openNewDialog = () => {
    setEditingAudio(null)
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      audioUrl: "",
      duration: "",
      category: "",
      subCategory: "",
      type: "audio",
      visible: true,
      order: audios.length + 1
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Áudios</h2>
          <p className="text-gray-600">Gerencie todos os áudios e playlists da plataforma</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Áudio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAudio ? "Editar Áudio" : "Novo Áudio"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do áudio. Título e Imagem são obrigatórios.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Título - Obrigatório */}
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Digite o título do áudio"
                />
              </div>

              {/* Subtítulo - Opcional */}
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Subtítulo opcional"
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "audio" | "playlist" }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audio">Áudio</SelectItem>
                    <SelectItem value="playlist">Playlist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duração */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duração</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ex: 25:30 ou 1h 30min"
                />
              </div>

              {/* Item Count (para playlists) */}
              {formData.type === "playlist" && (
                <div className="space-y-2">
                  <Label htmlFor="itemCount">Número de Itens</Label>
                  <Input
                    id="itemCount"
                    type="number"
                    value={formData.itemCount || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, itemCount: parseInt(e.target.value) || 0 }))}
                    placeholder="Quantos áudios na playlist"
                  />
                </div>
              )}

              {/* Imagem URL - Obrigatório */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="imageUrl">URL da Imagem *</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              {/* Audio URL - Obrigatório para áudios */}
              {formData.type === "audio" && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="audioUrl">URL do Áudio *</Label>
                  <Input
                    id="audioUrl"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, audioUrl: e.target.value }))}
                    placeholder="https://exemplo.com/audio.mp3"
                  />
                </div>
              )}

              {/* Descrição - Opcional */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição opcional do áudio"
                  rows={3}
                />
              </div>

              {/* Visibilidade */}
              <div className="flex items-center space-x-2 md:col-span-2">
                <Switch
                  id="visible"
                  checked={formData.visible}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, visible: checked }))}
                />
                <Label htmlFor="visible">Visível na plataforma</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar áudios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label>Tipo</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="audio">Áudios</SelectItem>
                  <SelectItem value="playlist">Playlists</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estatísticas</Label>
              <div className="text-sm text-gray-600">
                <p>{filteredAudios.length} de {audios.length} itens</p>
                <p>{filteredAudios.filter(a => a.type === "audio").length} áudios</p>
                <p>{filteredAudios.filter(a => a.type === "playlist").length} playlists</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAudios.map((audio) => (
          <Card key={audio.id} className={`relative ${!audio.visible ? 'opacity-50' : ''}`}>
            <CardContent className="p-4">
              {/* Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img 
                  src={audio.imageUrl} 
                  alt={audio.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">{audio.title}</h3>
                    {audio.subtitle && (
                      <p className="text-xs text-gray-600 line-clamp-1">{audio.subtitle}</p>
                    )}
                  </div>
                  <Badge variant={audio.type === "audio" ? "default" : "secondary"} className="ml-2">
                    {audio.type === "audio" ? "Áudio" : "Playlist"}
                  </Badge>
                </div>

                {audio.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">{audio.description}</p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{audio.category}</span>
                  <span>{audio.duration || (audio.itemCount ? `${audio.itemCount} itens` : "")}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVisibility(audio.id)}
                    >
                      {audio.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    {audio.audioUrl && (
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(audio)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(audio.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAudios.length === 0 && (
        <div className="text-center py-12">
          <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum áudio encontrado</h3>
          <p className="text-gray-500 mb-4">Tente ajustar os filtros ou criar um novo áudio.</p>
          <Button onClick={openNewDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeiro Áudio
          </Button>
        </div>
      )}
    </div>
  )
}