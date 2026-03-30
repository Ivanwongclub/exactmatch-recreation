import { describe, expect, it } from "vitest";
import { getBlockTemplate } from "@/lib/cms/blockTemplates";

describe("cms block templates", () => {
  it("returns template for known block", () => {
    const template = getBlockTemplate("our-mission", "hero");
    expect(template).not.toBeNull();
    expect(template?.fields.length).toBeGreaterThanOrEqual(3);
  });

  it("returns null for unknown block", () => {
    expect(getBlockTemplate("unknown", "unknown")).toBeNull();
  });

  it("includes typed fields for global render config", () => {
    const template = getBlockTemplate("global", "render_config");
    expect(template).not.toBeNull();
    expect(template?.fields.map((f) => f.type)).toEqual(["boolean", "number", "list"]);
  });
});
