/**
 * All index should not be able to directly parsed from the content
 * Indexes are isomerism. It should hold the data in thereseves.
 */

export type Resource<PathMapping, Meta> = {
  readonly pathMapping: Readonly<PathMapping>;
  readonly meta: Readonly<Meta>;
};

export type IndexBuilder<PathMapping, Meta, Index, Key extends string> = {
  addResource: (resource: Resource<PathMapping, Meta>) => void;
  /**
   * Build the index object.
   * return object that would merge on the site index.
   * @returns An object that have a index on the key of this builder.
   */
  buildIndex: () => Promise<{
    [K in Key]: Index;
  }>;
};
