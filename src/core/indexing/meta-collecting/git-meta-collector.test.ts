import { describeNoCI } from "@/utils/utils.test";
import dayjs from "dayjs";
import { defaultGitMetaCollector } from "./git-meta-collector";

describeNoCI("test parse git meta", () => {
  const collector = defaultGitMetaCollector();
  it("should have right time", async () => {
    const filePath = "public/content/articles/2020-01-27-Building-this-blog.md";

    const result = await collector.collectMeta(filePath);
    expect(result.created_at).not.toBeUndefined();
    expect(result.updated_at).not.toBeUndefined();
    expect(dayjs(result.updated_at).unix()).toBeGreaterThan(
      dayjs(result.created_at).unix()
    );
  });
});
