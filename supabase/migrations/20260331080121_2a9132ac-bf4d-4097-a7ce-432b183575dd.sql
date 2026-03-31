
-- Step 1: Create a SECURITY DEFINER function to check CMS roles without triggering RLS
CREATE OR REPLACE FUNCTION public.has_cms_role(_user_id uuid, _roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.cms_user_roles
    WHERE user_id = _user_id AND role = ANY(_roles)
  );
$$;

-- Step 2: Drop all existing policies that cause recursion

-- cms_user_roles policies
DROP POLICY IF EXISTS cms_user_roles_manage_super_admin ON public.cms_user_roles;
DROP POLICY IF EXISTS cms_user_roles_select_own ON public.cms_user_roles;

-- cms_content_blocks policies
DROP POLICY IF EXISTS cms_blocks_editor_manage ON public.cms_content_blocks;
DROP POLICY IF EXISTS cms_blocks_editor_read_all ON public.cms_content_blocks;
DROP POLICY IF EXISTS cms_blocks_public_read ON public.cms_content_blocks;

-- cms_content_revisions policies
DROP POLICY IF EXISTS cms_revisions_editor_insert ON public.cms_content_revisions;
DROP POLICY IF EXISTS cms_revisions_editor_read ON public.cms_content_revisions;

-- cms_media_assets policies
DROP POLICY IF EXISTS cms_media_editor_manage ON public.cms_media_assets;
DROP POLICY IF EXISTS cms_media_public_read ON public.cms_media_assets;

-- cms_page_settings policies
DROP POLICY IF EXISTS cms_page_settings_editor_manage ON public.cms_page_settings;
DROP POLICY IF EXISTS cms_page_settings_public_read ON public.cms_page_settings;

-- cms_service_items policies
DROP POLICY IF EXISTS cms_service_items_editor_manage ON public.cms_service_items;
DROP POLICY IF EXISTS cms_service_items_public_read ON public.cms_service_items;

-- Step 3: Recreate policies using the SECURITY DEFINER function

-- cms_user_roles
CREATE POLICY cms_user_roles_select_own ON public.cms_user_roles
  FOR SELECT TO public USING (auth.uid() = user_id);

CREATE POLICY cms_user_roles_manage_super_admin ON public.cms_user_roles
  FOR ALL TO public
  USING (public.has_cms_role(auth.uid(), ARRAY['super_admin']))
  WITH CHECK (public.has_cms_role(auth.uid(), ARRAY['super_admin']));

-- cms_content_blocks
CREATE POLICY cms_blocks_public_read ON public.cms_content_blocks
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY cms_blocks_editor_read_all ON public.cms_content_blocks
  FOR SELECT TO public
  USING (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']));

CREATE POLICY cms_blocks_editor_manage ON public.cms_content_blocks
  FOR ALL TO public
  USING (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']))
  WITH CHECK (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']));

-- cms_content_revisions
CREATE POLICY cms_revisions_editor_read ON public.cms_content_revisions
  FOR SELECT TO public
  USING (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']));

CREATE POLICY cms_revisions_editor_insert ON public.cms_content_revisions
  FOR INSERT TO public
  WITH CHECK (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']));

-- cms_media_assets
CREATE POLICY cms_media_public_read ON public.cms_media_assets
  FOR SELECT TO public USING (true);

CREATE POLICY cms_media_editor_manage ON public.cms_media_assets
  FOR ALL TO public
  USING (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']))
  WITH CHECK (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']));

-- cms_page_settings
CREATE POLICY cms_page_settings_public_read ON public.cms_page_settings
  FOR SELECT TO public USING (true);

CREATE POLICY cms_page_settings_editor_manage ON public.cms_page_settings
  FOR ALL TO public
  USING (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']))
  WITH CHECK (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']));

-- cms_service_items
CREATE POLICY cms_service_items_public_read ON public.cms_service_items
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY cms_service_items_editor_manage ON public.cms_service_items
  FOR ALL TO public
  USING (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']))
  WITH CHECK (public.has_cms_role(auth.uid(), ARRAY['editor', 'super_admin']));
