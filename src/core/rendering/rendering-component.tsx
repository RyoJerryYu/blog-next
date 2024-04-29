import License from "@/components/License";
import { MDXComponents } from "mdx/types";
import { ObsidianRichExcalidraw } from "./complex-plugins/obsidian-rich/ObsidianRichExcalidraw";
import { MermaidCodeBlock } from "./component-plugins/ExcalidrawScene/MermaidCodeBlock";
import { Bar } from "./component-plugins/component-chartjs";
import { genMdxComponents } from "./plugins/frontend-plugins";

const defaultMdxComponents: MDXComponents = {
  Bar,
  License,
  MermaidCodeBlock,
  ObsidianRichExcalidraw,
  // code: (props: any) => {
  //   if (props.className === "language-mermaid") {
  //     return <Mermaid {...props} />;
  //   }
  //   const language = props.className?.replace("language-", "");
  //   return <CodeBlock language={language} {...props} />;
  // },
};

export const components = genMdxComponents({
  mdxComponents: defaultMdxComponents,
  complexPlugins: [],
});
