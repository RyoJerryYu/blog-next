import { parseMdx } from "@/core/parsing/rendering-parse";
import { MDXMeta } from "@/core/types/indexing";
import fs from "fs";
import { promisify } from "util";
import { MetaCollector } from "./meta-collecting";

export class MDXMetaCollector implements MetaCollector<MDXMeta> {
  handleAbleKeys = (): (keyof MDXMeta)[] | "*" => {
    return ["headingTrees", "wikiRefAliases", "richRefPagePaths"];
  };
  async collectMeta(filePath: string): Promise<Partial<MDXMeta>> {
    const raw = await promisify(fs.readFile)(filePath, "utf-8");
    const { capturedResult } = await parseMdx(raw, {
      isMetaPhase: true,
      pagePath: filePath,
    });
    return capturedResult;
  }
}
