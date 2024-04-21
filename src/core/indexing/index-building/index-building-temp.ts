/**
 * All index should not be able to directly parsed from the content
 * Indexes are isomerism. It should hold the data in thereseves.
 */

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
import { Resource } from "./index-building";

const postResource: Resource<PagePathMapping, PostMeta> = {
  pathMapping: {
    pagePath: "/",
    filePath: "/",
    slug: "",
  },
  meta: {
    content: "",
    title: "<No Title>",
    abstract: "",
    length: 0,
    created_at: null,
    updated_at: null,
    tags: [],
    license: false,
  },
};

const staticResource: Resource<ResourcePathMapping, ResourceMeta> = {
  pathMapping: {
    pagePath: "/",
    filePath: "/",
  },
  meta: {},
};

/**
 * A collection for a type of resources.
 * It has a set of methods for list and get resources.
 */
export class ResourceMapping<
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
> {
  // pagePath -> Resource
  constructor(
    readonly pagePath2Resource: Map<string, Resource<PathMapping, Meta>>
  ) {}

  listPagePaths = (): string[] => {
    return Array.from(this.pagePath2Resource.keys());
  };
  private listResources = (): Readonly<Resource<PathMapping, Meta>>[] => {
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

  private pagePathToResource = (
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
    path: string
  ): PathMapping[T] => {
    return this.pagePathToResource(path).pathMapping[key];
  };
  pagePathToMeta = (path: string): Meta => {
    return this.pagePathToResource(path).meta;
  };
}

type ResourcePipeline<
  Key extends string,
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
> = {
  key: Key;
  pathMapper: PathMapper<PathMapping>;
  collectorChain: MetaCollectorChain<Meta>;
};

const articlePipeline: ResourcePipeline<"article", PagePathMapping, PostMeta> =
  {
    key: "article",
    pathMapper: articlePostPathMapper(),
    collectorChain: defaultChain,
  };

const ideaPipeline: ResourcePipeline<"idea", PagePathMapping, PostMeta> = {
  key: "idea",
  pathMapper: ideaPostPathMapper(),
  collectorChain: defaultChain,
};

const staticPipeline: ResourcePipeline<
  "static",
  ResourcePathMapping,
  ResourceMeta
> = {
  key: "static",
  pathMapper: defaultStaticResourcePathMapper(),
  collectorChain: defaultStaticResourceChain,
};

type ResourcePipelineListBase = readonly ResourcePipeline<string, any, any>[];

const pipelines = [articlePipeline, ideaPipeline, staticPipeline] as const;

const loadPathMappingAndMeta = async <
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
>({
  pathMapper,
  collectorChain,
}: ResourcePipeline<string, PathMapping, Meta>): Promise<
  ResourceMapping<PathMapping, Meta>
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

  const index = new Map(
    resources.map((resource) => [resource.pathMapping.pagePath, resource])
  );
  return new ResourceMapping(index);
};

type MergeList<L extends readonly any[]> = L extends readonly [
  infer First,
  ...infer Remains
]
  ? First & MergeList<Remains>
  : {};

type ResourcePipelineByKey<
  Key extends string,
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
> = {
  [K in Key]: ResourcePipeline<K, PathMapping, Meta>;
};

type ResourcePipelinesMapByKey<
  ResourcePipelineList extends ResourcePipelineListBase
> = MergeList<{
  [I in keyof ResourcePipelineList]: ResourcePipelineList[I] extends ResourcePipeline<
    infer Key,
    infer PathMapping,
    infer Meta
  >
    ? ResourcePipelineByKey<Key, PathMapping, Meta>
    : never;
}>;

const resourcePipelinesMapByKeyExample: ResourcePipelinesMapByKey<
  typeof pipelines
> = {
  article: articlePipeline,
  idea: ideaPipeline,
  static: staticPipeline,
};

type ResourceCacheByKey<
  Key extends string,
  PathMapping extends ResourcePathMapping,
  Meta extends ResourceMeta
> = {
  [K in Key]: ResourceMapping<PathMapping, Meta>;
};

/**
 * Type of cache for all types of resources.
 */
type SiteCache<ResourcePipelineList extends ResourcePipelineListBase> =
  MergeList<{
    [I in keyof ResourcePipelineList]: ResourcePipelineList[I] extends ResourcePipeline<
      infer Key,
      infer PathMapping,
      infer Meta
    >
      ? ResourceCacheByKey<Key, PathMapping, Meta>
      : never;
  }>;

type SiteIndex = { [key: string]: any };

type SiteUniverse<ResourcePiplineList extends ResourcePipelineListBase> = {
  resource: SiteCache<ResourcePiplineList>;
  index: SiteIndex;
};

const buildSiteCache = async <
  ResourcePipelineList extends ResourcePipelineListBase
>(
  piplines: ResourcePipelineList
): Promise<SiteCache<ResourcePipelineList>> => {
  const cache: any = {};
  for (let pipeline of piplines) {
    const resourceCache = await loadPathMappingAndMeta(pipeline);
    cache[pipeline.key] = resourceCache;
  }
  return cache;
};
export type IndexGetter<Index> = (siteUniverse: { index: SiteIndex }) => Index;

async () => {
  const cache = await buildSiteCache(pipelines);
  const articleCache = cache.article;
  const ideaCache = cache.idea;
  const staticCache = cache.static;

  const siteCache = {
    article: articleCache,
    idea: ideaCache,
    static: staticCache,
  };
};
