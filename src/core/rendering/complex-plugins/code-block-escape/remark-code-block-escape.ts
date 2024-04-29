import { Code, Parent } from "mdast";
import unified from "unified";
import { visit } from "unist-util-visit";

export type RemarkCodeBlockEscapeOptions = {};

export const remarkCodeBlockEscape: unified.Plugin<
  [RemarkCodeBlockEscapeOptions?]
> = (options) => {
  return (tree) => {
    visit(tree, "code", (node: Code, index: number, parent: Parent) => {
      node.data;
      node.lang;
      node.meta;
      if (node.lang === "code-block-escape") {
        parent.children.splice(index, 1, {
          type: "text",
          value: node.value,
        });
      }
    });
  };
};
