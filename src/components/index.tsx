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
  // ObsidianRich: (props: any) => {
  //   // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  //   return <img {...props} />;
  // },
  // code: (props: any) => {
  //   if (props.className === "language-mermaid") {
  //     return <Mermaid {...props} />;
  //   }
  //   const language = props.className?.replace("language-", "");
  //   return <CodeBlock language={language} {...props} />;
  // },
};

export default components;
