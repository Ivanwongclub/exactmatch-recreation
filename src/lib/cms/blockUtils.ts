import type { CmsContentBlock } from "@/lib/cms/types";

export function resolveCmsBlock<T>(
  blocks: CmsContentBlock[] | null | undefined,
  blockKey: string,
  fallback: T
): T {
  if (!blocks || blocks.length === 0) {
    return fallback;
  }

  const block = blocks.find((item) => item.block_key === blockKey);
  if (!block || block.content_json === null || block.content_json === undefined) {
    return fallback;
  }

  const data = block.content_json;

  // Guard: if fallback is an array but CMS data is not, use fallback
  if (Array.isArray(fallback) && !Array.isArray(data)) {
    return fallback;
  }

  // Guard: if fallback is a string but CMS data is an object, use fallback
  if (typeof fallback === "string" && typeof data === "object" && data !== null) {
    return fallback;
  }

  return data as T;
}
