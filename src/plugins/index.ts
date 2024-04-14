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
import remarkExcalidrawMermaid from "./remark-excalidraw-mermaid";
import remarkObsidianRich, {
  RemarkObsidianRichOptions,
} from "./remark-obsidian-rich";

type ParseMdxConfig = {
  remarkObsidianRichOptions?: RemarkObsidianRichOptions;
};

// make serialized file for mdx renderer
const parseMdx = async (content: string, config?: ParseMdxConfig) => {
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkExcalidrawMermaid,
        // [remarkMermaid, { wrap: true, className: ["mermaid"] }],
        [remarkObsidianRich, config?.remarkObsidianRichOptions],
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
    },
  });
  return source;
};
export default parseMdx;
