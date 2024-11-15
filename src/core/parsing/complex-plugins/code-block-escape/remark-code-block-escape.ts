import { Code, Parent } from "mdast";
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { propsToMdxJsxAttributes } from "../utils/utils";
import { CodeBlockProps } from "./types";

export type LangMather = string | RegExp | ((lang: string) => boolean);

/**
 * Tests if the given language matches the provided matcher.
 *
 * @param matcher - The matcher to use for testing the language.
 * @param lang - The language to test against the matcher.
 * @returns `true` if the language matches the matcher, `false` otherwise.
 */
const testMatcher = (matcher: LangMather, lang: string): boolean => {
  if (typeof matcher === "function") {
    return matcher(lang);
  }
  if (matcher instanceof RegExp) {
    return matcher.test(lang);
  }
  return matcher === lang;
};

export type RemarkCodeBlockEscapeOptions = {
  escapes: [LangMather, string][];
};

const DEFAULT_OPTIONS: RemarkCodeBlockEscapeOptions = {
  escapes: [],
};

/**
 * A unified plugin that escapes code blocks in a Markdown tree.
 *
 * Useful when other plugins such as `rehypePrettyCode` are used to transform code blocks.
 *
 * Code block in markdown as below:
 * ````markdown
 * ```js name thrid forth
 * console.log("Hello, World!");
 * ```
 * ````
 * Will parsed into CodeBlockProps as:
 * ```ts
 * {
 *  lang: "js",
 *  meta: "name thrid forth",
 *  value: "console.log(\"Hello, World!\");"
 * }
 * ```
 *
 * And then transformed into Component with given name.
 *
 * Default behavior with no match is to do nothing.
 *
 * @param options - Optional configuration options for the plugin.
 * @returns A function that can be used as a plugin in a unified processor.
 */
export const remarkCodeBlockEscape: Plugin<[RemarkCodeBlockEscapeOptions?]> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return (tree) => {
    visit(tree, "code", (node: Code, index: number, parent: Parent) => {
      const props: CodeBlockProps = {
        lang: node.lang,
        meta: node.meta,
        value: node.value,
      };
      if (!node.lang) {
        return;
      }
      for (let [matcher, componentName] of opts.escapes) {
        if (!testMatcher(matcher, node.lang)) {
          continue;
        }

        const codeBlocKEscapeElement: MdxJsxFlowElement = {
          type: "mdxJsxFlowElement",
          name: componentName,
          attributes: propsToMdxJsxAttributes(props),
          children: [],
        };

        parent.children.splice(index, 1, codeBlocKEscapeElement);

        return;
      }

      // do not match any escape, do nothing
      return;
    });
  };
};
