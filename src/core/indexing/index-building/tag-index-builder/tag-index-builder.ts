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

import { BaseMeta, PagePathMapping, Resource } from "../../../types/indexing";
import { IndexBuilder, getIndexFromIndexPool } from "../index-building";
import { TagInfo, postPathMappingToPostSlugInfo } from "./types";

const tagToTagSlug = (tag: string) => {
  return tag.toLowerCase().replace(" ", "-").replace("/", "-");
};
const tagSlugToPath = (tagSlug: string) => {
  return `/tags/${tagSlug}`;
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

  static fromPool = getIndexFromIndexPool<TagIndex>("tag");
}
