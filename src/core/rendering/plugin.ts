import { CompileOptions } from "@mdx-js/mdx";
import { MDXComponents } from "mdx/types";
import { Pluggable } from "unified";

export type RederingOptions = {
  mdxOptions: Omit<CompileOptions, "outputFormat" | "providerImportSource">;
  mdxComponents: MDXComponents;
  complexPlugins: ComplexPlugin[];
};

export type ComplexPlugin = {
  remarkPlugin?: () => Pluggable;
  rehypePlugin?: () => Pluggable;
  mdxComponent?: () => [string, MDXComponents[keyof MDXComponents]];
};

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
  > = options.mdxOptions;
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
  const mdxComponents: MDXComponents = options.mdxComponents;
  for (const complexPlugin of options.complexPlugins) {
    if (complexPlugin.mdxComponent) {
      const [name, component] = complexPlugin.mdxComponent();
      mdxComponents[name] = component;
    }
  }

  return mdxComponents;
};
