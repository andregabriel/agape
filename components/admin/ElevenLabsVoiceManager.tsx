'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Play, Plus, Edit, Copy, Trash2, Eye, EyeOff, Save } from 'lucide-react'

interface Voice {
  id: string
  name: string
  type: 'padre' | 'storytelling'
  gender: 'male' | 'female'
  description: string
  active: boolean
  isDefault: boolean
}

const mockVoices: Voice[] = [
  {
    id: 'voice1',
    name: 'Padre João',
    type: 'padre',
    gender: 'male',
    description: 'Voz solene e reverente, ideal para orações e homilias',
    active: true,
    isDefault: true
  },
  {
    id: 'voice2',
    name: 'Padre Miguel',
    type: 'padre',
    gender: 'male',
    description: 'Voz suave e contemplativa, perfeita para meditações',
    active: true,
    isDefault: false
  },
  {
    id: 'voice3',
    name: 'Padre Antônio',
    type: 'padre',
    gender: 'male',
    description: 'Voz energética e inspiradora para ensinamentos',
    active: true,
    isDefault: false
  },
  {
    id: 'voice4',
    name: 'Clara Narrativa',
    type: 'storytelling',
    gender: 'female',
    description: 'Voz expressiva e envolvente para histórias bíblicas',
    active: true,
    isDefault: false
  },
  {
    id: 'voice5',
    name: 'Maria Contadora',
    type: 'storytelling',
    gender: 'female',
    description: 'Voz doce e maternal, ideal para conteúdo infantil',
    active: true,
    isDefault: false
  },
  {
    id: 'voice6',
    name: 'José Narrador',
    type: 'storytelling',
    gender: 'male',
    description: 'Voz grave e dramática para narrativas épicas',
    active: false,
    isDefault: false
  }
]

export default function ElevenLabsVoiceManager() {
  const [voices, setVoices] = useState<Voice[]>(mockVoices)
  const [selectedVoice, setSelectedVoice] = useState<string>('voice1')
  const [testText, setTestText] = useState('Ave Maria, cheia de graça, o Senhor é convosco.')
  const [isGeneratingTest, setIsGeneratingTest] = useState(false)

  const handleToggleVisibility = (voiceId: string) => {
    setVoices(voices.map(voice => 
      voice.id === voiceId 
        ? { ...voice, active: !voice.active }
        : voice
    ))
  }

  const handleGenerateTest = async () => {
    setIsGeneratingTest(true)
    // Simular geração de teste
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGeneratingTest(false)
    alert('Teste de voz gerado com sucesso!')
  }

  const activeVoices = voices.filter(v => v.active)
  const padreVoices = activeVoices.filter(v => v.type === 'padre')
  const storytellingVoices = activeVoices.filter(v => v.type === 'storytelling')

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Vozes Disponíveis</h2>
          <p className="text-sm text-gray-600">
            {activeVoices.length} vozes ativas de {voices.length} total
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Voz
        </Button>
      </div>

      {/* Voice Categories */}
      <div className="flex space-x-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Padre ({padreVoices.length})</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Storytelling ({storytellingVoices.length})</span>
        </Button>
      </div>

      {/* Voice List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {voices.map((voice) => (
          <Card key={voice.id} className={`relative ${!voice.active ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${voice.type === 'padre' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      {voice.name}
                                             {voice.isDefault && (
                         <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                           Padrão
                         </span>
                       )}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {voice.type} • {voice.gender === 'male' ? 'Masculina' : 'Feminina'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleVisibility(voice.id)}
                  >
                    {voice.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
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
              <p className="text-sm text-gray-600 mb-3">{voice.description}</p>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Play className="w-3 h-3" />
                  <span>Testar Voz</span>
                </Button>
                                 {voice.isDefault && (
                   <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                     Voz Principal
                   </span>
                 )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Eleven Labs Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Eleven Labs</CardTitle>
          <CardDescription>Configure parâmetros globais para geração de voz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Qualidade de Voz</Label>
              <Select defaultValue="high">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa (mais rápido)</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta (melhor qualidade)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estabilidade</Label>
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
              <Label>Clareza</Label>
              <Select defaultValue="high">
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
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Texto de Teste</Label>
              <Textarea 
                placeholder="Digite um texto para testar as vozes..."
                value={testText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTestText(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label>Voz Selecionada para Teste</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activeVoices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name} ({voice.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleGenerateTest}
                  disabled={isGeneratingTest || !testText.trim()}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isGeneratingTest ? 'Gerando...' : 'Gerar Teste'}
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}