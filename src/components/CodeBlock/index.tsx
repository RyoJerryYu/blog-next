import { dynamicLoading } from "../Loading/dynamic-loading";
import { CodeBlockProps } from "./types/CodeBlockProps";

const CodeBlockImpl = dynamicLoading(
  async () => (await import("./clientComponent/CodeBlockImpl")).CodeBlockImpl
);

const CodeBlock = ({ language, children }: CodeBlockProps) => {
  return <CodeBlockImpl language={language}>{children}</CodeBlockImpl>;
};

export default CodeBlock;
