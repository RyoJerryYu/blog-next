import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

import { MermaidCodeBlockProps } from "@/components/ExcalidrawScene/MermaidCodeBlockImpl";
import type { Code } from "mdast";
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx/lib";
import type { Plugin, Transformer } from "unified";
import type { Node, Parent } from "unist";
import type { VFileCompatible } from "vfile";

export interface RemarkExcalidrawMermaidOptions {}

function isMermaid(node: unknown): node is Code {
  if (!is(node, { type: "code", lang: "mermaid" })) {
    return false;
  }
  return true;
}

const parseMermaidProp = (node: Code): MermaidCodeBlockProps => {
  return {
    children: node.value,
  };
};

const remarkExcalidrawMermaid: Plugin<[RemarkExcalidrawMermaidOptions?]> =
  function mermaidTrans(options): Transformer {
    return async (node: Node, _file: VFileCompatible) => {
      visit(
        node,
        isMermaid,
        (node: Code, index: number | undefined, parent: Parent) => {
          if (index === undefined) {
            console.error("index is undefined", node, parent);
            throw new Error("index is undefined");
          }
          const props = parseMermaidProp(node);
          const mermaidRichElement: MdxJsxFlowElement = {
            type: "mdxJsxFlowElement",
            name: "MermaidCodeBlock",
            attributes: [
              { type: "mdxJsxAttribute", name: "name", value: props.name },
              {
                type: "mdxJsxAttribute",
                name: "children",
                value: props.children,
              },
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: props.className,
              },
            ],
            children: [],
          };

          parent.children.splice(index, 1, mermaidRichElement);
        }
      );
    };
  };

export default remarkExcalidrawMermaid;
