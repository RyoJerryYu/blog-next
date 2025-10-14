import { dynamicLoading } from "../Loading/dynamic-loading";
import { CodeBlockProps } from "./types/CodeBlockProps";

const CodeBlockImpl = dynamicLoading(
  async () => (await import("./clientComponent/CodeBlockImpl")).CodeBlockImpl
);

// TODO want show language, show file name, highlight line...
const CodeBlock = ({ language, children }: CodeBlockProps) => {
  return <CodeBlockImpl language={language} children={children} />;
};

export default CodeBlock;
