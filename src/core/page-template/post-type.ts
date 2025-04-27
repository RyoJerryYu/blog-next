import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PrevNextInfo } from "../indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "../indexing/index-building/tag-index-builder/types";
import { MDXMeta, PostMeta, PostResource } from "../types/indexing";

export type PostPageProps = {
  slug: string;
  tags: TagInfo[];
  source: MDXRemoteSerializeResult;
  meta: PostMeta & MDXMeta;
  prevNextInfo: PrevNextInfo;
  backRefResources: PostResource[];
};
