import { dynamicLoading } from "@/components/Loading/dynamic-loading";
import { MermaidCodeBlockProps } from "./MermaidCodeBlockImpl";

const MermaidCodeBlockImpl = dynamicLoading(
  async () => (await import("./MermaidCodeBlockImpl")).MermaidCodeBlockImpl
);

export function MermaidCodeBlock(props: MermaidCodeBlockProps) {
  return (
    <div className="relative h-[600px] py-4">
      <MermaidCodeBlockImpl {...props} />
    </div>
  );
}
