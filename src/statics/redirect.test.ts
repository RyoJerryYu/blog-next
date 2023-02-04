import { getSlugFromOldPath } from "./redirect";

describe("test get slug from old path", () => {
  const testCases = [
    {
      oldPath: "2022/08/20/2022-08-20-introduction-for-k8s-2/",
      slug: "introduction-for-k8s-2",
    },
  ];
  it.each(testCases)(
    "regex should get slug from old path",
    ({ oldPath, slug }) => {
      expect(getSlugFromOldPath(oldPath)).toBe(slug);
    }
  );
});
