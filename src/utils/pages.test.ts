import { getSlugFromFile, searchBlogFile } from "./pages";

test("should first", () => {
  const cases = [
    {
      input: `public/content/posts/abc.md`,
      output: "abc",
    },
    {
      input: `public/content/posts/abc/index.md`,
      output: "abc",
    },
  ];

  for (const { input, output } of cases) {
    expect(getSlugFromFile(input)).toBe(output);
  }
});

test("file path should be right in test", () => {
  const files = searchBlogFile();
  expect(files.length).toBeGreaterThan(0);
});
