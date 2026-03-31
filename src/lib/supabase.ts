// Re-export the auto-generated Supabase client from Lovable Cloud integration.
// CMS code imports from this file for backward compatibility.
export { supabase } from "@/integrations/supabase/client";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseKey);

if (!hasSupabaseEnv) {
  console.warn("Supabase environment variables are missing. CMS dynamic fetch is disabled.");
}
