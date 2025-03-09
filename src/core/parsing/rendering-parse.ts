import { CompileOptions } from "@mdx-js/mdx";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex, { Options as KatexOptions } from "rehype-katex";
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";
import { ParseMdxProps } from "../types/rendering";
import {
  RemarkCodeBlockEscapeOptions,
  remarkCodeBlockEscape,
} from "./complex-plugins/code-block-escape/remark-code-block-escape";
import { remarkObsidianCallout } from "./complex-plugins/obsidian-callout/remark-obsidian-callout";
import remarkObsidianRich, {
  RemarkObsidianRichOptions,
} from "./complex-plugins/obsidian-rich/remark-obsidian-rich";
import { ObsidianRichProps } from "./complex-plugins/obsidian-rich/types";
import { remarkObsidianTag } from "./complex-plugins/obsidian-tag/remark-obsidian-tag";
import remarkObsidianWikilink, {
  RemarkObsidianWikilinkOptions,
} from "./complex-plugins/obsidian-wikilink/remark-obsidian-wikilink";

const genMdxOptions = (props: ParseMdxProps) => {
  const defaultMdxOptions: Omit<
    CompileOptions,
    "outputFormat" | "providerImportSource"
  > = {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkObsidianCallout,
      [
        remarkObsidianRich,
        {
          matchers: [
            [
              (props: ObsidianRichProps) =>
                props.file.endsWith(".excalidraw") ||
                props.file.endsWith(".excalidraw.md"),
              "ObsidianRichExcalidraw",
            ],
          ],
        } as RemarkObsidianRichOptions,
      ],
      [remarkObsidianWikilink, {} as RemarkObsidianWikilinkOptions],
      remarkObsidianTag,
      [
        remarkCodeBlockEscape,
        {
          escapes: [["mermaid", "CodeBlockMermaid"]],
        } as RemarkCodeBlockEscapeOptions,
      ],
      remarkUnwrapImages,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypeKatex,
        {
          strict: false,
        } as KatexOptions,
      ],
      [
        rehypePrettyCode,
        {
          theme: "rose-pine-moon",
          keepBackground: true,
          onVisitLine: (node: any) => {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine: (node: any) => {
            node.properties.className.push("highlighted");
          },
          onVisitHighlightedWord: (node: any, id: string | undefined) => {
            node.properties.className = ["word"];
          },
        } as PrettyCodeOptions,
      ],
    ],
  };
  return defaultMdxOptions;
};

export const parseMdx = async (content: string, props: ParseMdxProps) => {
  const mdxOptions = genMdxOptions(props);
  const source = await serialize(content, {
    mdxOptions: mdxOptions,
  });
  return source;
};
