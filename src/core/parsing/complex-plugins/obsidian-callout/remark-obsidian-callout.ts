import { assert } from "console";
import {
  BlockContent,
  Blockquote,
  DefinitionContent,
  Node,
  Paragraph,
  Parent,
  Text,
} from "mdast";
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { Plugin } from "unified";
import { is } from "unist-util-is";
import { SKIP, visit } from "unist-util-visit";
import { propsToMdxJsxAttributes } from "../utils/utils";
import { ObsidianCalloutProps } from "./types";

/**
 * remark-obsidian-callout plugin
 *
 * For Obsidian callout syntax:
 *
 * ```
 * > [!abstract] Title
 * > Lorem ipsum dolor sit amet
 * ```
 *
 * It will transform to MDX Node:
 *
 * ```tsx
 * <ObsidianCallout type="abstract" title="Title">
 *   Lorem ipsum dolor sit amet
 * </ObsidianCallout>
 * ```
 *
 * And for foldable callout:
 *
 * ```
 * > [!abstract]- Title
 * > Lorem ipsum dolor sit amet
 * ```
 *
 * It will transform to MDX Node:
 *
 * ```tsx
 * <ObsidianCallout type="abstract" title="Title" foldable>
 *   Lorem ipsum dolor sit amet
 * </ObsidianCallout>
 * ```
 *
 * For nested callout:
 *
 * ```
 * > [!abstract] Title
 * > Lorem ipsum dolor sit amet
 * > > [!abstract] Title
 * > > Lorem ipsum dolor sit amet
 * ```
 *
 * It will transform to MDX Node:
 *
 * ```tsx
 * <ObsidianCallout type="abstract" title="Title">
 *   Lorem ipsum dolor sit amet
 *   <ObsidianCallout type="abstract" title="Title">
 *     Lorem ipsum dolor sit amet
 *   </ObsidianCallout>
 * </ObsidianCallout>
 * ```
 */

const syntax = /^\s*\[!([^\]]+)\](-)? (.*)/;

const isObsidianCallout = (node: unknown): node is Blockquote => {
  if (!is(node, { type: "blockquote" })) {
    return false;
  }
  const content = node as Blockquote;
  if (content.children.length < 1 || content.children[0].type !== "paragraph") {
    return false;
  }
  const p = content.children[0] as Paragraph;
  if (p.children.length < 1 || p.children[0].type !== "text") {
    return false;
  }
  return syntax.test(p.children[0].value);
};

/**
 * parse props from an obsidian callout paragraph
 *
 * returning props object, containing:
 * - type: string
 * - title: string
 * - foldable: boolean
 * @param node
 * @returns
 */
const parseObsidianCalloutProp = (node: Blockquote): ObsidianCalloutProps => {
  const text = node.children[0] as Paragraph;
  const match =
    text.children[0].type === "text"
      ? text.children[0].value.match(syntax)
      : null;
  if (!match) {
    throw new Error(
      `Invalid Obsidian Callout: ${
        text.children[0].type === "text" ? text.children[0].value : ""
      }`
    );
  }
  const [, type, foldmark, title] = match;
  return {
    type,
    title,
    foldable: !!foldmark,
  };
};

const parseObsidianCalloutChildren = (
  node: Blockquote
): Array<BlockContent | DefinitionContent> => {
  assert(node.children.length > 0, "node has no children");
  assert(
    node.children[0].type === "paragraph",
    "first child is not a paragraph"
  );
  const firstParagraph = node.children[0] as Paragraph;

  assert(firstParagraph.children.length > 0, "first paragraph has no children");
  assert(
    firstParagraph.children[0].type === "text",
    "first paragraph has no text"
  );
  const text = firstParagraph.children[0] as Text;

  // remove first line
  const lines = text.value.split("\n");
  lines.shift();
  const content = lines.join("\n");

  // have blank line between callout title and first paragraph
  // so we need to remove the blank line
  if (content.trim() === "") {
    return node.children.slice(1);
  }

  const newFirstText = {
    ...text,
    value: content,
  };
  const newFirstParagraph = {
    ...firstParagraph,
    children: [newFirstText],
  };
  return [newFirstParagraph, ...node.children.slice(1)];
};

const transformAllObsidianCallouts = (tree: Node) => {
  visit(
    tree,
    isObsidianCallout,
    (node: Blockquote, index: number | undefined, parent: Parent) => {
      if (index === undefined) {
        console.error("index is undefined", node, parent);
        throw new Error("index is undefined");
      }
      const props = parseObsidianCalloutProp(node);
      const children = parseObsidianCalloutChildren(node);
      const obsidianCalloutElement: MdxJsxFlowElement = {
        type: "mdxJsxFlowElement",
        name: "ObsidianCallout",
        attributes: propsToMdxJsxAttributes(props),
        children,
      };
      parent.children.splice(index, 1, obsidianCalloutElement);

      // because children is not in the original tree,
      // we need to transform it separately
      transformAllObsidianCallouts(obsidianCalloutElement);
      // stop visiting children in the original tree
      return SKIP;
    }
  );
};

export type RemarkObsidianCalloutOptions = {};

const DEFAULT_OPTIONS: RemarkObsidianCalloutOptions = {};

export const remarkObsidianCallout: Plugin<[RemarkObsidianCalloutOptions?]> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return (tree) => {
    transformAllObsidianCallouts(tree);
  };
};
