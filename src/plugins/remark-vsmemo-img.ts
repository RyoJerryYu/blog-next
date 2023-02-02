import { Image, Paragraph, Text } from "mdast";
import unified from "unified";
import { Parent } from "unist";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

const syntax = /^\!\[\[(.+)\]\]$/;
const basePath = process.env.SITE_URL_BASE_PATH
  ? `/${process.env.SITE_URL_BASE_PATH}`
  : "";

/**
 * test if node is a vscode memo image
 *
 * node should be a paragraph with only one text child
 * and the text should match the syntax
 * @param node
 * @returns
 */
const isVsmemoImg = (node: unknown): node is Paragraph => {
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

// need slug passed here
export type RemarkVsmemoImgOptions = {
  baseDir: string;
};

const DEFAULT_OPTIONS: RemarkVsmemoImgOptions = {
  baseDir: ".",
};

const remarkVsmemoImg: unified.Plugin<[RemarkVsmemoImgOptions?]> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return (tree) => {
    visit(
      tree,
      isVsmemoImg,
      (node: Paragraph, index: number, parent: Parent) => {
        console.log("node:", node);
        console.log("index:", index);
        let text = ((node as Paragraph).children[0] as Text).value;
        console.log("text:", text);
        let [_, matched] = syntax.exec(text)!;
        if (!matched) {
          return;
        }
        console.log("matched", matched);
        let [file, label] = matched.split("|");
        if (!label) {
          label = file;
        }
        const img: Image = {
          type: "image",
          title: label,
          url: `${basePath}${opts.baseDir}/${file}`,
          alt: label,
        };

        parent.children.splice(index, 1, img);
      }
    );
  };
};
export default remarkVsmemoImg;
