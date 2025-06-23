-- Create the sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    image_url TEXT,
    audio_url TEXT NOT NULL,
    duration_minutes INT,
    guide TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
-- We'll use a public domain audio file for the demo.
INSERT INTO sessions (title, subtitle, description, image_url, audio_url, duration_minutes, guide) VALUES
('Terço Diário - Sábado', 'Mistérios Gozosos', 'Hoje vamos meditar os cinco Mistérios Gozosos. Não sabe rezar o terço?', '/placeholder-pr4vx.png', 'https://archive.org/download/TantumErgoSacramentum/01_Tantum_Ergo_Sacramentum.mp3', 25, 'Daniel'),
('Novena para Casais', 'com Amanda e Marcel...', 'Uma novena de 9 dias para fortalecer o matrimônio.', '/images/home/highlights-novena-casais.jpeg', 'https://archive.org/download/TantumErgoSacramentum/02_O_Salutaris_Hostia.mp3', 15, 'Amanda'),
('Oração da Noite', 'Com Juliano Cazarré', 'Uma oração para terminar o dia em paz.', '/images/home/subscribers-oracao-noite.jpeg', 'https://archive.org/download/TantumErgoSacramentum/03_Regina_Coeli.mp3', 9, 'Juliano Cazarré')
ON CONFLICT (id) DO NOTHING;
