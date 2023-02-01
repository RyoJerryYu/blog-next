import { NoSsr } from "@mui/base";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type CodeBlockProps = {
  language?: string;
  children: string;
};

// TODO want show language, show file name, highlight line...
const CodeBlock = ({ language, children }: CodeBlockProps) => {
  return (
    <>
      <NoSsr>
        <SyntaxHighlighter
          language={language}
          style={monokaiSublime}
          showLineNumbers={true}
        >
          {children}
        </SyntaxHighlighter>
      </NoSsr>
    </>
  );
};

export default CodeBlock;
