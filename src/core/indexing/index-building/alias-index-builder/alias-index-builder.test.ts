import { AliasIndexBuilder } from "./alias-index-builder";

describe("test alias index", () => {
  const input = [
    {
      path: "/articles/2020-01-01-Blog-01.jpg",
      filePath: "public/content/articles/2020-01-01-Blog-01.jpg",
    },
    {
      path: "/articles/2020-01-02-Blog-02",
      filePath: "public/content/articles/2020-01-02-Blog-02.md",
    },
  ];
  const builder = new AliasIndexBuilder();
  input.forEach((item) => {
    builder.addResource("articles", {
      pathMapping: {
        pagePath: item.path,
        filePath: item.filePath,
      },
      meta: {},
    });
  });
  const futureIndex = builder.buildIndex();

  const resolveCases = [
    {
      name: "# full path from root, without site url prefix",
      alias: "/articles/2020-01-01-Blog-01.jpg",
    },
    {
      name: "# path with layers",
      alias: "articles/2020-01-01-Blog-01.jpg",
    },
    { name: "# path without layers", alias: "2020-01-01-Blog-01.jpg" },
    // { name: "# path without date", alias: "Blog-01.jpg" }, # not implemented yet
  ];
  it.each(resolveCases)("resolve not md $name", async ({ alias }) => {
    const { alias: index } = await futureIndex;
    const path = index.resolve(alias);
    expect(path).not.toBeUndefined();
  });

  const resolveMDCases = [
    {
      name: "full file path from root, without site url prefix",
      alias: "public/content/articles/2020-01-02-Blog-02.md",
    },
    {
      name: "file path with layers",
      alias: "articles/2020-01-02-Blog-02.md",
    },
    { name: "file path without layers", alias: "2020-01-02-Blog-02.md" },
    // { name: "path without date", alias: "Blog-02.md" }, # not implemented yet
    {
      name: "full page path from root with slash prefix",
      alias: "/articles/2020-01-02-Blog-02",
    },
    {
      name: "page path with layers without extension",
      alias: "articles/2020-01-02-Blog-02",
    },
    {
      name: "page path without layers and extension",
      alias: "2020-01-02-Blog-02",
    },
    // { name: "path without date and extension", alias: "Blog-02" }, # not implemented yet
  ];
  it.each(resolveMDCases)("resolve md $name", async ({ alias }) => {
    const { alias: index } = await futureIndex;
    const path = index.resolve(alias);
    expect(path).not.toBeUndefined();
  });
});
