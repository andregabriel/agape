"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Settings, Mic, Play, Zap, Plus, X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { generateAudioFromAdmin, type AudioGenerationRequest } from "@/lib/admin-audio-service"

interface AdminSectionProps {
  isExpanded: boolean
  onToggle: () => void
}

export default function AdminSection({ isExpanded, onToggle }: AdminSectionProps) {
  const [activeTab, setActiveTab] = useState<'audio' | 'automation'>('audio')
  const [isGenerating, setIsGenerating] = useState(false)
  const [autoGenerationEnabled, setAutoGenerationEnabled] = useState(false)
  const [generationStatus, setGenerationStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  
  // Estados para criação de áudio
  const [audioForm, setAudioForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    voiceType: 'padre' as 'padre' | 'storytelling',
    duration: '5',
    prompt: ''
  })

  const handleAudioGeneration = async () => {
    setIsGenerating(true)
    setGenerationStatus({ type: null, message: '' })
    
    try {
      const request: AudioGenerationRequest = {
        title: audioForm.title,
        subtitle: audioForm.subtitle || undefined,
        description: audioForm.description || undefined,
        category: audioForm.category,
        voiceType: audioForm.voiceType,
        duration: audioForm.duration,
        prompt: audioForm.prompt || undefined
      }

      const result = await generateAudioFromAdmin(request)
      
      if (result.success) {
        setGenerationStatus({
          type: 'success',
          message: `Áudio gerado com sucesso! ID: ${result.audioId}`
        })
        
        // Limpar formulário após sucesso
        setAudioForm({
          title: '',
          subtitle: '',
          description: '',
          category: '',
          voiceType: 'padre',
          duration: '5',
          prompt: ''
        })
      } else {
        setGenerationStatus({
          type: 'error',
          message: result.error || 'Erro desconhecido ao gerar áudio'
        })
      }
    } catch (error) {
      console.error('Error generating audio:', error)
      setGenerationStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFormChange = (field: string, value: string) => {
    setAudioForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full border-2 border-orange-500/20 bg-orange-50/10">
      <CardHeader 
        className="cursor-pointer hover:bg-orange-100/20 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-700">Área do Admin</CardTitle>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              Admin
            </Badge>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-orange-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-orange-600" />
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === 'audio' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('audio')}
              className="flex items-center space-x-2"
            >
              <Mic className="h-4 w-4" />
              <span>Criar Áudio</span>
            </Button>
            <Button
              variant={activeTab === 'automation' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('automation')}
              className="flex items-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>Automação</span>
            </Button>
          </div>

          {/* Tab Content */}
          {activeTab === 'audio' && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Crie áudios automaticamente usando OpenAI para texto e ElevenLabs para voz.
                </AlertDescription>
              </Alert>

              {/* Status de geração */}
              {generationStatus.type && (
                <Alert className={generationStatus.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
                  <div className="flex items-center space-x-2">
                    {generationStatus.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={generationStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                      {generationStatus.message}
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={audioForm.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="Ex: Oração Matinal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={audioForm.subtitle}
                    onChange={(e) => handleFormChange('subtitle', e.target.value)}
                    placeholder="Ex: Com voz de padre"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={audioForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Descrição da oração..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={audioForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teste">Teste</SelectItem>
                      <SelectItem value="corpus-christi">Corpus Christi</SelectItem>
                      <SelectItem value="rotinas-matinais">Rotinas Matinais</SelectItem>
                      <SelectItem value="destaques">Destaques</SelectItem>
                      <SelectItem value="favoritas">Favoritas</SelectItem>
                      <SelectItem value="musica">Música</SelectItem>
                      <SelectItem value="novenas">Novenas</SelectItem>
                      <SelectItem value="historias-biblicas">Histórias Bíblicas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voiceType">Tipo de Voz *</Label>
                  <Select value={audioForm.voiceType} onValueChange={(value) => handleFormChange('voiceType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="padre">Padre (Archer)</SelectItem>
                      <SelectItem value="storytelling">Storytelling (Jessica)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (min) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={audioForm.duration}
                    onChange={(e) => handleFormChange('duration', e.target.value)}
                    placeholder="5"
                    min="1"
                    max="60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt Personalizado (opcional)</Label>
                <Textarea
                  id="prompt"
                  value={audioForm.prompt}
                  onChange={(e) => handleFormChange('prompt', e.target.value)}
                  placeholder="Prompt específico para OpenAI gerar o texto..."
                  rows={3}
                />
              </div>

              <Separator />

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => {
                  setAudioForm({
                    title: '',
                    subtitle: '',
                    description: '',
                    category: '',
                    voiceType: 'padre',
                    duration: '5',
                    prompt: ''
                  })
                  setGenerationStatus({ type: null, message: '' })
                }}>
                  <X className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
                <Button 
                  onClick={handleAudioGeneration}
                  disabled={isGenerating || !audioForm.title || !audioForm.category}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Gerar Áudio
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Configure rotinas automatizadas para geração de conteúdo.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Geração Automática de Áudios</Label>
                    <p className="text-sm text-muted-foreground">
                      Gera automaticamente áudios baseados em prompts pré-definidos
                    </p>
                  </div>
                  <Switch
                    checked={autoGenerationEnabled}
                    onCheckedChange={setAutoGenerationEnabled}
                  />
                </div>

                {autoGenerationEnabled && (
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium">Configurações da Automação</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Frequência</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diária</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Quantidade por Execução</Label>
                        <Input type="number" defaultValue="3" min="1" max="10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Categorias Prioritárias</Label>
                      <div className="flex flex-wrap gap-2">
                        {['teste', 'destaques', 'rotinas-matinais', 'favoritas'].map(category => (
                          <Badge key={category} variant="secondary" className="cursor-pointer">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        Salvar Configurações
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
} 