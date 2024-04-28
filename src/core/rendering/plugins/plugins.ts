import { RederingOptions } from "@/core/types/rendering";
import { copyNullableArray } from "@/utils/merge-object";
import { CompileOptions } from "@mdx-js/mdx";
import { MDXComponents } from "mdx/types";

/**
 * Generates MDX options based on the provided rendering options.
 *
 * It will apply the complex plugins to the options.
 *
 * @param options - The rendering options.
 * @returns The generated MDX options.
 */
export const genMdxOptions = (options: RederingOptions) => {
  const mdxOptions: Omit<
    CompileOptions,
    "outputFormat" | "providerImportSource"
  > = {
    remarkPlugins: copyNullableArray(options.mdxOptions?.remarkPlugins),
    rehypePlugins: copyNullableArray(options.mdxOptions?.rehypePlugins),
  };
  for (const complexPlugin of options.complexPlugins) {
    if (complexPlugin.remarkPlugin) {
      if (!mdxOptions.remarkPlugins) {
        mdxOptions.remarkPlugins = [];
      }
      mdxOptions.remarkPlugins.push(complexPlugin.remarkPlugin());
    }
    if (complexPlugin.rehypePlugin) {
      if (!mdxOptions.rehypePlugins) {
        mdxOptions.rehypePlugins = [];
      }
      mdxOptions.rehypePlugins.push(complexPlugin.rehypePlugin());
    }
  }

  return mdxOptions;
};

export const genMdxComponents = (options: RederingOptions) => {
  const mdxComponents: MDXComponents = { ...options.mdxComponents };
  for (const complexPlugin of options.complexPlugins) {
    if (complexPlugin.mdxComponent) {
      const [name, component] = complexPlugin.mdxComponent();
      mdxComponents[name] = component;
    }
  }

  return mdxComponents;
};
