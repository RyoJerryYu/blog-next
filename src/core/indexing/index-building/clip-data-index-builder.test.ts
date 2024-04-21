import { ClipDataIndexBuilder } from "./clip-data-index-builder";

// depend on local file
xtest("should first", async () => {
  const clipDataBuilder = new ClipDataIndexBuilder();
  const clipdata = await clipDataBuilder.buildIndex();
  expect(clipdata.clipData.length).toBeGreaterThan(1);
});
