import dayjs from "dayjs";
import { articleLoader } from "./loader";

describe("test get slug from file", () => {
  const cases = [
    {
      name: "should get slug",
      input: `public/content/posts/abc.md`,
      output: "abc",
    },
    {
      name: "should remove prefix number",
      input: `public/content/posts/01-abc.md`,
      output: "abc",
    },
    {
      name: "should remove prefix date",
      input: `public/content/posts/2020-01-01-abc.md`,
      output: "abc",
    },
  ];
  const loader = articleLoader();

  for (const { name, input, output } of cases) {
    it(name, () => {
      expect(loader.getSlugFromFile(input)).toBe(output);
    });
  }
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
      output: {
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
      output: {
        title: "abc",
        tagLength: 0,
        abstract: "first line\nsecond line",
      },
    },
  ];
  const loader = articleLoader();

  for (const { name, input, output } of cases) {
    it(name, () => {
      const result = loader.parseMetaFromRaw(input);
      expect(result.title).toBe(output.title);
      expect(result.tags?.length).toBe(output.tagLength);
      expect(result.abstract).toBe(output.abstract);
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
      name: "should null if no time",
      input: `
# abc
`,
      output: {},
    },
  ];

  const loader = articleLoader();

  for (const { name, input, output } of cases) {
    it(name, () => {
      const result = loader.parseMetaFromRaw(input);

      output.created_at
        ? expectTimeEq(result.created_at, output.created_at.toJSON())
        : expect(result.created_at).toBeNull();

      output.updated_at
        ? expectTimeEq(result.updated_at, output.updated_at.toJSON())
        : expect(result.updated_at).toBeNull();
    });
  }
});
