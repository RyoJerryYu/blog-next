import { WikiTreeIndexResource } from "./types";
import {
  sortWikiTreeNodesByFilePath,
  WikiTreeIndexBuilder,
} from "./wiki-tree-index-builder";

const wikiPages: WikiTreeIndexResource[] = [
  {
    pathMapping: {
      filePath: "public/content/wiki/01-zsome/01-zfirst.md",
      pagePath: "/wiki/zsome/zfirst",
      slugs: ["zsome", "zfirst"],
    },
    meta: {
      title: "Some first",
    },
  },
  {
    pathMapping: {
      filePath: "public/content/wiki/01-zsome/02-bsecond.md",
      pagePath: "/wiki/zsome/bsecond",
      slugs: ["zsome", "bsecond"],
    },
    meta: {
      title: "Some second",
    },
  },
  {
    pathMapping: {
      filePath: "public/content/wiki/01-zsome/index.md",
      pagePath: "/wiki/zsome",
      slugs: ["zsome"],
    },
    meta: {
      title: "Some",
    },
  },
  {
    pathMapping: {
      filePath: "public/content/wiki/02-bother/01-zfirst.md",
      pagePath: "/wiki/bother/zfirst",
      slugs: ["bother", "zfirst"],
    },
    meta: {
      title: "Other first",
    },
  },
  {
    pathMapping: {
      filePath: "public/content/wiki/02-bother/index.md",
      pagePath: "/wiki/bother",
      slugs: ["bother"],
    },
    meta: {
      title: "Other",
    },
  },
  {
    pathMapping: {
      filePath: "public/content/wiki/index.md",
      pagePath: "/wiki",
      slugs: [],
    },
    meta: {
      title: "Wiki",
    },
  },
  {
    pathMapping: {
      filePath: "public/content/wiki/03-athird/01-zfirst.md",
      pagePath: "/wiki/athird/zfirst",
      slugs: ["athird", "zfirst"],
    },
    meta: {
      title: "Third first",
    },
  },
];
describe("test sort wiki tree nodes by file path", () => {
  it("should sort wiki tree nodes by file path", () => {
    const result = sortWikiTreeNodesByFilePath(wikiPages);
    expect(result).toMatchInlineSnapshot(`
[
  {
    "meta": {
      "title": "Wiki",
    },
    "pathMapping": {
      "filePath": "public/content/wiki/index.md",
      "pagePath": "/wiki",
      "slugs": [],
    },
  },
  {
    "meta": {
      "title": "Some",
    },
    "pathMapping": {
      "filePath": "public/content/wiki/01-zsome/index.md",
      "pagePath": "/wiki/zsome",
      "slugs": [
        "zsome",
      ],
    },
  },
  {
    "meta": {
      "title": "Some first",
    },
    "pathMapping": {
      "filePath": "public/content/wiki/01-zsome/01-zfirst.md",
      "pagePath": "/wiki/zsome/zfirst",
      "slugs": [
        "zsome",
        "zfirst",
      ],
    },
  },
  {
    "meta": {
      "title": "Some second",
    },
    "pathMapping": {
      "filePath": "public/content/wiki/01-zsome/02-bsecond.md",
      "pagePath": "/wiki/zsome/bsecond",
      "slugs": [
        "zsome",
        "bsecond",
      ],
    },
  },
  {
    "meta": {
      "title": "Other",
    },
    "pathMapping": {
      "filePath": "public/content/wiki/02-bother/index.md",
      "pagePath": "/wiki/bother",
      "slugs": [
        "bother",
      ],
    },
  },
  {
    "meta": {
      "title": "Other first",
    },
    "pathMapping": {
      "filePath": "public/content/wiki/02-bother/01-zfirst.md",
      "pagePath": "/wiki/bother/zfirst",
      "slugs": [
        "bother",
        "zfirst",
      ],
    },
  },
  {
    "meta": {
      "title": "Third first",
    },
    "pathMapping": {
      "filePath": "public/content/wiki/03-athird/01-zfirst.md",
      "pagePath": "/wiki/athird/zfirst",
      "slugs": [
        "athird",
        "zfirst",
      ],
    },
  },
]
`);
  });
});

