import { Element } from "hast";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type AnchorTree = {
  key: string;
  href: string;
  id?: string;
  heading: number;
  title: string;
  children: AnchorTree[];
};

export type RehypeSectionAnchorCollectionOptions = {
  collectResult: (resultTrees: AnchorTree[]) => void;
};

export const rehypeHeadingAnchorCollection: Plugin<
  [RehypeSectionAnchorCollectionOptions?]
> = (options) => {
  return (tree) => {
    const headingStack: AnchorTree[] = [];
    const resultTrees: AnchorTree[] = [];
    visit(tree, "element", (node: Element) => {
      const heading = headingRank(node);
      if (!heading) return;
      const id = node.properties.id?.toString() ?? null;
      const anchorNode: AnchorTree = {
        key: id ?? toString(node),
        href: id ? `#${id}` : "",
        heading,
        title: toString(node),
        children: [],
      };
      if (id) {
        anchorNode.id = id;
      }

      // pop headingStack to resultTrees
      popStackAsTrees(headingStack, resultTrees, heading);

      headingStack.push(anchorNode);
    });

    popStackAsTrees(headingStack, resultTrees, 0);

    options?.collectResult?.(resultTrees);
  };
};

const popStackAsTrees = (
  headingStack: AnchorTree[],
  resultTrees: AnchorTree[],
  stopAtHeading: number // stop if heading is less than stopAtHeading
) => {
  for (let i = headingStack.length - 1; i >= 0; i--) {
    if (headingStack[i].heading < stopAtHeading) {
      return;
    }
    if (i === 0) {
      resultTrees.push(headingStack[i]);
    } else {
      headingStack[i - 1].children.push(headingStack[i]);
    }
    headingStack.pop();
  }
};
