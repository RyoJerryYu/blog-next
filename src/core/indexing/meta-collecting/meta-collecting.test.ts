import {
  MetaCollector,
  MetaCollectorChain,
  collectMetaForFilePath,
} from "./meta-collecting";

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

const noopMetaCollector = <T extends {}>(meta: T): MetaCollector<T> => {
  return {
    handleAbleKeys: () => Object.keys(meta) as (keyof T)[],
    collectMeta: async () => meta,
  };
};

type A = { a: string };
type B = { b: string };
type C = { c: string };

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

  it("should auto adapt to the super set of meta", async () => {
    const abCollector: MetaCollector<A & B> = noopMetaCollector({
      a: "1",
      b: "2",
    });
    const bcCollector: MetaCollector<B & C> = noopMetaCollector({
      b: "3",
      c: "4",
    });
    const acCollector: MetaCollector<A & C> = noopMetaCollector({
      a: "5",
      c: "6",
    });
    const chain: MetaCollectorChain<A & B & C> = {
      collectors: [abCollector, bcCollector, acCollector],
      defaultMeta: { a: "", b: "", c: "" },
    };
    const meta = await collectMetaForFilePath(chain, "");
    expect(meta.a).toBe("1");
    expect(meta.b).toBe("2");
    expect(meta.c).toBe("4");
  });
});
