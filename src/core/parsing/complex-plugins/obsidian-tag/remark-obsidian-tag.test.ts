import {
  remarkObsidianTag,
  RemarkObsidianTagOptions,
} from "./remark-obsidian-tag";

import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

describe("remark-obsidian-tag", () => {
  it("source example", () => {
    const md = `
ABC *H* #TAG DEF <Dfc /> EFGE

<SomeHow />

CDE EEF
    `;

    const result = fromMarkdown(md, {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    });
    console.log(result);
  });

  const processor = unified()
    .use(remarkParse)
    .use(remarkObsidianTag, { isMetaPhase: true } as RemarkObsidianTagOptions)
    .use(remarkMdx)
    .use(remarkStringify);

  it("should transform obsidian tag", async () => {
    // await loadCache();
    const md = `
ABC *H* Some #TAG DEF <Dfc /> EFGE

CDE EEF
`;

    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"ABC *H* Some <ObsidianTag tag="TAG" /> DEF <Dfc /> EFGE

CDE EEF
"
`);
  });

  it("should well handle if no prefix text", async () => {
    // await loadCache();
    const md = `
#TAG DEF
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianTag tag="TAG" /> DEF
"
`);
  });

  it("should well handle if no suffix text", async () => {
    // await loadCache();
    const md = `
ABC #TAG
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"ABC <ObsidianTag tag="TAG" />
"
`);
  });

  it("should well handle if no prefix and suffix text", async () => {
    // await loadCache();
    const md = `
#TAG
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianTag tag="TAG" />
"
`);
  });

  it("should not transform if a space is between # and tag", async () => {
    // await loadCache();
    const md = `
ABC # TAG
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"ABC # TAG
"
`);
  });

  it("should transform well if a slash in tag", async () => {
    // await loadCache();
    const md = `
ABC #TAG/TAG2 DEF
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"ABC <ObsidianTag tag="TAG/TAG2" /> DEF
"
`);
  });

  it("should work well if a tag is in title", async () => {
    // await loadCache();
    const md = `
# Title #TAG
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"# Title <ObsidianTag tag="TAG" />
"
`);
  });
});

describe("remark-obsidian-tag, firstTagParagraph feature", () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkObsidianTag, {
      isMetaPhase: true,
      firstTagParagraph: true,
    } as RemarkObsidianTagOptions)
    .use(remarkMdx)
    .use(remarkStringify);

  it("should remove first paragraph if it's only tags", async () => {
    // await loadCache();
    const md = `
#TAG #TAG2

Some Text
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"Some Text
"
`);
  });

  it("should allow empty lines", async () => {
    // await loadCache();
    const md = `



  #TAG    #TAG2

  Some Text

  `;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"Some Text
"
`);
  });

  it("should not remove first paragraph if it's not only tags", async () => {
    // await loadCache();
    const md = `
First Paragraph

#TAG #TAG2

Some Text
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"First Paragraph

<ObsidianTag tag="TAG" /> <ObsidianTag tag="TAG2" />

Some Text
"
`);
  });
});
