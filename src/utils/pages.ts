import path from "path";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { glob } from "glob";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code";

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

  return { content, ...data };
};

// make serialized file for mdx renderer
export const parseMdx = async (content: string) => {
  const prettyCodeOpt: Partial<PrettyCodeOptions> = {
    theme: "rose-pine-moon",
    keepBackground: true,
  };
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrettyCode, prettyCodeOpt],
      ],
    },
  });
  return source;
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
  const res = glob.sync(`public/content/posts/${slug || "*"}.md`);
  return res;
};

// all blog files to load
export const blogFiles = searchBlogFile();

export type PostProps = {
  slug: string;
  content: string;
  source: MDXRemoteSerializeResult;
  [key: string]: any;
};

export const getPostProps = async (slug: string): Promise<PostProps> => {
  const filePath = searchBlogFile(slug)[0]!;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const meta = parseMeta(fileContent);
  const source = await parseMdx(meta.content);

  return {
    slug,
    source,
    ...meta,
  };
};
