import { CompileOptions } from "@mdx-js/mdx";
import { MDXComponents } from "mdx/types";
import { Pluggable } from "unified";

export type ParseMdxProps = {
  pagePath: string;
};

export type ComplexPlugin = {
  remarkPlugin?: (props: ParseMdxProps) => Pluggable;
  rehypePlugin?: (props: ParseMdxProps) => Pluggable;
  mdxComponent?: () => [string, MDXComponents[keyof MDXComponents]];
};

export type FrontendPlugins = {
  mdxComponents: MDXComponents;
  complexPlugins: ComplexPlugin[];
};

export type BackendPlugins = {
  mdxOptions: Omit<CompileOptions, "outputFormat" | "providerImportSource">;
  complexPlugins: ComplexPlugin[];
};
