import License from "@/components/License";
import { MDXComponents } from "mdx/types";
import EmbededExcalidraw from "./component-plugins/ExcalidrawScene/EmbededExcalidraw";
import { MermaidCodeBlock } from "./component-plugins/ExcalidrawScene/MermaidCodeBlock";
import { Bar } from "./component-plugins/component-chartjs";
import { genMdxComponents } from "./plugins/frontend-plugins";
import { ObsidianRichProps } from "./remark-plugins/remark-obsidian-rich";

const defaultMdxComponents: MDXComponents = {
  Bar,
  License,
  MermaidCodeBlock,
  ObsidianRich: (props: ObsidianRichProps) => {
    console.log("ObsidianRich:", props);
    if (
      props.file.endsWith(".excalidraw") ||
      props.file.endsWith(".excalidraw.md")
    ) {
      return <EmbededExcalidraw {...props} />;
    }
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={props.url} alt={props.label} />;
  },
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
