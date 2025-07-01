import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Nota: supabaseAdmin usa a SERVICE_ROLE_KEY, que você deve usar apenas em um ambiente seguro do lado do servidor,
// pois possui privilégios de administrador e pode ignorar suas políticas de RLS!
// Certifique-se de que as seguintes variáveis de ambiente estejam definidas:
// NEXT_PUBLIC_SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)
