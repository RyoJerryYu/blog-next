import { loadCache } from "@/core/indexing/indexing-cache";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkObsidianWikilink from "./remark-obsidian-wikilink";

describe("remark-obsidian-wikilink", () => {
  it("source example", () => {
    const md = `
Inline: [test](test.md) [another test](another-test.md)

[block link](test.md)
`;
    const result = fromMarkdown(md, {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    });
    console.log(result);
  });

  const processor = unified()
    .use(remarkParse)
    .use(remarkObsidianWikilink)
    .use(remarkMdx)
    .use(remarkStringify);

  it("should transform obsidian wikilink", async () => {
    await loadCache();
    const md = `
    [[newest]]
    `;
    const result = processor.processSync(md);
    expect(result.toString()).toMatchInlineSnapshot(`
"[newest](/ideas/newest)
"
`);
  });

  it("should transform obsidian wikilink with alias", async () => {
    await loadCache();
    const md = `
    [[newest|named]]
    `;
    const result = processor.processSync(md);
    expect(result.toString()).toMatchInlineSnapshot(`
"[named](/ideas/newest)
"
`);
  });

  it("should transform obsidian wikilink inline", async () => {
    await loadCache();
    const md = `
    Inline: [[newest|named]] after
    `;
    const result = processor.processSync(md);
    expect(result.toString()).toMatchInlineSnapshot(`
"Inline: [named](/ideas/newest) after
"
`);
  });

  it("should transform obsidian wikilink inline with no prefix", async () => {
    await loadCache();
    const md = `
[[newest|named]] after
    `;
    const result = processor.processSync(md);
    expect(result.toString()).toMatchInlineSnapshot(`
"[named](/ideas/newest) after
"
`);
  });

  it("should transform obsidian wikilink inline with no suffix", async () => {
    await loadCache();
    const md = `
before [[newest|named]]
    `;
    const result = processor.processSync(md);
    expect(result.toString()).toMatchInlineSnapshot(`
"before [named](/ideas/newest)
"
`);
  });

  it("should transform obsidian wikilink inline with multiple wikilinks", async () => {
    await loadCache();
    const md = `
    Inline: [[newest|named]] [[newest|named2]]
    `;
    const result = processor.processSync(md);
    expect(result.toString()).toMatchInlineSnapshot(`
"Inline: [named](/ideas/newest) [named2](/ideas/newest)
"
`);
  });
});
