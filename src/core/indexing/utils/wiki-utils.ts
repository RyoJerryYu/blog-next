export function lastSlugIsIndex(slugs: string[]) {
  return (
    slugs.length > 0 &&
    (slugs[slugs.length - 1] === "index.md" ||
      slugs[slugs.length - 1] === "index.mdx")
  );
}
