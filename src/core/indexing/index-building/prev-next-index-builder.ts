import dayjs from "dayjs";
import { PostMeta, ResourceMeta } from "../meta-collecting/meta-collecting";
import { ResourcePathMapping } from "../path-mapping/path-mapping";
import { IndexBuilder, Resource } from "./index-building";

export type PrevNextIndexMeta = ResourceMeta & {
  title: string;
  created_at: string | null;
  updated_at: string | null;
};
export type PrevNextIndexResource = Resource<
  ResourcePathMapping,
  PrevNextIndexMeta
>;
export type PrevNextInfo = {
  prevInfo: PrevNextIndexResource | null;
  nextInfo: PrevNextIndexResource | null;
};
// a helper function to sort posts by created at desc
export const sortPostsByDate = (posts: PrevNextIndexResource[]) => {
  return posts.sort((a, b) => {
    return dayjs(b.meta.created_at).unix() - dayjs(a.meta.created_at).unix();
  });
};

/**
 * A collection for one sortable list of resources.
 * Mostly those resources are one type of resources.
 */
class SubPrevNextIndexBuilder {
  private posts: PrevNextIndexResource[];
  constructor() {
    this.posts = [];
  }

  addResource = (resource: PrevNextIndexResource) => {
    this.posts.push(resource);
  };

  buildIndex = (): SubPrevNextIndex => {
    const sortedPosts = sortPostsByDate(this.posts);
    const subPrevNextIndex = new SubPrevNextIndex(sortedPosts);
    return subPrevNextIndex;
  };
}

export class SubPrevNextIndex {
  private readonly posts: PrevNextIndexResource[];
  private readonly orderMap: Map<string, number>;

  constructor(posts: PrevNextIndexResource[]) {
    this.posts = posts;
    this.orderMap = new Map();
    for (let i = 0; i < posts.length; i++) {
      this.orderMap.set(posts[i].pathMapping.pagePath, i);
    }
  }

  listResources = (): Readonly<PrevNextIndexResource>[] => {
    return this.posts;
  };
  pagePathToPrevNextInfo = (pagePath: string): PrevNextInfo => {
    const index = this.orderMap.get(pagePath);
    if (index === undefined || index < 0 || index >= this.posts.length) {
      throw new Error(`Invalid pagePath: ${pagePath}`);
    }
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    return {
      prevInfo: prevIndex >= 0 ? this.posts[prevIndex] : null,
      nextInfo: nextIndex < this.posts.length ? this.posts[nextIndex] : null,
    };
  };
}

export class PrevNextIndexBuilder
  implements
    IndexBuilder<ResourcePathMapping, PostMeta, PrevNextIndex, "prevNext">
{
  private subPrevNextIndexBuilders: {
    [resourceType: string]: SubPrevNextIndexBuilder;
  };
  constructor() {
    this.subPrevNextIndexBuilders = {};
  }

  addResource = (
    resourceType: string,
    resource: Resource<ResourcePathMapping, PostMeta>
  ) => {
    if (!this.subPrevNextIndexBuilders[resourceType]) {
      this.subPrevNextIndexBuilders[resourceType] =
        new SubPrevNextIndexBuilder();
    }
    this.subPrevNextIndexBuilders[resourceType].addResource(resource);
  };

  buildIndex = async (): Promise<{ prevNext: PrevNextIndex }> => {
    const prevNextList: { [resourceType: string]: SubPrevNextIndex } = {};
    for (const resourceType in this.subPrevNextIndexBuilders) {
      prevNextList[resourceType] =
        this.subPrevNextIndexBuilders[resourceType].buildIndex();
    }
    return { prevNext: new PrevNextIndex(prevNextList) };
  };
}

export class PrevNextIndex {
  constructor(
    readonly subIndexByResourceType: {
      [resourceType: string]: SubPrevNextIndex;
    }
  ) {}

  private getSubIndex = (resourceType: string): SubPrevNextIndex => {
    const subIndex = this.subIndexByResourceType[resourceType];
    if (!subIndex) {
      throw new Error(`Invalid resourceType: ${resourceType}`);
    }
    return subIndex;
  };

  pagePathToPrevNextInfo = (
    resourceType: string,
    pagePath: string
  ): PrevNextInfo => {
    const subIndex = this.getSubIndex(resourceType);
    return subIndex.pagePathToPrevNextInfo(pagePath);
  };

  listResources = (resourceType: string): Readonly<PrevNextIndexResource>[] => {
    const subIndex = this.getSubIndex(resourceType);
    return subIndex.listResources();
  };
}