import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import type { CmsPageSettings, CmsServiceItem, ServicesPageCmsData } from "./types";

export async function fetchServicesPageCmsData(): Promise<ServicesPageCmsData | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  const settingsQuery = supabase
    .from("cms_page_settings")
    .select("*")
    .eq("page_slug", "services")
    .maybeSingle();

  const itemsQuery = supabase
    .from("cms_service_items")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .returns<CmsServiceItem[]>();

  const [{ data: settings, error: settingsError }, { data: serviceItems, error: itemsError }] =
    await Promise.all([settingsQuery, itemsQuery]);

  if (settingsError || itemsError) {
    throw new Error(
      `CMS fetch failed: ${settingsError?.message ?? itemsError?.message ?? "Unknown error"}`
    );
  }

  return {
    settings: (settings as CmsPageSettings | null) ?? null,
    serviceItems: (serviceItems as CmsServiceItem[]) ?? [],
  };
}
