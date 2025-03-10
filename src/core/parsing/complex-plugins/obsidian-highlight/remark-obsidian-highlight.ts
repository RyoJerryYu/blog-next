import { Parent, Text } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

const syntax = /==(.*?)==/;

const remarkObsidianHighlight: Plugin = () => {
  return (tree) => {
    visit(
      tree,
      "text",
      (node: Text, index: number | undefined, parent: Parent) => {
        if (index === undefined) {
          console.error("index is undefined", node, parent);
          throw new Error("index is undefined");
        }
        if (parent.type === "code") {
          // no nothing with code block
          return;
        }

        const match = node.value.match(syntax);
        if (
          !match ||
          match.index === undefined ||
          !match.length ||
          match.length < 2
        ) {
          return;
        }

        const before = node.value.slice(0, match.index);
        const after = node.value.slice(match.index + match[0].length);

        parent.children.splice(
          index,
          1,
          {
            type: "text",
            value: before,
          },
          {
            type: "mdxJsxTextElement",
            name: "ObsidianHighlight",
            attributes: [],
            children: [
              {
                type: "text",
                value: match[1],
              },
            ],
          },
          {
            type: "text",
            value: after,
          }
        );

        return index + 2;
      }
    );
  };
};

export default remarkObsidianHighlight;
