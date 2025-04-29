/**
 * This is a singleton module that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */
import {
  BaseMeta,
  BasePathMapping,
  MDXMeta,
  PagePathMapping,
  PostMeta,
  WikiPathMapping,
} from "../types/indexing";
import { AliasIndex } from "./index-building/alias-index-builder/alias-index-builder";
import { clipDataFromPool } from "./index-building/clip-data-index-builder/clip-data-index-builder";
import { PrevNextIndex } from "./index-building/prev-next-index-builder/prev-next-index-builder";
import { TagIndex } from "./index-building/tag-index-builder/tag-index-builder";
import { WikiTreeIndex } from "./index-building/wiki-tree-index-builder/wiki-tree-index-builder";
import { devReloadingChain, pipeline } from "./indexing-settings";
import { collectMetaForFilePath } from "./meta-collecting/meta-collecting";
import {
  cacheResourcePool,
  executePipeline,
  PipelineResult,
  ResourcePoolFromCache,
  ResourcePoolFromScratch,
} from "./pipeline/pipeline";
import { getResourceMap } from "./pipeline/resource-pool";

const cacheFilePath = ".cache/resource-pool.json";

/**
 * Whether is in content development mode
 * If is content development mode, the content, metadata, etc. will be reloaded on each request
 * Else, it would load from cache file
 *
 * @returns true if the content is in development mode
 */
function isContentDev() {
  return (
    process.env.NODE_ENV === "development" && process.env.TEST_ENV !== "style"
  );
}

// init resource pool cache
export const initCache = async () => {
  console.log("init cache");

  await cacheResourcePool(cacheFilePath, pipeline());

  console.log("cache inited");
  console.log("Cache saved to", cacheFilePath);
};

/**
 * The module variable as a lazy init singleton
 * Init once, and all types of caches are inited.
 */
let cache: PipelineResult | undefined = undefined;
export const loadCache = async () => {
  if (cache) {
    return cache;
  }
  console.log("loading cache from file");

  const resourcePoolLoader = isContentDev()
    ? new ResourcePoolFromScratch()
    : new ResourcePoolFromCache(cacheFilePath);
  cache = await executePipeline(pipeline(), resourcePoolLoader);
};

const mustGetCache = () => {
  if (!cache) {
    throw new Error("Cache not initialized");
  }
  return cache;
};

export const getResourcePool = () => {
  return mustGetCache().resourcePool;
};

export const articleResourceMap = () => {
  return getResourceMap<PagePathMapping, PostMeta>(
    getResourcePool(),
    "articles"
  );
};
export const ideaResourceMap = () => {
  return getResourceMap<PagePathMapping, PostMeta>(getResourcePool(), "ideas");
};
export const learnFromAiResourceMap = () => {
  return getResourceMap<PagePathMapping, PostMeta>(
    getResourcePool(),
    "learn_from_ai"
  );
};
export const testwikiResourceMap = () => {
  return getResourceMap<WikiPathMapping, PostMeta>(
    getResourcePool(),
    "testwiki"
  );
};
export const getTagIndex = () => {
  return TagIndex.fromPool(mustGetCache().indexPool);
};
export const getAliasIndex = () => {
  return AliasIndex.fromPool(mustGetCache().indexPool);
};
export const getClipData = () => {
  return clipDataFromPool(mustGetCache().indexPool);
};
export const getPrevNextIndex = () => {
  return PrevNextIndex.fromPool(mustGetCache().indexPool);
};
export const getWikiTreeIndex = () => {
  return WikiTreeIndex.fromPool(mustGetCache().indexPool);
};

// a helper function to get resource type from page path
export const mustGetResourceType = (pagePath: string) => {
  const cache = mustGetCache();
  const resourceType = cache.resourceTypeMap.get(pagePath);
  if (!resourceType) {
    throw new Error(`Resource type not found for page path: ${pagePath}`);
  }
  return resourceType;
};

// a helper function to get resource from page path
export const getResource = <
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta
>(
  pagePath: string
) => {
  const resourceType = mustGetResourceType(pagePath);
  const resourceMap = getResourceMap<PathMapping, Meta>(
    mustGetCache().resourcePool,
    resourceType
  );
  return resourceMap.pagePathToResource(pagePath);
};

// a helper function to get meta from cache or reload when development
const getMetaOrReload = async <
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta
>(
  // cache: ResourceMap<PagePathMapping, PostMeta>,
  pagePath: string
) => {
  const cache = mustGetCache();
  const resourceType = mustGetResourceType(pagePath);
  const resourceMap = getResourceMap<PathMapping, Meta>(
    cache.resourcePool,
    resourceType
  );

  if (isContentDev()) {
    // for reloading in development
    console.log(`reloading on dev ${pagePath}`);
    const filePath = resourceMap.pagePathTo("filePath", pagePath);
    const chain = devReloadingChain;
    const meta = await collectMetaForFilePath(chain, filePath);
    return meta;
  } else {
    return resourceMap.pagePathToMeta(pagePath);
  }
};

export const getPostMetaOrReload = async (pagePath: string) => {
  return getMetaOrReload<PagePathMapping, PostMeta & MDXMeta>(pagePath);
};
