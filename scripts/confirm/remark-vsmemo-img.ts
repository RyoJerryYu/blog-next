import { Image, Paragraph, Text } from "mdast";
import unified from "unified";
import { Parent } from "unist";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

const syntax = /\!\[\[(.+)\]\]/g;

/**
 * test if node is a vscode memo image
 *
 * node should be a paragraph with only one text child
 * and the text should match the syntax
 * @param node
 * @returns
 */
const isVsmemoImg = (node: unknown): node is Paragraph => {
  if (!is(node, "paragraph")) {
    return false;
  }
  const p = node as Paragraph;
  if (p.children.length !== 1 || p.children[0].type !== "text") {
    return false;
  }
  const text = p.children[0] as Text;
  return syntax.test(text.value);
};

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
        let text = ((node as Paragraph).children[0] as Text).value;
        let [matched] = syntax.exec(text)!;
        let [file, label] = matched.split("|");
        if (!label) {
          label = file;
        }
        const img: Image = {
          type: "image",
          title: label,
          url: `${opts.baseDir}/${file}`,
          alt: label,
        };

        parent.children.splice(index, 1, img);
      }
    );
  };
};

const md = `
# title

![[test.png|test]]

some other content
`;
const processor = unified
  .unified()
  .use(remarkParse)
  .use(remarkVsmemoImg, { baseDir: "test" })
  .use(remarkStringify);
const result = processor.processSync(md).toString();

console.log(result);
