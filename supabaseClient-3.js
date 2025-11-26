/* Criado por Mindframe Media */

import { createClient } from "@supabase/supabase-js";

let browserClient = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return browserClient;
}
