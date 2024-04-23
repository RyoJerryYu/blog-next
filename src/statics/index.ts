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
import { Resource } from "@/core/indexing/index-building/index-building";
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
  defaultStaticResourceChain,
  devReloadingChain,
  ideaPostPathMapper,
} from "@/core/indexing/indexing-settings";
import {
  PostMeta,
  collectMetaForFilePath,
} from "@/core/indexing/meta-collecting/meta-collecting";
import { PagePathMapping } from "@/core/indexing/path-mapping/path-mapping";
import { defaultStaticResourcePathMapper } from "@/core/indexing/path-mapping/static-resource-path-mapper";
import {
  ResourceMap,
  buildIndexFromResourceMaps,
  collectResourcesAsMap,
} from "@/core/indexing/pipeline/pipeline";

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
  const articleResourceMap = await collectResourcesAsMap({
    pathMapper: articlePostPathMapper(),
    collectorChain: defaultChain,
  });
  const ideaResourceMap = await collectResourcesAsMap({
    pathMapper: ideaPostPathMapper(),
    collectorChain: defaultChain,
  });
  const staticResourceMap = await collectResourcesAsMap({
    pathMapper: defaultStaticResourcePathMapper(),
    collectorChain: defaultStaticResourceChain,
  });

  const tagIndex = await buildIndexFromResourceMaps(
    [
      ["articles", articleResourceMap],
      ["ideas", ideaResourceMap],
    ],
    new TagIndexBuilder()
  );

  const aliasIndex = await buildIndexFromResourceMaps(
    [
      ["articles", articleResourceMap],
      ["ideas", ideaResourceMap],
      ["staticResources", staticResourceMap],
    ],
    new AliasIndexBuilder()
  );
  const clipData = await buildIndexFromResourceMaps(
    [],
    new ClipDataIndexBuilder()
  );

  const prevNextIndex = await buildIndexFromResourceMaps(
    [
      ["articles", articleResourceMap],
      ["ideas", ideaResourceMap],
    ],
    new PrevNextIndexBuilder()
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
