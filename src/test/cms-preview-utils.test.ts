import { describe, expect, it } from "vitest";
import { hasCmsPreviewFlag, shouldUseCmsDraftPreview } from "@/lib/cms/previewUtils";

describe("cms preview utils", () => {
  it("detects preview flag from query string", () => {
    expect(hasCmsPreviewFlag("?preview=1")).toBe(true);
    expect(hasCmsPreviewFlag("?foo=bar&preview=true")).toBe(true);
    expect(hasCmsPreviewFlag("?preview=yes")).toBe(true);
    expect(hasCmsPreviewFlag("?preview=0")).toBe(false);
    expect(hasCmsPreviewFlag("")).toBe(false);
  });

  it("enables draft preview only for editors", () => {
    expect(shouldUseCmsDraftPreview("?preview=1", true)).toBe(true);
    expect(shouldUseCmsDraftPreview("?preview=1", false)).toBe(false);
    expect(shouldUseCmsDraftPreview("", true)).toBe(false);
  });
});
