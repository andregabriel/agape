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
import { Checkbox } from "@/components/ui/checkbox"
import { 
  List, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Play,
  Eye,
  EyeOff,
  Save,
  Music,
  GripVertical
} from "lucide-react"

interface Playlist {
  id: string
  name: string // Nome da playlist - Obrigatório
  description?: string
  imageUrl: string // Imagem da playlist - Obrigatório
  audioList: string[] // Lista de IDs dos áudios que compõem a playlist
  category?: string
  visible: boolean
  order: number
  createdAt: string
  estimatedDuration?: string
  itemCount: number
}

interface Audio {
  id: string
  title: string
  duration?: string
  category?: string
  imageUrl: string
}

// Mock data
const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Rotinas Matinais",
    description: "Coleção de orações e meditações para começar o dia",
    imageUrl: "/placeholder.svg?width=300&height=400",
    audioList: ["audio1", "audio2", "audio3"],
    category: "Rotinas Matinais",
    visible: true,
    order: 1,
    createdAt: "2024-01-15",
    estimatedDuration: "45 min",
    itemCount: 6
  },
  {
    id: "2",
    name: "Novenas Especiais",
    description: "As novenas mais populares em uma coleção completa",
    imageUrl: "/placeholder.svg?width=300&height=400",
    audioList: ["audio4", "audio5", "audio6", "audio7"],
    category: "Novenas",
    visible: true,
    order: 2,
    createdAt: "2024-01-14",
    estimatedDuration: "3h 20min",
    itemCount: 12
  },
  {
    id: "3",
    name: "Histórias Bíblicas para Dormir",
    description: "Narrativas bíblicas contadas de forma suave para relaxar",
    imageUrl: "/placeholder.svg?width=300&height=400",
    audioList: ["audio8", "audio9"],
    category: "Histórias Bíblicas para Dormir",
    visible: true,
    order: 3,
    createdAt: "2024-01-13",
    estimatedDuration: "1h 15min",
    itemCount: 8
  }
]

