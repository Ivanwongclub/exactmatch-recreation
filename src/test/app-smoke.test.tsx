import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("app smoke", () => {
  it("renders homepage without runtime crash", async () => {
    render(<App />);
    expect(await screen.findByRole("link", { name: /skip to content/i })).toBeInTheDocument();
  });
});
