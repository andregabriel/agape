"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
// import type { FormData } from "formdata-node" // Removed as per update

export async function signInWithGoogle(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const next = (formData.get("next") as string) || "/home"
  // const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(next)}` // Replaced as per update
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo,
    },
  })

  if (error) {
    console.error("Error signing in with Google:", error)
    return redirect(`/?error=${encodeURIComponent(error.message)}`)
  }

  if (data.url) {
    return redirect(data.url)
  }

  return redirect("/?error=Could not authenticate with Google")
}

export async function signOutAction() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}
