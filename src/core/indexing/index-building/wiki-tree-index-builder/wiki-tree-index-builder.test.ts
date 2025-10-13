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
          "isVirtual": true,
          "pagePath": "/wiki/athird",
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
      "isVirtual": true,
      "pagePath": "/wiki/zsome",
      "slugs": [
        "zsome",
      ],
      "title": "zsome",
    },
  ],
}
`);
  });
  it("should not failed with stack overflow", async () => {
    const wikiPages: WikiTreeIndexResource[] = [
      {
        pathMapping: {
          filePath: "public/content/jessiecode-wiki/index.md",
          pagePath: "/jessiecode-wiki",
          slugs: [],
        },
        meta: {
          title: "Index",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/01-三角形外心.md",
          pagePath: "/jessiecode-wiki/Examples/三角形外心",
          slugs: ["Examples", "三角形外心"],
        },
        meta: {
          title: "三角形外心",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/02-三角形内心.md",
          pagePath: "/jessiecode-wiki/Examples/三角形内心",
          slugs: ["Examples", "三角形内心"],
        },
        meta: {
          title: "三角形内心",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/03-三角形重心.md",
          pagePath: "/jessiecode-wiki/Examples/三角形重心",
          slugs: ["Examples", "三角形重心"],
        },
        meta: {
          title: "三角形重心",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/04-三角形垂心.md",
          pagePath: "/jessiecode-wiki/Examples/三角形垂心",
          slugs: ["Examples", "三角形垂心"],
        },
        meta: {
          title: "三角形垂心",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/11-二次函数与切线.md",
          pagePath: "/jessiecode-wiki/Examples/二次函数与切线",
          slugs: ["Examples", "二次函数与切线"],
        },
        meta: {
          title: "二次函数与切线",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/12-二次函数与积分.md",
          pagePath: "/jessiecode-wiki/Examples/二次函数与积分",
          slugs: ["Examples", "二次函数与积分"],
        },
        meta: {
          title: "完全四边形",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/21-完全四边形.md",
          pagePath: "/jessiecode-wiki/Examples/完全四边形",
          slugs: ["Examples", "完全四边形"],
        },
        meta: {
          title: "完全四边形",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/02-Examples/31-二元函数三维图像.md",
          pagePath: "/jessiecode-wiki/Examples/二元函数三维图像",
          slugs: ["Examples", "二元函数三维图像"],
        },
        meta: {
          title: "二元函数三维图像",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/04-Cool Showcase/01-立方体投影.md",
          pagePath: "/jessiecode-wiki/Cool Showcase/立方体投影",
          slugs: ["Cool Showcase", "立方体投影"],
        },
        meta: {
          title: "割圆八线",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/04-Cool Showcase/02-割圆八线.md",
          pagePath: "/jessiecode-wiki/Cool Showcase/割圆八线",
          slugs: ["Cool Showcase", "割圆八线"],
        },
        meta: {
          title: "割圆八线",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/04-Cool Showcase/03-三角形角平分线与对边的中垂线交点位于外接圆上.md",
          pagePath:
            "/jessiecode-wiki/Cool Showcase/三角形角平分线与对边的中垂线交点位于外接圆上",
          slugs: [
            "Cool Showcase",
            "三角形角平分线与对边的中垂线交点位于外接圆上",
          ],
        },
        meta: {
          title: "割圆八线",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/04-Cool Showcase/04-欧拉线.md",
          pagePath: "/jessiecode-wiki/Cool Showcase/欧拉线",
          slugs: ["Cool Showcase", "欧拉线"],
        },
        meta: {
          title: "割圆八线",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/04-Cool Showcase/05-二元函数切平面.md",
          pagePath: "/jessiecode-wiki/Cool Showcase/二元函数切平面",
          slugs: ["Cool Showcase", "二元函数切平面"],
        },
        meta: {
          title: "割圆八线",
        },
      },
      {
        pathMapping: {
          filePath:
            "public/content/jessiecode-wiki/04-Cool Showcase/06-微分中 dy 与 delta y 的区别.md",
          pagePath:
            "/jessiecode-wiki/Cool Showcase/微分中 dy 与 delta y 的区别",
          slugs: ["Cool Showcase", "微分中 dy 与 delta y 的区别"],
        },
        meta: {
          title: "割圆八线",
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
              "pagePath": "/jessiecode-wiki/Examples/三角形外心",
              "slugs": [
                "Examples",
                "三角形外心",
              ],
              "title": "三角形外心",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Examples/三角形内心",
              "slugs": [
                "Examples",
                "三角形内心",
              ],
              "title": "三角形内心",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Examples/三角形重心",
              "slugs": [
                "Examples",
                "三角形重心",
              ],
              "title": "三角形重心",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Examples/三角形垂心",
              "slugs": [
                "Examples",
                "三角形垂心",
              ],
              "title": "三角形垂心",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Examples/二次函数与切线",
              "slugs": [
                "Examples",
                "二次函数与切线",
              ],
              "title": "二次函数与切线",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Examples/二次函数与积分",
              "slugs": [
                "Examples",
                "二次函数与积分",
              ],
              "title": "完全四边形",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Examples/完全四边形",
              "slugs": [
                "Examples",
                "完全四边形",
              ],
              "title": "完全四边形",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Examples/二元函数三维图像",
              "slugs": [
                "Examples",
                "二元函数三维图像",
              ],
              "title": "二元函数三维图像",
            },
          ],
          "isVirtual": true,
          "pagePath": "/jessiecode-wiki/Examples",
          "slugs": [
            "Examples",
          ],
          "title": "Examples",
        },
        {
          "children": [
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Cool Showcase/立方体投影",
              "slugs": [
                "Cool Showcase",
                "立方体投影",
              ],
              "title": "割圆八线",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Cool Showcase/割圆八线",
              "slugs": [
                "Cool Showcase",
                "割圆八线",
              ],
              "title": "割圆八线",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Cool Showcase/三角形角平分线与对边的中垂线交点位于外接圆上",
              "slugs": [
                "Cool Showcase",
                "三角形角平分线与对边的中垂线交点位于外接圆上",
              ],
              "title": "割圆八线",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Cool Showcase/欧拉线",
              "slugs": [
                "Cool Showcase",
                "欧拉线",
              ],
              "title": "割圆八线",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Cool Showcase/二元函数切平面",
              "slugs": [
                "Cool Showcase",
                "二元函数切平面",
              ],
              "title": "割圆八线",
            },
            {
              "children": [],
              "pagePath": "/jessiecode-wiki/Cool Showcase/微分中 dy 与 delta y 的区别",
              "slugs": [
                "Cool Showcase",
                "微分中 dy 与 delta y 的区别",
              ],
              "title": "割圆八线",
            },
          ],
          "isVirtual": true,
          "pagePath": "/jessiecode-wiki/Cool Showcase",
          "slugs": [
            "Cool Showcase",
          ],
          "title": "Cool Showcase",
        },
      ],
      "pagePath": "/jessiecode-wiki",
      "slugs": [],
      "title": "Index",
    },
  ],
}
`);
  });
});

////////
