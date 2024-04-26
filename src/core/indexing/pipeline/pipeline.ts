import { BaseMeta, BasePathMapping } from "../../types/indexing";
import {
  IndexBuilder,
  Resource,
  buildIndex,
} from "../index-building/index-building";
import {
  MetaCollectorChain,
  collectMetaForFilePath,
} from "../meta-collecting/meta-collecting";
import { PathMapper, listPathMappings } from "../path-mapping/path-mapping";
import {} from "../path-mapping/post-path-mapper";

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

// TODO better type definition
type PipelineResult<
  ResourceChainList extends ResourceChainListBase,
  IndexBuilderList extends readonly IndexBuilderWithHandleResources<
    ResourceChainList,
    any
  >[]
> = {
  resourceTypeMap: Map<string, string>;
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
  pipline: Pipeline<ResourceChainList, IndexBuilderList>
) => {
  // Collect resources
  const resourcePool: { [key: string]: ResourceMap<any, any> } = {};
  for (let [key, chain] of Object.entries(pipline.resourceChains)) {
    resourcePool[key] = await collectResourcesAsMap(chain);
  }

  // Build indexes
  const indexPool: { [key: string]: any } = {};
  for (let { handleResources, builder } of pipline.indexBuilders) {
    const resourceMaps: [string, ResourceMap<any, any>][] = handleResources.map(
      (key) => [key, resourcePool[key]]
    );
    const index = await buildIndexFromResourceMaps(resourceMaps, builder);
    indexPool[builder.key] = index;
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
