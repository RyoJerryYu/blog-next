import dayjs from "dayjs";
import fs from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import path from "path";

export function articleLoader() {
  return new StaticsLoader(
    "public/content/articles/*.md*",
    /(\d*-)*(.*)/,
    "/articles/"
  );
}

export function ideaLoader() {
  return new StaticsLoader(
    "public/content/ideas/*.md*",
    /(\d*-)*(.*)/,
    "/ideas/"
  );
}

export type PostMeta = {
  content: string;
  title: string;
  abstract: string;
  length: number;
  created_at: string | null;
  updated_at: string | null;
  tags: string[];
  license: boolean;
};

export class StaticsLoader {
  private readonly fileGlobPattern: string;
  private readonly filenameSlugRegex: RegExp;
  private readonly pathPrefix: string;
  constructor(
    fileGlobPattern: string,
    filenameSlugRegex: RegExp,
    pathPrefix: string
  ) {
    this.fileGlobPattern = fileGlobPattern;
    this.filenameSlugRegex = filenameSlugRegex;
    this.pathPrefix = pathPrefix;
  }

  listFilePaths = () => {
    return glob.sync(this.fileGlobPattern);
  };

  getSlugFromFilePath = (filePath: string) => {
    const filename = path.basename(filePath, path.extname(filePath));
    const slug = filename.match(this.filenameSlugRegex)?.[2];
    if (!slug) {
      throw new Error(`Invalid slug: ${slug}`);
    }
    return slug;
  };

  getMediaDirFromFile = (file: string) => {
    const filename = path.basename(file, path.extname(file));
    let dir = path.join(path.dirname(file), filename);
    dir = path.relative("public/", dir);
    return dir;
  };

  getPagePathFromSlug = (slug: string) => {
    return this.pathPrefix + slug;
  };

  // export for test
  parseMetaFromRaw = (raw: string) => {
    const { data, content } = matter(raw);
    const result: PostMeta = {
      content,
      title: data.title ?? "<No Title>",
      abstract: content
        .split("\n")
        .filter((line) => !line.startsWith("#"))
        .filter((line) => line.trim() !== "")
        .slice(0, 3)
        .join("\n"),
      length: content.split("\n").length,
      created_at: data.created_at ? dayjs(data.created_at).toJSON() : null,
      updated_at: data.updated_at ? dayjs(data.updated_at).toJSON() : null,
      tags: data.tags ?? [],
      license: data.license ?? false,
    };
    return result;
  };

  parseMetaFromFile = (filePath: string) => {
    console.log("parseMetaFromFile", filePath);
    const raw = fs.readFileSync(filePath, "utf-8");
    return this.parseMetaFromRaw(raw);
  };
}
