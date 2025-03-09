import { Parent, Text } from "mdast";
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

export type RemarkObsidianTagOptions = {};

const DEFAULT_OPTIONS: RemarkObsidianTagOptions = {};

export const remarkObsidianTag: Plugin<[RemarkObsidianTagOptions?]> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
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
        if (!match || match.index === undefined || !match.length) {
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
  };
};
