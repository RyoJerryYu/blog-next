import { MDXComponents } from "mdx/types";
import License from "./License";
import Mermaid from "./Mermaid";

const components: MDXComponents = {
  Mermaid,
  License,
  code: (props: any) => {
    if (props.className === "language-mermaid") {
      return <Mermaid {...props} />;
    }
    return <code {...props} />;
  },
};

export default components;
