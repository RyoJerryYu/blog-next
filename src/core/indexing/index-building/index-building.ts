/**
 * All index should not be able to directly parsed from the content
 * Indexes are isomerism. It should hold the data in thereseves.
 */

export type IndexBuilder<PathMapping, Meta, Index> = {
  buildIndex: (mapping: PathMapping, metas: Meta[]) => Index;
};
