import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PrevNextInfo } from "../indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "../indexing/index-building/tag-index-builder/types";
import { MDXMeta, PostMeta, PostResource } from "../types/indexing";

export type RenderedAbstract = {
  source: MDXRemoteSerializeResult;
};

export type WikilinkPreviewItem = {
  path: string;
  title: string;
  abstract: RenderedAbstract | null;
  updatedAt: string | null;
};

export type WikilinkPreviewMap = Record<string, WikilinkPreviewItem>;

export type PostPageProps = {
  slug: string;
  tags: TagInfo[];
  source: MDXRemoteSerializeResult;
  meta: PostMeta & MDXMeta;
  prevNextInfo: PrevNextInfo;
  backRefResources: PostResource[];
  wikilinkPreviewMap: WikilinkPreviewMap;
  hyperProps: PostPageHyperProps;
};

export type PostPageHyperProps = {
  withSEO?: boolean;
  withComments?: boolean;
};

export type PostIndexPageProps = {
  allTagsList: TagInfo[];
  posts: PostResource[];
  postAbstracts: Record<string, RenderedAbstract>;
};
