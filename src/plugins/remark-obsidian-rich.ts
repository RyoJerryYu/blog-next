import { BASE_PATH } from "@/utils/env-var";
import { Paragraph, Text } from "mdast";
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import unified from "unified";
import { Parent } from "unist";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

/**
 * remark-obsidian-rich plugin
 *
 * For Obsidian rich content syntax:
 *
 * ```
 * ![[file|label]]
 * ```
 *
 * It will transform to MDX Node: <ObsidianRich file="file" label="label" />
 */

const syntax = /^\!\[\[(.+)\]\]$/;
const basePath = BASE_PATH;

export type ObsidianRichProps = {
  file: string;
  url: string;
  label?: string;
};

/**
 * test if node is a obsidian rich content paragraph
 *
 * node should be a paragraph with only one text child
 * and the text should match the syntax: `![[file|label]]`
 * @param node
 * @returns
 */
const isObsidianRich = (node: unknown): node is Paragraph => {
  if (!is(node, { type: "paragraph" })) {
    return false;
  }
  const p = node as Paragraph;
  if (p.children.length !== 1 || p.children[0].type !== "text") {
    return false;
  }
  const text = p.children[0] as Text;
  return syntax.test(text.value);
};

/**
 * parse props from an obsidian rich content paragraph
 *
 * returning props object, containing:
 * - type: "ObsidianRich"
 * - file: file path
 * - label: label
 * @param node
 * @returns
 */
const parseObsidianRichProp = (
  node: Paragraph,
  baseDir: string
): ObsidianRichProps => {
  let text = (node.children[0] as Text).value;
  // console.log("text:", text);
  let [_, matched] = syntax.exec(text)!;
  if (!matched) {
    throw new Error(`Invalid Obsidian Rich content: ${text}`);
  }
  // console.log("matched", matched);
  let [file, label] = matched.split("|");
  if (!label) {
    label = file;
  }

  return {
    file: file,
    url: `${basePath}/${baseDir}/${file}`,
    label: label,
  };
};

// need slug passed here
export type RemarkObsidianRichOptions = {
  baseDir: string;
};

const DEFAULT_OPTIONS: RemarkObsidianRichOptions = {
  baseDir: ".",
};

const remarkObsidianRich: unified.Plugin<[RemarkObsidianRichOptions?]> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return (tree) => {
    visit(
      tree,
      isObsidianRich,
      (node: Paragraph, index: number, parent: Parent) => {
        const props = parseObsidianRichProp(node, opts.baseDir);
        const obsidianRichElement: MdxJsxFlowElement = {
          type: "mdxJsxFlowElement",
          name: "ObsidianRich",
          attributes: [
            { type: "mdxJsxAttribute", name: "file", value: props.file },
            { type: "mdxJsxAttribute", name: "url", value: props.url },
            { type: "mdxJsxAttribute", name: "label", value: props.label },
          ],
          children: [],
        };

        parent.children.splice(index, 1, obsidianRichElement);
      }
    );
  };
};
export default remarkObsidianRich;
