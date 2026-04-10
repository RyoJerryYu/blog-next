import { BasePathMapping, PostMeta } from "@/core/types/indexing";
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
 * - abstract:
 *   1) frontmatter.abstract if provided
 *   2) if the first non-empty block is an Obsidian abstract callout, use its children text
 *   3) otherwise, first 3 non-empty paragraphs after removing headings and code blocks
 * - length: Number of lines in content
 * - created_at: From frontmatter, parsed as ISO date string
 * - updated_at: From frontmatter, parsed as ISO date string
 * - tags: From frontmatter tags field
 * - license: From frontmatter license field
 */
export class PostRawMetaCollector implements MetaCollector<PostMeta> {
  private readonly calloutSyntax = /^\s*\[!([^\]]+)\](-|\+)? ?(.*)/;

  private extractAbstractCallout = (content: string): string | undefined => {
    const lines = content.split("\n");
    let start = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "") {
        start = i;
        break;
      }
    }
    if (start === -1) {
      return undefined;
    }

    const firstBlock: string[] = [];
    for (let i = start; i < lines.length; i++) {
      if (lines[i].trim() === "") {
        break;
      }
      firstBlock.push(lines[i]);
    }
    if (firstBlock.length === 0) {
      return undefined;
    }

    // First block must be a single blockquote callout block.
    if (firstBlock.some((line) => !/^\s*>/.test(line))) {
      return undefined;
    }

    const unquoted = firstBlock.map((line) => line.replace(/^\s*>\s?/, ""));
    const firstLine = unquoted[0];
    const match = firstLine.match(this.calloutSyntax);
    if (!match) {
      return undefined;
    }
    const calloutType = match[1]?.toLowerCase();
    if (calloutType !== "abstract") {
      return undefined;
    }

    const childrenText = unquoted.slice(1).join("\n").trim();
    return childrenText || undefined;
  };

  private extractParagraphAbstract = (content: string): string | undefined => {
    const lines = content.split("\n");
    const filteredLines: string[] = [];
    let fencedCodeMarker: string | null = null;
    for (const line of lines) {
      const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
      if (fencedCodeMarker) {
        if (fenceMatch && fenceMatch[1][0] === fencedCodeMarker[0]) {
          fencedCodeMarker = null;
        }
        continue;
      }
      if (fenceMatch) {
        fencedCodeMarker = fenceMatch[1];
        continue;
      }
      filteredLines.push(line);
    }

    const headingLineRegex = /^\s{0,3}#{1,6}\s+/;
    const paragraphs = filteredLines
      .join("\n")
      .split(/\n\s*\n+/)
      .map((paragraph) =>
        paragraph
          .split("\n")
          .map((line) => line.trimEnd())
          .filter((line) => line.trim() !== "")
          .filter((line) => !headingLineRegex.test(line))
          .join("\n")
          .trim(),
      )
      .filter((paragraph) => paragraph !== "")
      .slice(0, 3);

    if (paragraphs.length === 0) {
      return undefined;
    }
    return paragraphs.join("\n\n");
  };

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
    const frontmatterAbstract =
      data.abstract !== undefined ? String(data.abstract) : undefined;
    const abstract =
      frontmatterAbstract ??
      this.extractAbstractCallout(content) ??
      this.extractParagraphAbstract(content);

    const result: Partial<PostMeta> = {
      content,
      title: data.title ?? undefined,
      abstract,
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
  collectMeta = async (
    pathMapping: BasePathMapping,
    prevMeta: Partial<PostMeta>
  ): Promise<Partial<PostMeta>> => {
    const filePath = pathMapping.filePath;
    console.log("parseMetaFromFile", filePath);
    const raw = await promisify(fs.readFile)(filePath, "utf-8");
    return this.collectMetaFromRaw(raw);
  };
}
