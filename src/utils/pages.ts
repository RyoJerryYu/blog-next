import path from "path";
import fs from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

// as 3b1b, we also define some terms here:

// about contents:
// pages: pages under `/public/content` folder
// post: under `/public/content/posts` folder, which represents a blog post

// file: local location to a file, e.g. `/public/content/posts/2020-01-01-hello-world.md`
// path: url path to a file, e.g. `/posts/2020-01-01-hello-world`
// slug: the last part of a path, e.g. `2020-01-01-hello-world`

// parse meta and return structed data from file content
type ParseDataResult = {
  content: string;
  [key: string]: any;
};
export const parseMeta = (rawContent: string): ParseDataResult => {
  let { data, content } = matter(rawContent);

  // There seems to be some sort of caching where the data object
  // is the exact same each time. But we want a fresh copy each time
  // so that we can modify it without affecting the result if `matter`
  // runs on the same file again.
  data = { ...data };

  // put dates in serializable format
  data.date = data.date ? new Date(data.date).toISOString() : null;
  // data.lastMod = new Date(fs.statSync(file).mtime || new Date()).toISOString();
  data.created_at = data.created_at
    ? new Date(data.created_at).toISOString()
    : null;
  data.updated_at = data.updated_at
    ? new Date(data.updated_at).toISOString()
    : null;

  return { content, ...data };
};

export const getSlugFromFile = (file: string) => {
  const filename = path.basename(file, path.extname(file));
  const parentFolderName = path.basename(path.dirname(file));
  if (filename === "index") {
    return parentFolderName;
  }
  return filename;
};

// search the local locations of files by slug,
// return an array of file matches,
// or return all files if slug is not provided
export const searchBlogFile = (slug?: string) => {
  const res = glob.sync(`public/content/posts/${slug || "*"}.md*`);
  return res;
};

// all blog files to load
export const blogFiles = searchBlogFile();
