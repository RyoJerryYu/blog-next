import { PostMeta } from "@/core/types/indexing";
import path from "path";
import { MetaCollector } from "./meta-collecting";

export class FsMetaCollector implements MetaCollector<PostMeta> {
  handleAbleKeys = (): (keyof PostMeta)[] | "*" => {
    return ["title"];
  };

  collectMeta = async (
    filePath: string,
    prevMeta: Partial<PostMeta>
  ): Promise<Partial<PostMeta>> => {
    if (prevMeta.title) {
      return {};
    }
    const fileExt = path.extname(filePath);
    const fileBaseName = path.basename(filePath, fileExt);

    const result: Partial<PostMeta> = {};

    if (fileExt === ".md" || fileExt === ".mdx") {
      result.title = fileBaseName;
    }
    return result;
  };
}
