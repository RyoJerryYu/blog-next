import { AliasIndexBuilder } from "./alias-index-builder";

describe("test alias index", () => {
  const input = [
    { path: "/articles/2020-01-01-Blog-01.jpg" },
    { path: "/articles/2020-01-02-Blog-02" },
  ];
  const builder = new AliasIndexBuilder();
  input.forEach((item) => {
    builder.addResource({
      pathMapping: {
        pagePath: item.path,
        filePath: "do not care",
      },
      meta: {},
    });
  });
  const { alias: index } = builder.buildIndex();

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
  it.each(resolveCases)("resolve not md $name", ({ alias }) => {
    const path = index.resolve(alias);
    expect(path).not.toBeUndefined();
  });

  const resolveMDCases = [
    {
      name: "full path from root, without site url prefix",
      alias: "/articles/2020-01-02-Blog-02.md",
    },
    {
      name: "path with layers",
      alias: "articles/2020-01-02-Blog-02.md",
    },
    { name: "path without layers", alias: "2020-01-02-Blog-02.md" },
    // { name: "path without date", alias: "Blog-02.md" }, # not implemented yet
    {
      name: "full path from root without extension",
      alias: "/articles/2020-01-02-Blog-02",
    },
    {
      name: "path with layers without extension",
      alias: "articles/2020-01-02-Blog-02",
    },
    {
      name: "path without layers and extension",
      alias: "2020-01-02-Blog-02",
    },
    // { name: "path without date and extension", alias: "Blog-02" }, # not implemented yet
  ];
  it.each(resolveMDCases)("resolve md $name", ({ alias }) => {
    const path = index.resolve(alias);
    expect(path).not.toBeUndefined();
  });
});
