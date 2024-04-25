import {
  IndexBuilder,
  Resource,
  buildIndex,
} from "../index-building/index-building";
import { TagIndexBuilder } from "../index-building/tag-index-builder";
import {
  articlePostPathMapper,
  defaultChain,
  defaultStaticResourceChain,
  ideaPostPathMapper,
} from "../indexing-settings";
import {
  BaseMeta,
  MetaCollectorChain,
  PostMeta,
  collectMetaForFilePath,
} from "../meta-collecting/meta-collecting";
import {
  BasePathMapping,
  PagePathMapping,
  PathMapper,
  listPathMappings,
} from "../path-mapping/path-mapping";
import {} from "../path-mapping/post-path-mapper";
import { defaultStaticResourcePathMapper } from "../path-mapping/static-resource-path-mapper";

/**
 * A pipeline is a set of rules, organizing the process of indexing resources.
 * It includes three steps:
 *
 * ## path-mapping
 * Mapping file path to page path, defined by the given PathMapper.
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
 * - One type of resource has one unique key and one PathMapper.
 * - One type of resource has many MetaCollectors in order, aka. MetaCollectorChain.
 * - All types of resources share the same set of IndexBuilders in the same order. Could define which type of resource an index should consume.
 * - Resources of a resource type would be indexed by the pagePath. All types of resources type would be indexed by the pagePath aside.
 *
 */

/**
 * Represents a resource chain in the pipeline.
 *
 * @template ResourceType - The type of the resource.
 * @template PathMapping - The type of the path mapping.
 * @template Meta - The type of the meta data.
 */
export type ResourceChain<
  ResourceType extends string,
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta
> = {
  resourceType: ResourceType;
  pathMapper: PathMapper<PathMapping>;
  collectorChain: MetaCollectorChain<Meta>;
};

export const collectResourcesAsMap = async <
  ResourceType extends string,
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta
>({
  pathMapper,
  collectorChain,
}: ResourceChain<ResourceType, PathMapping, Meta>): Promise<
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
 * Represents a map of resources.
 *
 * @template PathMapping - The type of the path mapping.
 * @template Meta - The type of the meta data.
 */
export class ResourceMap<
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta
> {
  // pagePath -> Resource
  private readonly pagePath2Resource: Map<string, Resource<PathMapping, Meta>>;
  constructor(resources: Resource<PathMapping, Meta>[]) {
    this.pagePath2Resource = new Map(
      resources.map((resource) => [resource.pathMapping.pagePath, resource])
    );
  }

  /**
   * Returns an array of page paths in the resource map.
   *
   * @returns An array of page paths.
   */
  listPagePaths = (): string[] => {
    return Array.from(this.pagePath2Resource.keys());
  };

  /**
   * Returns an array of resources in the resource map.
   *
   * @returns An array of resources.
   */
  listResources = (): Readonly<Resource<PathMapping, Meta>>[] => {
    return Array.from(this.pagePath2Resource.values());
  };

  /**
   * Returns an array of path mappings in the resource map.
   *
   * @returns An array of path mappings.
   */
  listPathMappings = (): Readonly<PathMapping>[] => {
    return Array.from(this.listResources(), (resource) => resource.pathMapping);
  };

  /**
   * Returns an array of values for the specified key in the path mapping.
   *
   * @template T - The type of the key.
   * @param key - The key to retrieve the values for.
   * @returns An array of values for the specified key.
   */
  list<T extends keyof PathMapping>(key: T): Readonly<PathMapping[T]>[] {
    return Array.from(
      this.listResources(),
      (resource) => resource.pathMapping[key]
    );
  }

  /**
   * Returns the resource for the specified page path.
   *
   * @param pagePath - The page path to retrieve the resource for.
   * @returns The resource for the specified page path.
   * @throws An error if the resource is not found for the specified page path.
   */
  pagePathToResource = (
    pagePath: string
  ): Readonly<Resource<PathMapping, Meta>> => {
    const resource = this.pagePath2Resource.get(pagePath);
    if (!resource) {
      throw new Error(`Resource not found for path: ${pagePath}`);
    }
    return resource;
  };

  /**
   * Returns the value for the specified key in the path mapping for the specified page path.
   *
   * @template T - The type of the key.
   * @param key - The key to retrieve the value for.
   * @param pagePath - The page path to retrieve the value for.
   * @returns The value for the specified key in the path mapping.
   */
  pagePathTo = <T extends keyof PathMapping>(
    key: T,
    pagePath: string
  ): PathMapping[T] => {
    return this.pagePathToResource(pagePath).pathMapping[key];
  };

  /**
   * Returns the meta data for the specified page path.
   *
   * @param pagePath - The page path to retrieve the meta data for.
   * @returns The meta data for the specified page path.
   */
  pagePathToMeta = (pagePath: string): Meta => {
    return this.pagePathToResource(pagePath).meta;
  };
}

