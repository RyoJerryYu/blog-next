import { Resource, WikiPathMapping } from "@/core/types/indexing";
import { filePathToWikiSlugs } from "../../utils/wiki-utils";
import {
  getIndexFromIndexPool,
  IndexBuilder,
  IndexPool,
} from "../index-building";
import {
  WikiTreeIndexMeta,
  WikiTreeIndexResource,
  WikiTreeInfo,
  WikiTreeNode,
} from "./types";

/**
 * Sort the wiki resource lists by file path
 * Order would as below:
 *
 * - public/content/wiki/01-zsome/index.md -> /wiki/zsome
 * - public/content/wiki/01-zsome/01-zfirst.md -> /wiki/zsome/zfirst
 * - public/content/wiki/01-zsome/02-bsecond.md -> /wiki/zsome/bsecond
 * - public/content/wiki/02-bother/index.md -> /wiki/bother
 * - public/content/wiki/02-bother/01-zfirst.md -> /wiki/bother/zfirst
 * - public/content/wiki/03-athird/01-zfirst.md -> /wiki/athird/zfirst
 */
export function sortWikiTreeNodesByFilePath(
  wikiPages: WikiTreeIndexResource[]
) {
  return wikiPages.sort((a, b) => {
    // here we should recaculate the slugs from the filePath
    // because resource.pathMapping.slugs do not have order number
    const partsA = filePathToWikiSlugs(a.pathMapping.filePath, false);
    const partsB = filePathToWikiSlugs(b.pathMapping.filePath, false);
    for (let i = 0; i < partsA.length && i < partsB.length; i++) {
      const partA = partsA[i];
      const partB = partsB[i];
      if (partA !== partB) {
        return partA.localeCompare(partB);
      }
    }
    return partsA.length - partsB.length;
  });
}

/**
 * Build the wiki resource lists as a tree
 */
class SubWikiTreeIndexBuilder {
  private readonly wikiPages: WikiTreeIndexResource[];
  constructor(private readonly autoFolder: boolean) {
    this.wikiPages = [];
  }
  addResource = (resource: Resource<WikiPathMapping, WikiTreeIndexMeta>) => {
    this.wikiPages.push(resource);
  };

  buildIndex = (): SubWikiTreeIndex => {
    const sortedWikiTreeNodes = sortWikiTreeNodesByFilePath(this.wikiPages);
    const wikiTrees: WikiTreeNode[] = [];
    const currentStack: WikiTreeNode[] = [];

    for (const wikiPage of sortedWikiTreeNodes) {
      const wikiTreeNode: WikiTreeNode = {
        title: wikiPage.meta.title,
        slugs: wikiPage.pathMapping.slugs,
        pagePath: wikiPage.pathMapping.pagePath,
        children: [],
      };

      this.popStackAsTrees(currentStack, wikiTrees, wikiPage.pathMapping.slugs);
      if (this.autoFolder) {
        this.pushStack(currentStack, wikiTreeNode);
      } else {
        currentStack.push(wikiTreeNode);
      }
    }
    this.popStackAsTrees(currentStack, wikiTrees, null);
    return new SubWikiTreeIndex(wikiTrees);
  };

  /**
   * Until stop, pop the stack as children of the previous node,
   * or push root node to wikiTrees
   * @param currentStack
   * @param wikiTrees
   * @param stopAtSlugs
   */
  private popStackAsTrees = (
    currentStack: WikiTreeNode[],
    wikiTrees: WikiTreeNode[],
    stopAtSlugs: string[] | null
  ) => {
    for (let i = currentStack.length - 1; i >= 0; i--) {
      // prefix compare, if current is a prefix of stopAtSlugs, return
      if (
        stopAtSlugs &&
        currentStack[i].slugs.every((slug) => stopAtSlugs.includes(slug))
      ) {
        return;
      }
      if (i === 0) {
        wikiTrees.push(currentStack[i]);
      } else {
        currentStack[i - 1].children.push(currentStack[i]);
      }
      currentStack.pop();
    }
  };

