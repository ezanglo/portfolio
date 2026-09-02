import { describe, expect, it } from "vitest";
import { countLabel, filterByAnyTag, filterBySingle } from "./filters";

describe("countLabel", () => {
  it("takes total as a parameter — the '15 of 16' bug is structurally impossible", () => {
    expect(countLabel(8, 15)).toBe("8 of 15 projects");
    expect(countLabel(15, 15)).toBe("15 of 15 projects");
  });
});

describe("filterByAnyTag", () => {
  const items = [
    { name: "a", tags: ["AI"] },
    { name: "b", tags: ["Web"] },
    { name: "c", tags: ["AI", "Web"] },
  ];

  it("shows everything when no tags are active", () => {
    expect(filterByAnyTag(items, [], (i) => i.tags)).toHaveLength(3);
  });

  it("matches items with ANY active tag (OR)", () => {
    const result = filterByAnyTag(items, ["AI"], (i) => i.tags);
    expect(result.map((i) => i.name)).toEqual(["a", "c"]);
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
