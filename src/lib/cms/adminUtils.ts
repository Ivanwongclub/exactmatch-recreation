import type { CmsContentRevision, CmsRole } from "@/lib/cms/types";

export function normalizeCmsRole(role: string | null | undefined): CmsRole {
  if (role === "editor" || role === "super_admin" || role === "viewer") {
    return role;
  }

  return "viewer";
}

export function canEditCms(role: CmsRole): boolean {
  return role === "editor" || role === "super_admin";
}

export function sortRevisionsByNewest<T extends Pick<CmsContentRevision, "updated_at">>(
  revisions: T[]
): T[] {
  return [...revisions].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}
