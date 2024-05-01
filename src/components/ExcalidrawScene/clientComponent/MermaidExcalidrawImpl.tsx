"use client";
import { Loading } from "@/components/Loading/Loading";
import { useMutex } from "@/hooks/use-mutex";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/types/data/transform";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { useEffect, useState } from "react";
import { MermaidCodeBlockProps } from "../types/MermaidExcalidrawProps";
import { ExcalidrawSceneImpl } from "./ExcalidrawSceneImpl";

/**
 * Parsing mermaid to excalidraw need to call mermaid API,
 * which is globally holding a registry of mermaid diagrams,
 * and registering twice will cause an error.
 *
 * And, inside `getDiagramFromText` , there is something like:
 * ```
 * try {
 *   getDiagram(type);
 * } catch (e) {
 *   await loader();
 *   registerDiagram(id, diagram);
 * }
 * ```
 *
 * If it called twice concurrently,
 * one coroutines will try to get the diagram and failed,
 * and handed on await loader().
 * Another coroutine will try to get the diagram and failed again,
 * and handed on await loader() again.
 * Then, both coroutine will call loader() concurrently,
 * and register the diagram twice, resulting in an error.
 *
 * Simply, once the diagram is registered,
 * getDiagram will not fail, and registerDiagram will not be called,
 * everything will be fine.
 *
 * It could not be solved by simply parse again after error,
 * because in the second time, though getDiagram will success,
 * mermaidAPI.render to SVG will fail, because of the global registry again.
 *
 * No any good idea, just use a mutex to prevent concurrent parsing.
 */

async function parseMermaidToExcalidrawElementSkeletons(code: string) {
  console.log("before try for", code);
  const { elements: elementSkeletons } = await parseMermaidToExcalidraw(code);
  console.log("parse mermaid success for", code);
  return elementSkeletons;
}

const parseMermaidMutexKey = "MermaidCodeBlockImpl_parseMermaid";

export function MermaidExcalidrawImpl({
  name = "mermaid",
  children,
  className,
}: MermaidCodeBlockProps) {
  console.log(children);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [parseDone, setParseDone] = useState(false);
  const mutex = useMutex(parseMermaidMutexKey);
  useEffect(() => {
    const parseMermaid = async () => {
      if (parseDone) return;
      if (!children) return;
      let elementSkeletons: ExcalidrawElementSkeleton[] = [];
      const release = await mutex.acquire();
      try {
        elementSkeletons = await parseMermaidToExcalidrawElementSkeletons(
          children
        );
      } catch (e) {
        console.error("error", e, "for", children);
      } finally {
        release();
      }
      const excalidrawElements = convertToExcalidrawElements(elementSkeletons);
      setElements(excalidrawElements);
      setParseDone(true);
      console.log("elements", excalidrawElements);
    };

    parseMermaid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, parseDone]);

  return (
    <>{parseDone ? <ExcalidrawSceneImpl elements={elements} /> : <Loading />}</>
  );
}
