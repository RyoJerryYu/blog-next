import { MermaidExcalidraw } from "@/components/ExcalidrawScene/MermaidExcalidraw";
import { CodeBlockProps } from "../../../core/parsing/complex-plugins/code-block-escape/types";

export const CodeBlockMermaid = (props: CodeBlockProps) => {
  let name = props.lang ?? undefined; // string | undefined
  if (props.lang && props.meta) {
    name = `${props.lang} ${props.meta}`;
  }
  return <MermaidExcalidraw name={name}>{props.value}</MermaidExcalidraw>;
};