const mockAudios: Audio[] = [
  { id: "audio1", title: "Terço Diário", duration: "25:30", category: "Rotinas Matinais", imageUrl: "/placeholder.svg" },
  { id: "audio2", title: "Evangelho do Dia", duration: "15:45", category: "Rotinas Matinais", imageUrl: "/placeholder.svg" },
  { id: "audio3", title: "Oferecimento Matinal", duration: "3:20", category: "Rotinas Matinais", imageUrl: "/placeholder.svg" },
  { id: "audio4", title: "Novena São José", duration: "18:30", category: "Novenas", imageUrl: "/placeholder.svg" },
  { id: "audio5", title: "Novena Nossa Senhora", duration: "22:15", category: "Novenas", imageUrl: "/placeholder.svg" },
  { id: "audio6", title: "Novena Sagrado Coração", duration: "20:45", category: "Novenas", imageUrl: "/placeholder.svg" },
  { id: "audio7", title: "Novena Santo Antônio", duration: "16:30", category: "Novenas", imageUrl: "/placeholder.svg" },
  { id: "audio8", title: "História de Moisés", duration: "26:00", category: "Histórias Bíblicas", imageUrl: "/placeholder.svg" },
  { id: "audio9", title: "Parábola do Bom Samaritano", duration: "12:30", category: "Histórias Bíblicas", imageUrl: "/placeholder.svg" }
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

export default function PlaylistManager() {
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null)
  const [formData, setFormData] = useState<Partial<Playlist>>({
    name: "",
    description: "",
    imageUrl: "",
    audioList: [],
    category: "",
    visible: true,
    order: 0
  })
  const [selectedAudios, setSelectedAudios] = useState<string[]>([])

  // Filter playlists
  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         playlist.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || playlist.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleSave = () => {
    if (!formData.name || !formData.imageUrl) {
      alert("Nome e Imagem são obrigatórios")
      return
    }

    if (selectedAudios.length === 0) {
      alert("Selecione pelo menos um áudio para a playlist")
      return
    }

    if (editingPlaylist) {
      // Update existing playlist
      setPlaylists(prev => prev.map(playlist => 
        playlist.id === editingPlaylist.id 
          ? { 
              ...playlist, 
              ...formData,
              audioList: selectedAudios,
              itemCount: selectedAudios.length
            } as Playlist
          : playlist
      ))
    } else {
      // Create new playlist
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: formData.name!,
        description: formData.description,
        imageUrl: formData.imageUrl!,
        audioList: selectedAudios,
        category: formData.category,
        visible: formData.visible ?? true,
        order: formData.order ?? playlists.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
        itemCount: selectedAudios.length
      }
      setPlaylists(prev => [...prev, newPlaylist])
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      audioList: [],
      category: "",
      visible: true,
      order: 0
    })
    setSelectedAudios([])
    setEditingPlaylist(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (playlist: Playlist) => {
    setEditingPlaylist(playlist)
    setFormData(playlist)
    setSelectedAudios(playlist.audioList)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta playlist?")) {
      setPlaylists(prev => prev.filter(playlist => playlist.id !== id))
    }
  }

  const handleToggleVisibility = (id: string) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === id 
        ? { ...playlist, visible: !playlist.visible }
        : playlist
    ))
  }

  const handleAudioToggle = (audioId: string) => {
    setSelectedAudios(prev => 
      prev.includes(audioId)
        ? prev.filter(id => id !== audioId)
        : [...prev, audioId]
    )
  }

  const openNewDialog = () => {
    setEditingPlaylist(null)
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      audioList: [],
      category: "",
      visible: true,
      order: playlists.length + 1
    })
    setSelectedAudios([])
    setIsDialogOpen(true)
  }

  const getAudioTitle = (audioId: string) => {
    const audio = mockAudios.find(a => a.id === audioId)
    return audio?.title || audioId
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Playlists</h2>
          <p className="text-gray-600">Organize coleções de áudios em playlists temáticas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Playlist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPlaylist ? "Editar Playlist" : "Nova Playlist"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da playlist. Nome e Imagem são obrigatórios.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações da Playlist */}
              <div className="space-y-4">
                <h3 className="font-medium">Informações da Playlist</h3>
                
                {/* Nome - Obrigatório */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Playlist *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Digite o nome da playlist"
                  />
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

                {/* Imagem URL - Obrigatório */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL da Imagem *</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição da playlist"
                    rows={3}
                  />
                </div>

                {/* Visibilidade */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="visible"
                    checked={formData.visible}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, visible: checked }))}
                  />
                  <Label htmlFor="visible">Visível na plataforma</Label>
                </div>
              </div>

              {/* Seleção de Áudios */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Áudios da Playlist</h3>
                  <Badge variant="outline">
                    {selectedAudios.length} selecionados
                  </Badge>
                </div>
                
                <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {mockAudios.map((audio) => (
                      <div key={audio.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                        <Checkbox
                          checked={selectedAudios.includes(audio.id)}
                          onCheckedChange={() => handleAudioToggle(audio.id)}
                        />
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={audio.imageUrl} 
                            alt={audio.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{audio.title}</p>
                          <p className="text-xs text-gray-500">{audio.category} • {audio.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar playlists..."
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
              <Label>Estatísticas</Label>
              <div className="text-sm text-gray-600">
                <p>{filteredPlaylists.length} de {playlists.length} playlists</p>
                <p>{filteredPlaylists.reduce((acc, p) => acc + p.itemCount, 0)} áudios total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Playlist List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaylists.map((playlist) => (
          <Card key={playlist.id} className={`relative ${!playlist.visible ? 'opacity-50' : ''}`}>
            <CardContent className="p-4">
              {/* Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
                <img 
                  src={playlist.imageUrl} 
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <List className="w-3 h-3 mr-1" />
                    Playlist
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">{playlist.name}</h3>
                    {playlist.description && (
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">{playlist.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{playlist.category}</span>
                  <span>{playlist.itemCount} áudios</span>
                </div>

                {playlist.estimatedDuration && (
                  <div className="text-xs text-gray-500">
                    Duração: {playlist.estimatedDuration}
                  </div>
                )}

                {/* Audio List Preview */}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-700">Áudios incluídos:</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    {playlist.audioList.slice(0, 3).map((audioId, index) => (
                      <div key={audioId} className="flex items-center space-x-1">
                        <span className="text-gray-400">{index + 1}.</span>
                        <span className="truncate">{getAudioTitle(audioId)}</span>
                      </div>
                    ))}
                    {playlist.audioList.length > 3 && (
                      <div className="text-gray-400">
                        +{playlist.audioList.length - 3} mais...
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVisibility(playlist.id)}
                    >
                      {playlist.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(playlist)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(playlist.id)}
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

      {filteredPlaylists.length === 0 && (
        <div className="text-center py-12">
          <List className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma playlist encontrada</h3>
          <p className="text-gray-500 mb-4">Tente ajustar os filtros ou criar uma nova playlist.</p>
          <Button onClick={openNewDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeira Playlist
          </Button>
        </div>
      )}
    </div>
  )
}