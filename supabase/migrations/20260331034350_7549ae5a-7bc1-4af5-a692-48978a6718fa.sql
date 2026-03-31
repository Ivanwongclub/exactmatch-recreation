
-- Fix function search_path for security
ALTER FUNCTION public.cms_set_updated_at() SET search_path = public;
ALTER FUNCTION public.cms_content_blocks_revision_trigger() SET search_path = public;
