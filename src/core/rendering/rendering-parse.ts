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
import { genMdxOptions } from "./plugins/backend-plugins";
import remarkExcalidrawMermaid from "./remark-plugins/remark-excalidraw-mermaid";
import remarkObsidianRich from "./remark-plugins/remark-obsidian-rich";

const defaultMdxOptions: Omit<
  CompileOptions,
  "outputFormat" | "providerImportSource"
> = {
  remarkPlugins: [
    remarkGfm,
    remarkMath,
    remarkExcalidrawMermaid,
    // [remarkMermaid, { wrap: true, className: ["mermaid"] }],
    [remarkObsidianRich],
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

export const parseMdx = async (content: string, props: ParseMdxProps) => {
  const mdxOptions = genMdxOptions(props, {
    mdxOptions: defaultMdxOptions,
    complexPlugins: [],
  });
  const source = await serialize(content, {
    mdxOptions: mdxOptions,
  });
  return source;
};
