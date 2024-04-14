"use client";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { useEffect, useState } from "react";
import { ExcalidrawSceneImpl } from "./ExcalidrawSceneImpl";

export type MermaidCodeBlockProps = {
  name?: string;
  children: string;
  className?: string;
};
export function MermaidCodeBlockImpl({
  name = "mermaid",
  children,
  className,
}: MermaidCodeBlockProps) {
  console.log(children);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [parseDone, setParseDone] = useState(false);
  useEffect(() => {
    const parseMermaid = async () => {
      if (parseDone) return;
      try {
        const { elements: elementSkeletons } = await parseMermaidToExcalidraw(
          children,
          {}
        );
        const excalidrawElements =
          convertToExcalidrawElements(elementSkeletons);
        setElements(excalidrawElements);
        setParseDone(true);
        console.log("elements", excalidrawElements);
      } catch (e) {
        console.error("error", e);
      }
    };

    parseMermaid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, parseDone]);

  return (
    <div className="relative h-[600px] py-4">
      {parseDone ? (
        <ExcalidrawSceneImpl elements={elements} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
}
