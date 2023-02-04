/**
 * This is a singleton module that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */

import { mergeGitMeta } from "./git-meta";
import { articleLoader, ideaLoader, PostMeta, StaticsLoader } from "./loader";

/**
 * Some terms:
 * - file: local location to a file, e.g. `/public/content/posts/xxx.md`
 * - path: url path to a file, e.g. `/posts/xxx`
 * - slug: the last part of a path, e.g. `xxx`
 */

export type Post = {
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
 *
 * (Well, mostly because I don't like the traditional singleton
 * pattern.)
 */
class PostCache {
  // map<slug, page>
  cache: Map<string, Post>;
  constructor(c: Map<string, Post>) {
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
  slugToPost = (slug: string) => {
    return this.cache.get(slug)!;
  };
}

/**
 * create a cache of static files
 * This function has no side effect,
 * but it is very slow.
 */
const loadPostCache = async (loader: StaticsLoader) => {
  const post: Map<string, Post> = new Map();
  const files = loader.listFiles();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = loader.getSlugFromFile(file);
    if (post.has(slug)) {
      throw new Error(`Duplicate slug: ${slug}`);
    }
    const mediaDir = loader.getMediaDirFromFile(file);
    const path = loader.getPathFromSlug(slug);
    let meta = loader.parseMetaFromFile(file);
    meta = await mergeGitMeta(file, meta);
    post.set(slug, { slug, file, mediaDir, path, meta });
  }
  return new PostCache(post);
};

/**
 * The module variable as a lazy init singleton
 * Init once, and all types of caches are inited.
 */
type Cache = {
  articleCache: PostCache;
  ideaCache: PostCache;
};
let cache: Cache | undefined = undefined;
const init = async () => {
  if (cache) {
    return cache;
  }
  const articleCache = await loadPostCache(articleLoader());
  const ideaCache = await loadPostCache(ideaLoader());

  cache = {
    articleCache,
    ideaCache,
  };
  return cache;
};

export const articleCache = async () => {
  return (await init()).articleCache;
};
export const ideaCache = async () => {
  return (await init()).ideaCache;
};
