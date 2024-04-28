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
