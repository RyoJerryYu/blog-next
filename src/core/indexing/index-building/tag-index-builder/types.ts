export type PostSlugInfo = {
  postType: string;
  postSlug: string;
  postPagePath: string;
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
