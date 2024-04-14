import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ExcalidrawScene = dynamic(
  async () => (await import("./index")).ExcalidrawScene,
  {
    ssr: false,
  }
);

export type EmbededExcalidrawProps = {
  file: string;
  url: string;
  label?: string;
};

export default function EmbededExcalidraw({
  file,
  url,
  label,
}: EmbededExcalidrawProps) {
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setElements(data.elements);
      });
  }, [file, url, label]);
  return <ExcalidrawScene elements={elements} />;
}
