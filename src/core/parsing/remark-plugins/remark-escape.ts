import { Text } from "mdast";
import unified from "unified";
import { visit } from "unist-util-visit";
/**
 * for escaping the arrow for mdx, which would raise an error
 *
 */

const remarkEscape: unified.Plugin = () => {
  return (tree) => {
    visit(tree, "text", (node: Text) => {
      node.value = node.value.replace(/</g, "&lt;");
      node.value = node.value.replace(/>/g, "&gt;");
    });
  };
};

export default remarkEscape;