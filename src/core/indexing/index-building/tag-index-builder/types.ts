import { PagePathMapping } from "@/core/types/indexing";

type PostType = "article" | "idea";

type PostSlugInfo = {
  postType: PostType;
  postSlug: string;
  postPagePath: string;
};

/**
 * 不合理，
 * 1. tagInfo 本身应与 post 无关
 * 2. 应用 path 作键而不是 slug 或 name 作键
 *
 * 先保持接口不变性，后续再进行外部重构
 */
export const postPathMappingToPostSlugInfo = (
  pathMapping: PagePathMapping
): PostSlugInfo => {
  const postType: "article" | "idea" = pathMapping.pagePath.startsWith(
    "/articles"
  )
    ? "article"
    : "idea";
  return {
    postType,
    postSlug: pathMapping.slug,
    postPagePath: pathMapping.pagePath,
  };
};

export type TagInfo = {
  tag: string;
  slug: string;
  path: string;
  postSlugs: PostSlugInfo[];
};

// return map<tag, TagInfo>, the key is tag name, not tag slug!
export const tagInfoListToMap = (tagInfoList: TagInfo[]) => {
  const map = new Map<string, TagInfo>();
  tagInfoList.forEach((tagInfo) => {
    map.set(tagInfo.tag, tagInfo);
  });
  return map;
};
