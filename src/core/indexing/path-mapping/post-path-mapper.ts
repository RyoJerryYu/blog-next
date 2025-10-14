import { glob } from "fs/promises";
import path from "path";
import { PagePathMapping } from "../../types/indexing";
import { PathMapper } from "./path-mapping";

export type PostPathMapperProps = {
  fileGlobPattern: string; // e.g. "public/content/articles/*.md*"
  slugFromFilename: (filename: string) => string | undefined; // e.g. (filename) => filename.match(/(\d*-)*(.*)/)?.[2]
  pathPrefix: string; // e.g. "/articles/"
};

/**
 * PostPathMapper is a PathMapper for mapping the posts.
 * It will parse the slug from the filename and concatenate it with the path prefix as the page path.
 */
export class PostPathMapper implements PathMapper<PagePathMapping> {
  private readonly fileGlobPattern: string;
  private readonly slugFromFilename: (filename: string) => string | undefined;
  private readonly pathPrefix: string;

  constructor({
    fileGlobPattern,
    slugFromFilename,
    pathPrefix,
  }: PostPathMapperProps) {
    this.fileGlobPattern = fileGlobPattern;
    this.slugFromFilename = slugFromFilename;
    this.pathPrefix = pathPrefix;
  }

  listFilePaths = async () => {
    return await Array.fromAsync(glob(this.fileGlobPattern));
  };

  filePath2PathMapping = (filePath: string) => {
    const filename = path.basename(filePath, path.extname(filePath));
    const slug = this.slugFromFilename(filename);
    if (!slug) {
      throw new Error(`Invalid slug: ${slug}`);
    }
    const pagePath = this.slugToPagePath(slug);
    return { filePath, pagePath, slug };
  };

  slugToPagePath = (slug: string) => {
    return `${this.pathPrefix}${slug}`;
  };
}
