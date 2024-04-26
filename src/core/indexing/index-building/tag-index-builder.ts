/**
 * Tag Index
 *
 * Reverse index of tags to posts
 *
 * One post would have multiple tags,
 * and one tag would have multiple posts.
 *
 * Tag also need a path to show all posts with this tag
 * Thus, one tag would have one slug, and slug is the identifier id for a tag
 *
 * For now in the index, we use PostType and PostSlug to identify a post,
 * Maybe we could use path as identifier for a post in the future
 */

import { BaseMeta, PagePathMapping } from "../../types/indexing";
import { IndexBuilder, Resource } from "./index-building";

const tagToTagSlug = (tag: string) => {
  return tag.toLowerCase().replace(" ", "-").replace("/", "-");
};
const tagSlugToPath = (tagSlug: string) => {
  return `/tags/${tagSlug}`;
};

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
const postPathMappingToPostSlugInfo = (
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

export type TagIndexMeta = BaseMeta & {
  tags: string[];
};

export class TagIndexBuilder
  implements IndexBuilder<PagePathMapping, TagIndexMeta, TagIndex, "tag">
{
  private readonly index: Map<string, TagInfo>;
  constructor() {
    this.index = new Map();
  }

  addResource = (
    resourceType: string,
    resource: Resource<PagePathMapping, TagIndexMeta>
  ) => {
    const { slug: postSlug } = resource.pathMapping;
    const { tags } = resource.meta;
    tags.forEach((tag) => {
      const slug = tagToTagSlug(tag);
      if (!this.index.has(slug)) {
        const tagPath = tagSlugToPath(slug);
        this.index.set(slug, { tag, slug, path: tagPath, postSlugs: [] });
      }
      const postSlugInfo = postPathMappingToPostSlugInfo(resource.pathMapping);
      this.index.get(slug)?.postSlugs.push(postSlugInfo);
      return;
    });
  };
  buildIndex = async () => {
    return {
      tag: new TagIndex(this.index),
    };
  };
}

// return map<tag, TagInfo>, the key is tag name, not tag slug!
export const tagInfoListToMap = (tagInfoList: TagInfo[]) => {
  const map = new Map<string, TagInfo>();
  tagInfoList.forEach((tagInfo) => {
    map.set(tagInfo.tag, tagInfo);
  });
  return map;
};

export class TagIndex {
  // tagSlug -> TagInfo
  private readonly index: Map<string, TagInfo>;
  constructor(index: Map<string, TagInfo>) {
    this.index = index;
  }
  getPostSlugs(tag: string) {
    const tagSlug = tagToTagSlug(tag);
    return this.index.get(tagSlug)?.postSlugs || [];
  }
  getTags() {
    return Array.from(this.index.values());
  }
  getTagsOf(tags: string[]) {
    const tagSlugs = tags.map(tagToTagSlug);
    let result: TagInfo[] = [];
    for (const tagSlug of tagSlugs) {
      const tag = this.index.get(tagSlug);
      if (tag) {
        result.push(tag);
      }
    }
    return result;
  }
}
