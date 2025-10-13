import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { TagInfo } from "../indexing/index-building/tag-index-builder/types";
import {
  WikiTreeInfo,
  WikiTreeNodeTOC,
} from "../indexing/index-building/wiki-tree-index-builder/types";
import { MDXMeta, PostMeta, PostResource } from "../types/indexing";

export type WikiPageProps = {
  slugs: string[];
  wikiTree: WikiTreeInfo;
} & (
  | {
      isIndexOnly?: false;
      meta: PostMeta & MDXMeta;
      tags: TagInfo[];
      source: MDXRemoteSerializeResult;
      backRefResources: PostResource[];
    }
  | {
      isIndexOnly: true;
      treeNodeTOC: WikiTreeNodeTOC;
    }
);
