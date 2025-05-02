import { getTagIndex } from "@/core/indexing/indexing-cache";
import { Paragraph, Parent, Root, Text } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { propsToMdxJsxAttributes } from "../utils/utils";
import { ObsidianTagProps } from "./types";

/**
 * remark-obsidian-tag plugin
 *
 * For Obsidian tag syntax:
 *
 * ```
 * ABC #tag DEF
 * ```
 *
 * It will transform to MDX Node:
 *
 * ```tsx
 * ABC <ObsidianTag tag="tag" /> DEF
 * ```
 *
 * If there is no prefix text:
 *
 * ```
 * #tag D
 * ```
 *
 * it will transform to:
 *
 * ```tsx
 * <ObsidianTag tag="tag" /> DEF
 * ```
 *
 * If there is no suffix text:
 *
 * ```
 * ABC #tag
 * ```
 *
 * it will transform to:
 *
 * ```tsx
 * ABC <ObsidianTag tag="tag" />
 * ```
 */

const syntax = /(^|[\s])(#[^\s]+)/;

export type RemarkObsidianTagOptions = {
  isMetaPhase?: boolean; // if true, only collect meta data, and not to use index
  collectMdxTags: (tags: string[]) => void;
  firstTagParagraph?: boolean; // if true, remove first paragraph if it's only tags
};

const DEFAULT_OPTIONS: RemarkObsidianTagOptions = {
  collectMdxTags: (_: string[]) => {},
};

export const remarkObsidianTag: Plugin<[RemarkObsidianTagOptions?]> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const collectedMdxTags: string[] = [];
  const getTagsOf = (tags: string[]) => {
    if (opts.isMetaPhase) {
      collectedMdxTags.push(...tags);
      return [];
    }
    return getTagIndex().getTagsOf(tags);
  };
  return (tree) => {
    visit(
      tree,
      "text",
      (node: Text, index: number | undefined, parent: Parent) => {
        if (index === undefined) {
          console.error("index is undefined", node, parent);
          throw new Error("index is undefined");
        }
        const match = node.value.match(syntax);
        if (
          !match ||
          match.index === undefined ||
          !match.length ||
          match.length < 3
        ) {
          return;
        }

        // if text is "pre #tag post",
        // then split it into text"pre " , tag"tag" , text"post"
        const pre = node.value.slice(0, match.index + match[1].length);
        const tag = match[2].slice(1);
        const post = node.value.slice(match.index + match[0].length);

        const props: ObsidianTagProps = {
          tag,
        };

        const tagInfos = getTagsOf([tag]);
        if (tagInfos.length > 0) {
          // resolvable tag
          const tagInfo = tagInfos[0];
          props.slug = tagInfo.slug;
          props.path = tagInfo.path;
        }
        // if not, just display as unclickable

        parent.children.splice(
          index,
          1,
          {
            type: "text",
            value: pre,
          },
          {
            type: "mdxJsxTextElement",
            name: "ObsidianTag",
            attributes: propsToMdxJsxAttributes(props),
            children: [],
          },
          {
            type: "text",
            value: post,
          }
        );

        return index + 2;
      }
    );

    if (opts.firstTagParagraph && "children" in tree) {
      removeFirstParagraph(tree as Root);
    }

    opts.collectMdxTags(collectedMdxTags);
  };
};

function removeFirstParagraph(tree: Root) {
  if (tree.children.length === 0) {
    // no paragraph as top level node
    return;
  }

  let firstParagraph: Paragraph | undefined;
  let i = 0;
  for (; i < tree.children.length; i++) {
    const child = tree.children[i];
    if (child.type !== "paragraph") {
      // first child is not a paragraph, no need to remove
      return;
    }

    if (child.children.length === 0) {
      // empty paragraph, to next paragraph
      continue;
    }

    firstParagraph = child;
    break;
  }

  if (!firstParagraph) {
    // no paragraph as top level node
    return;
  }

  for (let j = 0; j < firstParagraph.children.length; j++) {
    const child = firstParagraph.children[j];
    if (child.type == "text") {
      if (child.value.trim() !== "") {
        // not empty text, no need to remove
        return;
      }
      // empty text, continue to next child
      continue;
    }

    if (child.type === "mdxJsxTextElement" && child.name === "ObsidianTag") {
      // mdxJsxTextElement, continue to next child
      continue;
    }

    // other node type, no need to remove
    return;
  }

  // remove the first paragraph
  tree.children.splice(i, 1);
}
