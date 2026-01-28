import { parseMdx } from "@/core/parsing/rendering-parse";
import { BasePathMapping, MDXMeta } from "@/core/types/indexing";
import { deduplicateArray } from "@/utils/func-utils";
import { MetaCollector } from "./meta-collecting";

/**
 * MDXMetaCollector is a meta collector that collects meta data from MDX files.
 * It use `content` in previous collector to collect meta data.
 */
export class MDXMetaCollector
  implements MetaCollector<MDXMeta & { content: string }>
{
  handleAbleKeys = (): (keyof MDXMeta)[] | "*" => {
    return ["headingTrees", "wikiRefAliases", "richRefAliases", "tags"];
  };
  async collectMeta(
    pathMapping: BasePathMapping,
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
      pagePath: pathMapping.pagePath,
      filePath: pathMapping.filePath,
    });

    if (prevMeta.tags) {
      capturedResult.tags.push(...prevMeta.tags);
      capturedResult.tags = deduplicateArray(capturedResult.tags);
    }
    return capturedResult;
  }
}
