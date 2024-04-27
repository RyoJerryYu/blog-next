import { articlePostPathMapper } from "./post-path-mapper";

describe("test get slug from file", () => {
  const cases = [
    {
      name: "should get slug",
      input: `public/content/articles/abc.md`,
      want: {
        filePath: `public/content/articles/abc.md`,
        pagePath: `/articles/abc`,
        slug: "abc",
      },
    },
    {
      name: "should remove prefix number",
      input: `public/content/articles/01-abc.md`,
      want: {
        filePath: `public/content/articles/01-abc.md`,
        pagePath: `/articles/abc`,
        slug: "abc",
      },
    },
    {
      name: "should remove prefix date",
      input: `public/content/articles/2020-01-01-abc.md`,
      want: {
        filePath: `public/content/articles/2020-01-01-abc.md`,
        pagePath: `/articles/abc`,
        slug: "abc",
      },
    },
  ];
  const loader = articlePostPathMapper();

  for (const { name, input, want } of cases) {
    it(name, () => {
      const mapping = loader.filePath2PathMapping(input);
      expect(mapping.slug).toBe(want.slug);
      expect(mapping.pagePath).toBe(want.pagePath);
      expect(mapping.filePath).toBe(want.filePath);
    });
  }
});
