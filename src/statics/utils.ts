import dayjs from "dayjs";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

const slugWithoutPrefixRegex = /(\d*-)*(.*)/;
export const getSlugFromFile = (file: string) => {
  const filename = path.basename(file, path.extname(file));
  const slug = filename.match(slugWithoutPrefixRegex)?.[2];
  if (!slug) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  return slug;
};

const postPathPrefix = "/posts/";
export const getPathFromSlug = (path: string) => {
  return postPathPrefix + path;
};

export type PostMeta = {
  content: string;
  title: string;
  abstract: string;
  length: number;
  created_at: string;
  updated_at?: string;
  tags: string[];
  license: boolean;
};

// export for test
export const parseMetaFromRaw = (raw: string) => {
  const { data, content } = matter(raw);
  const result: PostMeta = {
    content,
    title: data.title,
    abstract: content
      .split("\n")
      .filter((line) => !line.startsWith("#"))
      .filter((line) => line.trim() !== "")
      .slice(0, 3)
      .join("\n"),
    length: content.split("\n").length,
    created_at: dayjs(data.created_at).toJSON(),
    updated_at: data.updated_at ? dayjs(data.updated_at).toJSON() : undefined,
    tags: data.tags ?? [],
    license: data.license ?? false,
  };
  return result;
};

export const parseMetaFromFile = (file: string) => {
  console.log("parseMetaFromFile", file);
  const raw = fs.readFileSync(file, "utf-8");
  return parseMetaFromRaw(raw);
};
