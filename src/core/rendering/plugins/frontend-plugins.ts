import { FrontendPlugins } from "@/core/types/rendering";
import { MDXComponents } from "mdx/types";
/**
 * Generates MDX components based on the provided rendering options.
 * @param options - The rendering options.
 * @returns The generated MDX components.
 */
export const genMdxComponents = (frontendPlugins: FrontendPlugins) => {
  const mdxComponents: MDXComponents = { ...frontendPlugins.mdxComponents };
  for (const complexPlugin of frontendPlugins.complexPlugins) {
    if (complexPlugin.mdxComponent) {
      const [name, component] = complexPlugin.mdxComponent();
      mdxComponents[name] = component;
    }
  }

  return mdxComponents;
};
