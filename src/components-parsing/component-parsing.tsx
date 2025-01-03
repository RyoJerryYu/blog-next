import License from "@/components/License";
import { MutexProvider } from "@/hooks/use-mutex";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import { ReactNode } from "react";
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

export const ParsingProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MutexProvider>
      <MDXProvider components={components}>{children}</MDXProvider>
    </MutexProvider>
  );
};
