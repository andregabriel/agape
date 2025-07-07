# 🚨 DEVELOPMENT RULES - MANDATORY CONSULTATION

## CRITICAL: Read this file BEFORE any code modification

### CODE PRESERVATION PROTOCOL

1. **ADDITIVE ONLY**: Never delete or modify existing functional code
2. **ZERO REMOVAL**: All working features, UI, UX, business logic must remain intact
3. **PRESERVE DEPENDENCIES**: Keep all imports, providers, components, and logic
4. **ASK WHEN UNCLEAR**: If ambiguous, keep existing functionality and ask for clarification
5. **STOP IF BREAKING**: If cannot implement without breaking existing code, HALT and describe issue
6. **CHECK LOGS**: Always consult Logtail logger for errors
7. **CONFIRM RULES**: Always acknowledge following these rules

### TECHNICAL IMPLEMENTATION

- Use `search_replace` for surgical changes
- Read complete file before editing
- Verify component dependencies
- Add new code alongside existing
- Use composition over modification

### DEPLOYMENT CONTEXT

- **IMPORTANT**: User does NOT use localhost
- User only sees changes after deploy to Vercel
- All testing and verification happens on deployed app
- Always reference deployed URL when showing features

### ENVIRONMENT VARIABLES (VERCEL)

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
- `NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN` - Logtail logging service
- `STRIPE_PUBLIC_KEY` - Stripe public key for payments
- `STRIPE_SECRET_KEY` - Stripe secret key for payments
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `STRIPE_ANNUAL_PRODUCT_ID` - Stripe annual subscription product
- `STRIPE_ANNUAL_PRICE_ID` - Stripe annual subscription price
- `STRIPE_MONTHLY_PRODUCT_ID` - Stripe monthly subscription product
- `STRIPE_MONTHLY_PRICE_ID` - Stripe monthly subscription price

**Usage Notes:**
- Use these exact variable names in code
- NEXT_PUBLIC_* variables are client-side accessible
- All others are server-side only
- Never hardcode API keys or secrets

### VIOLATION IMPACT

- User loses hours of work
- Functional features break
- Development velocity severely impacted

### CONFIRMATION REQUIRED

Must state "I will follow CODE_PRESERVATION_PROTOCOL" before any code changes.

---

**This file serves as permanent reminder of development constraints**