# Sistema de Geração Automática de Áudios

## Visão Geral

O sistema de geração automática de áudios integra **OpenAI** para geração de texto e **ElevenLabs** para síntese de voz, permitindo criar conteúdo de áudio católico de alta qualidade de forma automatizada.

## Arquitetura

### Componentes Principais

1. **Content Mapping (`lib/content-mapping.ts`)**
   - Mapeia todo o conteúdo da aplicação
   - Define tipos de voz (padre/storytelling)
   - Estabelece prioridades e categorias
   - Contém prompts personalizados para cada item

2. **AutoGenerationManager (`components/admin/AutoGenerationManager.tsx`)**
   - Interface principal para geração em lote
   - Filtros por categoria, tipo de voz, prioridade
   - Monitoramento de progresso em tempo real
   - Controles de pausa/stop/retry

3. **Server Actions (`app/actions/audio-generation.ts`)**
   - Integração com APIs OpenAI e ElevenLabs
   - Geração de texto e áudio
   - Tratamento de erros e retry automático
   - Salvamento de arquivos

4. **Voice Management (`components/admin/ElevenLabsVoiceManager.tsx`)**
   - Gerenciamento de vozes ElevenLabs
   - Testes de qualidade
   - Configurações de estabilidade e clareza

## Fluxo de Geração

### 1. Geração de Texto (OpenAI)
```typescript
// Prompt customizado baseado no conteúdo
const systemPrompt = buildSystemPrompt(contentItem, config)
const userPrompt = contentItem.prompt || `Crie conteúdo para: ${contentItem.title}`

// Configurações de IA
{
  model: 'gpt-4',
  max_tokens: getDurationTokens(config.duration),
  temperature: getCreativityTemperature(config.creativity),
  presence_penalty: 0.6,
  frequency_penalty: 0.3
}
```

### 2. Síntese de Voz (ElevenLabs)
```typescript
// Configurações de voz
{
  text: generatedText,
  model_id: 'eleven_multilingual_v2',
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.8,
    style: 0.0,
    use_speaker_boost: true
  }
}
```

### 3. Salvamento e Catalogação
- Arquivos salvos em storage (AWS S3)
- Metadados armazenados no banco
- URLs geradas para acesso

## Mapeamento de Conteúdo

### Estrutura do ContentItem
```typescript
interface ContentItem {
  id: string
  title: string
  subtitle?: string
  category: string
  voiceType: 'padre' | 'storytelling'
  estimatedDuration?: string
  priority: 'high' | 'medium' | 'low'
  contentType: 'audio' | 'playlist'
  prompt?: string // Prompt personalizado para OpenAI
}
```

### Categorias Mapeadas

1. **Corpus Christi** (4 itens) - Voz de Padre
2. **Destaques** (3 itens) - Voz de Padre  
3. **Rotinas Matinais** (6 itens) - Voz de Padre
4. **Favoritas dos Assinantes** (3 itens) - Voz de Padre
5. **Rotinas Noturnas** (3 itens) - Voz de Padre
6. **Histórias Bíblicas para Dormir** (6 itens) - Storytelling
7. **Novo Testamento** (6 itens) - Storytelling
8. **Não sabe por onde começar** (6 itens) - Padre/Storytelling
9. **Temáticas** (3 itens) - Voz de Padre
10. **Orações infantis** (6 itens) - Storytelling
11. **Novenas** (3 itens) - Voz de Padre
12. **Músicas para Dormir** (3 itens) - Voz de Padre
13. **Música** (3 itens) - Storytelling/Padre
14. **Rezadas Recentemente** (3 itens) - Voz de Padre

**Total**: 58 itens mapeados (~25 horas de conteúdo estimado)

## Vozes Disponíveis

### Vozes de Padre
- **Padre João** (Padrão) - Voz solene e reverente
- **Padre Miguel** - Voz suave e contemplativa  
- **Padre Antônio** - Voz energética e inspiradora

