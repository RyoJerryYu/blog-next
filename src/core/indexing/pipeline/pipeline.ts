import fs from "fs/promises";
import path from "path";
import { BaseMeta, BasePathMapping, Resource } from "../../types/indexing";
import { IndexBuilder, buildIndex } from "../index-building/index-building";
import { PathMapper } from "../path-mapping/path-mapping";
import {} from "../path-mapping/post-path-mapper";
import {
  ResourceChain,
  ResourceMap,
  collectResourcesAsMap,
} from "./resource-pool";

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

/**
 * Represents a list of index builders with handleable resources.
 * Useful for extending as a tuple.
 */
type IndexBuilderListBase<ResourceChainList extends ResourceChainListBase> =
  readonly IndexBuilderWithHandleResources<ResourceChainList, any>[];

/**
 * Represents a pipeline.
 */
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

export type PipelineResult = {
  resourceTypeMap: Map<string, string>; // <pagePath, resourceType>
  resourcePool: {
    [key: string]: ResourceMap<any, any>;
  };
  indexPool: {
    [key: string]: any;
  };
};

/**
 * Executes the pipeline.
 * - Collect each type of resources as resource maps.
 * - Build indexes from the resource maps.
 */
export const executePipeline = async <
  ResourceChainList extends ResourceChainListBase,
  IndexBuilderList extends readonly IndexBuilderWithHandleResources<
    ResourceChainList,
    any
  >[]
>(
  pipline: Pipeline<ResourceChainList, IndexBuilderList>,
  resourcePoolLoader: ResourcePoolLoader<ResourceChainList, IndexBuilderList>
): Promise<PipelineResult> => {
  // Collect resources
  const resourcePool: { [key: string]: ResourceMap<any, any> } =
    await resourcePoolLoader.loadResourcePool(pipline);

  // Build indexes
  let indexPool: { [key: string]: any } = {};
  for (let { handleResources, builder } of pipline.indexBuilders) {
    const resourceMaps: [string, Resource<any, any>[]][] = handleResources.map(
      (key) => [key, resourcePool[key].listResources()]
    );
    const index = await buildIndex(resourceMaps, builder);
    indexPool = { ...indexPool, ...index };
  }

  // a map for finding resource type by pagePath
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

interface ResourcePoolLoader<
  ResourceChainList extends ResourceChainListBase,
  IndexBuilderList extends readonly IndexBuilderWithHandleResources<
    ResourceChainList,
    any
  >[]
> {
  loadResourcePool: (
    pipeline: Pipeline<ResourceChainList, IndexBuilderList>
  ) => Promise<{ [key: string]: ResourceMap<any, any> }>;
}

export class ResourcePoolFromScratch implements ResourcePoolLoader<any, any> {
  async loadResourcePool(
    pipeline: Pipeline<any, any>
  ): Promise<{ [key: string]: ResourceMap<any, any> }> {
    const resourcePool: { [key: string]: ResourceMap<any, any> } = {};
    for (let chain of pipeline.resourceChains) {
      resourcePool[chain.resourceType] = await collectResourcesAsMap(chain);
    }
    return resourcePool;
  }
}

export class ResourcePoolFromCache implements ResourcePoolLoader<any, any> {
  constructor(private readonly cacheFileName: string) {}

  async loadResourcePool(
    pipeline: Pipeline<any, any>
  ): Promise<{ [key: string]: ResourceMap<any, any> }> {
    const resourcePoolPersist = JSON.parse(
      await fs.readFile(this.cacheFileName, "utf8")
    );

    const resourcePool: { [key: string]: ResourceMap<any, any> } = {};
    for (let resourceType of Object.keys(resourcePoolPersist)) {
      resourcePool[resourceType] = new ResourceMap(
        resourcePoolPersist[resourceType]
      );
    }
    return resourcePool;
  }
}

export const cacheResourcePool = async <
  ResourceChainList extends ResourceChainListBase,
  IndexBuilderList extends readonly IndexBuilderWithHandleResources<
    ResourceChainList,
    any
  >[]
>(
  cacheFilePath: string,
  pipline: Pipeline<ResourceChainList, IndexBuilderList>
) => {
  const resourcePool = await new ResourcePoolFromScratch().loadResourcePool(
    pipline
  );

  const persistResourcePool = Object.fromEntries(
    Object.entries(resourcePool).map(([key, value]) => [key, value.persist()])
  );

  // make dir
  const cacheDir = path.dirname(cacheFilePath);
  await fs.mkdir(cacheDir, { recursive: true });

  await fs.writeFile(
    cacheFilePath,
    JSON.stringify(persistResourcePool, null, 2),
    "utf8"
  );
};
