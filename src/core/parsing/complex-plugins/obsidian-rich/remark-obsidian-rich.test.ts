import { loadCache } from "@/core/indexing/indexing-cache";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkObsidianRich from "./remark-obsidian-rich";

const md = `
![[newest|test]]
`;

describe("remark obsidian rich", () => {
  it("should transform obsidian rich", async () => {
    await loadCache();
    const processor = unified()
      .use(remarkParse)
      .use(remarkObsidianRich)
      .use(remarkMdx)
      .use(remarkStringify);
    const res = processor.processSync(md);
    expect(res.toString()).toMatchInlineSnapshot(`
"![test](/ideas/newest "test")
"
`);
  });
});
