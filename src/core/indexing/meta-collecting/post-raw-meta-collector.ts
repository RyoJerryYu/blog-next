import { PostMeta } from "@/core/types/indexing";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import { promisify } from "util";
import { MetaCollector } from "./meta-collecting";

/**
 * A collector that extracts meta data from raw markdown content.
 * Meta data is information that belongs to a specific resource, never depending on other resources.
 *
 * This collector parses frontmatter and content to extract meta fields like:
 * - content: Raw markdown content without frontmatter
 * - title: From frontmatter title field
 * - abstract: First 3 non-empty, non-heading lines of content
 * - length: Number of lines in content
 * - created_at: From frontmatter, parsed as ISO date string
 * - updated_at: From frontmatter, parsed as ISO date string
 * - tags: From frontmatter tags field
 * - license: From frontmatter license field
 */
export class PostRawMetaCollector implements MetaCollector<PostMeta> {
  /**
   * This collector can handle all meta fields by parsing the raw content.
   */
  handleAbleKeys = (): "*" | (keyof PostMeta)[] => {
    return "*";
  };

  /**
   * Parse meta data from raw markdown content string.
   * Meta data is information that belongs to a specific resource, never depending on other resources.
   * Extracts frontmatter and generates meta fields from content.
   *
   * @param raw The raw markdown content string to parse
   * @returns Partial meta data extracted from the content
   */
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

  /**
   * Collects meta data for a resource from its markdown file.
   * Meta data is information that belongs to a specific resource, never depending on other resources.
   *
   * @param filePath Path to the resource file, relative to project root
   * @returns Promise resolving to partial meta data extracted from the file
   */
  collectMeta = async (filePath: string) => {
    console.log("parseMetaFromFile", filePath);
    const raw = await promisify(fs.readFile)(filePath, "utf-8");
    return this.collectMetaFromRaw(raw);
  };
}
