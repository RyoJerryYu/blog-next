import { MermaidExcalidraw } from "@/components/ExcalidrawScene/MermaidExcalidraw";
import { CodeBlockProps } from "./types";

export const CodeBlockMermaid = (props: CodeBlockProps) => {
  let name = props.lang ?? undefined; // string | undefined
  if (props.lang && props.meta) {
    name = `${props.lang} ${props.meta}`;
  }
  return <MermaidExcalidraw name={name}>{props.value}</MermaidExcalidraw>;
};
