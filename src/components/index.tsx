import { ObsidianRichProps } from "@/plugins/remark-obsidian-rich";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { MDXComponents } from "mdx/types";
import { Bar } from "react-chartjs-2";
import EmbededExcalidraw from "./ExcalidrawScene/EmbededExcalidraw";
import { MermaidCodeBlock } from "./ExcalidrawScene/MermaidCodeBlock";
import License from "./License";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const components: MDXComponents = {
  Bar,
  // Mermaid,
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

export default components;
