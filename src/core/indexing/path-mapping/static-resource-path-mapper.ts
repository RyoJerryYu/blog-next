import glob from "glob";
import { PathMapper, ResourcePathMapping } from "./path-mapping";

export type StaticResourcePathMapperProps = {
  fileGlobPattern: string; // e.g. "public/content/**/*.*"
  filePathPrefix: string; // e.g. "public"
};

/**
 * StaticResourcePathMapper is a PathMapper behaves like what next.js does for static resources,
 * mapping the file path to the page path.
 *
 * So it would simply remove the file path prefix and use the rest as the page path.
 */
export class StaticResourcePathMapper
  implements PathMapper<ResourcePathMapping>
{
  private readonly fileGlobPattern: string;
  private readonly filePathPrefix: string;

  constructor({
    fileGlobPattern,
    filePathPrefix,
  }: StaticResourcePathMapperProps) {
    this.fileGlobPattern = fileGlobPattern;
    this.filePathPrefix = filePathPrefix;
  }

  listFilePaths = () => {
    return glob.sync(this.fileGlobPattern);
  };

  filePath2PathMapping = (filePath: string) => {
    const pagePath = filePath.replace(this.filePathPrefix, "");
    return { filePath, pagePath };
  };
}

/**
 * A default StaticResourcePathMapper for next.js static resources
 * "public/content/abc/def.jpg" -> "/content/abc/def.jpg"
 */
export function defaultStaticResourcePathMapper() {
  return new StaticResourcePathMapper({
    fileGlobPattern: "public/content/**/*.*",
    filePathPrefix: "public",
  });
}
