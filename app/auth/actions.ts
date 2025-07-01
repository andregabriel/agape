"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signInWithGoogle() {
  const supabase = createClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL

  if (!origin) {
    return redirect("/login?message=Configuration error: Site URL not set.")
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error("Error signing in with Google:", error)
    return redirect("/login?message=Could not authenticate with Google")
  }

  return redirect(data.url)
}

export async function signInWithApple() {
  const supabase = createClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL

  if (!origin) {
    return redirect("/login?message=Configuration error: Site URL not set.")
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error("Error signing in with Apple:", error)
    return redirect("/login?message=Could not authenticate with Apple")
  }

  return redirect(data.url)
}

export async function signUp(formData: FormData) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  if (!origin) {
    return redirect("/login?message=Configuration error: Site URL not set.")
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  })

  if (error) {
    return redirect(`/login?message=${error.message}`)
  }

  return redirect("/login?message=Check email to continue sign in process")
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?message=${error.message}`)
  }

  return redirect("/home")
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/login")
}

// Re-export helpers expected elsewhere  ────────────────────────────────────
export async function loginWithEmail(formData: FormData) {
  // Re-use the existing signIn (email/password)
  return signIn(formData)
}

export async function signupWithEmail(formData: FormData) {
  // Re-use the existing signUp (email/password)
  return signUp(formData)
}

export async function checkUserExists(email: string): Promise<boolean> {
  const supabase = createClient()
  // Simple existence check against the auth users table
  const { data, error } = await supabase.auth.admin.listUsers({
    email,
  })
  if (error) {
    console.error("Error checking user existence:", error)
    return false
  }
  return (data?.users?.length ?? 0) > 0
}

export async function loginAdminWithEmail(formData: FormData) {
  // Log in first
  await signIn(formData)

  // Verify the logged-in user has an `is_admin` claim or profile flag
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // You can adapt this check to your exact schema.
  const isAdmin = user?.user_metadata?.is_admin || user?.role === "admin" // fallback if you store custom role

  if (!isAdmin) {
    // immediately sign out and redirect to normal login
    await supabase.auth.signOut()
    return redirect("/login?message=Você não possui permissões de administrador")
  }

  return redirect("/admin") // success path
}
