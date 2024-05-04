import { describeNoCI } from "@/utils/utils.test";
import { timeStrToUnix } from "../utils/git-utils";
import { defaultGitMetaCollector } from "./git-meta-collector";

describeNoCI("test parse git meta", () => {
  const collector = defaultGitMetaCollector();
  it("should have right time", async () => {
    const filePath = "public/content/articles/2020-01-27-Building-this-blog.md";

    const result = await collector.collectMeta(filePath);
    expect(result.created_at).not.toBeUndefined();
    expect(result.updated_at).not.toBeUndefined();
    expect(timeStrToUnix(result.updated_at!!)).toBeGreaterThan(
      timeStrToUnix(result.created_at!!)
    );
  });
});
