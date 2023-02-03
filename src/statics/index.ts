/**
 * This is a singleton that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */

import { glob } from "glob";
import {
  getPathFromSlug,
  getSlugFromFile,
  parseMetaFromFile,
  PostMeta,
} from "./utils";

/**
 * Some terms:
 * - file: local location to a file, e.g. `/public/content/posts/xxx.md`
 * - path: url path to a file, e.g. `/posts/xxx`
 * - slug: the last part of a path, e.g. `xxx`
 */

const postFileDirs = ["public/content/posts"];

type Page = {
  slug: string;
  file: string;
  path: string;
  matter: PostMeta;
};
const initPages = () => {
  const post: Map<string, Page> = new Map();
  const files = glob.sync("public/content/posts/*.md*");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = getSlugFromFile(file);
    if (post.has(slug)) {
      throw new Error(`Duplicate slug: ${slug}`);
    }
    const path = getPathFromSlug(slug);
    const matter = parseMetaFromFile(file);
    post.set(slug, { slug, file, path, matter });
  }
  return post;
};
// map<slug, file>
const post: Map<string, Page> = initPages();
// console.log(`post:`, post);

export const slugs = () => {
  const slugs = Array.from(post.keys());
  return slugs;
};
export const slugToFile = (slug: string) => {
  const file = post.get(slug)?.file;
  if (!file) {
    throw new Error(`Invalid slug to file: ${slug}`);
  }
  return file;
};
export const slugToPath = (slug: string) => {
  const path = post.get(slug)?.path;
  if (!path) {
    throw new Error(`Invalid slug to path: ${slug}`);
  }
  return path;
};
export const slugToMatter = (slug: string) => {
  const matter = post.get(slug)?.matter;
  if (!matter) {
    throw new Error(`Invalid slug to matter: ${slug}`);
  }
  return matter;
};
