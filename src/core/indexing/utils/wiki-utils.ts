export function lastSlugIsIndex(slugs: string[]) {
  return (
    slugs.length > 0 &&
    (slugs[slugs.length - 1] === "index.md" ||
      slugs[slugs.length - 1] === "index.mdx")
  );
}

export function filePathToWikiSlugs(
  filePath: string,
  removeOrderNumber: boolean = true
): string[] {
  let slugArray: string[] = filePath.split("/").filter((slug) => slug !== ""); // [page1.md]
  // remove the index.md(x) from the slugs
  if (lastSlugIsIndex(slugArray)) {
    slugArray.pop();
  }
  slugArray = slugArray.map((slug) => slug.replace(/\.mdx?$/, "")); // [page1.md] -> [page1]
  if (removeOrderNumber) {
    slugArray = slugArray.map((slug) => slug.replace(/^\d+-\s*/, "")); // [01-page1,01-subpage1.md] -> [page1,subpage1]
  }

  const slugs: string[] = slugArray || [];
  return slugs;
}
