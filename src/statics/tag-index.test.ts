import { TagIndexBuilder } from "./tag-index";

describe("test tag index", () => {
  const input: Array<
    { postType: "article" | "idea" } & Record<string, string>
  > = [
    {
      tag: "abc",
      postType: "article",
      postSlug: "001",
    },
    {
      tag: "cde",
      postType: "article",
      postSlug: "001",
    },
    {
      tag: "abc",
      postType: "idea",
      postSlug: "001",
    },
    {
      tag: "abc",
      postType: "idea",
      postSlug: "002",
    },
  ];
  const builder = new TagIndexBuilder();
  input.forEach((item) => {
    builder.addPostSlug(item.tag, item.postType, item.postSlug);
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
    const tagIndex = builder.build();
    const result = tagIndex.getPostSlugs(input);
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
    const tagIndex = builder.build();
    const result = tagIndex.getTags();
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
    const tagIndex = builder.build();
    const result = tagIndex.getTagsOf(input);
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
