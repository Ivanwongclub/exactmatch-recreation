import { hasSupabaseEnv, supabase as typedSupabase } from "@/lib/supabase";

// Cast to any to bypass strict typing — CMS tables exist in DB but aren't in auto-generated types yet.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabase = typedSupabase as any;
import type {
  CmsAdminAccess,
  CmsBlockInput,
  CmsContentBlock,
  CmsContentRevision,
  CmsMediaAsset,
  CmsMediaAssetInput,
  CmsMediaUploadInput,
  CmsMediaUploadResult,
  CmsPageSettings,
  CmsServiceItem,
  ServicesPageCmsData,
} from "./types";
import { canEditCms, normalizeCmsRole, sortRevisionsByNewest } from "./adminUtils";
import { normalizeMediaKind, sortMediaByNewest } from "./mediaUtils";

interface CmsFetchOptions {
  includeDraft?: boolean;
}

export async function fetchServicesPageCmsData(
  options?: CmsFetchOptions
): Promise<ServicesPageCmsData | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  const settingsQuery = supabase
    .from("cms_page_settings")
    .select("*")
    .eq("page_slug", "services")
    .maybeSingle();

  let itemsQuery = supabase.from("cms_service_items").select("*");
  if (!options?.includeDraft) {
    itemsQuery = itemsQuery.eq("is_published", true);
  }
  const itemsResult = await itemsQuery
    .order("display_order", { ascending: true })
    .returns();

  const [{ data: settings, error: settingsError }, { data: serviceItems, error: itemsError }] =
    await Promise.all([settingsQuery, itemsResult]);

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

export async function fetchCmsBlocksByPage(
  pageSlug: string,
  options?: CmsFetchOptions
): Promise<CmsContentBlock[] | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  let query = supabase.from("cms_content_blocks").select("*").eq("page_slug", pageSlug);
  if (!options?.includeDraft) {
    query = query.eq("is_published", true);
  }
  const { data, error } = await query
    .order("updated_at", { ascending: false })
    .returns();

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
    .returns();

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
    .single();

  if (error || !data) {
    throw new Error(`CMS block save failed: ${error?.message ?? "Unknown error"}`);
  }

  return data;
}

export async function fetchCmsAdminAccess(): Promise<CmsAdminAccess> {
  if (!hasSupabaseEnv) {
    return { userId: null, role: "viewer", canEdit: false };
  }

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return { userId: null, role: "viewer", canEdit: false };
  }

  const userId = authData.user.id;
  const { data: roleRow, error: roleError } = await supabase
    .from("cms_user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  if (roleError) {
    throw new Error(`CMS admin access fetch failed: ${roleError.message}`);
  }

  const role = normalizeCmsRole(roleRow?.role);
  return { userId, role, canEdit: canEditCms(role) };
}

export async function requestCmsSignIn(email: string): Promise<void> {
  if (!hasSupabaseEnv) {
    throw new Error("Supabase environment variables are missing.");
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    throw new Error(`Failed to send sign-in link: ${error.message}`);
  }
}

export async function signOutCms(): Promise<void> {
  if (!hasSupabaseEnv) {
    return;
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Sign out failed: ${error.message}`);
  }
}

export async function fetchCmsBlockRevisions(
  pageSlug: string,
  blockKey: string
): Promise<CmsContentRevision[] | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  const { data, error } = await supabase
    .from("cms_content_revisions")
    .select("*")
    .eq("page_slug", pageSlug)
    .eq("block_key", blockKey)
    .limit(30)
    .returns();

  if (error) {
    throw new Error(`CMS revisions fetch failed: ${error.message}`);
  }

  return sortRevisionsByNewest(data ?? []);
}

export async function fetchCmsMediaAssets(): Promise<CmsMediaAsset[] | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  const { data, error } = await supabase
    .from("cms_media_assets")
    .select("*")
    .limit(200)
    .returns();

  if (error) {
    throw new Error(`CMS media fetch failed: ${error.message}`);
  }

  const normalized = (data ?? []).map((asset) => ({
    ...asset,
    kind: normalizeMediaKind(asset.kind),
  }));

  return sortMediaByNewest(normalized);
}

export async function fetchCmsMediaAssetBySlug(slug: string): Promise<CmsMediaAsset | null> {
  if (!hasSupabaseEnv) {
    return null;
  }

  const { data, error } = await supabase
    .from("cms_media_assets")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`CMS media by slug fetch failed: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    kind: normalizeMediaKind(data.kind),
  };
}

export async function upsertCmsMediaAsset(input: CmsMediaAssetInput): Promise<CmsMediaAsset> {
  if (!hasSupabaseEnv) {
    throw new Error("Supabase environment variables are missing.");
  }

  const payload = {
    slug: input.slug.trim(),
    url: input.url.trim(),
    alt_text: input.alt_text ?? null,
    kind: normalizeMediaKind(input.kind),
    tags: input.tags ?? [],
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("cms_media_assets")
    .upsert(payload, { onConflict: "slug" })
    .select("*")
    .single<Omit<CmsMediaAsset, "kind"> & { kind: string }>();

  if (error || !data) {
    throw new Error(`CMS media save failed: ${error?.message ?? "Unknown error"}`);
  }

  return { ...data, kind: normalizeMediaKind(data.kind) };
}

export async function uploadCmsMediaFile(
  input: CmsMediaUploadInput
): Promise<CmsMediaUploadResult> {
  if (!hasSupabaseEnv) {
    throw new Error("Supabase environment variables are missing.");
  }

  const bucket = input.bucket ?? "cms-media";
  const fileExtension = input.file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const fileName = `${input.slug.trim()}-${Date.now()}.${fileExtension}`;
  const path = `assets/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, input.file, { upsert: true, contentType: input.file.type || undefined });

  if (uploadError) {
    throw new Error(`CMS media upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) {
    throw new Error("CMS media upload failed: could not resolve public URL");
  }

  return { path, publicUrl: data.publicUrl };
}
