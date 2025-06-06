import { MutexProvider } from "@/hooks/use-mutex";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ReactNode } from "react";
import { Bar } from "./chartjs";
import { CodeBlockJessieCode } from "./complex-plugin-components/code-block-escape/CodeBlockJessieCode";
import { CodeBlockMermaid } from "./complex-plugin-components/code-block-escape/CodeBlockMermaid";
import { ObsidianCallout } from "./complex-plugin-components/obsidian-callout/ObsidianCallout";
import { ObsidianHighlight } from "./complex-plugin-components/obsidian-highlight/ObsidianHighlight";
import { ObsidianRichExcalidraw } from "./complex-plugin-components/obsidian-rich/ObsidianRichExcalidraw";
import { ObsidianTag } from "./complex-plugin-components/obsidian-tag/ObsidianTag";

export const components: MDXComponents = {
  Bar,
  CodeBlockMermaid,
  CodeBlockJessieCode,
  ObsidianHighlight,
  ObsidianRichExcalidraw,
  ObsidianCallout,
  ObsidianTag,
  a: (props) => {
    const { href, ...rest } = props;
    if (href?.startsWith("/")) {
      // relative to root, Next.js will auto handle prefix
      return <Link href={href} {...rest} />;
    }
    return <a href={href} {...rest} />;
  },
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
