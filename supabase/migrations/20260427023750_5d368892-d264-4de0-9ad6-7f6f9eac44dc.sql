
-- Revoke public execute on SECURITY DEFINER helpers so they can only be invoked
-- internally by RLS policies / triggers, not by API clients via /rest/v1/rpc.
REVOKE EXECUTE ON FUNCTION public.has_cms_role(uuid, text[]) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cms_content_blocks_revision_trigger() FROM PUBLIC, anon, authenticated;

-- Safe self-only helper: ignores any caller-supplied id, always uses auth.uid().
CREATE OR REPLACE FUNCTION public.current_user_has_cms_role(_roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.cms_user_roles
    WHERE user_id = auth.uid() AND role = ANY(_roles)
  );
$$;

REVOKE EXECUTE ON FUNCTION public.current_user_has_cms_role(text[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_user_has_cms_role(text[]) TO authenticated;
