import { describe, expect, it } from "vitest";
import {
  canEditCms,
  normalizeCmsRole,
  sortRevisionsByNewest,
} from "@/lib/cms/adminUtils";

describe("cms admin utils", () => {
  it("normalizes editor-like roles", () => {
    expect(normalizeCmsRole("editor")).toBe("editor");
    expect(normalizeCmsRole("super_admin")).toBe("super_admin");
    expect(normalizeCmsRole("viewer")).toBe("viewer");
    expect(normalizeCmsRole("random")).toBe("viewer");
    expect(normalizeCmsRole(null)).toBe("viewer");
  });

  it("allows only editor and super admin to edit", () => {
    expect(canEditCms("editor")).toBe(true);
    expect(canEditCms("super_admin")).toBe(true);
    expect(canEditCms("viewer")).toBe(false);
  });

  it("sorts revisions by newest updated_at first", () => {
    const revisions = [
      { id: "a", updated_at: "2026-01-01T10:00:00.000Z" },
      { id: "b", updated_at: "2026-03-01T10:00:00.000Z" },
      { id: "c", updated_at: "2025-12-01T10:00:00.000Z" },
    ];

    const sorted = sortRevisionsByNewest(revisions);
    expect(sorted.map((item) => item.id)).toEqual(["b", "a", "c"]);
  });
});
