import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import {
  AnchorTree,
  rehypeHeadingAnchorCollection,
} from "./rehype-heading-anchor-collection";

describe("rehype heading anchor collection", () => {
  const newProcessor = () => {
    let res: { trees: AnchorTree[] } = { trees: [] };
    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHeadingAnchorCollection, {
        collectResult: (resultTrees) => {
          res.trees = resultTrees;
        },
      })
      .use(rehypeStringify);
    return { processor, res };
  };
  it("should add anchor to heading", () => {
    const md = `
## Heading 0
# Heading 1
## Heading 1-1
### Heading 1-1-1
## Heading 1-2
### Heading 1-2-1
# Heading 2
### Heading 2-1-1
# Heading 3
### Heading 3-1-1
## Heading 4
`;
    const { processor, res } = newProcessor();
    const result = processor.processSync(md);
    expect(result.value).toMatchInlineSnapshot(`
"<h2 id="heading-0">Heading 0</h2>
<h1 id="heading-1">Heading 1</h1>
<h2 id="heading-1-1">Heading 1-1</h2>
<h3 id="heading-1-1-1">Heading 1-1-1</h3>
<h2 id="heading-1-2">Heading 1-2</h2>
<h3 id="heading-1-2-1">Heading 1-2-1</h3>
<h1 id="heading-2">Heading 2</h1>
<h3 id="heading-2-1-1">Heading 2-1-1</h3>
<h1 id="heading-3">Heading 3</h1>
<h3 id="heading-3-1-1">Heading 3-1-1</h3>
<h2 id="heading-4">Heading 4</h2>"
`);
    expect(res.trees).toMatchInlineSnapshot(`
[
  {
    "children": [],
    "heading": 2,
    "href": "#heading-0",
    "id": "heading-0",
    "key": "heading-0",
    "title": "Heading 0",
  },
  {
    "children": [
      {
        "children": [
          {
            "children": [],
            "heading": 3,
            "href": "#heading-1-1-1",
            "id": "heading-1-1-1",
            "key": "heading-1-1-1",
            "title": "Heading 1-1-1",
          },
        ],
        "heading": 2,
        "href": "#heading-1-1",
        "id": "heading-1-1",
        "key": "heading-1-1",
        "title": "Heading 1-1",
      },
      {
        "children": [
          {
            "children": [],
            "heading": 3,
            "href": "#heading-1-2-1",
            "id": "heading-1-2-1",
            "key": "heading-1-2-1",
            "title": "Heading 1-2-1",
          },
        ],
        "heading": 2,
        "href": "#heading-1-2",
        "id": "heading-1-2",
        "key": "heading-1-2",
        "title": "Heading 1-2",
      },
    ],
    "heading": 1,
    "href": "#heading-1",
    "id": "heading-1",
    "key": "heading-1",
    "title": "Heading 1",
  },
  {
    "children": [
      {
        "children": [],
        "heading": 3,
        "href": "#heading-2-1-1",
        "id": "heading-2-1-1",
        "key": "heading-2-1-1",
        "title": "Heading 2-1-1",
      },
    ],
    "heading": 1,
    "href": "#heading-2",
    "id": "heading-2",
    "key": "heading-2",
    "title": "Heading 2",
  },
  {
    "children": [
      {
        "children": [],
        "heading": 3,
        "href": "#heading-3-1-1",
        "id": "heading-3-1-1",
        "key": "heading-3-1-1",
        "title": "Heading 3-1-1",
      },
      {
        "children": [],
        "heading": 2,
        "href": "#heading-4",
        "id": "heading-4",
        "key": "heading-4",
        "title": "Heading 4",
      },
    ],
    "heading": 1,
    "href": "#heading-3",
    "id": "heading-3",
    "key": "heading-3",
    "title": "Heading 3",
  },
]
`);
  });
});
