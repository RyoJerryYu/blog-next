/**
 * This is a singleton module that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */

import { glob } from "glob";
import {
  getMediaDirFromFile,
  getPathFromSlug,
  getSlugFromFile,
  parseGitMetaFromFile,
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

export type Page = {
  slug: string;
  file: string;
  mediaDir: string;
  path: string;
  meta: PostMeta;
};

/**
 * A class holding the cache of all pages,
 * with some helper methods.
 * It is immutable, so that it can be safely shared.
 *
 * Note that PageCache is not a "traditional singleton class",
 * but ensuring singleton by using a module variable.
 * Doing so could provide better testability.
 * (Well, mostly because I don't like that pattern.)
 */
class PageCache {
  // map<slug, page>
  cache: Map<string, Page>;
  constructor(c: Map<string, Page>) {
    this.cache = c;
  }

  getSlugs = () => {
    return Array.from(this.cache.keys());
  };
  slugToFile = (slug: string) => {
    return this.cache.get(slug)!.file;
  };
  slugToMediaDir = (slug: string) => {
    return this.cache.get(slug)!.mediaDir;
  };
  slugToPath = (slug: string) => {
    return this.cache.get(slug)!.path;
  };
  slugToMeta = (slug: string) => {
    return this.cache.get(slug)!.meta;
  };
  slugToPage = (slug: string) => {
    return this.cache.get(slug)!;
  };
}

//
let postCache: PageCache | undefined;
export const initCache = async () => {
  if (postCache) {
    console.log("posts chached");
    return postCache;
  }
  console.log("posts not chached");

  const post: Map<string, Page> = new Map();
  const files = glob.sync("public/content/posts/*.md*");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = getSlugFromFile(file);
    if (post.has(slug)) {
      throw new Error(`Duplicate slug: ${slug}`);
    }
    const mediaDir = getMediaDirFromFile(file);
    const path = getPathFromSlug(slug);
    const meta = parseMetaFromFile(file);
    // if (!meta.created_at || !meta.updated_at) {
    // loading git meta is slow, so only do it when necessary
    const gitMeta = await parseGitMetaFromFile(file);
    if (!meta.created_at) {
      meta.created_at = gitMeta.created_at;
    }
    if (!meta.updated_at && gitMeta.updated_at) {
      meta.updated_at = gitMeta.updated_at;
    }
    // }
    post.set(slug, { slug, file, mediaDir, path, meta });
  }
  postCache = new PageCache(post);
  return postCache;
};
