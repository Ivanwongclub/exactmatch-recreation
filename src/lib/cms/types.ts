export type CmsServiceCategory = "family_council" | "investment";

export interface CmsServiceItem {
  id: string;
  title: string;
  description: string;
  category: CmsServiceCategory;
  display_order: number;
  is_published: boolean;
}

export interface CmsPageSettings {
  page_slug: string;
  hero_title: string;
  hero_subtitle: string;
  intro_paragraph_1: string;
  intro_paragraph_2: string;
  cta_title: string;
  cta_body: string;
  cta_button_label: string;
  cta_button_href: string;
  seo_title: string;
  seo_description: string;
}

export interface ServicesPageCmsData {
  settings: CmsPageSettings | null;
  serviceItems: CmsServiceItem[];
}

export interface CmsContentBlock {
  id: string;
  page_slug: string;
  block_key: string;
  content_json: unknown;
  is_published: boolean;
  updated_at: string;
}

export interface CmsBlockInput {
  page_slug: string;
  block_key: string;
  content_json: unknown;
  is_published?: boolean;
}

export type CmsRole = "viewer" | "editor" | "super_admin";

export interface CmsAdminAccess {
  userId: string | null;
  role: CmsRole;
  canEdit: boolean;
}

export interface CmsContentRevision {
  id: string;
  block_id: string;
  page_slug: string;
  block_key: string;
  content_json: unknown;
  is_published: boolean;
  updated_at: string;
  changed_by: string | null;
}

export type CmsMediaKind = "image" | "video" | "file";

export interface CmsMediaAsset {
  id: string;
  slug: string;
  url: string;
  alt_text: string | null;
  kind: CmsMediaKind;
  tags: string[] | null;
  updated_at: string;
}

export interface CmsMediaAssetInput {
  slug: string;
  url: string;
  alt_text?: string | null;
  kind?: CmsMediaKind;
  tags?: string[] | null;
}
