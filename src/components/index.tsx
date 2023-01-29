import { MDXComponents } from "mdx/types";
import CodeBlock from "./CodeBlock";
import License from "./License";
import Mermaid from "./Mermaid";

const components: MDXComponents = {
  Mermaid,
  License,
  code: (props: any) => {
    if (props.className === "language-mermaid") {
      return <Mermaid {...props} />;
    }
    const language = props.className?.replace("language-", "");
    return <CodeBlock language={language} {...props} />;
  },
};

export default components;
