import { serialize } from "next-mdx-remote/serialize";
import { ParseMdxProps } from "../types/rendering";
import { genMdxOptions } from "./plugins/plugins";
import { renderingOptions } from "./rendering-settings";

export const parseMdx = async (content: string, props: ParseMdxProps) => {
  const mdxOptions = genMdxOptions(props, renderingOptions);
  const source = await serialize(content, {
    mdxOptions: mdxOptions,
  });
  return source;
};
