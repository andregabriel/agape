import { getSupabaseBrowserClient } from "@/lib/supabase/client"

/**
 * Verifica se o usuário atual é um convidado (guest) ou usuário autenticado
 * @returns 'guest' se for convidado, 'authenticated' se estiver autenticado
 */
export async function getUserType(): Promise<'guest' | 'authenticated'> {
  const supabase = getSupabaseBrowserClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return 'guest'
    }
    
    // Verifica se é um usuário anônimo (convidado)
    if (user.is_anonymous) {
      return 'guest'
    }
    
    // Usuário autenticado com conta real
    return 'authenticated'
  } catch (error) {
    console.error('Erro ao verificar tipo de usuário:', error)
    return 'guest'
  }
}

/**
 * Hook personalizado para verificar tipo de usuário de forma síncrona
 * Usa o estado atual do Supabase sem fazer nova requisição
 */
export function getUserTypeSync(): 'guest' | 'authenticated' {
  const supabase = getSupabaseBrowserClient()
  
  try {
    // Pega o usuário do estado atual (síncrono)
    const { data: { session } } = supabase.auth.getSession()
    
    if (!session?.user) {
      return 'guest'
    }
    
    // Verifica se é usuário anônimo
    if (session.user.is_anonymous) {
      return 'guest'
    }
    
    return 'authenticated'
  } catch (error) {
    console.error('Erro ao verificar tipo de usuário sincronamente:', error)
    return 'guest'
  }
}

/**
 * Função helper para usar o player com verificação automática de tipo de usuário
 */
export async function playWithUserCheck(
  track: any, 
  playlist?: any[], 
  play?: (track: any, playlist?: any[], userType?: 'guest' | 'authenticated') => void
) {
  if (!play) return
  
  const userType = await getUserType()
  play(track, playlist, userType)
}