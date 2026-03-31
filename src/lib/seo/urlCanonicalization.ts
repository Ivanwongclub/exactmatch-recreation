const LEGACY_REDIRECTS: Record<string, string> = {
  "/ka-home": "/",
  "/ka-home/our-mission": "/our-mission",
  "/ka-home/executive-team": "/executive-team",
  "/ka-home/board-of-directors": "/board-of-directors",
  "/ka-home/legacy-and-business-expertise": "/legacy-and-business-expertise",
  "/ka-home/history": "/history",
  "/ka-home/services": "/services",
  "/ka-home/kings-network": "/kings-network",
  "/ka-home/members-only-events": "/members-only-events",
  "/ka-home/summer-program": "/summer-program",
  "/ka-home/event": "/event",
  "/ka-home/contact": "/contact",
};

export const CANONICAL_ROUTES = new Set([
  "/",
  "/history",
  "/services",
  "/kings-network",
  "/our-mission",
  "/executive-team",
  "/board-of-directors",
  "/legacy-and-business-expertise",
  "/members-only-events",
  "/summer-program",
  "/event",
  "/contact",
  "/privacy",
  "/admin/login",
  "/admin/reset-password",
  "/admin/cms",
]);

function normalizeSlashes(pathname: string): string {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");
  if (collapsed.length > 1 && collapsed.endsWith("/")) {
    return collapsed.replace(/\/+$/g, "");
  }
  return collapsed;
}

export function getCanonicalPathname(pathname: string): string {
  const normalized = normalizeSlashes(pathname);
  const legacy = LEGACY_REDIRECTS[normalized];
  if (legacy) {
    return legacy;
  }

  if (CANONICAL_ROUTES.has(normalized)) {
    return normalized;
  }

  return normalized;
}

export function getCanonicalClientUrl(pathname: string, search = "", _hash = ""): string {
  const canonicalPath = getCanonicalPathname(pathname);
  const query = search && search.startsWith("?") ? search : search ? `?${search}` : "";
  return `${canonicalPath}${query}`;
}
