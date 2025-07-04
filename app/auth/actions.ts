"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signInWithGoogle(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const next = (formData.get("next") as string) || "/home"
  const originPath = (formData.get("originPath") as string) || "/"

  // Armazena o 'next' path em um cookie seguro
  cookieStore.set("next_url", next, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

  // A URL de redirecionamento deve ser exatamente a que está configurada no provedor OAuth
  const redirectTo = `${origin}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo,
    },
  })

  if (error) {
    console.error("Error signing in with Google:", error)
    return redirect(`${originPath}?error=${encodeURIComponent(error.message)}`)
  }

  if (data.url) {
    return redirect(data.url)
  }

  return redirect(`${originPath}?error=Could not authenticate with Google`)
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const next = (formData.get("next") as string) || "/home"
  const originPath = (formData.get("originPath") as string) || "/"

  if (!email || !password) {
    return redirect(`${originPath}?error=Email and password are required`)
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Error signing in with email:", error)
    return redirect(`${originPath}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/", "layout")
  redirect(next)
}

export async function signUpWithEmail(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const next = (formData.get("next") as string) || "/home"
  const originPath = (formData.get("originPath") as string) || "/"

  if (!email || !password || !confirmPassword) {
    return redirect(`${originPath}?error=All fields are required`)
  }

  if (password !== confirmPassword) {
    return redirect(`${originPath}?error=Passwords do not match`)
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("Error signing up with email:", error)
    return redirect(`${originPath}?error=${encodeURIComponent(error.message)}`)
  }

  return redirect(`${originPath}?message=Check your email to confirm your account`)
}

export async function signOutAction() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}
