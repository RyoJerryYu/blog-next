import dayjs from "dayjs";
import matter from "gray-matter";
import path from "path";

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
  // should test if content could refresh when dev
  // if not, load it on get static props
  content: string;
  title: string;
  created_at: string;
  updated_at?: string;
  tags?: string[];
  abstract?: string;
  license?: boolean;
};
// return [matter, content]
export const parseMatterFromRaw = (raw: string) => {
  const { data, content } = matter(raw);
  const result: PostMeta = {
    content,
    title: data.title,
    created_at: dayjs(data.created_at).toJSON(),
    updated_at: data.updated_at ? dayjs(data.updated_at).toJSON() : undefined,
    tags: data.tags,
    abstract: content
      .split("\n")
      .filter((line) => !line.startsWith("#"))
      .filter((line) => line.trim() !== "")
      .slice(0, 3)
      .join("\n"),
    license: data.license,
  };
  return result;
};
