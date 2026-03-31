
-- CMS User Roles
CREATE TABLE IF NOT EXISTS public.cms_user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'super_admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

ALTER TABLE public.cms_user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_user_roles_select_own" ON public.cms_user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "cms_user_roles_manage_super_admin" ON public.cms_user_roles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role = 'super_admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role = 'super_admin')
  );

-- CMS Content Blocks
CREATE TABLE IF NOT EXISTS public.cms_content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  block_key text NOT NULL,
  content_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page_slug, block_key)
);

ALTER TABLE public.cms_content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_blocks_public_read" ON public.cms_content_blocks
  FOR SELECT USING (is_published = true);

CREATE POLICY "cms_blocks_editor_read_all" ON public.cms_content_blocks
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  );

CREATE POLICY "cms_blocks_editor_manage" ON public.cms_content_blocks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  );

-- CMS Content Revisions
CREATE TABLE IF NOT EXISTS public.cms_content_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_id uuid REFERENCES public.cms_content_blocks(id) ON DELETE CASCADE,
  page_slug text NOT NULL,
  block_key text NOT NULL,
  content_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.cms_content_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_revisions_editor_read" ON public.cms_content_revisions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  );

CREATE POLICY "cms_revisions_editor_insert" ON public.cms_content_revisions
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  );

-- CMS Media Assets
CREATE TABLE IF NOT EXISTS public.cms_media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  url text NOT NULL,
  alt_text text,
  kind text NOT NULL DEFAULT 'image' CHECK (kind IN ('image', 'video', 'file')),
  tags text[],
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cms_media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_media_public_read" ON public.cms_media_assets
  FOR SELECT USING (true);

CREATE POLICY "cms_media_editor_manage" ON public.cms_media_assets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  );

-- CMS Page Settings
CREATE TABLE IF NOT EXISTS public.cms_page_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL UNIQUE,
  hero_title text NOT NULL DEFAULT '',
  hero_subtitle text NOT NULL DEFAULT '',
  intro_paragraph_1 text NOT NULL DEFAULT '',
  intro_paragraph_2 text NOT NULL DEFAULT '',
  cta_title text NOT NULL DEFAULT '',
  cta_body text NOT NULL DEFAULT '',
  cta_button_label text NOT NULL DEFAULT '',
  cta_button_href text NOT NULL DEFAULT '',
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cms_page_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_page_settings_public_read" ON public.cms_page_settings
  FOR SELECT USING (true);

CREATE POLICY "cms_page_settings_editor_manage" ON public.cms_page_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  );

-- CMS Service Items
CREATE TABLE IF NOT EXISTS public.cms_service_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'family_council' CHECK (category IN ('family_council', 'investment')),
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cms_service_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_service_items_public_read" ON public.cms_service_items
  FOR SELECT USING (is_published = true);

CREATE POLICY "cms_service_items_editor_manage" ON public.cms_service_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.cms_user_roles r WHERE r.user_id = auth.uid() AND r.role IN ('editor', 'super_admin'))
  );

-- Auto-update timestamp triggers
CREATE OR REPLACE FUNCTION public.cms_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_cms_content_blocks_updated_at BEFORE UPDATE ON public.cms_content_blocks FOR EACH ROW EXECUTE FUNCTION public.cms_set_updated_at();
CREATE TRIGGER trg_cms_media_assets_updated_at BEFORE UPDATE ON public.cms_media_assets FOR EACH ROW EXECUTE FUNCTION public.cms_set_updated_at();
CREATE TRIGGER trg_cms_page_settings_updated_at BEFORE UPDATE ON public.cms_page_settings FOR EACH ROW EXECUTE FUNCTION public.cms_set_updated_at();
CREATE TRIGGER trg_cms_service_items_updated_at BEFORE UPDATE ON public.cms_service_items FOR EACH ROW EXECUTE FUNCTION public.cms_set_updated_at();

-- Revision trigger for content blocks
CREATE OR REPLACE FUNCTION public.cms_content_blocks_revision_trigger()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.cms_content_revisions (block_id, page_slug, block_key, content_json, is_published, updated_at, changed_by)
  VALUES (NEW.id, NEW.page_slug, NEW.block_key, NEW.content_json, NEW.is_published, NEW.updated_at, auth.uid());
  RETURN NEW;
END; $$;

CREATE TRIGGER trg_cms_content_blocks_revision AFTER INSERT OR UPDATE ON public.cms_content_blocks FOR EACH ROW EXECUTE FUNCTION public.cms_content_blocks_revision_trigger();
