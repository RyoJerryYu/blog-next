import { Text } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
/**
 * for escaping the arrow for mdx, which would raise an error
 *
 * It's not used in mdx system right now.
 * Because: serialize mdx will parse mdx before remark plugin.
 *          so the arrow escape will not work.
 */

const remarkEscape: Plugin = () => {
  return (tree) => {
    visit(tree, "text", (node: Text) => {
      node.value = node.value.replace(/</g, "&lt;");
      node.value = node.value.replace(/>/g, "&gt;");
    });
  };
};

export default remarkEscape;
