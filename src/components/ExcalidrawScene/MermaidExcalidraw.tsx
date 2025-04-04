import { dynamicLoading } from "@/components/Loading/dynamic-loading";
import { MermaidCodeBlockProps } from "./types/MermaidExcalidrawProps";

const MermaidExcalidrawImpl = dynamicLoading(
  async () =>
    (await import("./clientComponent/MermaidExcalidrawImpl"))
      .MermaidExcalidrawImpl
);

export function MermaidExcalidraw(props: MermaidCodeBlockProps) {
  return (
    <div className="relative h-[600px] my-4">
      <MermaidExcalidrawImpl {...props} />
    </div>
  );
}
