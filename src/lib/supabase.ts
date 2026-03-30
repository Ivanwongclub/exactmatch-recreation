import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);
const fallbackSupabaseUrl = "https://placeholder.supabase.co";
const fallbackSupabaseAnonKey = "placeholder-anon-key";

if (!hasSupabaseEnv) {
  // Keep runtime explicit for easier deployment debugging.
  // CMS hooks handle this safely and fall back to static content.
  console.warn("Supabase environment variables are missing. CMS dynamic fetch is disabled.");
}

export const supabase = createClient(
  hasSupabaseEnv ? supabaseUrl : fallbackSupabaseUrl,
  hasSupabaseEnv ? supabaseAnonKey : fallbackSupabaseAnonKey,
  {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export { hasSupabaseEnv };