  private pushStack = (
    currentStack: WikiTreeNode[],
    wikiTreeNode: WikiTreeNode
  ) => {
    if (wikiTreeNode.slugs.length === 0) {
      currentStack.push(wikiTreeNode);
      return;
    }

    const lastNodeSlugs =
      currentStack.length === 0
        ? []
        : currentStack[currentStack.length - 1].slugs;

    if (!lastNodeSlugs.every((slug) => wikiTreeNode.slugs.includes(slug))) {
      throw new Error(
        `tree node ${
          wikiTreeNode.title
        } is not a prefix of the last node ${lastNodeSlugs.join("/")}`
      );
    }

    const deltaIndex = wikiTreeNode.slugs.findIndex(
      (slug) => !lastNodeSlugs.includes(slug)
    );
    if (deltaIndex === -1) {
      throw new Error(
        `tree node ${
          wikiTreeNode.title
        } is a prefix of the last node ${lastNodeSlugs.join("/")}`
      );
    }

    for (let i = deltaIndex; i < wikiTreeNode.slugs.length; i++) {
      const newNode: WikiTreeNode =
        i === wikiTreeNode.slugs.length - 1
          ? {
              title: wikiTreeNode.title,
              slugs: wikiTreeNode.slugs.slice(0, i + 1),
              pagePath: wikiTreeNode.pagePath,
              children: [],
            }
          : {
              title: wikiTreeNode.slugs[i],
              slugs: wikiTreeNode.slugs.slice(0, i + 1),
              pagePath: "",
              children: [],
            };

      currentStack.push(newNode);
    }
  };
}

export class SubWikiTreeIndex {
  constructor(private readonly wikiTreeNodes: WikiTreeNode[]) {}

  pagePathToWikiTree = (pagePath: string): WikiTreeInfo => {
    return {
      trees: this.wikiTreeNodes,
    };
  };
}
export class WikiTreeIndexBuilder
  implements
    IndexBuilder<WikiPathMapping, WikiTreeIndexMeta, WikiTreeIndex, "wikiTree">
{
  private subWikiTreeIndexBuilders: {
    [resourceType: string]: SubWikiTreeIndexBuilder;
  };
  constructor(private readonly autoFolder: boolean) {
    this.subWikiTreeIndexBuilders = {};
  }
  addResource = (
    resourceType: string,
    resource: Resource<WikiPathMapping, WikiTreeIndexMeta>
  ) => {
    if (!this.subWikiTreeIndexBuilders[resourceType]) {
      this.subWikiTreeIndexBuilders[resourceType] = new SubWikiTreeIndexBuilder(
        this.autoFolder
      );
    }
    this.subWikiTreeIndexBuilders[resourceType].addResource(resource);
  };
  buildIndex = async (
    indexPool: IndexPool
  ): Promise<{ wikiTree: WikiTreeIndex }> => {
    const subIndexByResourceType: { [resourceType: string]: SubWikiTreeIndex } =
      Object.fromEntries(
        Object.entries(this.subWikiTreeIndexBuilders).map(
          ([resourceType, subIndexBuilder]) => [
            resourceType,
            subIndexBuilder.buildIndex(),
          ]
        )
      );

    const wikiTreeIndex = new WikiTreeIndex(subIndexByResourceType);
    return { wikiTree: wikiTreeIndex };
  };
}

export class WikiTreeIndex {
  constructor(
    private readonly subIndexByResourceType: {
      [resourceType: string]: SubWikiTreeIndex;
    }
  ) {}

  private getSubIndex = (resourceType: string): SubWikiTreeIndex => {
    const subIndex = this.subIndexByResourceType[resourceType];
    if (!subIndex) {
      throw new Error(`Invalid resourceType: ${resourceType}`);
    }
    return subIndex;
  };

  pagePathToWikiTree = (
    resourceType: string,
    pagePath: string
  ): WikiTreeInfo => {
    const subIndex = this.getSubIndex(resourceType);
    return subIndex.pagePathToWikiTree(pagePath);
  };

  static fromPool = getIndexFromIndexPool<WikiTreeIndex>("wikiTree");
}