describe("test wiki tree index builder", () => {
  it("should build wiki tree index non auto folder", async () => {
    const wikiPages: WikiTreeIndexResource[] = [
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/01-zfirst.md",
          pagePath: "/wiki/zsome/zfirst",
          slugs: ["zsome", "zfirst"],
        },
        meta: {
          title: "Some first",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/02-bsecond.md",
          pagePath: "/wiki/zsome/bsecond",
          slugs: ["zsome", "bsecond"],
        },
        meta: {
          title: "Some second",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/index.md",
          pagePath: "/wiki/zsome",
          slugs: ["zsome"],
        },
        meta: {
          title: "Some",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/02-bother/01-zfirst.md",
          pagePath: "/wiki/bother/zfirst",
          slugs: ["bother", "zfirst"],
        },
        meta: {
          title: "Other first",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/02-bother/index.md",
          pagePath: "/wiki/bother",
          slugs: ["bother"],
        },
        meta: {
          title: "Other",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/index.md",
          pagePath: "/wiki",
          slugs: [],
        },
        meta: {
          title: "Wiki",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/03-athird/01-zfirst.md",
          pagePath: "/wiki/athird/zfirst",
          slugs: ["athird", "zfirst"],
        },
        meta: {
          title: "Third first",
        },
      },
    ];
    const builder = new WikiTreeIndexBuilder(false);
    for (const wikiPage of wikiPages) {
      builder.addResource("wiki", wikiPage);
    }
    const index = await builder.buildIndex({});

    const result = index.wikiTree.pagePathToWikiTree("wiki", "/wiki/zsome");
    expect(result).toMatchInlineSnapshot(`
{
  "trees": [
    {
      "children": [
        {
          "children": [
            {
              "children": [],
              "pagePath": "/wiki/zsome/zfirst",
              "slugs": [
                "zsome",
                "zfirst",
              ],
              "title": "Some first",
            },
            {
              "children": [],
              "pagePath": "/wiki/zsome/bsecond",
              "slugs": [
                "zsome",
                "bsecond",
              ],
              "title": "Some second",
            },
          ],
          "pagePath": "/wiki/zsome",
          "slugs": [
            "zsome",
          ],
          "title": "Some",
        },
        {
          "children": [
            {
              "children": [],
              "pagePath": "/wiki/bother/zfirst",
              "slugs": [
                "bother",
                "zfirst",
              ],
              "title": "Other first",
            },
          ],
          "pagePath": "/wiki/bother",
          "slugs": [
            "bother",
          ],
          "title": "Other",
        },
        {
          "children": [],
          "pagePath": "/wiki/athird/zfirst",
          "slugs": [
            "athird",
            "zfirst",
          ],
          "title": "Third first",
        },
      ],
      "pagePath": "/wiki",
      "slugs": [],
      "title": "Wiki",
    },
  ],
}
`);
  });
  it("should build wiki tree index auto folder", async () => {
    const wikiPages: WikiTreeIndexResource[] = [
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/01-zfirst.md",
          pagePath: "/wiki/zsome/zfirst",
          slugs: ["zsome", "zfirst"],
        },
        meta: {
          title: "Some first",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/02-bsecond.md",
          pagePath: "/wiki/zsome/bsecond",
          slugs: ["zsome", "bsecond"],
        },
        meta: {
          title: "Some second",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/index.md",
          pagePath: "/wiki/zsome",
          slugs: ["zsome"],
        },
        meta: {
          title: "Some",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/02-bother/01-zfirst.md",
          pagePath: "/wiki/bother/zfirst",
          slugs: ["bother", "zfirst"],
        },
        meta: {
          title: "Other first",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/02-bother/index.md",
          pagePath: "/wiki/bother",
          slugs: ["bother"],
        },
        meta: {
          title: "Other",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/index.md",
          pagePath: "/wiki",
          slugs: [],
        },
        meta: {
          title: "Wiki",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/03-athird/01-zfirst.md",
          pagePath: "/wiki/athird/zfirst",
          slugs: ["athird", "zfirst"],
        },
        meta: {
          title: "Third first",
        },
      },
    ];
    const builder = new WikiTreeIndexBuilder(true);
    for (const wikiPage of wikiPages) {
      builder.addResource("wiki", wikiPage);
    }
    const index = await builder.buildIndex({});

    const result = index.wikiTree.pagePathToWikiTree("wiki", "/wiki/zsome");
    expect(result).toMatchInlineSnapshot(`
{
  "trees": [
    {
      "children": [
        {
          "children": [
            {
              "children": [],
              "pagePath": "/wiki/zsome/zfirst",
              "slugs": [
                "zsome",
                "zfirst",
              ],
              "title": "Some first",
            },
            {
              "children": [],
              "pagePath": "/wiki/zsome/bsecond",
              "slugs": [
                "zsome",
                "bsecond",
              ],
              "title": "Some second",
            },
          ],
          "pagePath": "/wiki/zsome",
          "slugs": [
            "zsome",
          ],
          "title": "Some",
        },
        {
          "children": [
            {
              "children": [],
              "pagePath": "/wiki/bother/zfirst",
              "slugs": [
                "bother",
                "zfirst",
              ],
              "title": "Other first",
            },
          ],
          "pagePath": "/wiki/bother",
          "slugs": [
            "bother",
          ],
          "title": "Other",
        },
        {
          "children": [
            {
              "children": [],
              "pagePath": "/wiki/athird/zfirst",
              "slugs": [
                "athird",
                "zfirst",
              ],
              "title": "Third first",
            },
          ],
          "pagePath": "",
          "slugs": [
            "athird",
          ],
          "title": "athird",
        },
      ],
      "pagePath": "/wiki",
      "slugs": [],
      "title": "Wiki",
    },
  ],
}
`);
  });

  it("should foldered where item belongs root", async () => {
    const wikiPages: WikiTreeIndexResource[] = [
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/01-zfirst.md",
          pagePath: "/wiki/zsome/zfirst",
          slugs: ["zsome", "zfirst"],
        },
        meta: {
          title: "Some first",
        },
      },
      {
        pathMapping: {
          filePath: "public/content/wiki/01-zsome/02-bsecond.md",
          pagePath: "/wiki/zsome/bsecond",
          slugs: ["zsome", "bsecond"],
        },
        meta: {
          title: "Some second",
        },
      },
    ];
    const builder = new WikiTreeIndexBuilder(true);
    for (const wikiPage of wikiPages) {
      builder.addResource("wiki", wikiPage);
    }
    const index = await builder.buildIndex({});

    const result = index.wikiTree.pagePathToWikiTree("wiki", "/wiki/zsome");
    expect(result).toMatchInlineSnapshot(`
{
  "trees": [
    {
      "children": [
        {
          "children": [],
          "pagePath": "/wiki/zsome/zfirst",
          "slugs": [
            "zsome",
            "zfirst",
          ],
          "title": "Some first",
        },
        {
          "children": [],
          "pagePath": "/wiki/zsome/bsecond",
          "slugs": [
            "zsome",
            "bsecond",
          ],
          "title": "Some second",
        },
      ],
      "pagePath": "",
      "slugs": [
        "zsome",
      ],
      "title": "zsome",
    },
  ],
}
`);
  });
});

////////
