import { describeNoCI } from "@/utils/utils.test";
import dayjs from "dayjs";
import { PostRawMetaCollector } from "./post-raw-meta-collector";

describeNoCI("test parse from real", () => {
  const collector = new PostRawMetaCollector();
  it("should parse right path", async () => {
    const filePath = "public/content/articles/2020-01-27-Building-this-blog.md";
    const meta = await collector.collectMeta(filePath);
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
