import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkObsidianHighlight from "./remark-obsidian-highlight";

describe("obsidian highlight", () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkObsidianHighlight)
    .use(remarkMdx)
    .use(remarkStringify);

  it("should transform highlight", () => {
    const md = `
Prefix ==highlight== Suffix
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"Prefix <ObsidianHighlight>highlight</ObsidianHighlight> Suffix
"
`);
  });

  it("should work without prefix", () => {
    const md = `
==highlight== Suffix
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianHighlight>highlight</ObsidianHighlight> Suffix
"
`);
  });

  it("should work without suffix", () => {
    const md = `
Prefix ==highlight==
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"Prefix <ObsidianHighlight>highlight</ObsidianHighlight>
"
`);
  });

  it("should work multiple highlights", () => {
    const md = `
Prefix ==highlight1== ==highlight2== Suffix
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"Prefix <ObsidianHighlight>highlight1</ObsidianHighlight> <ObsidianHighlight>highlight2</ObsidianHighlight> Suffix
"
`);
  });
});
