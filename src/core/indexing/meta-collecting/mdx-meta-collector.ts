import { parseMdx } from "@/core/parsing/rendering-parse";
import { MDXMeta } from "@/core/types/indexing";
import { MetaCollector } from "./meta-collecting";

export class MDXMetaCollector
  implements MetaCollector<MDXMeta & { content: string }>
{
  handleAbleKeys = (): (keyof MDXMeta)[] | "*" => {
    return ["headingTrees", "wikiRefAliases", "richRefAliases"];
  };
  async collectMeta(
    filePath: string,
    prevMeta: Partial<MDXMeta & { content: string }>
  ): Promise<Partial<MDXMeta>> {
    const raw = prevMeta.content;
    if (!raw) {
      return {
        headingTrees: [],
        wikiRefAliases: [],
        richRefAliases: [],
      };
    }
    const { capturedResult } = await parseMdx(raw, {
      isMetaPhase: true,
      pagePath: filePath,
    });
    return capturedResult;
  }
}
