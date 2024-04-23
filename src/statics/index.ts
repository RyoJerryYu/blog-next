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
  Resource,
  buildIndex,
} from "@/core/indexing/index-building/index-building";
import {
  PrevNextIndex,
  PrevNextIndexBuilder,
} from "@/core/indexing/index-building/prev-next-index-builder";
import {
  TagIndex,
  TagIndexBuilder,
} from "@/core/indexing/index-building/tag-index-builder";
import {
  articlePostPathMapper,
  defaultChain,
  devReloadingChain,
  ideaPostPathMapper,
} from "@/core/indexing/indexing-settings";
import {
  PostMeta,
  ResourceMeta,
  collectMetaForFilePath,
} from "@/core/indexing/meta-collecting/meta-collecting";
import {
  PagePathMapping,
  ResourcePathMapping,
  listPathMappings,
} from "@/core/indexing/path-mapping/path-mapping";
import { PostPathMapper } from "@/core/indexing/path-mapping/post-path-mapper";
import { defaultStaticResourcePathMapper } from "@/core/indexing/path-mapping/static-resource-path-mapper";
import { ResourceMap } from "@/core/indexing/pipeline/pipeline";

export type Post = {
  slug: string;
  filePath: string; // start with slash
  pagePath: string; // start with slash
  mediaDir: string;
  meta: PostMeta;
};

/**
 * Temp function to convert a resource to a post
 */
export const resourceToPost = (
  resource: Resource<PagePathMapping, PostMeta>
): Post => {
  return {
    slug: resource.pathMapping.slug,
    filePath: resource.pathMapping.filePath,
    pagePath: resource.pathMapping.pagePath,
    mediaDir: "",
    meta: resource.meta,
  };
};

/**
 * create a cache of static files
 * This function has no side effect,
 * but it is very slow.
 */
const loadPostCache = async (pathMapper: PostPathMapper) => {
  const post: Resource<PagePathMapping, PostMeta>[] = [];
  const pathMappings = await listPathMappings(pathMapper);
  const chain = defaultChain;
  for (let i = 0; i < pathMappings.length; i++) {
    const { filePath } = pathMappings[i];
    const meta = await collectMetaForFilePath(chain, filePath);
    post.push({
      pathMapping: pathMappings[i],
      meta: meta,
    });
  }
  return new ResourceMap(post);
};

/**
 * Build a tag index (map<tagParam,slugs[]>) from a post cache.
 * This function has no side effects too.
 */
const buildTagIndex = async (
  articleCache: ResourceMap<PagePathMapping, PostMeta>,
  ideaCache: ResourceMap<PagePathMapping, PostMeta>
) => {
  const resources = {
    articles: articleCache.listResources(),
    ideas: ideaCache.listResources(),
  };

  const tagIndexBuilder = new TagIndexBuilder();
  return await buildIndex(resources, tagIndexBuilder);
};
/**
 * Build a alias index from a post cache.
 * Mainly used for
 * This function has no side effects too.
 */
const buildAliasIndex = async (
  articleCache: ResourceMap<PagePathMapping, PostMeta>,
  ideaCache: ResourceMap<PagePathMapping, PostMeta>
) => {
  const staticResourcePathMapping = await listPathMappings(
    defaultStaticResourcePathMapper()
  );
  const staticResources = staticResourcePathMapping.map((mapping) => {
    return {
      pathMapping: mapping,
      meta: {},
    };
  });

  const resources: {
    [key in string]: Resource<ResourcePathMapping, ResourceMeta>[];
  } = {
    articles: articleCache.listResources(),
    ideas: ideaCache.listResources(),
    staticResources: staticResources,
  };

  const aliasIndexBuilder = new AliasIndexBuilder();
  return await buildIndex(resources, aliasIndexBuilder);
};

const buildPrevNextIndex = async (
  articleCache: ResourceMap<PagePathMapping, PostMeta>,
  ideaCache: ResourceMap<PagePathMapping, PostMeta>
) => {
  const resources = {
    articles: articleCache.listResources(),
    ideas: ideaCache.listResources(),
  };

  const prevNextIndexBuilder = new PrevNextIndexBuilder();
  return await buildIndex(resources, prevNextIndexBuilder);
};

/**
 * The module variable as a lazy init singleton
 * Init once, and all types of caches are inited.
 */
type Cache = {
  articleResourceMap: ResourceMap<PagePathMapping, PostMeta>;
  ideaResourceMap: ResourceMap<PagePathMapping, PostMeta>;
  tagIndex: TagIndex;
  aliasIndex: AliasIndex;
  clipData: ClipData[];
  prevNexxtIndex: PrevNextIndex;
};
let cache: Cache | undefined = undefined;
export const initCache = async () => {
  if (cache) {
    return cache;
  }
  const articleResourceMap = await loadPostCache(articlePostPathMapper());
  const ideaResourceMap = await loadPostCache(ideaPostPathMapper());
  const tagIndex = await buildTagIndex(articleResourceMap, ideaResourceMap);
  const aliasIndex = await buildAliasIndex(articleResourceMap, ideaResourceMap);
  const clipDataIndexBuilder = new ClipDataIndexBuilder();
  const clipData = await buildIndex({}, clipDataIndexBuilder);
  const prevNextIndex = await buildPrevNextIndex(
    articleResourceMap,
    ideaResourceMap
  );

  cache = {
    articleResourceMap: articleResourceMap,
    ideaResourceMap: ideaResourceMap,
    tagIndex: tagIndex.tag,
    aliasIndex: aliasIndex.alias,
    clipData: clipData.clipData,
    prevNexxtIndex: prevNextIndex.prevNext,
  };
  return cache;
};

const mustGetCache = () => {
  if (!cache) {
    throw new Error("Cache not initialized");
  }
  return cache;
};

export const articleResourceMap = () => {
  return mustGetCache().articleResourceMap;
};
export const ideaResourceMap = () => {
  return mustGetCache().ideaResourceMap;
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
export const getPrevNextIndex = () => {
  return mustGetCache().prevNexxtIndex;
};

// a helper function to get meta from cache or reload when development
export const getPostMetaOrReload = async (
  cache: ResourceMap<PagePathMapping, PostMeta>,
  pagePath: string
) => {
  if (process.env.NODE_ENV === "development") {
    // for reloading in development
    console.log(`reloading on dev ${pagePath}`);
    const filePath = cache.pagePathTo("filePath", pagePath);
    const chain = devReloadingChain;
    const meta = await collectMetaForFilePath(chain, filePath);
    return meta;
  } else {
    return cache.pagePathToMeta(pagePath);
  }
};
