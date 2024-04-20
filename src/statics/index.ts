/**
 * This is a singleton module that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */

import {
  AliasIndex,
  AliasIndexBuilder,
} from "@/core/indexing/index-building/alias-index-builder";
import {
  ClipData,
  ClipDataIndexBuilder,
} from "@/core/indexing/index-building/clip-data-index-builder";
import {
  TagIndex,
  TagIndexBuilder,
} from "@/core/indexing/index-building/tag-index-builder";
import {
  defaultChain,
  devReloadingChain,
} from "@/core/indexing/indexing-settings";
import {
  PostMeta,
  collectMetaForFilePath,
} from "@/core/indexing/meta-collecting/meta-collecting";
import { listPathMappings } from "@/core/indexing/path-mapping/path-mapping";
import {
  PostPathMapper,
  articlePostPathMapper,
  ideaPostPathMapper,
} from "@/core/indexing/path-mapping/post-path-mapper";
import { defaultStaticResourcePathMapper } from "@/core/indexing/path-mapping/static-resource-path-mapper";
import dayjs from "dayjs";

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
    return this.slugToPost(slug).meta;
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
  const pathMappings = await listPathMappings(pathMapper);
  const chain = defaultChain;
  for (let i = 0; i < pathMappings.length; i++) {
    const { filePath, slug, pagePath } = pathMappings[i];
    const mediaDir = "";
    const meta = await collectMetaForFilePath(chain, filePath);
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
      const path = postCache.slugToPath(slug);
      const file = postCache.slugToFile(slug);
      const meta = postCache.slugToMeta(slug);
      console.log(`add post ${slug}, meta ${JSON.stringify(meta)}`); // debug
      tagIndexBuilder.addResource({
        pathMapping: {
          filePath: file,
          slug,
          pagePath: path,
        },
        meta,
      });
    });
  };

  addPostSlugs(articleCache, "article");
  addPostSlugs(ideaCache, "idea");
  return tagIndexBuilder.buildIndex();
};
/**
 * Build a alias index from a post cache.
 * Mainly used for
 * This function has no side effects too.
 */
const buildAliasIndex = async (
  articleCache: PostCache,
  ideaCache: PostCache
) => {
  const aliasIndexBuilder = new AliasIndexBuilder();
  const addPostAliases = (postCache: PostCache) => {
    postCache.getSlugs().forEach((slug) => {
      const pagePath = postCache.slugToPath(slug);
      const filePath = postCache.slugToFile(slug);
      const meta = postCache.slugToMeta(slug);

      aliasIndexBuilder.addResource({
        pathMapping: {
          filePath,
          pagePath,
        },
        meta,
      });
    });
  };
  addPostAliases(articleCache);
  addPostAliases(ideaCache);

  const staticResourcePathMapping = await listPathMappings(
    defaultStaticResourcePathMapper()
  );
  staticResourcePathMapping.forEach((mapping) => {
    const pagePath = mapping.pagePath;
    console.log(`add static file: ${pagePath}`); // debug

    aliasIndexBuilder.addResource({
      pathMapping: mapping,
      meta: {},
    });
  });

  return aliasIndexBuilder.buildIndex();
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
  const aliasIndex = await buildAliasIndex(articleCache, ideaCache);
  const clipDataIndexBuilder = new ClipDataIndexBuilder();
  const clipData = clipDataIndexBuilder.buildIndex();

  cache = {
    articleCache,
    ideaCache,
    tagIndex: tagIndex.tag,
    aliasIndex: aliasIndex.alias,
    clipData: clipData.clipData,
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
    const filePath = cache.slugToFile(slug);
    const chain = devReloadingChain;
    const meta = await collectMetaForFilePath(chain, filePath);
    return meta;
  } else {
    return cache.slugToMeta(slug);
  }
};
