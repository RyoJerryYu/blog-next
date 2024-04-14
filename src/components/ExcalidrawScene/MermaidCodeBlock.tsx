import dynamic from "next/dynamic";

export const MermaidCodeBlock = dynamic(
  async () => (await import("./MermaidCodeBlockImpl")).MermaidCodeBlockImpl,
  { ssr: false }
);
