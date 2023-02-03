import { getSlugFromFile, parseMetaFromRaw } from "./utils";

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

  for (const { name, input, output } of cases) {
    it(name, () => {
      expect(getSlugFromFile(input)).toBe(output);
    });
  }
});

describe("test parse meta", () => {
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
        tagLength: undefined,
        abstract: "first line\nsecond line",
      },
    },
  ];

  for (const { name, input, output } of cases) {
    it(name, () => {
      const result = parseMetaFromRaw(input);
      expect(result.title).toBe(output.title);
      expect(result.tags?.length).toBe(output.tagLength);
      expect(result.abstract).toBe(output.abstract);
    });
  }
});
