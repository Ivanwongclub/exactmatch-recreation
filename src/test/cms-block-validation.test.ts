import { describe, expect, it } from "vitest";
import { validateBlockContentForTemplate } from "@/lib/cms/blockValidation";

describe("cms block validation", () => {
  it("passes for blocks without a defined template", () => {
    const result = validateBlockContentForTemplate("unknown", "unknown", { any: "value" });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("passes for valid typed content", () => {
    const result = validateBlockContentForTemplate("our-mission", "hero", {
      title: "Our Mission",
      subtitle: "Purpose-Driven Stewardship",
      seoTitle: "Our Mission",
      seoDescription: "Purpose-driven stewardship for families of substance.",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("fails when field value type does not match template", () => {
    const result = validateBlockContentForTemplate("our-mission", "hero", {
      title: 99,
      subtitle: "Purpose-Driven Stewardship",
      seoTitle: "Our Mission",
      seoDescription: "Purpose-driven stewardship for families of substance.",
    });

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("title");
    expect(result.errors[0]).toContain("text");
    expect(result.errors[0]).toContain("received number");
  });

  it("fails when list field is not a string array", () => {
    const result = validateBlockContentForTemplate("global", "render_config", {
      enableAnimations: true,
      homepageCardsLimit: 6,
      preferredHeroSlugs: ["hero-home", 123],
    });

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("preferredHeroSlugs");
    expect(result.errors[0]).toContain("list");
    expect(result.errors[0]).toContain("array<mixed>");
  });

  it("fails when a required template field is missing", () => {
    const result = validateBlockContentForTemplate("global", "render_config", {
      enableAnimations: true,
      preferredHeroSlugs: ["hero-home"],
    });

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("homepageCardsLimit");
    expect(result.errors[0]).toContain("required");
    expect(result.errors[0]).toContain("missing");
  });

  it("allows missing optional template fields", () => {
    const result = validateBlockContentForTemplate("global", "render_config", {
      enableAnimations: true,
      homepageCardsLimit: 8,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
