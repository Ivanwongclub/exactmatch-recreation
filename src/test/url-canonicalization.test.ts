import { describe, expect, it } from "vitest";
import { getCanonicalClientUrl, getCanonicalPathname } from "@/lib/seo/urlCanonicalization";

describe("url canonicalization", () => {
  it("maps legacy ka-home routes to canonical paths", () => {
    expect(getCanonicalPathname("/ka-home")).toBe("/");
    expect(getCanonicalPathname("/ka-home/our-mission")).toBe("/our-mission");
    expect(getCanonicalPathname("/ka-home/contact/")).toBe("/contact");
  });

  it("normalizes duplicate slashes and trailing slashes", () => {
    expect(getCanonicalPathname("/our-mission///")).toBe("/our-mission");
    expect(getCanonicalPathname("//services//")).toBe("/services");
    expect(getCanonicalPathname("/")).toBe("/");
  });

  it("keeps query and strips hash for canonical client url", () => {
    expect(getCanonicalClientUrl("/ka-home/our-mission/", "?preview=1", "#hero")).toBe(
      "/our-mission?preview=1"
    );
  });

  it("returns unchanged canonical url when already canonical", () => {
    expect(getCanonicalClientUrl("/contact", "", "")).toBe("/contact");
  });
});
