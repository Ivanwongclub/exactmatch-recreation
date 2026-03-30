import { describe, expect, it } from "vitest";
import { applyValueAtJsonPath } from "@/lib/cms/editorUtils";

describe("cms editor utils", () => {
  it("updates nested object value by dot path", () => {
    const input = {
      hero: {
        title: "Our Mission",
        image: "old.jpg",
      },
    };

    const output = applyValueAtJsonPath(input, "hero.image", "new.jpg");
    expect((output as { hero: { image: string } }).hero.image).toBe("new.jpg");
  });

  it("updates array item field by index path", () => {
    const input = {
      cards: [{ image: "a.jpg" }, { image: "b.jpg" }],
    };

    const output = applyValueAtJsonPath(input, "cards.1.image", "c.jpg");
    expect((output as { cards: Array<{ image: string }> }).cards[1].image).toBe("c.jpg");
  });
});
