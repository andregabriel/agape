"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function checkUserExists(email: string) {
  if (!email) {
    return { exists: false, error: "O e-mail é obrigatório." }
  }
  try {
    const { data, error } = await supabaseAdmin.auth.admin.getUserByEmail(email)

    if (error) {
      if (error.name === "UserNotFoundError" || (error as any).status === 404) {
        return { exists: false, error: null }
      }
      console.error("Error checking user by email:", error)
      return { exists: false, error: "Erro ao verificar o e-mail." }
    }

    return { exists: !!data.user, error: null }
  } catch (e) {
    console.error("Unexpected error in checkUserExists:", e)
    return { exists: false, error: "Ocorreu um erro inesperado." }
  }
}

export async function signInWithGoogle(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const next = (formData.get("next") as string) || "/home"
  const originPath = (formData.get("originPath") as string) || "/"

  cookieStore.set("next_url", next, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

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

export async function signOutUser() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}

export async function loginWithEmail(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(
      `/login?error=${encodeURIComponent("Credenciais inválidas. Verifique seu e-mail e senha.")}&showEmail=true&email=${encodeURIComponent(email)}`,
    )
  }

  revalidatePath("/", "layout")
  return redirect("/home")
}

export async function signupWithEmail(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const whatsapp = formData.get("whatsapp") as string

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://{process.env.VERCEL_URL}` : "http://localhost:3000")

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
        whatsapp: whatsapp,
      },
    },
  })

  if (error) {
    return redirect(
      `/login?error=${encodeURIComponent(error.message)}&showEmail=true&email=${encodeURIComponent(email)}`,
    )
  }

  // Atualiza o perfil recém-criado com os dados adicionais
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        whatsapp: whatsapp,
      })
      .eq("id", data.user.id)

    if (profileError) {
      console.error("Error updating profile:", profileError)
      // Opcional: decidir como lidar com este erro. O usuário já foi criado.
    }
  }

  return redirect("/auth/confirm")
}

export async function loginAdminWithEmail(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const nextUrl = (formData.get("next") as string) || "/admin"
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/admin/login?error=${encodeURIComponent("Credenciais de admin inválidas.")}`)
  }

  if (data.user?.email !== "andrepvgabriel@gmail.com") {
    await supabase.auth.signOut()
    return redirect(`/admin/login?error=${encodeURIComponent("Acesso não autorizado.")}`)
  }

  revalidatePath("/", "layout")
  return redirect(nextUrl)
}
