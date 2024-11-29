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
import { PostSlugInfo, TagInfo } from "./types";

/**
 * Converts a tag string to a URL-friendly slug
 * e.g. "Machine Learning" -> "machine-learning"
 */
const tagToTagSlug = (tag: string) => {
  return tag.toLowerCase().replace(" ", "-").replace("/", "-");
};

/**
 * Generates the URL path for a tag page
 * e.g. "machine-learning" -> "/tags/machine-learning"
 */
const tagSlugToPath = (tagSlug: string) => {
  return `/tags/${tagSlug}`;
};

/**
 * Converts a page path mapping to post slug info
 * Combines the resource type (e.g. "articles") with the page path mapping
 * to create a unique identifier for a post
 */
const postPathMappingToPostSlugInfo = (
  resourceType: string,
  pathMapping: PagePathMapping
): PostSlugInfo => {
  return {
    postType: resourceType,
    postSlug: pathMapping.slug,
    postPagePath: pathMapping.pagePath,
  };
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

  /**
   * Adds a resource to the tag index
   * For each tag in the resource's metadata:
   * - Creates a new TagInfo if the tag doesn't exist
   * - Adds the post's slug info to the tag's list of posts
   *
   * 不合理：应用 path 作键而不是 slug 或 name 作键
   */
  addResource = (
    resourceType: string,
    resource: Resource<PagePathMapping, TagIndexMeta>
  ) => {
    const { tags } = resource.meta;
    tags.forEach((tag) => {
      const tagSlug = tagToTagSlug(tag);
      if (!this.index.has(tagSlug)) {
        const tagPath = tagSlugToPath(tagSlug);
        this.index.set(tagSlug, {
          tag,
          slug: tagSlug,
          path: tagPath,
          postSlugs: [],
        });
      }
      const postSlugInfo = postPathMappingToPostSlugInfo(
        resourceType,
        resource.pathMapping
      );
      this.index.get(tagSlug)?.postSlugs.push(postSlugInfo);
      return;
    });
  };

  /**
   * Builds and returns the final tag index
   * Returns an object with a single "tag" key containing the TagIndex instance
   */
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

  /**
   * Gets all posts that have the given tag
   */
  getPostSlugs(tag: string) {
    const tagSlug = tagToTagSlug(tag);
    return this.index.get(tagSlug)?.postSlugs || [];
  }

  /**
   * Gets all tags in the index
   */
  getTags() {
    return Array.from(this.index.values());
  }

  /**
   * Gets TagInfo objects for the given tag strings
   * Returns only tags that exist in the index
   */
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

  /**
   * Gets a TagIndex instance from the index pool
   */
  static fromPool = getIndexFromIndexPool<TagIndex>("tag");
}
