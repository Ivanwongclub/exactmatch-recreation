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

  return block.content_json as T;
}
