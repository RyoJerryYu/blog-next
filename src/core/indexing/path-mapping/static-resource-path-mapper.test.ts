import { StaticResourcePathMapper } from "./static-resource-path-mapper";

describe("StaticResourcePageMapper", () => {
  /**
   * StaticResourcePageMapper.filePath2PathMapping
   * should return a page path just remove the file path prefix.
   */
  const fileGlobPattern = "public/content/**/*.*";
  const filePathPrefix = "public";
  const mapper = new StaticResourcePathMapper({
    fileGlobPattern,
    filePathPrefix,
  });

  // Act
  const cases = [
    {
      filePath: "public/content/abc/def.jpg",
      pagePath: "/content/abc/def.jpg",
    },
    {
      filePath: "public/content/abc/def",
      pagePath: "/content/abc/def",
    },
  ];

  it.each(cases)(
    "filePath should correct for $filePath",
    ({ filePath, pagePath }) => {
      const pathMapping = mapper.filePath2PathMapping(filePath);
      expect(pathMapping.filePath).toBe(filePath);
    }
  );

  it.each(cases)(
    "pagePath should correct for $filePath",
    ({ filePath, pagePath }) => {
      const pathMapping = mapper.filePath2PathMapping(filePath);
      expect(pathMapping.pagePath).toBe(pagePath);
    }
  );
});
