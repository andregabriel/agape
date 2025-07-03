# 🔧 Configuração de Variáveis de Ambiente no Vercel

## 🚨 PROBLEMA IDENTIFICADO
A tela branca era causada por **credenciais temporárias/falsas do Supabase** no `.env.local`.

## ✅ SOLUÇÃO
Configure estas variáveis no **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

### 🔐 Supabase (CRÍTICO)
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://llomihbcknpzndlabmmt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTc1MzQsImV4cCI6MjA2NTgzMzUzNH0.lP6F0JwQZ-n6Y2w67MLCdTPcUaiVw-ddloryJrlbq7U
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDI1NzUzNCwiZXhwIjoyMDY1ODMzNTM0fQ.fCUHZBkeuBtcb5IxTT7JvpHSoV6au2mwFpEPXHTjFXU
NEXT_PUBLIC_SITE_URL=https://v0-agape11.vercel.app
\`\`\`

### 🤖 OpenAI
\`\`\`
OPENAI_API_KEY=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
\`\`\`

### 🎵 ElevenLabs
\`\`\`
ELEVENLABS_API_KEY=sk_a56a14ceb532db7b8101a5f3dc53249a65f89ab4ccd4824e
\`\`\`

### 💳 Stripe
\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51PeHXiCjnHnFQA5FQGTyDZ1hYVjrusTuzq9rJV3pVl0YqkdICCWC4qYwshHzmqObWN1xspCYC7v2DnkNsQ0L4pug00n2oLotqE
STRIPE_SECRET_KEY=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
STRIPE_ANNUAL_PRODUCT_ID=prod_SXZHcRPJsVx0BB
STRIPE_ANNUAL_PRICE_ID=price_1RcU8VCjnHnFQA5Fbs2VeV69
STRIPE_MONTHLY_PRODUCT_ID=prod_SXZHwpqRrD1fmt
STRIPE_MONTHLY_PRICE_ID=price_1RcU9NCjnHnFQA5Faw4SxjzM
\`\`\`

### 🔐 Google OAuth
\`\`\`
GOOGLE_CLIENT_ID=437534514271-1hqkc6jqit19aot7338nqeoo3994acpg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
\`\`\`

## 📋 PASSOS PARA CONFIGURAR

1. **Acesse o Vercel Dashboard**
2. **Selecione o projeto** (v0-agape11)
3. **Vá em Settings** → **Environment Variables**
4. **Adicione cada variável** uma por uma
5. **Selecione os ambientes**: Production, Preview, Development
6. **Redeploy** o projeto após adicionar todas

## 🎯 RESULTADO ESPERADO
- ✅ Middleware funcionará corretamente
- ✅ Supabase conectará sem erros
- ✅ Páginas carregarão normalmente
- ✅ Login funcionará
- ✅ Fim da tela branca!

## 🔍 COMO TESTAR
Após configurar no Vercel:
1. Acesse: `https://v0-agape11.vercel.app/debug-login`
2. Acesse: `https://v0-agape11.vercel.app/login`
3. Ambos devem carregar sem tela branca
