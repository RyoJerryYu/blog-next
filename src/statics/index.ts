/**
 * This is a singleton module that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */

import { glob } from "glob";
import { articleLoader, PostMeta, StaticsLoader } from "./loader";

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
 * (Well, mostly because I don't like that pattern.)
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
  slugToPage = (slug: string) => {
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
    const meta = loader.parseMetaFromFile(file);
    if (!meta.created_at || !meta.updated_at) {
      // loading git meta is slow, so only do it when necessary
      const gitMeta = await loader.parseGitMetaFromFile(file);
      if (!meta.created_at) {
        meta.created_at = gitMeta.created_at;
      }
      if (!meta.updated_at && gitMeta.updated_at) {
        meta.updated_at = gitMeta.updated_at;
      }
    }
    post.set(slug, { slug, file, mediaDir, path, meta });
  }
  return new PostCache(post);
};

// the module variable as the lazy init singleton
type Cache = {
  articleCache: PostCache;
  // ideaCache: PostCache;
};
let cache: Cache | undefined = undefined;
export const initCache = async () => {
  if (cache) {
    console.log("posts chached");
    return cache.articleCache;
  }
  console.log("posts not chached");

  const articleCache = await loadPostCache(articleLoader());

  cache = {
    articleCache,
  };
  return cache.articleCache;
};
