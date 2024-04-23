import {
  IndexBuilder,
  Resource,
  buildIndex,
} from "../index-building/index-building";
import {
  articlePostPathMapper,
  defaultChain,
  defaultStaticResourceChain,
  ideaPostPathMapper,
} from "../indexing-settings";
import {
  MetaCollectorChain,
  PostMeta,
  ResourceMeta,
  collectMetaForFilePath,
} from "../meta-collecting/meta-collecting";
import {
  PagePathMapping,
  PathMapper,
  ResourcePathMapping,
  listPathMappings,
} from "../path-mapping/path-mapping";
import {} from "../path-mapping/post-path-mapper";
import { defaultStaticResourcePathMapper } from "../path-mapping/static-resource-path-mapper";

/**
 * A pipeline is a set of rules, organizing the process of indexing resources.
 * It includes three steps:
 *
 * ## path-mapping
 * Mapping file path to page path, definded by the given PathMapper.
 * Return a list of PathMapping for that type of resource.
 *
 * ## meta-collecting
 * Collecting meta data from file content, defined by the given MetaCollectors.
 * Consume the filePath from PathMapping. Return a partial Meta object.
 * All MetaCollectors would be executed in order.
 * All results would be merged into one final Meta object.
 *
 * > one pair of path mapping and meta is a resource.
 *
 * ## index-building
 * Building index from resources, defined by the given IndexBuilder.
 * Consume the PathMapping and Meta object from the resource.
 * Return a key to index instance.
 * All IndexBuilders results would be merged, and could be accessed by each key.
 *
 * And:
 * - One type of resource have one unique key and one PathMapper.
 * - One type of resource have many MetaCollectors in order, aka. MetaCollectorChain.
 * - All types of resources share the same set of IndexBuilders in same order. Could define which type of resource an index should consume.
 * - Resources of a resource type would be indexed by the pagePath. All types of resources type would be indexed by the pagePath aside.
 *
 */

/**
 * Final
 */
export type ResourceChain<
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
> = {
  pathMapper: PathMapper<PathMapping>;
  collectorChain: MetaCollectorChain<Meta>;
};

export const collectResourcesAsMap = async <
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
>({
  pathMapper,
  collectorChain,
}: ResourceChain<PathMapping, Meta>): Promise<
  ResourceMap<PathMapping, Meta>
> => {
  const pathMappings = await listPathMappings(pathMapper);
  const resources: Resource<PathMapping, Meta>[] = [];
  for (let i = 0; i < pathMappings.length; i++) {
    const pathMapping = pathMappings[i];
    const meta = await collectMetaForFilePath(
      collectorChain,
      pathMapping.filePath
    );
    resources.push({ pathMapping, meta });
  }

  return new ResourceMap(resources);
};

/**
 * A collection for a type of resources.
 * It has a set of methods for list and get resources.
 */
export class ResourceMap<
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
> {
  // pagePath -> Resource
  private readonly pagePath2Resource: Map<string, Resource<PathMapping, Meta>>;
  constructor(resources: Resource<PathMapping, Meta>[]) {
    this.pagePath2Resource = new Map(
      resources.map((resource) => [resource.pathMapping.pagePath, resource])
    );
  }

  listPagePaths = (): string[] => {
    return Array.from(this.pagePath2Resource.keys());
  };
  listResources = (): Readonly<Resource<PathMapping, Meta>>[] => {
    return Array.from(this.pagePath2Resource.values());
  };
  listPathMappings = (): Readonly<PathMapping>[] => {
    return Array.from(this.listResources(), (resource) => resource.pathMapping);
  };
  list<T extends keyof PathMapping>(key: T): Readonly<PathMapping[T]>[] {
    return Array.from(
      this.listResources(),
      (resource) => resource.pathMapping[key]
    );
  }
  listMetas = (): Readonly<Meta>[] => {
    return Array.from(this.listResources(), (resource) => resource.meta);
  };

  pagePathToResource = (
    pagePath: string
  ): Readonly<Resource<PathMapping, Meta>> => {
    const resource = this.pagePath2Resource.get(pagePath);
    if (!resource) {
      throw new Error(`Resource not found for path: ${pagePath}`);
    }
    return resource;
  };
  pagePathTo = <T extends keyof PathMapping>(
    key: T,
    pagePath: string
  ): PathMapping[T] => {
    return this.pagePathToResource(pagePath).pathMapping[key];
  };
  pagePathToMeta = (pagePath: string): Meta => {
    return this.pagePathToResource(pagePath).meta;
  };
}

export const buildIndexFromResourceMaps = async <
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta,
  Index,
  IndexKey extends string
