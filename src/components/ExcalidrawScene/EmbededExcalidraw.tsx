import { LoadError } from "@/components/Loading/LoadError";
import { Loading } from "@/components/Loading/Loading";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import useSWR from "swr";
import { ExcalidrawScene } from "./ExcalidrawScene";

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
  const { data: refData, isLoading } = useSWR(url, async (url) => {
    const res = await fetch(url).then((res) => res.json());
    return res.elements as ExcalidrawElement[];
  });

  return (
    <div className="relative h-[600px] py-4">
      {isLoading ? (
        <Loading />
      ) : refData ? (
        <ExcalidrawScene elements={refData} />
      ) : (
        <LoadError />
      )}
    </div>
  );
}
