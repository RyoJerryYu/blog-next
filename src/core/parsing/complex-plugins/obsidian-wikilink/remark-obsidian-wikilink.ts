import { getAliasIndex } from "@/core/indexing/indexing-cache";
import { Link, Parent, Text } from "mdast";
import { MdxJsxTextElement } from "mdast-util-mdx-jsx";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { propsToMdxJsxAttributes } from "../utils/utils";
import { ObsidianWikilinkPropsMdx } from "./types";
/**
 * remark-obsidian-wikilink plugin
 *
 * For Obsidian wikilink syntax:
 *
 * ```
 * [[file|label]]
 * ```
 *
 * It will transform to MDX Node: <ObsidianWikilink file="file" path="path" label="label" />
 */

const syntax = /\[\[([^\]]+)\]\]/;

export type Matcher = RegExp | ((props: ObsidianWikilinkPropsMdx) => boolean);

const testMatcher = (matcher: Matcher, props: ObsidianWikilinkPropsMdx) => {
  if (typeof matcher === "function") {
    return matcher(props);
  }
  return matcher.test(props.path);
};

export type RemarkObsidianWikilinkOptions = {
  matchers: [Matcher, string][];
};

const DEFAULT_OPTIONS: RemarkObsidianWikilinkOptions = {
  matchers: [],
};

const remarkObsidianWikilink: Plugin<[RemarkObsidianWikilinkOptions?]> = (
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
        if (
          !match ||
          match.index === undefined ||
          !match.length ||
          match.length < 2
        ) {
          return;
        }

        const pre = node.value.slice(0, match.index);
        const post = node.value.slice(match.index + match[0].length);
        const modifyTree = (newNode: MdxJsxTextElement | Link) => {
          parent.children.splice(
            index,
            1,
            { type: "text", value: pre },
            newNode,
            { type: "text", value: post }
          );
          return index + 2;
        };

        let [alias, label] = match[1].split("|");
        if (!label) {
          label = alias;
        }

        let path = getAliasIndex().resolve(alias);
        // alias to a post no need for considering extension
        if (!path) {
          throw new Error(`Invalid alias: ${alias}`);
        }

        const props: ObsidianWikilinkPropsMdx = {
          alias,
          path, // no need to consider prefix
          label,
        };

        for (let [matcher, componentName] of opts.matchers) {
          if (!testMatcher(matcher, props)) {
            continue;
          }

          const obsidianWikilinkElement: MdxJsxTextElement = {
            type: "mdxJsxTextElement",
            name: componentName,
            attributes: propsToMdxJsxAttributes(props),
            children: [{ type: "text", value: props.label ?? props.path }],
          };
          return modifyTree(obsidianWikilinkElement);
        }

        // all matchers failed, fallback to markdown link
        const obsidianWikilinkElement: Link = {
          type: "link",
          url: props.path,
          children: [
            {
              type: "text",
              value: props.label ?? props.path,
            },
          ],
        };
        return modifyTree(obsidianWikilinkElement);
      }
    );
  };
};

export default remarkObsidianWikilink;
