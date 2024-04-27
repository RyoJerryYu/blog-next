import { BaseMeta, BasePathMapping, Resource } from "@/core/types/indexing";
import {
  MetaCollectorChain,
  collectMetaForFilePath,
} from "../meta-collecting/meta-collecting";
import { PathMapper, listPathMappings } from "../path-mapping/path-mapping";

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

/**
 * collects resources defined in resource chain as a map
 * @param param0
 * @returns
 */
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

export type ResourcePool = {
  [key: string]: ResourceMap<BasePathMapping, BaseMeta>;
};

export function getResourceMap<
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta
>(
  resourcePool: ResourcePool,
  resourceType: string
): ResourceMap<PathMapping, Meta> {
  return resourcePool[resourceType] as ResourceMap<PathMapping, Meta>;
}
