import { BackendPlugins, ParseMdxProps } from "@/core/types/rendering";
import { copyNullableArray } from "@/utils/merge-object";
import { CompileOptions } from "@mdx-js/mdx";

/**
 * Generates MDX options based on the provided rendering options.
 *
 * It will apply the complex plugins to the options.
 *
 * @param options - The rendering options.
 * @returns The generated MDX options.
 */
export const genMdxOptions = (
  props: ParseMdxProps,
  backendPlugins: BackendPlugins
) => {
  const mdxOptions: Omit<
    CompileOptions,
    "outputFormat" | "providerImportSource"
  > = {
    remarkPlugins: copyNullableArray(backendPlugins.mdxOptions?.remarkPlugins),
    rehypePlugins: copyNullableArray(backendPlugins.mdxOptions?.rehypePlugins),
  };
  for (const complexPlugin of backendPlugins.complexPlugins) {
    if (complexPlugin.remarkPlugin) {
      if (!mdxOptions.remarkPlugins) {
        mdxOptions.remarkPlugins = [];
      }
      mdxOptions.remarkPlugins.push(complexPlugin.remarkPlugin(props));
    }
    if (complexPlugin.rehypePlugin) {
      if (!mdxOptions.rehypePlugins) {
        mdxOptions.rehypePlugins = [];
      }
      mdxOptions.rehypePlugins.push(complexPlugin.rehypePlugin(props));
    }
  }

  return mdxOptions;
};
