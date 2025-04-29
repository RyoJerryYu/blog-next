import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { TagInfo } from "../indexing/index-building/tag-index-builder/types";
import { WikiTreeInfo } from "../indexing/index-building/wiki-tree-index-builder/types";
import { MDXMeta, PostMeta, PostResource } from "../types/indexing";

export type WikiPageProps = {
  slugs: string[];
  meta: PostMeta & MDXMeta;
  tags: TagInfo[];
  wikiTree: WikiTreeInfo;
  source: MDXRemoteSerializeResult;
  backRefResources: PostResource[];
};
