import { Image, Paragraph, Text } from "mdast";
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
 * ![[src|label]]
 * ```
 *
 * It will transform to MDX Node: <ObsidianRich src="src" label="label" />
 */

const syntax = /^\!\[\[(.+)\]\]$/;
const basePath = process.env.SITE_URL_BASE_PATH
  ? `/${process.env.SITE_URL_BASE_PATH}`
  : "";

export type ObsidianRichProps = {
  type: string;
  src: string;
  label?: string;
};

/**
 * test if node is a obsidian rich content paragraph
 *
 * node should be like below:
 *
 * ```
 * ![[file|label]]
 * ```
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

const parseObsidianRichProp = (node: Paragraph): ObsidianRichProps => {
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
    type: "ObsidianRich",
    src: file,
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
        const props = parseObsidianRichProp(node);
        const img: Image = {
          type: "image",
          title: props.label,
          url: `${basePath}/${opts.baseDir}/${props.src}`,
          alt: props.label,
        };

        parent.children.splice(index, 1, img);
      }
    );
  };
};
export default remarkObsidianRich;
