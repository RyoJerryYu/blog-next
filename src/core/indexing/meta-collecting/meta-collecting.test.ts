import { MetaCollector, collectMetaForFilePath } from "./meta-collecting";

type MockMeta = {
  created_at: string;
  updated_at: string;
  tags: string[];
};
const mockMetaCollector = (
  meta: Partial<MockMeta>
): MetaCollector<MockMeta> => {
  return {
    handleAbleKeys: () => ["created_at", "updated_at", "tags"],
    collectMeta: async () => meta,
  };
};

describe("collectMetaForFilePath", () => {
  it("should never remain undefined", async () => {
    const meta = await collectMetaForFilePath(
      {
        collectors: [
          mockMetaCollector({}),
          mockMetaCollector({ tags: undefined }),
        ],
        defaultMeta: { created_at: "", updated_at: "", tags: [] },
      },
      ""
    );
    expect(meta).toBeDefined();
    expect(meta.created_at).toBeDefined();
    expect(meta.updated_at).toBeDefined();
    expect(meta.tags).toBeDefined();
  });
});
