import { BasePathMapping, PostMeta } from "@/core/types/indexing";
import path from "path";
import { MetaCollector } from "./meta-collecting";

/**
 * PathMetaCollector is a meta collector that collects meta information from the path of the resource.
 * Most of the time, it does not depend on fs or other IO operations.
 */
export class PathMetaCollector implements MetaCollector<PostMeta> {
  handleAbleKeys = (): (keyof PostMeta)[] | "*" => {
    return ["title"];
  };

  collectMeta = async (
    pathMapping: BasePathMapping,
    prevMeta: Partial<PostMeta>
  ): Promise<Partial<PostMeta>> => {
    // only collect title now
    if (prevMeta.title) {
      return {};
    }

    // use the last part of the page path as the title
    const pagePath = pathMapping.pagePath;
    const fileExt = path.extname(pagePath);
    const fileBaseName = path.basename(pagePath, fileExt);

    const result: Partial<PostMeta> = {};

    result.title = fileBaseName;
    return result;
  };
}
