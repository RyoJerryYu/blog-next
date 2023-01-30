import remarkVsmemoImg, {
  RemarkVsmemoImgOptions,
} from "@/plugins/remark-vsmemo-img";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

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
        [remarkVsmemoImg, config?.remarkVsmemoImgOptions],
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
  });
  return source;
};
export default parseMdx;
