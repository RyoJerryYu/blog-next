/**
 * All index should not be able to directly parsed from the content
 * Indexes are isomerism. It should hold the data in thereseves.
 */

import { BaseMeta, BasePathMapping, Resource } from "@/core/types/indexing";

export type IndexBuilder<
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta,
  Index,
  Key extends string
> = {
  addResource: (
    resourceType: string,
    resource: Resource<PathMapping, Meta>
  ) => void;
  /**
   * Build the index object.
   * return object that would merge on the site index.
   * @param indexPool - The index pool build by previous builders.
   * @returns An object that have a index on the key of this builder.
   */
  buildIndex: (indexPool: { [key: string]: any }) => Promise<{
    [K in Key]: Index;
  }>;
};

export type IndexPool = {
  [key: string]: any;
};

// represent a static method on index
export type GetIndexFromIndexPool<Index> = (indexPool: {
  [key: string]: any;
}) => Index;
export const getIndexFromIndexPool: <Index>(
  key: string
) => GetIndexFromIndexPool<Index> = (key: string) => {
  return (indexPool: IndexPool) => indexPool[key];
};

export const buildIndex = async <
  PathMapping extends BasePathMapping,
  Meta extends BaseMeta,
  Index,
  Key extends string
>(
  resourceMapWithTypes: [string, Resource<PathMapping, Meta>[]][],
  indexBuilder: IndexBuilder<PathMapping, Meta, Index, Key>,
  indexPool: IndexPool
) => {
  for (const [resourceType, resources] of resourceMapWithTypes) {
    resources.forEach((resource) => {
      indexBuilder.addResource(resourceType, resource);
    });
  }
  return await indexBuilder.buildIndex(indexPool);
};
