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

// Lista de emails de administradores
const ADMIN_EMAILS = [
  'andrepvg@yahoo.com.br',
  'andrepvgabriel@gmail.com'
]

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export function requireAdmin(email: string | null | undefined): boolean {
  if (!isAdmin(email)) {
    throw new Error('Acesso negado: Apenas administradores podem acessar esta funcionalidade')
  }
  return true
}

/**
 * Verifica se o usuário atual é administrador
 */
export async function getCurrentUserIsAdmin(): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user || !user.email) {
      return false
    }
    
    return isAdmin(user.email)
  } catch (error) {
    console.error('Erro ao verificar se usuário é admin:', error)
    return false
  }
}

/**
 * Hook para verificar admin de forma síncrona
 */
export function getCurrentUserIsAdminSync(): boolean {
  const supabase = getSupabaseBrowserClient()
  
  try {
    const { data: { session } } = supabase.auth.getSession()
    
    if (!session?.user?.email) {
      return false
    }
    
    return isAdmin(session.user.email)
  } catch (error) {
    console.error('Erro ao verificar admin sincronamente:', error)
    return false
  }
}

/**
 * Verifica se o usuário atual está autenticado
 */
export async function getCurrentUser() {
  const supabase = getSupabaseBrowserClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return user
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error)
    return null
  }
}