import glob from "glob";
import { promisify } from "util";
import { CONTENT_DIR } from "../../../utils/env-var";
import { WikiPathMapping } from "../../types/indexing";
import { lastSlugIsIndex } from "../utils/wiki-utils";
import { PathMapper } from "./path-mapping";

export type WikiPathMapperProps = {
  fileGlobPattern: string; // e.g. "public/content/testwiki/**/*.md*"
  pathPrefix: string; // e.g. "/testwiki"
};

/**
 * WikiPathMapper is a PathMapper for mapping the wiki pages.
 * It will parse the slug from the filename and concatenate it with the path prefix as the page path.
 */
export class WikiPathMapper implements PathMapper<WikiPathMapping> {
  private readonly fileGlobPattern: string;
  private readonly pathPrefix: string;

  constructor({ fileGlobPattern, pathPrefix }: WikiPathMapperProps) {
    this.fileGlobPattern = fileGlobPattern;
    this.pathPrefix = pathPrefix;
  }

  listFilePaths = async () => {
    return await promisify(glob)(this.fileGlobPattern);
  };

  /**
   * Convert the file path to the path mapping.
   *
   * - public/content/testwiki/page1/subpage1.md -> /testwiki/page1/subpage1
   * - public/content/testwiki/page1.md -> /testwiki/page1
   * - public/content/testwiki/page1/index.md -> /testwiki/page1
   * - public/content/testwiki/01-page1.md -> /testwiki/page1
   * - public/content/testwiki/index.md -> /testwiki
   *
   * @param filePath - The file path to convert.
   * @returns The path mapping.
   */
  filePath2PathMapping = (filePath: string) => {
    const filePurePath = filePath.startsWith(CONTENT_DIR)
      ? filePath.slice(CONTENT_DIR.length)
      : filePath; // /testwiki/page1.md
    const fileSlugPath = filePurePath.startsWith(this.pathPrefix)
      ? filePurePath.slice(this.pathPrefix.length)
      : filePurePath; // /page1.md
    // slugArray different with slugs: when for root index, it is []
    let slugArray: string[] = fileSlugPath
      .split("/")
      .filter((slug) => slug !== ""); // [page1.md]
    // remove the index.md(x) from the slugs
    if (lastSlugIsIndex(slugArray)) {
      slugArray.pop();
    }
    slugArray = slugArray.map((slug) => slug.replace(/\.mdx?$/, "")); // [page1.md] -> [page1]
    slugArray = slugArray.map((slug) => slug.replace(/^\d+-\s*/, "")); // [01-page1,01-subpage1.md] -> [page1,subpage1]

    const slugs: string[] = slugArray || [];

    const pagePath = this.slugsToPagePath(slugs);
    return {
      filePath,
      pagePath,
      slugs,
    };
  };

  slugsToPagePath = (slugs: string[]) => {
    if (slugs.length === 0) {
      return this.pathPrefix;
    }
    return `${this.pathPrefix}/${slugs.join("/")}`;
  };
}
