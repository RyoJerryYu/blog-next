import License from "@/components/License";
import { MDXComponents } from "mdx/types";
import { Bar } from "./chartjs";
import { CodeBlockMermaid } from "./complex-plugin-components/code-block-escape/CodeBlockMermaid";
import { ObsidianRichExcalidraw } from "./complex-plugin-components/obsidian-rich/ObsidianRichExcalidraw";

export const components: MDXComponents = {
  Bar,
  License,
  CodeBlockMermaid,
  ObsidianRichExcalidraw,
  // code: (props: any) => {
  //   if (props.className === "language-mermaid") {
  //     return <Mermaid {...props} />;
  //   }
  //   const language = props.className?.replace("language-", "");
  //   return <CodeBlock language={language} {...props} />;
  // },
};
