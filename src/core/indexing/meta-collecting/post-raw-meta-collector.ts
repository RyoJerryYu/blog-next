import { PostMeta } from "@/core/types/indexing";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import { promisify } from "util";
import { MetaCollector } from "./meta-collecting";

export class PostRawMetaCollector implements MetaCollector<PostMeta> {
  handleAbleKeys = (): "*" | (keyof PostMeta)[] => {
    return "*";
  };

  collectMetaFromRaw = (raw: string): Partial<PostMeta> => {
    const { data, content } = matter(raw);
    const result: Partial<PostMeta> = {
      content,
      title: data.title ?? undefined,
      abstract:
        content
          .split("\n")
          .filter((line) => !line.startsWith("#"))
          .filter((line) => line.trim() !== "")
          .slice(0, 3)
          .join("\n") ?? undefined,
      length: content.split("\n").length ?? undefined,
      created_at: data.created_at ? dayjs(data.created_at).toJSON() : undefined,
      updated_at: data.updated_at ? dayjs(data.updated_at).toJSON() : undefined,
      tags: data.tags ?? undefined,
      license: data.license ?? undefined,
    };
    return result;
  };

  collectMeta = async (filePath: string) => {
    console.log("parseMetaFromFile", filePath);
    const raw = await promisify(fs.readFile)(filePath, "utf-8");
    return this.collectMetaFromRaw(raw);
  };
}