/**
 * Builds the index from a list of resource maps.
 *
 * @param resourceMapsWithResourceType - An array of tuples containing the resource type and the resource map.
 * @param indexBuilder - The index builder.
 * @returns The built index.
 */
export const buildIndexFromResourceMaps = async <
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta,
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

/**
 * Represents a list of resource chains. Useful for extending as a tuple.
 */
type ResourceChainListBase = readonly ResourceChain<string, any, any>[];

/**
 * Represents a type that combines an index builder and a list of handleable resources.
 *
 * @template ResourceChainList - The type of the resource chain list.
 * @template IndexBuilderImpl - The type of the index builder implementation.
 */
type IndexBuilderWithHandleResources<
  ResourceChainList extends ResourceChainListBase,
  IndexBuilderImpl extends IndexBuilder<any, any, any, any>
> = {
  builder: IndexBuilderImpl;
  handleResources: IndexBuilderImpl extends IndexBuilder<
    infer PathMapping_IndexType extends BasePathMapping,
    infer Meta_IndexType extends BaseMeta,
    any,
    any
  >
    ? ResourceChainList[number] extends infer UnionedResourceChain
      ? Extract<
          UnionedResourceChain,
          {
            pathMapper: PathMapper<PathMapping_IndexType>;
            collectorChain: { defaultMeta: Meta_IndexType };
          }
        > extends infer HandleableResourceChain
        ? (HandleableResourceChain extends ResourceChain<
            infer HandleResourceType,
            any,
            any
          >
            ? HandleResourceType
            : never)[]
        : never
      : never
    : never;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////

const staticResource: Resource<BasePathMapping, BaseMeta> = {
  pathMapping: {
    pagePath: "/",
    filePath: "/",
  },
  meta: {},
};

const articleResource: Resource<PagePathMapping, PostMeta> = {
  pathMapping: {
    filePath: "/",
    pagePath: "/",
    slug: "/",
  },
  meta: {
    title: "title",
    tags: ["tag1", "tag2"],
    content: "content",
    abstract: "abstract",
    created_at: null,
    updated_at: null,
    license: false,
    length: 0,
  },
};

const articleChain: ResourceChain<"article", PagePathMapping, PostMeta> = {
  resourceType: "article",
  pathMapper: articlePostPathMapper(),
  collectorChain: defaultChain,
};

const ideaChain: ResourceChain<"idea", PagePathMapping, PostMeta> = {
  resourceType: "idea",
  pathMapper: ideaPostPathMapper(),
  collectorChain: defaultChain,
};

const staticChain: ResourceChain<"staticResource", BasePathMapping, BaseMeta> =
  {
    resourceType: "staticResource",
    pathMapper: defaultStaticResourcePathMapper(),
    collectorChain: defaultStaticResourceChain,
  };
const pagePathBaseMetaResourceChain: ResourceChain<
  "pagePathBaseMeta",
  PagePathMapping,
  BaseMeta
> = {
  resourceType: "pagePathBaseMeta",
  pathMapper: articlePostPathMapper(),
  collectorChain: defaultStaticResourceChain,
};
const basePathPostMetaResourceChain: ResourceChain<
  "basePathPostMeta",
  BasePathMapping,
  PostMeta
> = {
  resourceType: "basePathPostMeta",
  pathMapper: articlePostPathMapper(),
  collectorChain: defaultChain,
};

const resourceChains = [articleChain, ideaChain, staticChain] as const;

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
  resourceChains: ResourceChain<any, any, any>[];

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

//////////////////////////

const a: IndexBuilderWithHandleResources<
  readonly [
    typeof articleChain,
    typeof ideaChain,
    typeof staticChain,
    typeof pagePathBaseMetaResourceChain
  ],
  TagIndexBuilder
  // AliasIndexBuilder
> = {
  handleResources: ["idea"],
  builder: new TagIndexBuilder(),
  // builder: new AliasIndexBuilder(),
};

////////////
type IndexBuilderListBase<ResourceChainList extends ResourceChainListBase> =
  readonly IndexBuilderWithHandleResources<ResourceChainList, any>[];

type Pipeline<
  ResourceChainList extends ResourceChainListBase,
  IndexBuilderList extends readonly IndexBuilderWithHandleResources<
    ResourceChainList,
    any
  >[]
> = {
  resourceChains: ResourceChainList;
  indexBuilders: IndexBuilderList;
};

const consumePipeline = <
  ResourceChainList extends ResourceChainListBase,
  IndexBuilderList extends IndexBuilderListBase<ResourceChainList>
>(
  param: Pipeline<ResourceChainList, IndexBuilderList>
) => {};

consumePipeline({
  resourceChains: [
    articleChain,
    ideaChain,
    staticChain,
    // pagePathBaseMetaResourceChain,
    // basePathPostMetaResourceChain,
  ],
  indexBuilders: [
    {
      handleResources: ["idea"],
      builder: new TagIndexBuilder(),
    },
    {
      handleResources: ["idea"],
      builder: new TagIndexBuilder(),
    },
    {
      handleResources: [
        "idea",
        "article",
        // "pagePathBaseMeta",
        "staticResource",
      ],
      builder: new TagIndexBuilder(),
    },
  ],
});

////////////

type Test1 = ResourceChain<
  "article",
  PagePathMapping,
  PostMeta
> extends ResourceChain<"article", BasePathMapping, BaseMeta>
  ? true
  : false;

type Test2 = PathMapper<PagePathMapping> extends PathMapper<BasePathMapping>
  ? true
  : false;

type Test3 = MetaCollectorChain<PostMeta> extends MetaCollectorChain<BaseMeta>
  ? true
  : false;

type Test4 = ResourceChain<
  "article",
  PagePathMapping,
  PostMeta
> extends ResourceChain<"article", infer PathMapping, infer Meta>
  ? PathMapping extends PagePathMapping
    ? Meta extends PostMeta
      ? true
      : false
    : "PathMapping is not PagePathMapping"
  : never;

type Test5 = ResourceChain<"article", PagePathMapping, PostMeta> extends {
  pathMapper: PathMapper<BasePathMapping>;
}
  ? true
  : false;

type Test6 =
  | ResourceChain<"article", PagePathMapping, PostMeta>
  | ResourceChain<"idea", PagePathMapping, PostMeta>
  | ResourceChain<"static", BasePathMapping, BaseMeta> extends {
  pathMapper: PathMapper<PagePathMapping>;
}
  ? true
  : false;
type Test7 = Extract<
  | ResourceChain<"article", PagePathMapping, PostMeta>
  | ResourceChain<"idea", PagePathMapping, PostMeta>
  | ResourceChain<"static", BasePathMapping, BaseMeta>,
  { pathMapper: PathMapper<PagePathMapping> }
>;
// type Pipeline<ResourceChainList extends ResourceChainListBase> = {
//   resourceChains: ResourceChainsByKey<ResourceChainList>;
//   indexBuilders: IndexBuilderWithHandleResources<
//     ResourceChainList,
//     keyof ResourceChainsByKey<ResourceChainList>,
//     any,
//     any
//   >[];
// };
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