### Vozes de Storytelling
- **Clara Narrativa** - Voz expressiva para histórias bíblicas
- **Maria Contadora** - Voz maternal para conteúdo infantil
- **José Narrador** - Voz dramática para narrativas épicas

## Configurações de Geração

### Criatividade (Temperature)
- **Baixa (0.3)**: Conteúdo mais conservador e tradicional
- **Média (0.7)**: Balanceado (recomendado)
- **Alta (1.0)**: Mais criativo e variado

### Estilo de Linguagem
- **Formal**: Linguagem teológica apropriada
- **Casual**: Acessível e próxima do cotidiano
- **Espiritual**: Contemplativa e inspiradora
- **Tradicional**: Católica clássica

### Duração
- **Curta**: 1-3 minutos (300 tokens)
- **Média**: 5-10 minutos (800 tokens)
- **Longa**: 15-20 minutos (1500 tokens)

## Interface do Admin

### Geração Automática
- **Filtros e Seleção**: Escolha conteúdo por categoria/prioridade
- **Geração**: Configure parâmetros e inicie processo
- **Resultados**: Monitore progresso e veja resultados

### Eleven Labs
- **Gerenciamento de Vozes**: Ative/desative vozes
- **Teste de Qualidade**: Teste vozes com texto personalizado
- **Configurações**: Ajuste qualidade, estabilidade e clareza

### OpenAI
- **Geração Individual**: Crie conteúdo específico
- **Geração em Lote**: Múltiplos itens simultaneamente
- **Configurações de IA**: Ajuste criatividade e estilo

## Estatísticas do Sistema

### Por Tipo de Voz
- **Padre**: 42 itens (72%)
- **Storytelling**: 16 itens (28%)

### Por Prioridade
- **Alta**: 35 itens (60%)
- **Média**: 18 itens (31%)
- **Baixa**: 5 itens (9%)

### Por Tipo de Conteúdo
- **Áudio**: 38 itens (66%)
- **Playlist**: 20 itens (34%)

## Variáveis de Ambiente

```bash
# APIs de Geração
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Storage para arquivos gerados
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
```

## Monitoramento e Logs

### Progresso em Tempo Real
- Progresso total do lote
- Item atual sendo processado
- Tempo estimado restante
- Status de cada item (queued/generating-text/generating-audio/completed/failed)

### Tratamento de Erros
- Retry automático configurável
- Rate limiting respeitado
- Logs detalhados de erro
- Fallback para vozes alternativas

## Custo Estimado

### OpenAI GPT-4
- ~$0.03 por 1K tokens de input
- ~$0.06 por 1K tokens de output
- Custo médio por áudio: $0.05-0.15

### ElevenLabs
- ~$0.30 por 1K caracteres
- Custo médio por áudio: $0.50-2.00

### Total Estimado para 58 itens
- OpenAI: ~$8-20
- ElevenLabs: ~$30-120
- **Total: ~$40-140**

## Próximos Passos

1. **Implementar Storage Real**: Integração com AWS S3
2. **Sistema de Filas**: Redis/Bull para processamento em background
3. **Analytics**: Métricas de uso e qualidade
4. **Backup e Versionamento**: Manter histórico de versões
5. **API Webhooks**: Notificações de progresso
6. **Qualidade de Áudio**: Processamento e normalização
7. **Traduções**: Suporte para múltiplos idiomas

## Uso Prático

### Para Iniciar Geração Completa
1. Acesse `/admin`
2. Vá para aba "Geração Auto"
3. Configure filtros desejados
4. Ajuste configurações de geração
5. Clique "Iniciar Geração"
6. Monitore progresso na aba "Resultados"

### Para Gerar Conteúdo Específico
1. Use filtros para selecionar categoria/prioridade
2. Configure parâmetros de qualidade
3. Inicie geração e monitore progresso
4. Teste áudios gerados na interface

O sistema está preparado para produzir todo o catálogo de áudios católicos da aplicação de forma automatizada e com alta qualidade.