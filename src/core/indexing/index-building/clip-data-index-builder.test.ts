import { ClipDataIndexBuilder } from "./clip-data-index-builder";

// depend on local file
xtest("should first", () => {
  const clipDataBuilder = new ClipDataIndexBuilder();
  const clipdata = clipDataBuilder.buildIndex();
  expect(clipdata.clipData.length).toBeGreaterThan(1);
});
