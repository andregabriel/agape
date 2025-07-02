import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export const createClient = (request: NextRequest) => {
  // Crie uma resposta não modificada
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    "https://llomihbcknpzndlabmmt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTc1MzQsImV4cCI6MjA2NTgzMzUzNH0.lP6F0JwQZ-n6Y2w67MLCdTPcUaiVw-ddloryJrlbq7U",
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Se o cookie for atualizado, atualize os cookies para a solicitação e a resposta
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // Se o cookie for removido, atualize os cookies para a solicitação e a resposta
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  return { supabase, response }
}
