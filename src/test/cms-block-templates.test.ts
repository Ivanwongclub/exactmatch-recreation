import { describe, expect, it } from "vitest";
import { getBlockTemplate } from "@/lib/cms/blockTemplates";
import { validateBlockContentForTemplate } from "@/lib/cms/blockValidation";
import { resolveCmsBlock } from "@/lib/cms/blockUtils";

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

  it("resolves deep section templates for our-mission", () => {
    expect(getBlockTemplate("our-mission", "philosophy")).not.toBeNull();
    expect(getBlockTemplate("our-mission", "principles")).not.toBeNull();
  });

  it("resolves deep section templates for history", () => {
    expect(getBlockTemplate("history", "legacy")).not.toBeNull();
    expect(getBlockTemplate("history", "milestones")).not.toBeNull();
    expect(getBlockTemplate("history", "global_connections")).not.toBeNull();
  });

  it("resolves deep section templates for services", () => {
    expect(getBlockTemplate("services", "intro")).not.toBeNull();
    expect(getBlockTemplate("services", "cta")).not.toBeNull();
  });

  it("resolves deep section templates for contact", () => {
    expect(getBlockTemplate("contact", "form_copy")).not.toBeNull();
    expect(getBlockTemplate("contact", "form_error_copy")).not.toBeNull();
    expect(getBlockTemplate("contact", "confidentiality")).not.toBeNull();
    expect(getBlockTemplate("contact", "contact_channels")).not.toBeNull();
    expect(getBlockTemplate("contact", "presence_locations")).not.toBeNull();
  });

  it("resolves deep section templates for kings-network", () => {
    expect(getBlockTemplate("kings-network", "intro")).not.toBeNull();
    expect(getBlockTemplate("kings-network", "highlights")).not.toBeNull();
  });

  it("resolves global header_nav template", () => {
    const tmpl = getBlockTemplate("global", "header_nav");
    expect(tmpl).not.toBeNull();
    expect(tmpl?.name).toBe("Header Navigation");
    expect(Array.isArray(tmpl?.defaultContent)).toBe(true);
    const items = tmpl?.defaultContent as Array<{ label: string; href: string; dropdown?: unknown[] }>;
    expect(items.length).toBeGreaterThanOrEqual(4);
    const aboutUs = items.find((i) => i.label === "ABOUT US");
    expect(aboutUs?.dropdown).toBeDefined();
    expect(Array.isArray(aboutUs?.dropdown)).toBe(true);
  });

  it("resolves global footer_nav template", () => {
    const tmpl = getBlockTemplate("global", "footer_nav");
    expect(tmpl).not.toBeNull();
    expect(Array.isArray(tmpl?.defaultContent)).toBe(true);
    const items = tmpl?.defaultContent as Array<{ label: string; path: string }>;
    expect(items.length).toBeGreaterThanOrEqual(10);
    expect(items[0]).toHaveProperty("label");
    expect(items[0]).toHaveProperty("path");
  });

  it("resolves global footer_email template", () => {
    const tmpl = getBlockTemplate("global", "footer_email");
    expect(tmpl).not.toBeNull();
    expect(typeof tmpl?.defaultContent).toBe("string");
  });

  it("resolves global footer_tagline template", () => {
    const tmpl = getBlockTemplate("global", "footer_tagline");
    expect(tmpl).not.toBeNull();
    expect(typeof tmpl?.defaultContent).toBe("string");
  });
});

describe("cms deep template validation", () => {
  it("validates contact:contact_channels with correct content", () => {
    const result = validateBlockContentForTemplate("contact", "contact_channels", {
      headline: "Direct Contact",
      email: "test@example.com",
      phone: "+1 555 0000",
      address: "New York",
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails contact:contact_channels with missing required field", () => {
    const result = validateBlockContentForTemplate("contact", "contact_channels", {
      headline: "Direct Contact",
      email: "test@example.com",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("phone"))).toBe(true);
  });

  it("validates history:milestones with list field", () => {
    const result = validateBlockContentForTemplate("history", "milestones", {
      headline: "Key Milestones",
      milestones: ["1957", "1975"],
    });
    expect(result.valid).toBe(true);
  });

  it("fails history:milestones with wrong type for list", () => {
    const result = validateBlockContentForTemplate("history", "milestones", {
      headline: "Key Milestones",
      milestones: "not a list",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("milestones") && e.includes("list"))).toBe(true);
  });
});

describe("cms page wiring — resolveCmsBlock fallback safety", () => {

  it("returns fallback when blocks array is null", () => {
    const fallback = { title: "Fallback" };
    expect(resolveCmsBlock(null, "hero", fallback)).toEqual(fallback);
  });

  it("returns fallback when blocks array is empty", () => {
    const fallback = { title: "Fallback" };
    expect(resolveCmsBlock([], "hero", fallback)).toEqual(fallback);
  });

  it("returns fallback when block key not found", () => {
    const fallback = { title: "Fallback" };
    const blocks = [{ id: "1", page_slug: "test", block_key: "other", content_json: { title: "CMS" }, is_published: true, updated_at: "" }];
    expect(resolveCmsBlock(blocks, "hero", fallback)).toEqual(fallback);
  });

  it("returns CMS content when block exists", () => {
    const fallback = { title: "Fallback" };
    const cmsContent = { title: "From CMS" };
    const blocks = [{ id: "1", page_slug: "test", block_key: "hero", content_json: cmsContent, is_published: true, updated_at: "" }];
    expect(resolveCmsBlock(blocks, "hero", fallback)).toEqual(cmsContent);
  });

  it("returns fallback when content_json is null", () => {
    const fallback = { title: "Fallback" };
    const blocks = [{ id: "1", page_slug: "test", block_key: "hero", content_json: null, is_published: true, updated_at: "" }];
    expect(resolveCmsBlock(blocks, "hero", fallback)).toEqual(fallback);
  });

  it("handles malformed JSON shape gracefully (returns whatever is stored)", () => {
    const fallback = { title: "Fallback", subtitle: "Sub" };
    const malformed = { unexpected: true };
    const blocks = [{ id: "1", page_slug: "test", block_key: "hero", content_json: malformed, is_published: true, updated_at: "" }];
    const result = resolveCmsBlock(blocks, "hero", fallback);
    expect(result).toEqual(malformed); // no crash, returns stored value
  });
});
