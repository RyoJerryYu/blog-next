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
};

type TagInfo = {
  tag: string;
  slug: string;
  path: string;
  postSlugs: PostSlugInfo[];
};

export class TagIndex {
  // tagSlug -> TagInfo
  private readonly index: Map<string, TagInfo>;
  constructor() {
    this.index = new Map();
  }
  addPostSlug(tag: string, postType: PostType, postSlug: string) {
    const slug = tagToTagSlug(tag);
    if (!this.index.has(slug)) {
      const path = tagSlugToPath(slug);
      this.index.set(slug, { tag, slug, path, postSlugs: [] });
    }
    this.index.get(slug)?.postSlugs.push({ postSlug, postType });
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
  getTagSlugs() {
    return Array.from(this.index.keys());
  }
}
