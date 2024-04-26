/**
 * All index should not be able to directly parsed from the content
 * Indexes are isomerism. It should hold the data in thereseves.
 */

import { Resource } from "@/core/types/indexing";

export type IndexBuilder<PathMapping, Meta, Index, Key extends string> = {
  addResource: (
    resourceType: string,
    resource: Resource<PathMapping, Meta>
  ) => void;
  /**
   * Build the index object.
   * return object that would merge on the site index.
   * @returns An object that have a index on the key of this builder.
   */
  buildIndex: () => Promise<{
    [K in Key]: Index;
  }>;
};

export const buildIndex = async <PathMapping, Meta, Index, Key extends string>(
  resourceMapWithTypes: [string, Resource<PathMapping, Meta>[]][],
  indexBuilder: IndexBuilder<PathMapping, Meta, Index, Key>
) => {
  for (const [resourceType, resources] of resourceMapWithTypes) {
    resources.forEach((resource) => {
      indexBuilder.addResource(resourceType, resource);
    });
  }
  return await indexBuilder.buildIndex();
};
