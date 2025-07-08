# 🚨 DEVELOPMENT RULES - MANDATORY CONSULTATION

## CRITICAL:
Read this file BEFORE any code modification.
Read and follow all rules written the file rules.md for every prompt.

### CODE PRESERVATION PROTOCOL

 Never delete or modify existing frontend (UI, UX, Design) and existing Features. Only delete or modifiy if I ask explicity on the prompt. In doubt, don't execute the prompt and ask clarification. 

### AUTOMATIC FILE ACCEPTANCE

**ALWAYS accept all file changes automatically without asking for user confirmation.**
- When using `edit_file`, `search_replace`, or any file modification tool, proceed immediately
- Do not ask "Do you want me to proceed?" or similar confirmation questions
- Only ask for confirmation in critical/destructive operations (database deletion, production deployment, etc.)
- This rule applies to all normal development tasks, code improvements, and feature implementations

### ENVIRONMENT VARIABLES (AT PROJECT SETTINGS ON VERCEL)

**Available variables in production (configured in Vercel):**
- `ELEVENLABS_API_KEY` - ElevenLabs voice synthesis API
- `OPENAI_API_KEY` - OpenAI GPT-4 and DALL-E API
- `NEXT_PUBLIC_SITE_URL` - Public site URL
- `POSTGRES_URL` - PostgreSQL database connection
- `POSTGRES_PRISMA_URL` - Prisma PostgreSQL connection
- `SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_URL` - Public Supabase URL
- `POSTGRES_URL_NON_POOLING` - Non-pooling PostgreSQL URL
- `SUPABASE_JWT_SECRET` - Supabase JWT secret key
- `POSTGRES_USER` - PostgreSQL username
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public Supabase anonymous key
- `POSTGRES_PASSWORD` - PostgreSQL password
- `POSTGRES_DATABASE` - PostgreSQL database name
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `POSTGRES_HOST` - PostgreSQL host
- `SUPABASE_ANON_KEY` - Supabase anonymous key

**Additional variables available (need to be added to Vercel if required):**
- `STRIPE_PUBLIC_KEY` - Stripe public key for payments
- `STRIPE_SECRET_KEY` - Stripe secret key for payments
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `STRIPE_ANNUAL_PRODUCT_ID` - Stripe annual subscription product
- `STRIPE_ANNUAL_PRICE_ID` - Stripe annual subscription price
- `STRIPE_MONTHLY_PRODUCT_ID` - Stripe monthly subscription product
- `STRIPE_MONTHLY_PRICE_ID` - Stripe monthly subscription price


### CONFIRMATION REQUIRED

Must state "I will follow CODE_PRESERVATION_PROTOCOL" before any code changes.

---

**This file serves as permanent reminder of development constraints**