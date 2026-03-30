import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Keep runtime explicit for easier deployment debugging.
  // CMS hooks handle this safely and fall back to static content.
  console.warn("Supabase environment variables are missing. CMS dynamic fetch is disabled.");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);
