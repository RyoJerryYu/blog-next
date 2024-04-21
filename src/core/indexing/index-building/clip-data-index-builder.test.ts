import { testNoCI } from "@/utils/utils.test";
import { ClipDataIndexBuilder } from "./clip-data-index-builder";

// depend on local file
testNoCI("should first", async () => {
  const clipDataBuilder = new ClipDataIndexBuilder();
  const clipdata = await clipDataBuilder.buildIndex();
  expect(clipdata.clipData.length).toBeGreaterThan(1);
});
