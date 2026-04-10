import { describeNoCI } from "@/utils/utils.test";
import dayjs from "dayjs";
import { PostRawMetaCollector } from "./post-raw-meta-collector";

describeNoCI("test parse from real", () => {
  const collector = new PostRawMetaCollector();
  it("should parse right path", async () => {
    const filePath = "public/content/articles/2020-01-27-Building-this-blog.md";
    const meta = await collector.collectMeta(
      {
        filePath,
        pagePath: "",
      },
      {}
    );
    expect(meta.title).toBe("搭建博客的过程");
  });
});

describe("test parse meta: general", () => {
  const cases = [
    {
      name: "should parse meta",
      input: `---
title: abc
created_at: 2020-01-01
tags: [a, b]
---
# abc
edf
`,
      want: {
        title: "abc",
        tagLength: 2,
        abstract: "edf",
      },
    },
    {
      name: "should parse meta with poor frontmatter",
      input: `---
title: abc
---
first line
second line
`,
      want: {
        title: "abc",
        tagLength: undefined,
        abstract: "first line\nsecond line",
      },
    },
    {
      name: "should use frontmatter abstract first",
      input: `---
title: abc
abstract: from frontmatter
---
# heading should be ignored
content paragraph
`,
      want: {
        title: "abc",
        tagLength: undefined,
        abstract: "from frontmatter",
      },
    },
    {
      name: "should use first abstract callout children",
      input: `---
title: abc
---
> [!abstract] TL;DR
> line 1
> line 2
>
> line 3

after paragraph
`,
      want: {
        title: "abc",
        tagLength: undefined,
        abstract: "line 1\nline 2\n\nline 3",
      },
    },
    {
      name: "should fallback to first 3 non-heading paragraphs",
      input: `---
title: abc
---
# Heading

paragraph 1 line 1
paragraph 1 line 2

## Heading 2

paragraph 2

paragraph 3

paragraph 4
`,
      want: {
        title: "abc",
        tagLength: undefined,
        abstract: "paragraph 1 line 1\nparagraph 1 line 2\n\nparagraph 2\n\nparagraph 3",
      },
    },
    {
      name: "should ignore fenced code block when fallback paragraphs",
      input: `---
title: abc
---
paragraph 1

\`\`\`ts
const x = 1;
console.log(x);
\`\`\`

paragraph 2

paragraph 3

paragraph 4
`,
      want: {
        title: "abc",
        tagLength: undefined,
        abstract: "paragraph 1\n\nparagraph 2\n\nparagraph 3",
      },
    },
  ];
  const collector = new PostRawMetaCollector();

  for (const { name, input, want } of cases) {
    it(name, () => {
      const result = collector.collectMetaFromRaw(input);
      expect(result.title).toBe(want.title);
      expect(result.tags?.length).toBe(want.tagLength);
      expect(result.abstract).toBe(want.abstract);
    });
  }
});

describe("test parse meta: time", () => {
  const expectTimeEq = (a: string | null, b: string | null) => {
    if (a && b) {
      expect(dayjs(a).toJSON()).toBe(dayjs(b).toJSON());
    } else {
      expect(a).toBeNull();
      expect(b).toBeNull();
    }
  };
  const cases = [
    {
      name: "should parse time",
      input: `---
created_at: 2020-01-01
updated_at: 2020-01-02
---
# abc
`,
      output: {
        created_at: dayjs("2020-01-01 00:00:00 +00:00"),
        updated_at: dayjs("2020-01-02 00:00:00 +00:00"),
      },
    },
    {
      name: "should undefined if no time",
      input: `
# abc
`,
      output: {},
    },
  ];

  const collector = new PostRawMetaCollector();

  for (const { name, input, output } of cases) {
    it(name, () => {
      const result = collector.collectMetaFromRaw(input);

      output.created_at
        ? expectTimeEq(result.created_at ?? null, output.created_at.toJSON())
        : expect(result.created_at).toBeUndefined();

      output.updated_at
        ? expectTimeEq(result.updated_at ?? null, output.updated_at.toJSON())
        : expect(result.updated_at).toBeUndefined();
    });
  }
});
