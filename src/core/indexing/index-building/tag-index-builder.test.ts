import { PagePathMapping } from "../path-mapping/path-mapping";
import { Resource } from "./index-building";
import { TagIndexBuilder, TagIndexBuilderMeta } from "./tag-index-builder";

describe("test tag index", () => {
  const input: Array<Resource<PagePathMapping, TagIndexBuilderMeta>> = [
    {
      pathMapping: {
        filePath: "/content/articles/001.md",
        slug: "001",
        pagePath: "/articles/001",
      },
      meta: {
        tags: ["abc", "cde"],
      },
    },
    {
      pathMapping: {
        filePath: "/content/ideas/001.md",
        slug: "001",
        pagePath: "/ideas/001",
      },
      meta: {
        tags: ["abc"],
      },
    },
    {
      pathMapping: {
        filePath: "/content/ideas/002.md",
        slug: "002",
        pagePath: "/ideas/002",
      },
      meta: {
        tags: ["abc"],
      },
    },
  ];
  const builder = new TagIndexBuilder();
  input.forEach((item) => {
    builder.addResource(item);
  });

  const getSlugCases = [
    {
      name: "should parse tag index",
      input: "abc",
      output: [
        { postType: "article", postSlug: "001" },
        { postType: "idea", postSlug: "001" },
        { postType: "idea", postSlug: "002" },
      ],
    },
    {
      name: "should parse tag 2",
      input: "cde",
      output: [{ postType: "article", postSlug: "001" }],
    },
    {
      name: "should not exist tag",
      input: "not-exist",
      output: [],
    },
  ];
  it.each(getSlugCases)("$name", ({ input, output }) => {
    const tagIndex = builder.buildIndex();
    const result = tagIndex.tag.getPostSlugs(input);
    expect(result).toEqual(output);
  });

  const getTagsCases = [
    {
      name: "should get all tags",
      output: [
        { tag: "abc", slug: "abc", path: "/tags/abc", postCnt: 3 },
        { tag: "cde", slug: "cde", path: "/tags/cde", postCnt: 1 },
      ],
    },
  ];
  it.each(getTagsCases)("$name", ({ output }) => {
    const tagIndex = builder.buildIndex();
    const result = tagIndex.tag.getTags();
    for (let i = 0; i < result.length; i++) {
      let resultCompare = {
        tag: result[i].tag,
        slug: result[i].slug,
        path: result[i].path,
        postCnt: result[i].postSlugs.length,
      };
      expect(resultCompare).toEqual(output[i]);
    }
  });

  const getTagsOfCases = [
    {
      name: "should get tags of",
      input: ["abc"],
      output: [{ tag: "abc", slug: "abc", path: "/tags/abc", postCnt: 3 }],
    },
    {
      name: "should get tags of 2",
      input: ["abc", "cde"],
      output: [
        { tag: "abc", slug: "abc", path: "/tags/abc", postCnt: 3 },
        { tag: "cde", slug: "cde", path: "/tags/cde", postCnt: 1 },
      ],
    },
    {
      name: "should get tags of 3",
      input: ["abc", "not-exist"],
      output: [{ tag: "abc", slug: "abc", path: "/tags/abc", postCnt: 3 }],
    },
  ];
  it.each(getTagsOfCases)("$name", ({ input, output }) => {
    const tagIndex = builder.buildIndex();
    const result = tagIndex.tag.getTagsOf(input);
    for (let i = 0; i < result.length; i++) {
      let resultCompare = {
        tag: result[i].tag,
        slug: result[i].slug,
        path: result[i].path,
        postCnt: result[i].postSlugs.length,
      };
      expect(resultCompare).toEqual(output[i]);
    }
  });
});
