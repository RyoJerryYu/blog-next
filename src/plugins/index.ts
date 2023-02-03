import remarkVsmemoImg, {
  RemarkVsmemoImgOptions,
} from "@/plugins/remark-vsmemo-img";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMermaid from "./remark-mermaid";

type ParseMdxConfig = {
  remarkVsmemoImgOptions?: RemarkVsmemoImgOptions;
};

// make serialized file for mdx renderer
const parseMdx = async (content: string, config?: ParseMdxConfig) => {
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        [remarkMermaid, { wrap: true, className: ["mermaid"] }],
        [remarkVsmemoImg, config?.remarkVsmemoImgOptions],
        remarkUnwrapImages,
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeKatex,
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
