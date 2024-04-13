import { mergeGitMeta } from "./git-meta";
import { articleLoader } from "./loader";

describe("test parse git meta", () => {
  const loader = articleLoader();
  it("should have right time", async () => {
    const file = "public/content/articles/2020-01-27-Building-this-blog.md";
    const meta = loader.parseMetaFromFile(file);
    const result = await mergeGitMeta(file, meta);
    expect(result.created_at).not.toBeUndefined();
    expect(result.updated_at).not.toBeUndefined();
  });
});
