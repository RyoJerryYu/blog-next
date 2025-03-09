import { remarkObsidianTag } from "./remark-obsidian-tag";

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
    .use(remarkObsidianTag)
    .use(remarkMdx)
    .use(remarkStringify);

  it("should transform obsidian tag", () => {
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

  it("should well handle if no prefix text", () => {
    const md = `
#TAG DEF
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianTag tag="TAG" /> DEF
"
`);
  });

  it("should well handle if no suffix text", () => {
    const md = `
ABC #TAG
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"ABC <ObsidianTag tag="TAG" />
"
`);
  });

  it("should well handle if no prefix and suffix text", () => {
    const md = `
#TAG
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianTag tag="TAG" />
"
`);
  });

  it("should not transform if a space is between # and tag", () => {
    const md = `
ABC # TAG
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"ABC # TAG
"
`);
  });

  it("should transform well if a slash in tag", () => {
    const md = `
ABC #TAG/TAG2 DEF
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"ABC <ObsidianTag tag="TAG/TAG2" /> DEF
"
`);
  });

  it("should work well if a tag is in title", () => {
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
