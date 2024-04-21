import glob from "glob";
import path from "path";
import { promisify } from "util";
import { PagePathMapping, PathMapper } from "./path-mapping";

export type PostPathMapperProps = {
  fileGlobPattern: string;
  slugFromFilename: (filename: string) => string | undefined;
  pathPrefix: string;
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
    return await promisify(glob)(this.fileGlobPattern);
  };

  filePath2PathMapping = (filePath: string) => {
    const filename = path.basename(filePath, path.extname(filePath));
    const slug = this.slugFromFilename(filename);
    if (!slug) {
      throw new Error(`Invalid slug: ${slug}`);
    }
    const pagePath = `${this.pathPrefix}${slug}`;
    return { filePath, pagePath, slug };
  };
}
