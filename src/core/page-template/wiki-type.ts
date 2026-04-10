import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { TagInfo } from "../indexing/index-building/tag-index-builder/types";
import {
  WikiTreeInfo,
  WikiTreeNodeTOC,
} from "../indexing/index-building/wiki-tree-index-builder/types";
import { MDXMeta, PostMeta, PostResource } from "../types/indexing";
import { WikilinkPreviewMap } from "./post-type";

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
      wikilinkPreviewMap: WikilinkPreviewMap;
    }
  | {
      isIndexOnly: true;
      treeNodeTOC: WikiTreeNodeTOC;
    }
);
