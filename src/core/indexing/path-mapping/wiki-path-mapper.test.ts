import { WikiPathMapper } from "./wiki-path-mapper";

describe("WikiPathMapper get slug from file", () => {
  const cases = [
    {
      name: "should get slug for subpage",
      input: `public/content/testwiki/page1/subpage1.md`,
      want: {
        filePath: `public/content/testwiki/page1/subpage1.md`,
        pagePath: `/testwiki/page1/subpage1`,
        slugs: ["page1", "subpage1"],
      },
    },
    {
      name: "should get slug for page",
      input: `public/content/testwiki/page1.md`,
      want: {
        filePath: `public/content/testwiki/page1.md`,
        pagePath: `/testwiki/page1`,
        slugs: ["page1"],
      },
    },
    {
      name: "should get slug for subpage with prefix number",
      input: `public/content/testwiki/01-subpage1.md`,
      want: {
        filePath: `public/content/testwiki/01-subpage1.md`,
        pagePath: `/testwiki/01-subpage1`,
        slugs: ["01-subpage1"],
      },
    },
    {
      name: "should get slug for page with sub index page",
      input: `public/content/testwiki/page1/index.md`,
      want: {
        filePath: `public/content/testwiki/page1/index.md`,
        pagePath: `/testwiki/page1`,
        slugs: ["page1"],
      },
    },
    {
      name: "should get slug for index page",
      input: `public/content/testwiki/index.md`,
      want: {
        filePath: `public/content/testwiki/index.md`,
        pagePath: `/testwiki`,
        slugs: [],
      },
    },
  ];
  const loader = new WikiPathMapper({
    fileGlobPattern: "public/content/testwiki/**/*.md*",
    pathPrefix: "/testwiki",
  });

  for (const { name, input, want } of cases) {
    it(name, () => {
      const mapping = loader.filePath2PathMapping(input);
      expect(mapping.filePath).toBe(want.filePath);
      expect(mapping.pagePath).toBe(want.pagePath);
      expect(mapping.slugs).toEqual(want.slugs);
    });
  }
});
