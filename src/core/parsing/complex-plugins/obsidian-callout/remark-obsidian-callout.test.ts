import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remarkObsidianCallout } from "./remark-obsidian-callout";

describe("obsidian callout", () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkObsidianCallout)
    .use(remarkMdx)
    .use(remarkStringify);
  it("should transform abstract callout", () => {
    const md = `
> [!abstract] Title
> Lorem ipsum dolor sit amet
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianCallout type="abstract" title="Title" foldable={false}>
  Lorem ipsum dolor sit amet
</ObsidianCallout>
"
`);
  });

  it("should allow multiple paragraphs", () => {
    const md = `
> [!abstract] Title
> Paragraph 1
> 
> Paragraph 2
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianCallout type="abstract" title="Title" foldable={false}>
  Paragraph 1

  Paragraph 2
</ObsidianCallout>
"
`);
  });

  it("should allow blank line before first paragraph", () => {
    const md = `
> [!abstract] Title
>
> Paragraph 1
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianCallout type="abstract" title="Title" foldable={false}>
  Paragraph 1
</ObsidianCallout>
"
`);
  });

  it("should allow callout only with title", () => {
    const md = `
> [!abstract] Title
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianCallout type="abstract" title="Title" foldable={false} />
"
`);
  });

  it("should allow callout with foldable", () => {
    const md = `
> [!abstract]- Title
> Paragraph 1
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianCallout type="abstract" title="Title" foldable={true}>
  Paragraph 1
</ObsidianCallout>
"
`);
  });

  it("should allow nested callout", () => {
    const md = `
> [!abstract] Title
> > [!abstract] Nested Title
> > Paragraph 1
`;
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<ObsidianCallout type="abstract" title="Title" foldable={false}>
  <ObsidianCallout type="abstract" title="Nested Title" foldable={false}>
    Paragraph 1
  </ObsidianCallout>
</ObsidianCallout>
"
`);
  });
});
