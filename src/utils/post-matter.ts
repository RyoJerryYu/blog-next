import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import { searchBlogFile } from "./pages";

export type PostMatter = {
  slug: string;
  title: string;
  created_at: string;
  updated_at?: string;
  tags?: string[];
  abstract?: string;
  cover?: string;
};

export const getPostMatter = async (slug: string) => {
  const filePath = searchBlogFile(slug)[0]!;
  const fileRaw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileRaw);

  const result: PostMatter = {
    slug,
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
  };
  return result;
};
