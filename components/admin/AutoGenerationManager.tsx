'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ALL_CONTENT, CONTENT_STATS, getContentByFilters, ContentItem } from '@/lib/content-mapping'
import { Play, Pause, Square, RefreshCw, CheckCircle, XCircle, Clock, Zap } from 'lucide-react'

interface GenerationJob {
  id: string
  contentId: string
  title: string
  status: 'queued' | 'generating-text' | 'generating-audio' | 'completed' | 'failed'
  progress: number
  startTime?: Date
  completedTime?: Date
  errorMessage?: string
  estimatedTimeRemaining?: string
  generatedTextLength?: number
  audioUrl?: string
}

export default function AutoGenerationManager() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedVoiceType, setSelectedVoiceType] = useState<'all' | 'padre' | 'storytelling'>('all')
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationJobs, setGenerationJobs] = useState<GenerationJob[]>([])
  const [currentJob, setCurrentJob] = useState<GenerationJob | null>(null)
  const [totalProgress, setTotalProgress] = useState(0)
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<string>('')
  const [generationSpeed, setGenerationSpeed] = useState<'fast' | 'balanced' | 'quality'>('balanced')
  const [autoRetry, setAutoRetry] = useState(true)
  const [maxRetries, setMaxRetries] = useState(3)

  // Filtrar conteúdo baseado nos filtros selecionados
  const filteredContent = getContentByFilters({
    voiceType: selectedVoiceType === 'all' ? undefined : selectedVoiceType,
    priority: selectedPriority === 'all' ? undefined : selectedPriority,
    category: selectedCategories.length > 0 ? selectedCategories[0] : undefined // Simplificado para demo
  })

  // Estatísticas do conteúdo filtrado
  const filteredStats = {
    totalItems: filteredContent.length,
    byVoiceType: {
      padre: filteredContent.filter(item => item.voiceType === 'padre').length,
      storytelling: filteredContent.filter(item => item.voiceType === 'storytelling').length
    },
    byPriority: {
      high: filteredContent.filter(item => item.priority === 'high').length,
      medium: filteredContent.filter(item => item.priority === 'medium').length,
      low: filteredContent.filter(item => item.priority === 'low').length
    },
    estimatedTime: filteredContent.reduce((total, item) => {
      const duration = item.estimatedDuration || "5 min"
      const minutes = parseInt(duration.split('-')[0]) || 5
      return total + minutes
    }, 0)
  }

  // Simular geração de áudios
  const startGeneration = async () => {
    if (filteredContent.length === 0) {
      alert('Nenhum conteúdo selecionado para geração!')
      return
    }

    setIsGenerating(true)
    
    // Criar jobs para cada item de conteúdo
    const jobs: GenerationJob[] = filteredContent.map(item => ({
      id: `job-${item.id}`,
      contentId: item.id,
      title: item.title,
      status: 'queued',
      progress: 0,
      startTime: new Date()
    }))

    setGenerationJobs(jobs)
    setTotalProgress(0)

    // Simular processamento sequencial
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i]
      setCurrentJob(job)
      
      // Atualizar status para gerando texto
      job.status = 'generating-text'
      job.progress = 10
      setGenerationJobs([...jobs])
      
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simular geração de texto
      
      // Atualizar status para gerando áudio
      job.status = 'generating-audio'
      job.progress = 60
      job.generatedTextLength = Math.floor(Math.random() * 1000) + 200
      setGenerationJobs([...jobs])
      
      await new Promise(resolve => setTimeout(resolve, 3000)) // Simular geração de áudio
      
      // Completar job
      job.status = 'completed'
      job.progress = 100
      job.completedTime = new Date()
      job.audioUrl = `/generated-audio/${job.contentId}.mp3`
      setGenerationJobs([...jobs])
      
      // Atualizar progresso total
      setTotalProgress(((i + 1) / jobs.length) * 100)
    }

    setIsGenerating(false)
    setCurrentJob(null)
  }

  const pauseGeneration = () => {
    setIsGenerating(false)
    // Implementar pausa real aqui
  }

  const stopGeneration = () => {
    setIsGenerating(false)
    setCurrentJob(null)
    setGenerationJobs([])
    setTotalProgress(0)
  }

  const retryFailedJobs = () => {
    const failedJobs = generationJobs.filter(job => job.status === 'failed')
    // Implementar retry aqui
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const categories = Object.keys(CONTENT_STATS.byCategory)

  return (
    <div className="space-y-6">
      {/* Estatísticas Globais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{CONTENT_STATS.totalItems}</div>
            <div className="text-sm text-gray-600">Total de Itens</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{CONTENT_STATS.byVoiceType.padre}</div>
            <div className="text-sm text-gray-600">Voz de Padre</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{CONTENT_STATS.byVoiceType.storytelling}</div>
            <div className="text-sm text-gray-600">Storytelling</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{Math.round(CONTENT_STATS.estimatedTotalHours)}</div>
            <div className="text-sm text-gray-600">Horas Estimadas</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="filters" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="filters">Filtros e Seleção</TabsTrigger>
          <TabsTrigger value="generation">Geração</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="filters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Conteúdo</CardTitle>
              <CardDescription>Selecione o conteúdo para geração automática</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtros por Tipo de Voz */}
              <div className="space-y-2">
                <Label>Tipo de Voz</Label>
                <Select value={selectedVoiceType} onValueChange={(value: any) => setSelectedVoiceType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Vozes</SelectItem>
                    <SelectItem value="padre">Voz de Padre</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtros por Prioridade */}
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select value={selectedPriority} onValueChange={(value: any) => setSelectedPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Prioridades</SelectItem>
                    <SelectItem value="high">Alta Prioridade</SelectItem>
                    <SelectItem value="medium">Média Prioridade</SelectItem>
                    <SelectItem value="low">Baixa Prioridade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtros por Categoria */}
              <div className="space-y-2">
                <Label>Categorias</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category} ({CONTENT_STATS.byCategory[category]})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estatísticas do Conteúdo Filtrado */}
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <div className="text-lg font-semibold mb-2">Seleção Atual</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{filteredStats.totalItems}</div>
                      <div className="text-sm text-gray-600">Itens</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{filteredStats.byVoiceType.padre}</div>
                      <div className="text-sm text-gray-600">Padre</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{filteredStats.byVoiceType.storytelling}</div>
                      <div className="text-sm text-gray-600">Storytelling</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-600">{Math.round(filteredStats.estimatedTime / 60)}</div>
                      <div className="text-sm text-gray-600">Horas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Geração</CardTitle>
              <CardDescription>Configure como os áudios serão gerados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Velocidade vs Qualidade</Label>
                  <Select value={generationSpeed} onValueChange={(value: any) => setGenerationSpeed(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Rápido (qualidade básica)</SelectItem>
                      <SelectItem value="balanced">Balanceado (recomendado)</SelectItem>
                      <SelectItem value="quality">Qualidade Máxima (mais lento)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Máximo de Tentativas</Label>
                                     <Input
                     type="number"
                     min="1"
                     max="10"
                     value={maxRetries}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxRetries(Number(e.target.value))}
                   />
                 </div>
               </div>
 
               <div className="flex items-center space-x-2">
                 <Checkbox
                   id="auto-retry"
                   checked={autoRetry}
                   onCheckedChange={(checked: boolean) => setAutoRetry(checked)}
                 />
                 <Label htmlFor="auto-retry">Tentar novamente automaticamente em caso de erro</Label>
               </div>

              {/* Controles de Geração */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    {filteredStats.totalItems} itens selecionados
                  </div>
                  <div className="text-sm text-gray-600">
                    Tempo estimado: ~{Math.round(filteredStats.estimatedTime / 60)} horas
                  </div>
                </div>

                <div className="flex space-x-2">
                  {!isGenerating ? (
                    <Button onClick={startGeneration} disabled={filteredStats.totalItems === 0} className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Iniciar Geração</span>
                    </Button>
                  ) : (
                    <>
                      <Button onClick={pauseGeneration} variant="outline" className="flex items-center space-x-2">
                        <Pause className="w-4 h-4" />
                        <span>Pausar</span>
                      </Button>
                      <Button onClick={stopGeneration} variant="destructive" className="flex items-center space-x-2">
                        <Square className="w-4 h-4" />
                        <span>Parar</span>
                      </Button>
                    </>
                  )}
                  
                  {generationJobs.some(job => job.status === 'failed') && (
                    <Button onClick={retryFailedJobs} variant="outline" className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Tentar Novamente</span>
                    </Button>
                  )}
                </div>

                {/* Progresso Geral */}
                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progresso Geral</span>
                      <span className="text-sm text-gray-600">{Math.round(totalProgress)}%</span>
                    </div>
                    <Progress value={totalProgress} className="w-full" />
                  </div>
                )}

                {/* Job Atual */}
                {currentJob && (
                  <Card className="bg-yellow-50">
                                         <CardContent className="p-4">
                       <div className="flex items-center justify-between mb-2">
                         <div className="font-medium">{currentJob.title}</div>
                         <Badge>
                           {currentJob.status === 'generating-text' ? 'Gerando Texto' : 'Gerando Áudio'}
                         </Badge>
                       </div>
                       <Progress value={currentJob.progress} className="w-full" />
                     </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resultados da Geração</CardTitle>
              <CardDescription>Veja o progresso e resultados dos áudios gerados</CardDescription>
            </CardHeader>
            <CardContent>
              {generationJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma geração iniciada ainda
                </div>
              ) : (
                <div className="space-y-2">
                  {generationJobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {job.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : job.status === 'failed' ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-500" />
                        )}
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-gray-600">
                            {job.status === 'completed' && job.generatedTextLength && (
                              <span>{job.generatedTextLength} caracteres gerados</span>
                            )}
                            {job.errorMessage && (
                              <span className="text-red-500">{job.errorMessage}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-600">
                          {job.progress}%
                        </div>
                        {job.status === 'completed' && job.audioUrl && (
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}