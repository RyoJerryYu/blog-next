import { loadClipData } from "./data";

test("should first", () => {
  const clipdata = loadClipData();
  expect(clipdata.length).toBeGreaterThan(1);
});
