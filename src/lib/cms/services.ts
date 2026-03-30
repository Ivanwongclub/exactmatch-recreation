import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import type {
  CmsBlockInput,
  CmsContentBlock,
  CmsPageSettings,
  CmsServiceItem,
  ServicesPageCmsData,
} from "./types";

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

export async function fetchCmsBlocksByPage(pageSlug: string): Promise<CmsContentBlock[] | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  const { data, error } = await supabase
    .from("cms_content_blocks")
    .select("*")
    .eq("page_slug", pageSlug)
    .eq("is_published", true)
    .order("updated_at", { ascending: false })
    .returns<CmsContentBlock[]>();

  if (error) {
    throw new Error(`CMS blocks fetch failed: ${error.message}`);
  }

  return data ?? [];
}

export async function fetchAllCmsBlocks(): Promise<CmsContentBlock[] | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  const { data, error } = await supabase
    .from("cms_content_blocks")
    .select("*")
    .order("page_slug", { ascending: true })
    .order("block_key", { ascending: true })
    .returns<CmsContentBlock[]>();

  if (error) {
    throw new Error(`CMS blocks list failed: ${error.message}`);
  }

  return data ?? [];
}

export async function upsertCmsBlock(input: CmsBlockInput): Promise<CmsContentBlock> {
  if (!hasSupabaseEnv) {
    throw new Error("Supabase environment variables are missing.");
  }

  const payload = {
    page_slug: input.page_slug,
    block_key: input.block_key,
    content_json: input.content_json,
    is_published: input.is_published ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("cms_content_blocks")
    .upsert(payload, { onConflict: "page_slug,block_key" })
    .select("*")
    .single<CmsContentBlock>();

  if (error || !data) {
    throw new Error(`CMS block save failed: ${error?.message ?? "Unknown error"}`);
  }

  return data;
}
