import { testNoCI } from "@/utils/utils.test";
import { pipeline } from "../indexing-settings";
import { executePipeline, ResourcePoolFromScratch } from "./pipeline";

testNoCI("execute pipeline", async () => {
  const p = pipeline();
  const res = await executePipeline(p, new ResourcePoolFromScratch());
  const indexKeys = Object.keys(res.indexPool);
  expect(indexKeys.length).toBeGreaterThan(0);
  indexKeys.forEach((key) => {
    expect(key).toBeDefined();
    expect(key).not.toEqual("undefined");
    expect(res.indexPool[key]).toBeDefined();
  });
  expect(res).toBe(true);
});
