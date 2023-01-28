import path from "path";
import { glob } from "glob";

// as 3b1b, we also define some terms here:

// about contents:
// pages: pages under `/public/content` folder
// post: under `/public/content/posts` folder, which represents a blog post

// file: local location to a file, e.g. `/public/content/posts/2020-01-01-hello-world.md`
// path: url path to a file, e.g. `/posts/2020-01-01-hello-world`
// slug: the last part of a path, e.g. `2020-01-01-hello-world`

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
  const res = glob.sync(`public/content/posts/${slug || "*"}.md`);
  return res;
};

// all blog files to load
export const blogFiles = searchBlogFile();

export type PostProps = {
    slug: string;
};


