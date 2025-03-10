/**
 * This is a singleton module that represents the static pages under contents.
 *
 * Should be initialized before using.
 * And ensure: init once, no modification after init.
 */
import { PagePathMapping, PostMeta } from "../types/indexing";
import { AliasIndex } from "./index-building/alias-index-builder/alias-index-builder";
import { clipDataFromPool } from "./index-building/clip-data-index-builder/clip-data-index-builder";
import { PrevNextIndex } from "./index-building/prev-next-index-builder/prev-next-index-builder";
import { TagIndex } from "./index-building/tag-index-builder/tag-index-builder";
import { devReloadingChain, pipeline } from "./indexing-settings";
import { collectMetaForFilePath } from "./meta-collecting/meta-collecting";
import {
  PipelineResult,
  ResourcePoolFromCache,
  ResourcePoolFromScratch,
  cacheResourcePool,
  executePipeline,
} from "./pipeline/pipeline";
import { ResourceMap, getResourceMap } from "./pipeline/resource-pool";

const cacheFilePath = ".cache/resource-pool.json";

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

  const resourcePoolLoader =
    process.env.NODE_ENV === "development"
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

export const articleResourceMap = () => {
  return getResourceMap<PagePathMapping, PostMeta>(
    mustGetCache().resourcePool,
    "articles"
  );
};
export const ideaResourceMap = () => {
  return getResourceMap<PagePathMapping, PostMeta>(
    mustGetCache().resourcePool,
    "ideas"
  );
};
export const learnFromAiResourceMap = () => {
  return getResourceMap<PagePathMapping, PostMeta>(
    mustGetCache().resourcePool,
    "learn_from_ai"
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
