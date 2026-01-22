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
 *
 * Need Alias Index to resolve the alias to the page path.
 */

const syntax = /\[\[([^\]]+)\]\]/;

const parseObsidianWikilinkProp = (
  matched: string,
  resolveRefAlias: (alias: string) => string | undefined
): ObsidianWikilinkPropsMdx => {
  let [alias, label] = matched.split("|");

  let path = resolveRefAlias(alias);
  // alias to a post no need for considering extension
  if (!path) {
    throw new Error(`Invalid alias: ${alias}`);
  }

  if (!label) {
    if (alias.includes("#")) {
      label = alias.split("#")[1];
    } else {
      label = alias;
    }
  }

  // this alias should always be resolvable below
  const props: ObsidianWikilinkPropsMdx = {
    alias,
    path, // no need to consider prefix
    label,
  };
  return props;
};

export type Matcher = RegExp | ((props: ObsidianWikilinkPropsMdx) => boolean);

const testMatcher = (matcher: Matcher, props: ObsidianWikilinkPropsMdx) => {
  if (typeof matcher === "function") {
    return matcher(props);
  }
  return matcher.test(props.path);
};

export type RemarkObsidianWikilinkOptions = {
  matchers: [Matcher, string][];
  isMetaPhase?: boolean; // if true, only collect meta data, and not to use index
  collectRefAliases: (alias: string[]) => void;
};

const DEFAULT_OPTIONS: RemarkObsidianWikilinkOptions = {
  matchers: [],
  collectRefAliases: (_: string[]) => {},
};

const remarkObsidianWikilink: Plugin<[RemarkObsidianWikilinkOptions?]> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const collectedRefAliases: string[] = [];
  const resolveRefAlias = (alias: string) => {
    if (opts.isMetaPhase) {
      collectedRefAliases.push(alias);
      return "-";
    } else {
      return getAliasIndex().resolve(alias);
    }
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

        const props = parseObsidianWikilinkProp(match[1], resolveRefAlias);

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

    opts.collectRefAliases(collectedRefAliases);
  };
};

export default remarkObsidianWikilink;