>(
  resourceMapsWithResourceType: [string, ResourceMap<PathMapping, Meta>][], // [resourceType, resourceMap]
  indexBuilder: IndexBuilder<PathMapping, Meta, Index, IndexKey>
) => {
  const resourcesByType: [string, Readonly<Resource<PathMapping, Meta>>[]][] =
    resourceMapsWithResourceType.map(([key, map]) => [
      key,
      map.listResources(),
    ]);
  return await buildIndex(resourcesByType, indexBuilder);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

const pipeline_looks_like = {
  resourceChains: {
    resource_type1: {
      pathMapper: articlePostPathMapper(),
      collectorChain: defaultChain,
    },
    resource_type2: {
      pathMapper: ideaPostPathMapper(),
      collectorChain: defaultChain,
    },
  },
  indexBuilders: [
    {
      handleResources: ["resource_type1"],
      builder: {},
    },
  ],
};
const results_looks_like = {
  resourceTypeMap: {}, // Map<pagePath, ResourceType>
  resourcePool: {
    resource_type1: {}, // Map<pagePath, Resource>
    resource_type2: {}, // Map<pagePath, Resource>
  },
  indexPool: {
    index_type1: {}, // Index
    index_type2: {}, // Index
  },
};

type TempTypePipeline = {
  resourceChains: {
    [key: string]: ResourceChain<any, any>;
  };
  indexBuilders: {
    handleResources: string[];
    builder: any;
  }[];
};

type TempTypeResults = {
  resourceTypeMap: Map<string, string>; // Map<pagePath, ResourceType>
  resourcePool: {
    [key: string]: ResourceMap<any, any>;
  };
  indexPool: {
    [key: string]: any;
  };
};

const executePipeline = async (
  pipline: TempTypePipeline
): Promise<TempTypeResults> => {
  const resourcePool: { [key: string]: ResourceMap<any, any> } = {};
  for (let [key, chain] of Object.entries(pipline.resourceChains)) {
    resourcePool[key] = await collectResourcesAsMap(chain);
  }

  const indexPool: { [key: string]: any } = {};
  for (let { handleResources, builder } of pipline.indexBuilders) {
    // TODO: use resourceMaps in build index directly
    const resources: [string, Resource<any, any>[]][] = handleResources.map(
      (key) => [key, resourcePool[key].listResources()]
    );
    const index = await buildIndex(resources, builder);
    indexPool[builder.key] = index;
  }

  const resourceTypeMap = new Map<string, string>();
  for (let [key, resourceMap] of Object.entries(resourcePool)) {
    for (let pagePath of resourceMap.listPagePaths()) {
      resourceTypeMap.set(pagePath, key);
    }
  }

  return {
    resourceTypeMap,
    resourcePool,
    indexPool,
  };
};

//////////////////////////////////////////////////////////

const staticResource: Resource<ResourcePathMapping, ResourceMeta> = {
  pathMapping: {
    pagePath: "/",
    filePath: "/",
  },
  meta: {},
};

const articlePipeline: ResourceChain<PagePathMapping, PostMeta> = {
  pathMapper: articlePostPathMapper(),
  collectorChain: defaultChain,
};

const ideaPipeline: ResourceChain<PagePathMapping, PostMeta> = {
  pathMapper: ideaPostPathMapper(),
  collectorChain: defaultChain,
};

const staticPipeline: ResourceChain<ResourcePathMapping, ResourceMeta> = {
  pathMapper: defaultStaticResourcePathMapper(),
  collectorChain: defaultStaticResourceChain,
};

type ResourcePipelineListBase = readonly ResourceChain<any, any>[];

const pipelines = [articlePipeline, ideaPipeline, staticPipeline] as const;

// type MergeList<L extends readonly any[]> = L extends readonly [
//   infer First,
//   ...infer Remains
// ]
//   ? First & MergeList<Remains>
//   : {};

// type ResourcePipelineByKey<
//   Key extends string,
//   PathMapping extends ResourcePathMapping,
//   Meta extends ResourceMeta
// > = {
//   [K in Key]: ResourceChain<K, PathMapping, Meta>;
// };

// type ResourcePipelinesMapByKey<
//   ResourcePipelineList extends ResourcePipelineListBase
// > = MergeList<{
//   [I in keyof ResourcePipelineList]: ResourcePipelineList[I] extends ResourceChain<
//     infer Key,
//     infer PathMapping,
//     infer Meta
//   >
//     ? ResourcePipelineByKey<Key, PathMapping, Meta>
//     : never;
// }>;

// const resourcePipelinesMapByKeyExample: ResourcePipelinesMapByKey<
//   typeof pipelines
// > = {
//   article: articlePipeline,
//   idea: ideaPipeline,
//   static: staticPipeline,
// };

// type ResourceCacheByKey<
//   Key extends string,
//   PathMapping extends ResourcePathMapping,
//   Meta extends ResourceMeta
// > = {
//   [K in Key]: ResourceMap<PathMapping, Meta>;
// };

// /**
//  * Type of cache for all types of resources.
//  */
// type SiteCache<ResourcePipelineList extends ResourcePipelineListBase> =
//   MergeList<{
//     [I in keyof ResourcePipelineList]: ResourcePipelineList[I] extends ResourceChain<
//       infer Key,
//       infer PathMapping,
//       infer Meta
//     >
//       ? ResourceCacheByKey<Key, PathMapping, Meta>
//       : never;
//   }>;

// type SiteIndex = { [key: string]: any };

// type SiteUniverse<ResourcePiplineList extends ResourcePipelineListBase> = {
//   resource: SiteCache<ResourcePiplineList>;
//   index: SiteIndex;
// };

// const buildSiteCache = async <
//   ResourcePipelineList extends ResourcePipelineListBase
// >(
//   piplines: ResourcePipelineList
// ): Promise<SiteCache<ResourcePipelineList>> => {
//   const cache: any = {};
//   for (let pipeline of piplines) {
//     const resourceCache = await loadPathMappingAndMeta(pipeline);
//     cache[pipeline.key] = resourceCache;
//   }
//   return cache;
// };
// export type IndexGetter<Index> = (siteUniverse: { index: SiteIndex }) => Index;

// async () => {
//   const cache = await buildSiteCache(pipelines);
//   const articleCache = cache.article;
//   const ideaCache = cache.idea;
//   const staticCache = cache.static;

//   const siteCache = {
//     article: articleCache,
//     idea: ideaCache,
//     static: staticCache,
//   };
// };
