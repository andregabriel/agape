-- Adicionar campos necessários na tabela audios
ALTER TABLE audios 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS elevenlabs_voice_id TEXT,
ADD COLUMN IF NOT EXISTS category TEXT;

-- Comentários para documentar os campos
COMMENT ON COLUMN audios.subtitle IS 'Subtítulo opcional da oração';
COMMENT ON COLUMN audios.elevenlabs_voice_id IS 'ID da voz do ElevenLabs para síntese de áudio';
COMMENT ON COLUMN audios.category IS 'Categoria da oração (ex: Teste, Corpus Christi, Destaques, etc.)'; 