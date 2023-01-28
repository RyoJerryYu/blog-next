import { MDXComponents } from "mdx/types";
import Mermaid from "./Mermaid";

const components: MDXComponents = {
  Mermaid,
  code: (props: any) => {
    if (props.className === "language-mermaid") {
      return <Mermaid {...props} />;
    }
    return <code {...props} />;
  },
};

export default components;
