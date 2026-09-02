import { describe, expect, it } from "vitest";
import { countLabel, filterBySingle } from "./filters";

describe("countLabel", () => {
  it("takes total as a parameter — the '15 of 16' bug is structurally impossible", () => {
    expect(countLabel(8, 15)).toBe("8 of 15 projects");
    expect(countLabel(15, 15)).toBe("15 of 15 projects");
  });
});

describe("filterBySingle", () => {
  const items = [
    { name: "a", engine: "claude" },
    { name: "b", engine: "web" },
  ];

  it("returns everything for the 'all' key", () => {
    expect(filterBySingle(items, "all", (i) => i.engine)).toHaveLength(2);
  });

  it("filters to an exact match otherwise", () => {
    expect(filterBySingle(items, "web", (i) => i.engine).map((i) => i.name)).toEqual(["b"]);
  });
});
