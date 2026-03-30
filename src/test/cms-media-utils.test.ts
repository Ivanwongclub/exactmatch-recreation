import { describe, expect, it } from "vitest";
import { normalizeMediaKind, resolveMediaUrl, sortMediaByNewest } from "@/lib/cms/mediaUtils";

describe("cms media utils", () => {
  it("normalizes media kind safely", () => {
    expect(normalizeMediaKind("image")).toBe("image");
    expect(normalizeMediaKind("video")).toBe("video");
    expect(normalizeMediaKind("pdf")).toBe("file");
    expect(normalizeMediaKind(undefined)).toBe("file");
  });

  it("sorts media assets by updated_at desc", () => {
    const assets = [
      { id: "1", updated_at: "2026-01-01T00:00:00Z" },
      { id: "2", updated_at: "2026-03-01T00:00:00Z" },
      { id: "3", updated_at: "2025-11-01T00:00:00Z" },
    ];

    expect(sortMediaByNewest(assets).map((x) => x.id)).toEqual(["2", "1", "3"]);
  });

  it("resolves media URL by slug with fallback", () => {
    const assets = [
      { slug: "hero-home", url: "https://cdn.example.com/hero-home.jpg" },
      { slug: "history-portrait", url: "https://cdn.example.com/portrait.jpg" },
    ];

    expect(resolveMediaUrl(assets, "history-portrait", "/fallback.jpg")).toBe(
      "https://cdn.example.com/portrait.jpg"
    );
    expect(resolveMediaUrl(assets, "missing", "/fallback.jpg")).toBe("/fallback.jpg");
    expect(resolveMediaUrl(null, "hero-home", "/fallback.jpg")).toBe("/fallback.jpg");
  });
});
