import { dynamicLoading } from "@/components/Loading/dynamic-loading";
import { MermaidCodeBlockProps } from "./clientComponent/MermaidExcalidrawImpl";

const MermaidExcalidrawImpl = dynamicLoading(
  async () =>
    (await import("./clientComponent/MermaidExcalidrawImpl"))
      .MermaidExcalidrawImpl
);

export function MermaidExcalidraw(props: MermaidCodeBlockProps) {
  return (
    <div className="relative h-[600px] py-4">
      <MermaidExcalidrawImpl {...props} />
    </div>
  );
}
