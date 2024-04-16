/**
 * This is a singleton module that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */

import {
  PostPathMapper,
  articlePostPathMapper,
  ideaPostPathMapper,
} from "@/core/indexing/path-mapping/post-path-mapper";
import dayjs from "dayjs";
import {
  AliasIndex,
  AliasIndexBuilder,
  listAllStaticFiles,
} from "./alias-index";
import { ClipData, loadClipData } from "./data";
import { mergeGitMeta, mergeMockGitMeta } from "./git-meta";
import { PostMeta, StaticsLoader } from "./loader";
import { TagIndex, TagIndexBuilder } from "./tag-index";

export type Post = {
  slug: string;
  filePath: string; // start with slash
  pagePath: string; // start with slash
  mediaDir: string;
  meta: PostMeta;
};
export type PrevNextInfo = {
  prevInfo: {
    slug: string;
    title: string;
    path: string;
  } | null;
  nextInfo: {
    slug: string;
    title: string;
    path: string;
  } | null;
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
  cache: Post[]; // posts in order
  index: Map<string, number>; // map<slug, index>
  constructor(c: Post[]) {
    this.cache = c;
    this.index = new Map();
    for (let i = 0; i < c.length; i++) {
      this.index.set(c[i].slug, i);
    }
  }

  getSlugs = () => {
    return Array.from(this.index.keys());
  };
  slugToFile = (slug: string) => {
    return this.slugToPost(slug).filePath;
  };
  slugToMediaDir = (slug: string) => {
    return this.slugToPost(slug).mediaDir;
  };
  slugToPath = (slug: string) => {
    return this.slugToPost(slug).pagePath;
  };
  slugToMeta = (slug: string) => {
    return this.slugToPost(slug)!.meta;
  };
  slugToPrevNextInfo = (slug: string) => {
    const index = this.index.get(slug);
    if (index === undefined || index < 0 || index >= this.cache.length) {
      throw new Error(`Invalid slug: ${slug}`);
    }
    const resInfo: PrevNextInfo = {
      prevInfo: null,
      nextInfo: null,
    };
    if (index !== 0) {
      const prevPost = this.cache[index - 1];
      resInfo.prevInfo = {
        slug: prevPost.slug,
        title: prevPost.meta.title,
        path: prevPost.pagePath,
      };
    }
    if (index !== this.cache.length - 1) {
      const nextPost = this.cache[index + 1];
      resInfo.nextInfo = {
        slug: nextPost.slug,
        title: nextPost.meta.title,
        path: nextPost.pagePath,
      };
    }
    return resInfo;
  };
  slugToPost = (slug: string) => {
    const index = this.index.get(slug);
    if (index === undefined || index < 0 || index >= this.cache.length) {
      throw new Error(`Invalid slug: ${slug}`);
    }
    return this.cache[index];
  };
}

/**
 * create a cache of static files
 * This function has no side effect,
 * but it is very slow.
 */
const loadPostCache = async (pathMapper: PostPathMapper) => {
  const post: Post[] = [];
  const slugCache: Set<string> = new Set();
  const loader = new StaticsLoader();
  const filePaths = pathMapper.listFilePaths();
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    const { slug, pagePath } = pathMapper.filePath2PathMapping(filePath);
    if (slugCache.has(slug)) {
      throw new Error(`Duplicate slug: ${slug}`);
    }
    const mediaDir = loader.getMediaDirFromFile(filePath);
    let meta = loader.parseMetaFromFile(filePath);
    meta = await mergeGitMeta(filePath, meta);
    post.push({ slug, filePath, mediaDir, pagePath, meta });
  }
  post.sort((a, b) => {
    return dayjs(a.meta.created_at).isBefore(b.meta.created_at) ? 1 : -1;
  });
  return new PostCache(post);
};

/**
 * Build a tag index (map<tagParam,slugs[]>) from a post cache.
 * This function has no side effects too.
 */
const buildTagIndex = (articleCache: PostCache, ideaCache: PostCache) => {
  const tagIndexBuilder = new TagIndexBuilder();

  const addPostSlugs = (postCache: PostCache, postType: "article" | "idea") => {
    postCache.getSlugs().forEach((slug) => {
      const meta = postCache.slugToMeta(slug);
      meta.tags.forEach((tag) => {
        tagIndexBuilder.addPostSlug(tag, postType, slug);
      });
    });
  };

  addPostSlugs(articleCache, "article");
  addPostSlugs(ideaCache, "idea");
  return tagIndexBuilder.build();
};
/**
 * Build a alias index from a post cache.
 * Mainly used for
 * This function has no side effects too.
 */
const buildAliasIndex = (articleCache: PostCache, ideaCache: PostCache) => {
  const aliasIndexBuilder = new AliasIndexBuilder();
  const addPostAliases = (postCache: PostCache) => {
    postCache.getSlugs().forEach((slug) => {
      const path = postCache.slugToPath(slug);
      aliasIndexBuilder.add(path);
    });
  };
  addPostAliases(articleCache);
  addPostAliases(ideaCache);

  const staticFiles = listAllStaticFiles();
  staticFiles.forEach((file) => {
    const path = file.replace("public/", "/");
    console.log(`add static file: ${path}`); // debug

    aliasIndexBuilder.add(path);
  });

  return aliasIndexBuilder.build();
};

/**
 * The module variable as a lazy init singleton
 * Init once, and all types of caches are inited.
 */
type Cache = {
  articleCache: PostCache;
  ideaCache: PostCache;
  tagIndex: TagIndex;
  aliasIndex: AliasIndex;
  clipData: ClipData[];
};
let cache: Cache | undefined = undefined;
export const initCache = async () => {
  if (cache) {
    return cache;
  }
  const articleCache = await loadPostCache(articlePostPathMapper());
  const ideaCache = await loadPostCache(ideaPostPathMapper());
  const tagIndex = buildTagIndex(articleCache, ideaCache);
  const aliasIndex = buildAliasIndex(articleCache, ideaCache);
  const clipData = loadClipData();

  cache = {
    articleCache,
    ideaCache,
    tagIndex,
    aliasIndex,
    clipData,
  };
  return cache;
};

const mustGetCache = () => {
  if (!cache) {
    throw new Error("Cache not initialized");
  }
  return cache;
};

export const articleCache = () => {
  return mustGetCache().articleCache;
};
export const ideaCache = () => {
  return mustGetCache().ideaCache;
};
export const getTagIndex = () => {
  return mustGetCache().tagIndex;
};
export const getAliasIndex = () => {
  return mustGetCache().aliasIndex;
};
export const getClipData = () => {
  return mustGetCache().clipData;
};

// a helper function to get meta from cache or reload when development
export const getPostMetaOrReload = async (cache: PostCache, slug: string) => {
  if (process.env.NODE_ENV === "development") {
    // for reloading in development
    console.log(`reloading on dev ${slug}`);
    const loader = new StaticsLoader();
    let meta = loader.parseMetaFromFile(cache.slugToFile(slug));
    meta = await mergeMockGitMeta(cache.slugToFile(slug), meta);
    return meta;
  } else {
    return cache.slugToMeta(slug);
  }
};
