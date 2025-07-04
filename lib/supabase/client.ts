import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"

// Declare a module-level variable to hold the client instance.
let client: SupabaseClient<Database> | undefined

/**
 * Gets a Supabase client for use in the browser.
 * Implements a singleton pattern to ensure only one client is created.
 */
export function getSupabaseBrowserClient() {
  // If the client has already been created, return it.
  if (client) {
    return client
  }

  // If no client exists, create a new one.
  // This structure ensures createBrowserClient is only called once.
  client = createBrowserClient<Database>(
    // Using the hardcoded keys as per your last instruction.
    // IMPORTANT: Move these to environment variables for production.
    "https://llomihbcknpzndlabmmt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTc1MzQsImV4cCI6MjA2NTgzMzUzNH0.lP6F0JwQZ-n6Y2w67MLCdTPcUaiVw-ddloryJrlbq7U",
  )

  return client
}
