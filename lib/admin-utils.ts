// Utilitários para gerenciamento de admin
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

// Email do admin (você pode expandir para uma lista ou tabela no futuro)
const ADMIN_EMAILS = [
  "andregabriel@gmail.com",
  "admin@agapepray.com"
]

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin'
}

export async function isUserAdmin(): Promise<boolean> {
  try {
    const supabase = getSupabaseBrowserClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return false
    }
    
    return ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const supabase = getSupabaseBrowserClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    if (ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) {
      return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin',
        role: 'admin'
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function getAdminEmails(): string[] {
  return ADMIN_EMAILS
} 