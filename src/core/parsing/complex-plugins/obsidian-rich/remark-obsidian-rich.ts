import { getAliasIndex } from "@/core/indexing/indexing-cache";
import { resourcePath } from "@/utils/path-resolve";
import { Image, Paragraph, Text } from "mdast";
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { Plugin } from "unified";
import { Parent } from "unist";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";
import { propsToMdxJsxAttributes } from "../utils/utils";
import { ObsidianRichProps } from "./types";
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
  resolveRefAlias: (alias: string) => string | undefined
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

  let path = resolveRefAlias(file);
  if (!path) {
    // allow .md file shorttened
    // if not found, try resolve it as was shorttened
    path = resolveRefAlias(`${file}.md`);
  }
  if (!path) {
    throw new Error("Invalid file path: " + file);
  }

  const props: ObsidianRichProps = {
    file: file,
    url: resourcePath(path),
    label: label,
  };

  if (path) {
    props.pagePath = path;
  }

  return props;
};

export type Matcher = RegExp | ((props: ObsidianRichProps) => boolean);

/**
 * Test if the props parsed from `![[]]` syntax match the matcher.
 */
const testMatcher = (matcher: Matcher, props: ObsidianRichProps) => {
  if (typeof matcher === "function") {
    return matcher(props);
  }
  return matcher.test(props.file);
};

// need slug passed here
export type RemarkObsidianRichOptions = {
  /**
   * list of [matcher, componentName]
   */
  matchers: [Matcher, string][];
  isMetaPhase?: boolean; // if true, only collect meta data, and not to use index
  collectRefAliases: (aliases: string[]) => void;
};

const DEFAULT_OPTIONS: RemarkObsidianRichOptions = {
  matchers: [],
  collectRefAliases: (_: string[]) => {},
};

const remarkObsidianRich: Plugin<[RemarkObsidianRichOptions?]> = (options) => {
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
      isObsidianRich,
      (node: Paragraph, index: number | undefined, parent: Parent) => {
        if (index === undefined) {
          console.error("index is undefined", node, parent);
          throw new Error("index is undefined");
        }
        const props = parseObsidianRichProp(node, resolveRefAlias);
        for (let [matcher, componentName] of opts.matchers) {
          if (!testMatcher(matcher, props)) {
            continue;
          }

          const obsidianRichElement: MdxJsxFlowElement = {
            type: "mdxJsxFlowElement",
            name: componentName,
            attributes: propsToMdxJsxAttributes(props),
            children: [],
          };
          parent.children.splice(index, 1, obsidianRichElement);
          return;
        }

        // all matchers failed, fallback to markdown image
        const obsidianRichElement: Image = {
          type: "image",
          url: props.url,
          alt: props.label,
          title: props.label,
        };

        parent.children.splice(index, 1, obsidianRichElement);
      }
    );

    opts.collectRefAliases(collectedRefAliases);
  };
};
export default remarkObsidianRich;
