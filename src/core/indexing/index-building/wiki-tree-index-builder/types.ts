import { BaseMeta, Resource, WikiPathMapping } from "@/core/types/indexing";

export type WikiTreeIndexMeta = BaseMeta & {
  title: string;
};
export type WikiTreeIndexResource = Resource<
  WikiPathMapping,
  WikiTreeIndexMeta
>;

export type WikiTreeNode = {
  title: string;
  slugs: string[];
  pagePath: string;
  children: WikiTreeNode[];
  isVirtual?: boolean;
};
export type WikiTreeInfo = {
  trees: WikiTreeNode[];
};
