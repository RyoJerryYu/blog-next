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

      // pop the nodes on the stack as children of the previous node until the stopAtSlugs
      // a.k.a collapse the stack as a linear tree
      this.popStackAsTrees(currentStack, wikiTrees, wikiPage.pathMapping.slugs);
      if (this.autoFolder) {
        // push the node to the stack, and automatically create each layer (sub-folder) before it
        this.pushStack(currentStack, wikiTreeNode);
      } else {
        // or just push the node to the stack, all hidden layers will be collapsed,
        // as it is a flat tree without any sub-folder
        currentStack.push(wikiTreeNode);
      }
    }
    this.popStackAsTrees(currentStack, wikiTrees, null);

    const wikiTreeNodeList = this.buildWikiTreeNodeList(wikiTrees);
    return new SubWikiTreeIndex(wikiTrees, wikiTreeNodeList);
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
      // prefix compare, means current stack item is a prefix of stopAtSlugs, return and push the node to stack
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

  /**
   * Push the wiki tree node to the current stack, if the node is a prefix of the last node,
   * or the node is the root node, push the node to the current stack.
   * If the node is not a prefix of the last node, throw an error.
   *
   * @param currentStack - the current stack of wiki tree nodes
   * @param wikiTreeNode - the wiki tree node to push
   * @returns
   */
  private pushStack = (
    currentStack: WikiTreeNode[],
    wikiTreeNode: WikiTreeNode
  ) => {
    if (wikiTreeNode.slugs.length === 0) {
      // root node, push it to the stack
      currentStack.push(wikiTreeNode);
      return;
    }

    // slugs of the last node in the stack
    const lastNodeSlugs =
      currentStack.length === 0
        ? []
        : currentStack[currentStack.length - 1].slugs;

    if (!lastNodeSlugs.every((slug) => wikiTreeNode.slugs.includes(slug))) {
      // last node on the stack is not a prefix of the new node
      // it was ensured in the popStackAsTrees function
      // so it will never happen
      throw new Error(
        `stack last node ${lastNodeSlugs.join(
          "/"
        )} is not a prefix of the new node ${wikiTreeNode.title}`
      );
    }

    // because the last node on the stack is a prefix of the new node,
    // we need to find the first slug that is newly introduced in the new node
    const deltaIndex = wikiTreeNode.slugs.findIndex(
      (slug) => !lastNodeSlugs.includes(slug)
    );
    if (deltaIndex === -1) {
      // not found, means the new node is a prefix of the last node
      // and it was ensured that the last node is a prefix of the new node
      // so here means the two nodes are the same
      // it should never happen
      throw new Error(
        `tree node ${
          wikiTreeNode.title
        } is a prefix of the last node ${lastNodeSlugs.join("/")}`
      );
    }

    for (let i = deltaIndex; i < wikiTreeNode.slugs.length; i++) {
      // create a new node for each newly introduced slug
      // if the node is the last one, it is the same as the new node
      // otherwise, it is a virtual node
      const isVirtual = i !== wikiTreeNode.slugs.length - 1;
      if (!isVirtual) {
        const newNode: WikiTreeNode = {
          title: wikiTreeNode.title,
          slugs: wikiTreeNode.slugs.slice(0, i + 1),
          pagePath: wikiTreeNode.pagePath,
          children: [],
        };
        currentStack.push(newNode);
      } else {
        const additionalSlugs = wikiTreeNode.slugs.slice(i + 1);
        // best effort to generate the virtual page path
        // trim suffix
        const virtualPagePath = wikiTreeNode.pagePath
          .replace(additionalSlugs.join("/"), "")
          .replace(/\/$/, "");

        const newNode: WikiTreeNode = {
          title: wikiTreeNode.slugs[i],
          slugs: wikiTreeNode.slugs.slice(0, i + 1),
          pagePath: virtualPagePath,
          children: [],
          isVirtual: true,
        };
        currentStack.push(newNode);
      }
    }
  };

  /**
   * Build the wiki tree node list from the wiki tree nodes
   *
   * Different with the list after sort, this list contains all the nodes, including the virtual nodes
   * @param wikiTrees - the wiki tree nodes
   * @returns the wiki tree node list
   */
  private buildWikiTreeNodeList = (
    wikiTrees: WikiTreeNode[]
  ): WikiTreeNode[] => {
    const flattenSubTrees = (subTrees: WikiTreeNode[]) => {
      const subList: WikiTreeNode[] = [];
      for (const wikiTreeNode of subTrees) {
        subList.push({ ...wikiTreeNode, children: [] }); // emit children for memory saving
        subList.push(...flattenSubTrees(wikiTreeNode.children));
      }
      return subList;
    };

    const nodeList = flattenSubTrees(wikiTrees);
    if (!nodeList.some((node) => node.slugs.length === 0)) {
      // no root node, add a root node to the front

      const firstNode = nodeList[0];
      if (!firstNode) {
        // There is no node on tree. There is nothing can be done.
        return [];
      }

      // best effort to generate the virtual page path
      // trim slugs from the first node
      const virtualPagePath = firstNode.pagePath
        .replace(firstNode.slugs.join("/"), "")
        .replace(/\/$/, "");
      nodeList.unshift({
        title: "Index",
        slugs: [],
        pagePath: virtualPagePath,
        children: [],
      });
    }
    return nodeList;
  };
}

export class SubWikiTreeIndex {
  private readonly nodeByPagePath: Record<string, WikiTreeNode>;
  constructor(
    private readonly wikiTreeNodes: WikiTreeNode[],
    // it's a list, in order, with all the nodes, but no children info
    // and always contains the root node at the front
    private readonly wikiTreeNodeList: WikiTreeNode[]
  ) {
    this.nodeByPagePath = {};
    for (const wikiTreeNode of this.wikiTreeNodeList) {
      this.nodeByPagePath[wikiTreeNode.pagePath] = wikiTreeNode;
    }
  }

  pagePathToWikiTree = (pagePath: string): WikiTreeInfo => {
    return {
      trees: this.wikiTreeNodes,
    };
  };

  listTreeNodes = (): WikiTreeNode[] => {
    return this.wikiTreeNodeList;
  };

  pagePathToWikiTreeNode = (pagePath: string): WikiTreeNode => {
    return this.nodeByPagePath[pagePath];
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

  listTreeNodes = (resourceType: string): WikiTreeNode[] => {
    const subIndex = this.getSubIndex(resourceType);
    return subIndex.listTreeNodes();
  };

  pagePathToWikiTreeNode = (
    resourceType: string,
    pagePath: string
  ): WikiTreeNode => {
    const subIndex = this.getSubIndex(resourceType);
    return subIndex.pagePathToWikiTreeNode(pagePath);
  };

  static fromPool = getIndexFromIndexPool<WikiTreeIndex>("wikiTree");
}
